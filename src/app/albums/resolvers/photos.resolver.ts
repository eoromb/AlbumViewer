import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AlbumState } from '../store/reducers';
import { LoadPhotosAction } from '../store/actions';
import { createPagination } from 'src/app/shared/models/pagination.model';

/**
 * Service to resolve list of photos
 */
@Injectable()
export class PhotosResolver implements Resolve<void> {
  constructor(
    private store: Store<AlbumState>
  ) { }

  /**
   * Resolves photos list based on 'id' query params.
   */
  resolve(route: ActivatedRouteSnapshot) {
    const id = +route.paramMap.get('id');
    const page = +route.queryParamMap.get('page');
    const limit = +route.queryParamMap.get('limit');
    const pagination = createPagination(page - 1, limit);
    // Just send action into store. Does not wait completion of operation.
    this.store.dispatch(new LoadPhotosAction(id, pagination.pageIndex, pagination.pageSize));
  }
}
