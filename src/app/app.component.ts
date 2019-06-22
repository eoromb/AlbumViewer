import { Component, Inject } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'albvwr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AlbumViewer';
  constructor(@Inject('TOASTER_CONFIG') public toasterConfig: ToasterConfig, private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}
