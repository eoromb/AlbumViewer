import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { Photo } from '../models/photo.model';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { createPagination, correctPaginationParams } from 'src/app/shared/models/pagination.model';

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
    return { ...data };
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
  getPhotos(albumId, page, limit): Observable<PaginatedList<Photo>> {
    const photoUrl = this.config.getPhotosUrl();
    const totalHeaderName = 'x-total-count';
    return this.http.head(`${photoUrl}?${PhotoDataService.createQueryString(albumId, 0, 1)}`,
      { observe: 'response' }).pipe(switchMap(response => {
        const total = response.headers.get(totalHeaderName);
        const { pageIndex, pageSize } = correctPaginationParams(page, limit, +total);
        return this.http.get<Photo[]>(`${this.config.getPhotosUrl()}?${PhotoDataService.createQueryString(albumId, pageIndex, pageSize)}`,
          { observe: 'response' }).pipe(
            map((response: HttpResponse<Photo[]>) => {
              const total = response.headers.get(totalHeaderName);
              return createPaginatedList(response.body.map(data => PhotoDataService.createPhoto(data)), createPagination(pageIndex, pageSize, +total));
            })
          );
      }));
  }
}
