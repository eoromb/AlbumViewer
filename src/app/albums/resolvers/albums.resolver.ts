import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlbumState } from '../store/reducers';
import { LoadAlbumsAction } from '../store/actions';
import { getDefaultPagination } from '../models/pagination.model';

/**
 * Service to resolve list of albums
 */
@Injectable()
export class AlbumsResolver implements Resolve<void> {
  constructor(
    private store: Store<AlbumState>
  ) { }

  /**
   * Resolves albums list.
   */
  resolve() {
    const pagination = getDefaultPagination();
    // Just send action into store. Does not wait completion of operation.
    this.store.dispatch(new LoadAlbumsAction(pagination.pageIndex, pagination.pageSize));
  }
}
