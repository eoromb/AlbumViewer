import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Gets access to configuration parameters
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiBaseUrl = `${environment.apiUrl}`;
  private placeHolderBaseUrl = `${environment.placeHolderUrl}`;
  constructor() {
  }
  public getUsersUrl() {
    return `${this.apiBaseUrl}/users`;
  }
  public getPhotosUrl() {
    return `${this.apiBaseUrl}/photos`;
  }
  public getAlbumsUrl() {
    return `${this.apiBaseUrl}/albums`;
  }
  public getPlaceHolderUrl() {
    return this.placeHolderBaseUrl;
  }
}
