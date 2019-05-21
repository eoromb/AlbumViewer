import { HttpErrorResponse } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AlbumEffects } from './album.effects';
import { initialAlbumState, reducer } from '../reducers';
import {
    LoadAlbumsAction, LoadConfigAction, LoadAllUsersAction, LoadAlbumsSuccessAction, LoadConfigSuccessAction,
    LoadAllUsersSuccessAction,
    SetCurrentAlbumAction,
    SetCurrentAlbumSuccessAction,
    LoadAlbumsFailAction,
    DoNothingAction
} from '../actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AlbumDataService } from '../../services/album-data.service';
import { cold, hot } from 'jasmine-marbles';
import { TestData } from '../../test-data';

/**
 * Album effects testing
 */
describe('Album effects', () => {
    let actions$: Observable<any>;
    let mockStore: MockStore<any>;
    let effects: AlbumEffects;
    let albumDataService;
    let notificationService;

    describe('In case of no errors from data service', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    AlbumEffects,
                    { provide: NotificationService, useValue: jasmine.createSpyObj('NotificationService', ['showError']) },
                    {
                        provide: AlbumDataService, useValue: jasmine.createSpyObj('AlbumDataService', {
                            getAlbums: cold('a', { a: TestData.albums }),
                            getAlbumById: cold('a', { a: TestData.album })
                        })
                    },
                    provideMockStore({ initialState: TestData.createFeatureState(initialAlbumState) }),
                    provideMockActions(() => actions$)
                ]
            });
            effects = TestBed.get(AlbumEffects);
            mockStore = TestBed.get(Store);
            albumDataService = TestBed.get(AlbumDataService);
        });
        describe('LoadAlbumsAction', () => {
            it('should load user and config if were not loaded on albums loading', () => {
                mockStore.setState(TestData.createFeatureState(initialAlbumState));
                actions$ = hot('-a', { a: new LoadAlbumsAction(0, 20) });
                const expected = cold('-(bcd)', {
                    b: new LoadAllUsersAction(), c: new LoadConfigAction(),
                    d: new LoadAlbumsSuccessAction(TestData.albums)
                });
                expect(effects.loadAlbumsEffect$).toBeObservable(expected);
            });
            it('should load user if was not loaded on albums loading', () => {
                let state = initialAlbumState;
                state = reducer(state, new LoadConfigSuccessAction(TestData.placeHolderUrl));
                mockStore.setState(TestData.createFeatureState(state));
                actions$ = hot('-a', { a: new LoadAlbumsAction(0, 20) });
                const expected = cold('-(bc)', { b: new LoadAllUsersAction(), c: new LoadAlbumsSuccessAction(TestData.albums) });
                expect(effects.loadAlbumsEffect$).toBeObservable(expected);
            });
            it('should not load user and config if were loaded on albums loading', () => {
                let state = initialAlbumState;
                state = reducer(state, new LoadConfigSuccessAction(TestData.placeHolderUrl));
                state = reducer(state, new LoadAllUsersSuccessAction(TestData.users));
                mockStore.setState(TestData.createFeatureState(state));
                actions$ = hot('-a', { a: new LoadAlbumsAction(0, 20) });
                const expected = cold('-(b)', { b: new LoadAlbumsSuccessAction(TestData.albums) });
                expect(effects.loadAlbumsEffect$).toBeObservable(expected);
            });
        });
        describe('SetCurrentAlbumAction', () => {
            it('should call album data service if album not loaded', () => {
                const state = initialAlbumState;
                mockStore.setState(TestData.createFeatureState(state));
                actions$ = hot('-a', { a: new SetCurrentAlbumAction(TestData.album.id) });
                effects.setCurrentAlbumEffects$.subscribe(() => expect(albumDataService.getAlbumById).toHaveBeenCalledTimes(1));
            });
            it('should not call album data serivce if album already loaded', () => {
                let state = initialAlbumState;
                state = reducer(state, new LoadAlbumsSuccessAction(TestData.albums));
                mockStore.setState(TestData.createFeatureState(state));
                actions$ = hot('-a', { a: new SetCurrentAlbumAction(TestData.album.id) });
                effects.setCurrentAlbumEffects$.subscribe(() => expect(albumDataService.getAlbumById).toHaveBeenCalledTimes(0));
            });
            it('should load user and config if were not loaded on set current album', () => {
                let state = initialAlbumState;
                state = reducer(state, new LoadAlbumsSuccessAction(TestData.albums));
                actions$ = hot('-a', { a: new SetCurrentAlbumAction(TestData.album.id) });
                const expected = cold('-(bcd)', {
                    b: new LoadAllUsersAction(),
                    c: new LoadConfigAction(),
                    d: new SetCurrentAlbumSuccessAction(TestData.album)
                });
                expect(effects.setCurrentAlbumEffects$).toBeObservable(expected);
            });
            it('should load user if was not loaded on set current album', () => {
                let state = initialAlbumState;
                state = reducer(state, new LoadAlbumsSuccessAction(TestData.albums));
                state = reducer(state, new LoadConfigSuccessAction(TestData.placeHolderUrl));
                mockStore.setState(TestData.createFeatureState(reducer(initialAlbumState,
                    new LoadConfigSuccessAction(TestData.placeHolderUrl))));
                actions$ = hot('-a', { a: new SetCurrentAlbumAction(TestData.album.id) });
                const expected = cold('-(bc)', { b: new LoadAllUsersAction(), c: new SetCurrentAlbumSuccessAction(TestData.album) });
                expect(effects.setCurrentAlbumEffects$).toBeObservable(expected);
            });
        });
    });
    describe('In case of erros from data service', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    AlbumEffects,
                    { provide: NotificationService, useValue: jasmine.createSpyObj('NotificationService', ['showError']) },
                    {
                        provide: AlbumDataService, useValue: jasmine.createSpyObj('AlbumDataService', {
                            getAlbums: cold('#', null, new HttpErrorResponse({})),
                            getAlbumById: cold('#', null, new HttpErrorResponse({}))
                        })
                    },
                    provideMockStore({ initialState: TestData.createFeatureState(initialAlbumState) }),
                    provideMockActions(() => actions$)
                ]
            });
            effects = TestBed.get(AlbumEffects);
            mockStore = TestBed.get(Store);
            albumDataService = TestBed.get(AlbumDataService);
            notificationService = TestBed.get(NotificationService);
        });
        describe('LoadAlbumsAction', () => {
            it('should call notification showError', () => {
                mockStore.setState(TestData.createFeatureState(initialAlbumState));
                actions$ = hot('-a', { a: new LoadAlbumsAction(0, 20) });
                const expected = cold('-(b)', {
                    b: new LoadAlbumsFailAction()
                });
                expect(effects.loadAlbumsEffect$).toBeObservable(expected);
                expect(notificationService.showError).toHaveBeenCalledTimes(1);
            });
        });
        describe('SetCurrentAlbumAction', () => {
            it('should call notification showError', () => {
                mockStore.setState(TestData.createFeatureState(initialAlbumState));
                actions$ = hot('-a', { a: new SetCurrentAlbumAction(TestData.album.id) });
                const expected = cold('-(b)', {
                    b: new DoNothingAction()
                });
                expect(effects.setCurrentAlbumEffects$).toBeObservable(expected);
                expect(notificationService.showError).toHaveBeenCalledTimes(1);
            });
        });
    });
});
