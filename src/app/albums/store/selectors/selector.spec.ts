import {
    LoadAllUsersSuccessAction, LoadConfigSuccessAction, LoadAlbumsSuccessAction, SetCurrentAlbumSuccessAction,
    LoadPhotosSuccessAction
} from '../actions';
import * as fromReducers from '../reducers';
import { getUsersRaw, getAlbums, getPhotos, getAlbumsRaw } from './selector';
import { AlbumViewModel } from '../../view-models/album.view-model';
import { PhotoViewModel } from '../../view-models/photo.view-model';
import { TestData } from '../../test-data';

/**
 * Selectors tests
 */
describe('Selector', () => {
    let featureState;
    beforeEach(() => {
        let state = fromReducers.reducer(undefined, new LoadConfigSuccessAction(TestData.placeHolderUrl));
        state = fromReducers.reducer(state, new LoadAllUsersSuccessAction(TestData.users));
        state = fromReducers.reducer(state, new LoadAlbumsSuccessAction(TestData.albums));
        state = fromReducers.reducer(state, new SetCurrentAlbumSuccessAction(TestData.album));
        state = fromReducers.reducer(state, new LoadPhotosSuccessAction(TestData.photos));
        featureState = TestData.createFeatureState(state);
    });
    describe('User', () => {
        it('should select users', () => {
            expect(getUsersRaw(featureState)).toEqual(TestData.users);
        });
    });
    describe('Album', () => {
        it('should select albums', () => {
            expect(getAlbumsRaw(featureState)).toEqual(TestData.albums);
        });
    });
    describe('Album view model', () => {
        let albumViewModel: AlbumViewModel;
        beforeAll(() => {
            const albumsViewModels = getAlbums(featureState).items;
            expect(albumsViewModels.length).toBe(1);
            albumViewModel = albumsViewModels[0];
        });
        it('should have correct user name', () => {
            expect(albumViewModel.ownerName).toBe(TestData.user.username);
        });
        it('should have correct cover image url', () => {
            expect(albumViewModel.coverImageUrl).toContain(TestData.placeHolderUrl);
        });
    });
    describe('Photo view model', () => {
        let photoViewModel: PhotoViewModel;
        beforeAll(() => {
            const photosViewModels = getPhotos(featureState).items;
            expect(photosViewModels.length).toBe(1);
            photoViewModel = photosViewModels[0];
        });
        it('should have user name', () => {
            expect(photoViewModel.ownerName).toBe(TestData.user.username);
        });
        it('should have album title', () => {
            expect(photoViewModel.albumTitle).toContain(TestData.album.title);
        });
    });
});
