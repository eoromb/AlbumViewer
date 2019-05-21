import { Component, Input } from '@angular/core';
import { AlbumViewModel } from '../../../view-models/album.view-model';

/**
 * Presentational component to show Album
 */
@Component({
  selector: 'albvwr-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

  /**
   * Album to show
   */
  @Input() album: AlbumViewModel;
  constructor() { }
}
