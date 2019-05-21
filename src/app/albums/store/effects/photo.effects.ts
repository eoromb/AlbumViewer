import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { withLatestFrom, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import {
    DoNothingAction, LoadPhotosAction, LoadPhotosSuccessAction, SetCurrentAlbumAction, LoadPhotosFailAction, PhotoActionTypes
} from '../actions';
import { PhotoDataService } from '../../services/photo-data.service';
import { AlbumState } from '../reducers';
import { getCurrentAlbumRaw } from '../selectors';

/**
 * Photo effects
 */
@Injectable()
export class PhotoEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AlbumState>,
        private notificationService: NotificationService,
        private photoDataService: PhotoDataService,
    ) {
    }
    /**
     * Loading the list of photo
     */
    @Effect()
    loadPhotosEffect$: Observable<Action> = this.actions$.pipe(
        ofType<LoadPhotosAction>(PhotoActionTypes.LOAD_PHOTOS),
        withLatestFrom(this.store.select(getCurrentAlbumRaw)),
        switchMap(([action, currentAlbum]) => {
            const { albumId, page, limit } = action;
            return this.photoDataService.getPhotos(albumId, page, limit).pipe(
                switchMap(photos => [...this.getActionForLoadPhotos(currentAlbum, albumId), new LoadPhotosSuccessAction(photos)]),
                catchError(this.processError(`Unable to load photos.`, new LoadPhotosFailAction()))
            );
        }),
        catchError(this.processError(`Unable to load photos.`, new LoadPhotosFailAction()))
    );
    private processError(message, action?: Action) {
        return (error) => {
            if (error instanceof HttpErrorResponse && error.status === 400 && error.error && Array.isArray(error.error.errors)) {
                this.notificationService.showErrors(message, error.error.errors);
            } else {
                this.notificationService.showError(message, '');
            }
            return action != null ? of(action) : of(new DoNothingAction());
        };
    }
    /**
     * Gets list of action to load photos
     * @param currentAlbum the last current album
     * @param albumId new current album id
     */
    private getActionForLoadPhotos(currentAlbum, albumId) {
        const resultActions = [];
        if (currentAlbum == null || currentAlbum.id !== albumId) {
            resultActions.push(new SetCurrentAlbumAction(albumId));
        }
        return resultActions;
    }
}
