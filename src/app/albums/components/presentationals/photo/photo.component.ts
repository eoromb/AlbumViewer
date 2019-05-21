import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewModel } from '../../../view-models/photo.view-model';

/**
 * Presentational component to show Photo
 */
@Component({
  selector: 'albvwr-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  /**
   * Photo to show
   */
  @Input() photo: PhotoViewModel;
  /**
   * Emitted on photo clicked
   */
  @Output() photoClicked: EventEmitter<PhotoViewModel> = new EventEmitter<PhotoViewModel>();
  constructor() { }

  onClick() {
    this.photoClicked.emit(this.photo);
  }
}
