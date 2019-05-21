import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Photo } from '../models/photo.model';

/**
 * Service to operate wih photo's API
 */
@Injectable({
  providedIn: 'root'
})
export class PhotoDataService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }
  /**
   * Creates Photo model from http resonse
   * @param data json http resonse from server
   */
  private static createPhoto(data: any): Photo {
    if (data == null) {
      return null;
    }
    return {...data};
  }
  /**
   * Creates query string to get paginated list of album's photo
   * @param albumId album id to get photo of
   * @param page page
   * @param limit limit
   */
  private static createQueryString(albumId, page, limit) {
    const start = limit * page;
    return `albumId=${albumId}&_start=${start}&_limit=${limit}`;
  }
  /**
   * Gets paginated list of album's photos
   * @param albumId album's id
   * @param page page
   * @param limit limit
   */
  getPhotos(albumId, page, limit): Observable<Photo[]> {
    if (page < 0) {
      page = 0;
    }
    if (limit < 1) {
      limit = 1;
    }
    return this.http.get<Photo[]>(`${this.config.getPhotosUrl()}?${PhotoDataService.createQueryString(albumId, page, limit)}`).pipe(
      map((datas: any[]) => datas.map(data => PhotoDataService.createPhoto(data)))
    );
  }
}
