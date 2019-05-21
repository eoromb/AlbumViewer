import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AlbumsRoutingModule } from './albums-routing.module';
import * as reducers from './store/reducers';
import { AlbumsListComponent } from './components/containers/albums-list/albums-list.component';
import { PhotosListComponent } from './components/containers/photos-list/photos-list.component';
import { effects } from './store/effects';
import { AlbumComponent } from './components/presentationals/album/album.component';
import { MatPaginatorModule, MatDialogModule, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { PhotoComponent } from './components/presentationals/photo/photo.component';
import { PhotoDetailComponent } from './components/presentationals/photo-detail/photo-detail.component';
import { PhotosResolver } from './resolvers/photos.resolver';
import { SharedModule } from '../shared/shared.module';
import { AlbumsResolver } from './resolvers/albums.resolver';

/**
 * Feature module for albums
 */
@NgModule({
  declarations: [AlbumsListComponent, AlbumComponent, PhotosListComponent, PhotoComponent, PhotoDetailComponent],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('album', reducers.reducer),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  providers: [PhotosResolver, AlbumsResolver],
  entryComponents: [
    PhotoDetailComponent
  ],
})
export class AlbumsModule { }
