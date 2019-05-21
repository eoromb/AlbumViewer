import { PhotoComponent } from './photo.component';
import { PhotoViewModel } from 'src/app/albums/view-models/photo.view-model';

describe('PhotoComponent', () => {
  it('should emit click when on photo clicked', () => {
    const photoViewModel = {} as PhotoViewModel;
    const comp = new PhotoComponent();
    comp.photo = photoViewModel;
    const sub = comp.photoClicked.subscribe(photo => expect(photo).toBe(photoViewModel));
    comp.onClick();
    sub.unsubscribe();
  });
});
