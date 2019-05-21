import { Component, Inject } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'albvwr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AlbumViewer';
  constructor(@Inject('TOASTER_CONFIG') public toasterConfig: ToasterConfig) {}
}
