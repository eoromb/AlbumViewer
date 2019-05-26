import { Injectable } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { withLatestFrom, switchMap, catchError, filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import {
    AlbumActionTypes, DoNothingAction, LoadAlbumsAction, LoadAlbumsSuccessAction, LoadConfigAction,
    SetCurrentAlbumAction, SetCurrentAlbumSuccessAction,
    LoadAllUsersAction,
    LoadAlbumsFailAction} from '../actions';
import { AlbumDataService } from '../../services/album-data.service';
import { AlbumState } from '../reducers';
import { getAlbumsRaw, getUsersRaw, getConfig } from '../selectors';

/**
 * Albums effects
 */
@Injectable()
export class AlbumEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AlbumState>,
        private notificationService: NotificationService,
        private albumDataService: AlbumDataService,
    ) {
    }
    /**
     * Loading the list of albums
     */
    @Effect()
    loadAlbumsEffect$: Observable<Action> = this.actions$.pipe(
        ofType<LoadAlbumsAction>(AlbumActionTypes.LOAD_ALBUMS),
        withLatestFrom(combineLatest(this.store.select(getUsersRaw), this.store.select(getConfig))),
        switchMap(([action, [usersRaw, config]]) => {
            const { page, limit } = action;
            return this.albumDataService.getAlbums(page, limit).pipe(
                switchMap(albums => [...this.getActionForLoadAlbums(usersRaw, config), new LoadAlbumsSuccessAction(albums)]),
                catchError(this.processError(`Unable to load albums.`, new LoadAlbumsFailAction()))
            );
        }),
        catchError(this.processError(`Unable to load albums.`, new LoadAlbumsFailAction()))
    );
    /**
     * Setting current album
     */
    @Effect()
    setCurrentAlbumEffects$ = this.actions$.pipe(
        ofType<SetCurrentAlbumAction>(AlbumActionTypes.SET_CURRENT_ALBUM),
        withLatestFrom(combineLatest(this.store.select(getAlbumsRaw), this.store.select(getUsersRaw), this.store.select(getConfig))),
        switchMap(([action, [albumsRaw, usersRaw, config]]) => {
            const { albumId } = action;
            const existingAlbum = albumsRaw.items.find(a => a.id === albumId);
            if (albumId === -1) {
                return of(new SetCurrentAlbumSuccessAction(null));
            }
            return (existingAlbum != null ? of(existingAlbum) : this.albumDataService.getAlbumById(albumId)).pipe(
                switchMap((album) => [...this.getActionForLoadAlbums(usersRaw, config), new SetCurrentAlbumSuccessAction(album)]),
                catchError(this.processError(`Unable to set current album.`))
            );
        }),
        catchError(this.processError(`Unable to set current album.`))
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
    private getActionForLoadAlbums(usersRaw, config) {
        const resultActions: Action[] = [];
        if (usersRaw == null || usersRaw.length === 0) {
            resultActions.push(new LoadAllUsersAction());
        }
        if (config == null) {
            resultActions.push(new LoadConfigAction());
        }
        return resultActions;
    }
}
