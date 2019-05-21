import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhotoViewModel } from '../../../view-models/photo.view-model';

/**
 * Presentational componet to show photo detail. Is used in popup dialog.
 */
@Component({
  selector: 'albvwr-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent {
  /**
   * Photo to show detail of
   */
  photo: PhotoViewModel;
  constructor(
    public dialogRef: MatDialogRef<PhotoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.photo = data.photo;
  }
}
