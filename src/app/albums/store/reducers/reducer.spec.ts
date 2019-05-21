import * as fromReducers from './index';
import {
    LoadAlbumsSuccessAction, LoadAlbumsAction, LoadAlbumsFailAction, LoadPhotosSuccessAction, LoadPhotosAction,
    LoadPhotosFailAction, SetCurrentAlbumSuccessAction, LoadConfigSuccessAction
} from '../actions';
import { Album } from '../../models/album.model';
import { getDefaultPagination } from '../../models/pagination.model';
import { Photo } from '../../models/photo.model';

const album = { id: 1, title: 'title' } as Album;
const albums = [album];
const photos = [{ id: 1, albumId: 1, title: 'title' } as Photo];
const pagination = getDefaultPagination();
const placeHolderUrl = 'someUrl';

/**
 * Reducers test
 */
describe('Reducer', () => {
    describe('General', () => {
        it('should return the default state', () => {
            const action = {};
            const state = fromReducers.reducer(undefined, action);
            expect(state).toBe(fromReducers.initialAlbumState);
        });
    });
    describe('Albums', () => {
        it('should set albums on LoadAlbumsSuccessAction', () => {
            const action = new LoadAlbumsSuccessAction(albums);
            const state = fromReducers.reducer(undefined, action);
            expect(state.albums).toBe(albums);
        });
        it('should set isAlbumLoading on LoadAlbumAction', () => {
            const action = new LoadAlbumsAction(pagination.pageIndex, pagination.pageSize);
            const state = fromReducers.reducer(undefined, action);
            expect(state.isAlbumsLoading).toBe(true);
        });
        it('should reset isAlbumLoading on LoadAlbumSuccessAction', () => {
            let state = fromReducers.reducer(undefined, new LoadAlbumsAction(pagination.pageIndex, pagination.pageSize));
            state = fromReducers.reducer(state, new LoadAlbumsSuccessAction([]));
            expect(state.isAlbumsLoading).toBe(false);
        });
        it('should reset isAlbumLoading on LoadAlbumFailAction', () => {
            let state = fromReducers.reducer(undefined, new LoadAlbumsAction(pagination.pageIndex, pagination.pageSize));
            state = fromReducers.reducer(state, new LoadAlbumsFailAction());
            expect(state.isAlbumsLoading).toBe(false);
        });
        it('should set current album', () => {
            const action = new SetCurrentAlbumSuccessAction(album);
            const state = fromReducers.reducer(undefined, action);
            expect(state.currentAlbum).toBe(album);
        });
    });
    describe('Photos', () => {
        it('should set photos on LoadPhotosSuccessAction', () => {
            const action = new LoadPhotosSuccessAction(photos);
            const state = fromReducers.reducer(undefined, action);
            expect(state.photos).toBe(photos);
        });
        it('should set isPhotoLoading on LoadPhotoAction', () => {
            const action = new LoadPhotosAction(pagination.pageIndex, pagination.pageSize);
            const state = fromReducers.reducer(undefined, action);
            expect(state.isPhotosLoading).toBe(true);
        });
        it('should reset isPhotoLoading on LoadPhotoSuccessAction', () => {
            let state = fromReducers.reducer(undefined, new LoadPhotosAction(pagination.pageIndex, pagination.pageSize));
            state = fromReducers.reducer(state, new LoadPhotosSuccessAction([]));
            expect(state.isPhotosLoading).toBe(false);
        });
        it('should reset isPhotoLoading on LoadPhotoFailAction', () => {
            let state = fromReducers.reducer(undefined, new LoadPhotosAction(pagination.pageIndex, pagination.pageSize));
            state = fromReducers.reducer(state, new LoadPhotosFailAction());
            expect(state.isPhotosLoading).toBe(false);
        });
    });
    describe('Config', () => {
        it('should set config', () => {
            const action = new LoadConfigSuccessAction(placeHolderUrl);
            const state = fromReducers.reducer(undefined, action);
            expect(state.config.placeHolderBaseUrl).toBe(placeHolderUrl);
        });
    });
});
