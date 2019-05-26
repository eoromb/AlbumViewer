import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Album } from '../models/album.model';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { createPagination, correctPaginationParams } from 'src/app/shared/models/pagination.model';

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
  getAlbums(page, limit): Observable<PaginatedList<Album>> {
    const albumsUrl = this.config.getAlbumsUrl();
    const totalHeaderName = 'x-total-count';
    return this.http.head(`${albumsUrl}?${AlbumDataService.createQueryString(0, 1)}`,
      { observe: 'response' }).pipe(switchMap(response => {
        const total = response.headers.get(totalHeaderName);
        const {pageIndex, pageSize} = correctPaginationParams(page, limit, +total);
        return this.http.get<Album[]>(`${albumsUrl}?${AlbumDataService.createQueryString(pageIndex, pageSize)}`,
          { observe: 'response' }).pipe(
            map((response: HttpResponse<Album[]>) => {
              const total = response.headers.get(totalHeaderName);
              return createPaginatedList(response.body.map(data => AlbumDataService.createAlbum(data)), createPagination(pageIndex, pageSize, +total));
            })
          );
      }));
  }
  /**
   * Gets album by id
   * @param id album's id
   */
  getAlbumById(id): Observable<Album> {
    return this.http.get<Album[]>(`${this.config.getAlbumsUrl()}?id=${id}`, { observe: 'response' }).pipe(
      map((response: HttpResponse<Album[]>) => {
        const datas = response.body;
        return datas != null && datas.length > 0 ? AlbumDataService.createAlbum(datas[0]) : null;
      })
    );
  }
}
