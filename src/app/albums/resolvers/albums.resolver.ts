import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlbumState } from '../store/reducers';
import { LoadAlbumsAction } from '../store/actions';
import { createPagination } from 'src/app/shared/models/pagination.model';

/**
 * Service to resolve list of albums
 */
@Injectable()
export class AlbumsResolver implements Resolve<void> {
  constructor(
    private store: Store<AlbumState>
  ) {
  }

  /**
   * Resolves albums list.
   */
  resolve(route: ActivatedRouteSnapshot) {
    const page = +route.queryParamMap.get('page');
    const limit = +route.queryParamMap.get('limit');
    const pagination = createPagination(page - 1, limit);
    // Just send action into store. Does not wait completion of operation.
    this.store.dispatch(new LoadAlbumsAction(pagination.pageIndex, pagination.pageSize));
  }
}
