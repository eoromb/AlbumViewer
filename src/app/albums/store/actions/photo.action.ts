import { Action } from '@ngrx/store';
import { Photo } from '../../models/photo.model';

export enum PhotoActionTypes {
    LOAD_PHOTOS = '[Albums] Load photos',
    LOAD_PHOTOS_SUCCESS = '[Albums] Load photos success',
    LOAD_PHOTOS_FAIL = '[Albums] Load photos fail'
}
export class LoadPhotosAction implements Action {
    readonly type = PhotoActionTypes.LOAD_PHOTOS;
    constructor(public albumId: number, public page: number = 0, public limit: number = 20) {
    }
}
export class LoadPhotosSuccessAction implements Action {
    readonly type = PhotoActionTypes.LOAD_PHOTOS_SUCCESS;
    constructor(public photos: Photo[]) {
    }
}
export class LoadPhotosFailAction implements Action {
    readonly type = PhotoActionTypes.LOAD_PHOTOS_FAIL;
    constructor() {
    }
}
export type PhotoActions =  LoadPhotosAction
    | LoadPhotosSuccessAction
    | LoadPhotosFailAction;

