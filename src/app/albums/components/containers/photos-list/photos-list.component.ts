import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoViewModel } from '../../../view-models/photo.view-model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AlbumState } from '../../../store/reducers';
import { LoadPhotosAction, SetCurrentAlbumAction } from '../../../store/actions';
import { getPhotos, getCurrentAlbum, getIsPhotoLoading } from '../../../store/selectors';
import { PageEvent, MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AlbumViewModel } from '../../../view-models/album.view-model';
import { PhotoDetailComponent } from '../../presentationals/photo-detail/photo-detail.component';
import { Pagination, getDefaultPagination } from 'src/app/albums/models/pagination.model';

/**
 * Component to show list ofalbum's photos
 */
@Component({
  selector: 'albvwr-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit, OnDestroy {
  /**
   * Pagination object
   */
  pagination: Pagination;
  /**
   * Photos to show
   */
  photos: PhotoViewModel[] = [];
  /**
   * Current album
   */
  currentAlbum: AlbumViewModel|null = null;
  /**
   * If photo list is loading
   */
  isPhotosLoading = false;
  private currentAlbumId = -1;
  private subsciptions: Subscription[] = [];

  constructor(private store: Store<AlbumState>, private route: ActivatedRoute, public dialog: MatDialog) {
    this.pagination = getDefaultPagination();
    this.currentAlbumId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.subsciptions.push(this.store.select(getCurrentAlbum).subscribe(album => this.currentAlbum = album));
    this.subsciptions.push(this.store.select(getPhotos).subscribe(photos => this.photos = photos));
    this.subsciptions.push(this.store.select(getIsPhotoLoading).subscribe(isLoading => this.isPhotosLoading = isLoading));
  }
  ngOnDestroy(): void {
    this.store.dispatch(new SetCurrentAlbumAction(-1));
    this.subsciptions.forEach(s => s.unsubscribe());
  }
  pageEvent(ev: PageEvent) {
    this.store.dispatch(new LoadPhotosAction(this.currentAlbumId, ev.pageIndex, ev.pageSize));
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
