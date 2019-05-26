import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoViewModel } from '../../../view-models/photo.view-model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AlbumState } from '../../../store/reducers';
import { SetCurrentAlbumAction } from '../../../store/actions';
import { getPhotos, getCurrentAlbum, getIsPhotoLoading } from '../../../store/selectors';
import { PageEvent, MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumViewModel } from '../../../view-models/album.view-model';
import { PhotoDetailComponent } from '../../presentationals/photo-detail/photo-detail.component';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';

/**
 * Component to show list ofalbum's photos
 */
@Component({
  selector: 'albvwr-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit, OnDestroy {
  private _photos: PaginatedList<PhotoViewModel> = createPaginatedList([]);
  /**
   * Photos to show
   */
  get photos(): PhotoViewModel[] {
    return this._photos.items;
  };
  /**
   * Pagination object
   */
  get pagination(): Pagination {
    return this._photos.pagination;
  }
  /**
   * Current album
   */
  currentAlbum: AlbumViewModel | null = null;
  /**
   * If photo list is loading
   */
  isPhotosLoading = false;
  private subsciptions: Subscription[] = [];

  constructor(private store: Store<AlbumState>, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.subsciptions.push(this.store.select(getCurrentAlbum).subscribe(album => this.currentAlbum = album));
    this.subsciptions.push(this.store.select(getPhotos).subscribe(photos => this._photos = photos));
    this.subsciptions.push(this.store.select(getIsPhotoLoading).subscribe(isLoading => this.isPhotosLoading = isLoading));
  }
  ngOnDestroy(): void {
    this.store.dispatch(new SetCurrentAlbumAction(-1));
    this.subsciptions.forEach(s => s.unsubscribe());
  }
  pageEvent(ev: PageEvent) {
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { page: ev.pageIndex + 1, limit: ev.pageSize } });
  }
  /**
   * Opens phot's  detail popup dialog
   * @param photo photo to show in popup dialog
   */
  openDialog(photo: PhotoViewModel): void {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    };
    this.dialog.open(PhotoDetailComponent, { ...dialogConfig, data: { photo } });
  }
  onPhotoClicked(photo: PhotoViewModel) {
    this.openDialog(photo);
  }
}
