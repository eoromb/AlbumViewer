import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { initialAlbumState, reducer } from '../reducers';
import {
    SetCurrentAlbumAction,
    LoadPhotosAction,
    LoadPhotosSuccessAction,
    SetCurrentAlbumSuccessAction
} from '../actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { cold, hot } from 'jasmine-marbles';
import { TestData } from '../../test-data';
import { PhotoDataService } from '../../services/photo-data.service';
import { PhotoEffects } from './photo.effects';

/**
 * Photo effects testing
 */
describe('Photo effects', () => {
    let actions$: Observable<any>;
    let mockStore: MockStore<any>;
    let effects: PhotoEffects;
    let photoDataService;

    describe('In case of no errors from data service', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    PhotoEffects,
                    { provide: NotificationService, useValue: jasmine.createSpyObj('NotificationService', ['showError']) },
                    {
                        provide: PhotoDataService, useValue: jasmine.createSpyObj('PhotoDataService', {
                            getPhotos: cold('a', { a: TestData.photos })
                        })
                    },
                    provideMockStore({ initialState: TestData.createFeatureState(initialAlbumState) }),
                    provideMockActions(() => actions$)
                ]
            });
            effects = TestBed.get(PhotoEffects);
            mockStore = TestBed.get(Store);
            photoDataService = TestBed.get(PhotoDataService);
        });
        describe('LoadPhotosAction', () => {
            it('should call data service', () => {
                mockStore.setState(TestData.createFeatureState(initialAlbumState));
                actions$ = hot('-a', { a: new LoadPhotosAction(TestData.album.id, 0, 20) });
                effects.loadPhotosEffect$.subscribe(() => expect(photoDataService.getPhotos).toHaveBeenCalledTimes(1));
            });
            it('should set current album if not set yet', () => {
                mockStore.setState(TestData.createFeatureState(initialAlbumState));
                actions$ = hot('-a', { a: new LoadPhotosAction(TestData.album.id, 0, 20) });
                const expected = cold('-(bc)', {
                    b: new SetCurrentAlbumAction(TestData.album.id),
                    c: new LoadPhotosSuccessAction(TestData.photos)
                });
                expect(effects.loadPhotosEffect$).toBeObservable(expected);
            });
            it('should not set current album if set already', () => {
                let state = initialAlbumState;
                state = reducer(state, new SetCurrentAlbumSuccessAction(TestData.album));
                mockStore.setState(TestData.createFeatureState(state));
                actions$ = hot('-a', { a: new LoadPhotosAction(TestData.album.id, 0, 20) });
                const expected = cold('-(b)', {
                    b: new LoadPhotosSuccessAction(TestData.photos)
                });
                expect(effects.loadPhotosEffect$).toBeObservable(expected);
            });
        });
    });
});
