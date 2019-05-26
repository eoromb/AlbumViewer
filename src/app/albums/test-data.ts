import { User } from './models/user.model';
import { Album } from './models/album.model';
import { Photo } from './models/photo.model';
import { createPaginatedList } from 'src/app/shared/models/paginated-list.model';

/**
 * Data for testing
 */
export class TestData {
    static readonly user = { id: 1, username: 'UserName' } as User;
    static readonly users = [TestData.user];
    static readonly album = { id: 1, userId: 1, title: 'AlbumTitle' } as Album;
    static readonly albums = createPaginatedList([TestData.album]);
    static readonly photo = { id: 1, albumId: 1, title: 'PhotoTitle' } as Photo;
    static readonly photos = createPaginatedList([TestData.photo]);
    static readonly placeHolderUrl = 'someUrl';
    static createFeatureState(state) {
        return {
            album: state
        };
    }
}
