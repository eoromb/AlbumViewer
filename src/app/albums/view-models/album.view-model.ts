import { Album } from '../models/album.model';
import { User } from '../models/user.model';

const getUserName = (user?: User) => user != null ? user.username : 'unknown';
const getAlbumCoverImageUrl = (user?: User, placeHolderBaseUrl?: string) => {
    if (placeHolderBaseUrl == null || user == null) {
        return null;
    }
    // Just invented color generation algorithm
    const r = (user.id * 17 % 256).toString(16);
    const g = (user.id * 43 % 256).toString(16);
    const b = (user.id * 67 % 256).toString(16);
    return `${placeHolderBaseUrl}/${r}${g}${b}`;
};

/**
 * Album view model
 */
export interface AlbumViewModel extends Album {
    ownerName?: string;
    coverImageUrl?: string;
}
/**
 * Creates album view model
 * @param album album model
 * @param user user model
 * @param placeHolderBaseUrl url for album cover
 */
export function createAlbumViewModel(album: Album, user: User|null, placeHolderBaseUrl: string) {
     return { ...album, ownerName: getUserName(user), coverImageUrl: getAlbumCoverImageUrl(user, placeHolderBaseUrl) };
}
