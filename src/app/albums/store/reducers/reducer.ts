import { User } from '../../models/user.model';
import { Album } from '../../models/album.model';
import { Photo } from '../../models/photo.model';
import {
  AlbumActionTypes, UserActionTypes, ConfigActionTypes,
  PhotoActionTypes
} from '../actions';
import { createFeatureSelector } from '@ngrx/store';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';

/**
 * Configuration state
 */
export interface ConfigState {
  placeHolderBaseUrl?: string;
}
/**
 * Album feature state
 */
export interface AlbumState {
  users: User[];
  albums: PaginatedList<Album>;
  photos: PaginatedList<Photo>;
  currentAlbum?: Album;
  config: ConfigState;
  isAlbumsLoading: boolean;
  isPhotosLoading: boolean;
}
export const initialAlbumState: AlbumState = {
  users: [],
  albums: createPaginatedList([]),
  photos: createPaginatedList([]),
  currentAlbum: null,
  config: null,
  isAlbumsLoading: false,
  isPhotosLoading: false
};


/**
 * Album state reducer. User only one reducer for album feature
 * @param state album state
 * @param action action
 */
export function reducer(state: AlbumState = initialAlbumState, action) {
  switch (action.type) {
    case AlbumActionTypes.SET_CURRENT_ALBUM_SUCCESS:
      return { ...state, currentAlbum: action.album, photos: action.album == null ? createPaginatedList([]) : state.photos };
    case AlbumActionTypes.LOAD_ALBUMS:
      return { ...state, isAlbumsLoading: true };
    case AlbumActionTypes.LOAD_ALBUMS_SUCCESS:
      return { ...state, albums: action.albums, isAlbumsLoading: false };
    case AlbumActionTypes.LOAD_ALBUMS_FAIL:
      return { ...state, isAlbumsLoading: false };
    case ConfigActionTypes.LOAD_CONFIG_SUCCESS:
      return { ...state, config: { placeHolderBaseUrl: action.placeHolderUrl } };
    case PhotoActionTypes.LOAD_PHOTOS:
      return { ...state, isPhotosLoading: true };
    case PhotoActionTypes.LOAD_PHOTOS_SUCCESS:
      return { ...state, photos: action.photos, isPhotosLoading: false };
    case PhotoActionTypes.LOAD_PHOTOS_FAIL:
      return { ...state, photos: createPaginatedList([]), isPhotosLoading: false };
    case UserActionTypes.LOAD_ALL_USERS_SUCCESS:
      return { ...state, users: action.users };
    default:
      return state;
  }
}

/**
 * Album feature selecton
 */
export const getAlbumState = createFeatureSelector<AlbumState>('album');
