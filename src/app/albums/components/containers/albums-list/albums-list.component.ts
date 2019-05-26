import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumState } from '../../../store/reducers';
import { getAlbums, getIsAlbumsLoaing } from '../../../store/selectors';
import { Subscription } from 'rxjs';
import { AlbumViewModel } from '../../../view-models/album.view-model';
import { PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';

/**
 * Component to show list of albums
 */
@Component({
  selector: 'albvwr-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy {

  private _paginatedAlbums: PaginatedList<AlbumViewModel> = createPaginatedList([]);
  /**
   * Albums to show
   */
  get albums() {
    return this._paginatedAlbums.items;
  }
  /**
   * Pagination object
   */
  get pagination() {
    return this._paginatedAlbums.pagination;
  }
  /**
   * If albums list is loading
   */
  isAlbumsLoading = false;
  private subsciptions: Subscription[] = [];

  constructor(private store: Store<AlbumState>, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subsciptions.push(this.store.select(getAlbums).subscribe(albums => this._paginatedAlbums = albums));
    this.subsciptions.push(this.store.select(getIsAlbumsLoaing).subscribe(isLoading => this.isAlbumsLoading = isLoading));
  }
  ngOnDestroy(): void {
    this.subsciptions.forEach(s => s.unsubscribe());
  }
  pageEvent(ev: PageEvent) {
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { page: ev.pageIndex + 1, limit: ev.pageSize } });
  }
}
