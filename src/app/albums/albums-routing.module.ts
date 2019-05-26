import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from './components/containers/albums-list/albums-list.component';
import { PhotosListComponent } from './components/containers/photos-list/photos-list.component';
import { PhotosResolver } from './resolvers/photos.resolver';
import { AlbumsResolver } from './resolvers/albums.resolver';

const routes: Routes = [
  { path: '', component: AlbumsListComponent, resolve: { data: AlbumsResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
  { path: ':id', component: PhotosListComponent, resolve: { data: PhotosResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule { }
