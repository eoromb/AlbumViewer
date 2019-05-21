import { createSelector } from '@ngrx/store';
import { ConfigState, getAlbumState } from '../reducers';
import { AlbumViewModel, createAlbumViewModel } from '../../view-models/album.view-model';
import { User } from '../../models/user.model';
import { PhotoViewModel, createPhotoViewModel } from '../../view-models/photo.view-model';

const getPlaceHolderBaseUrl = (config?: ConfigState) => config != null ? config.placeHolderBaseUrl : null;

/**
 * Gets user models list
 */
export const getUsersRaw = createSelector(getAlbumState, state => state.users);
/**
 * Gets user-by-usreid map
 */
export const getUserIdUserMap = createSelector(getUsersRaw, users => {
    const usersMap = new Map<number, User>();
    users.forEach(u => usersMap.set(u.id, u));
    return usersMap;
});
/**
 * Gets album modeles list
 */
export const getAlbumsRaw = createSelector(getAlbumState, state => state.albums);
/**
 * Gets config object
 */
export const getConfig = createSelector(getAlbumState, state => state.config);
/**
 * Gets album view models list
 */
export const getAlbums = createSelector(getAlbumsRaw, getConfig, getUserIdUserMap, (albums, config, usersMap): AlbumViewModel[] => {
    const placeHolderBaseUrl = getPlaceHolderBaseUrl(config);
    return albums.map(album => {
        const user = usersMap.get(album.userId);
        return createAlbumViewModel(album, user, placeHolderBaseUrl);
    });
});
/**
 * Gets photo models list
 */
export const getPhotosRaw = createSelector(getAlbumState, state => state.photos);
/**
 * Gets selected album model
 */
export const getCurrentAlbumRaw = createSelector(getAlbumState, state => state.currentAlbum);
/**
 * Gets selected album view model
 */
export const getCurrentAlbum = createSelector(getCurrentAlbumRaw, getConfig, getUserIdUserMap,
    (album, config, usersMap): AlbumViewModel => {
        if (album == null) {
            return null;
        }
        const placeHolderBaseUrl = getPlaceHolderBaseUrl(config);
        const user = usersMap.get(album.userId);
        return createAlbumViewModel(album, user, placeHolderBaseUrl);
    });
/**
 * Gets photo view models list
 */
export const getPhotos = createSelector(getPhotosRaw, getCurrentAlbum, getUserIdUserMap, (photos, album, usersMap): PhotoViewModel[] => {
    return photos.map(photo => {
        return createPhotoViewModel(photo, album);
    });
});
/**
 * Gets if photos is loading
 */
export const getIsPhotoLoading = createSelector(getAlbumState, state => state.isPhotosLoading);
/**
 * Gets if albums is loading
 */
export const getIsAlbumsLoaing = createSelector(getAlbumState, state => state.isAlbumsLoading);
