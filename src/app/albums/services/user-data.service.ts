import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { User } from '../models/user.model';

/**
 * Service to operate wih user's API
 */
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
  }
  /**
   * Create users model from http response
   * @param data json http response from server
   */
  private static createUser(data: any): User {
    if (data == null) {
      return null;
    }
    return { ...data };
  }
  /**
   * Gets list of users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.config.getUsersUrl()).pipe(
      map((datas: any[]) => datas.map(data => UserDataService.createUser(data)))
    );
  }
}
