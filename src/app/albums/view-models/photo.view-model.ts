import { Photo } from '../models/photo.model';
import { AlbumViewModel } from './album.view-model';

const getAlbumTitle = (album: AlbumViewModel|null) => album != null ? album.title : 'none';
const getAlbumOwner = (album: AlbumViewModel|null) => album != null ? album.ownerName : 'unknown';

/**
 * Photo view model
 */
export interface PhotoViewModel extends Photo {
    ownerName?: string;
    albumTitle?: string;
}
/**
 * Creates photo view model
 * @param photo photo model
 * @param albumViewModel album view model to take owner name and album title from
 */
export function createPhotoViewModel(photo: Photo, albumViewModel: AlbumViewModel): PhotoViewModel {
    return { ...photo, ownerName: getAlbumOwner(albumViewModel), albumTitle: getAlbumTitle(albumViewModel) };
}

