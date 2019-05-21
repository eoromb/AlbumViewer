import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumState } from '../../../store/reducers';
import { LoadAlbumsAction } from '../../../store/actions';
import { getAlbums, getIsAlbumsLoaing } from '../../../store/selectors';
import { Subscription } from 'rxjs';
import { AlbumViewModel } from '../../../view-models/album.view-model';
import { PageEvent } from '@angular/material';
import { Pagination, getDefaultPagination } from 'src/app/albums/models/pagination.model';

/**
 * Component to show list of albums
 */
@Component({
  selector: 'albvwr-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy {
  /**
   * Pagination object
   */
  pagination: Pagination;
  /**
   * Albums to show
   */
  albums: AlbumViewModel[] = [];
  /**
   * If albums list is loading
   */
  isAlbumsLoading = false;
  private subsciptions: Subscription[] = [];

  constructor(private store: Store<AlbumState>) {
    this.pagination = getDefaultPagination();
  }

  ngOnInit() {
    this.subsciptions.push(this.store.select(getAlbums).subscribe(albums => this.albums = albums));
    this.subsciptions.push(this.store.select(getIsAlbumsLoaing).subscribe(isLoading => this.isAlbumsLoading = isLoading));
  }
  ngOnDestroy(): void {
    this.subsciptions.forEach(s => s.unsubscribe());
  }
  pageEvent(ev: PageEvent) {
    this.store.dispatch(new LoadAlbumsAction(ev.pageIndex, ev.pageSize));
  }
}
