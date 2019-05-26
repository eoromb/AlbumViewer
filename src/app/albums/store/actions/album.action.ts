import { Action } from '@ngrx/store';
import { Album } from '../../models/album.model';
import { PaginatedList } from 'src/app/shared/models/paginated-list.model';

export enum AlbumActionTypes {
    DO_NOTHING = '[Albums] Do nothing',
    SET_CURRENT_ALBUM = '[Albums] Set current album',
    SET_CURRENT_ALBUM_SUCCESS = '[Albums] Set current album success',
    LOAD_ALBUMS = '[Albums] Load albums',
    LOAD_ALBUMS_SUCCESS = '[Albums] Load albums succeed',
    LOAD_ALBUMS_FAIL = '[Albums] Load albums failed'
}
/**
 * Do nothing aciton
 */
export class DoNothingAction implements Action {
    readonly type = AlbumActionTypes.DO_NOTHING;
}
export class SetCurrentAlbumAction implements Action {
    readonly type = AlbumActionTypes.SET_CURRENT_ALBUM;
    constructor(public albumId: number) {
    }
}
export class SetCurrentAlbumSuccessAction implements Action {
    readonly type = AlbumActionTypes.SET_CURRENT_ALBUM_SUCCESS;
    constructor(public album: Album) {
    }
}
export class LoadAlbumsAction implements Action {
    readonly type = AlbumActionTypes.LOAD_ALBUMS;
    constructor(public page: number, public limit: number) {
    }
}
export class LoadAlbumsSuccessAction implements Action {
    readonly type = AlbumActionTypes.LOAD_ALBUMS_SUCCESS;
    constructor(public albums: PaginatedList<Album>) {
    }
}
export class LoadAlbumsFailAction implements Action {
    readonly type = AlbumActionTypes.LOAD_ALBUMS_FAIL;
}
export type AlbumActions = LoadAlbumsAction
    | LoadAlbumsSuccessAction
    | LoadAlbumsFailAction
    | SetCurrentAlbumAction
    | SetCurrentAlbumSuccessAction
    | DoNothingAction;

