import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Album } from '../models/album.model';

/**
 * Service to operate wih album's API
 */
@Injectable({
  providedIn: 'root'
})
export class AlbumDataService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }
  /**
   * Creates Album model from http resonse
   * @param data json http resonse from server
   */
  private static createAlbum(data: any): Album {
    if (data == null) {
      return null;
    }
    return { ...data };
  }
  /**
   * Create query string to get paginated album list
   * @param page page
   * @param limit limit
   */
  private static createQueryString(page, limit) {
    const start = limit * page;
    return `_start=${start}&_limit=${limit}`;
  }
  /**
   * Gets paginated list of albums
   */
  getAlbums(page, limit): Observable<Album[]> {
    if (page < 0) {
      page = 0;
    }
    if (limit < 1) {
      limit = 1;
    }
    return this.http.get<Album[]>(`${this.config.getAlbumsUrl()}?${AlbumDataService.createQueryString(page, limit)}`,
      { observe: 'response' }).pipe(
        map((response: HttpResponse<Album[]>) => {
          // const total = response.headers.get('x-total-count');
          return response.body.map(data => AlbumDataService.createAlbum(data));
        })
      );
  }
  /**
   * Gets album by id
   * @param id album's id
   */
  getAlbumById(id): Observable<Album> {
    return this.http.get<Album[]>(`${this.config.getAlbumsUrl()}?id=${id}`).pipe(
      map((datas: any[]) => datas != null && datas.length > 0 ? AlbumDataService.createAlbum(datas[0]) : null)
    );
  }
}
