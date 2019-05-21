import { DoNothingAction, AlbumActionTypes } from './album.action';

/**
 * Albums actions tests
 */
describe('Album actions', () => {
    it ('should create do nothin action', () => {
        const action = new DoNothingAction();
        expect(action.type).toEqual(AlbumActionTypes.DO_NOTHING);
    });
});
