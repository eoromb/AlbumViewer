import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AlbumComponent } from './album.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AlbumsListComponent } from '../../containers/albums-list/albums-list.component';
import {
  MatProgressSpinnerModule, MatPaginatorModule, MatListModule, MatButtonModule, MatToolbarModule, MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';
import { AlbumViewModel } from 'src/app/albums/view-models/album.view-model';

/**
 * Album components test
 */
describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let location: Location;
  const albumViewModel = { id: 1, title: 'title', ownerName: 'owner name', coverImageUrl: 'coverUrl' } as AlbumViewModel;
  const albumsPath = 'albums';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumComponent, AlbumsListComponent, LayoutComponent],
      imports: [
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        RouterTestingModule.withRoutes([{ path: `${albumsPath}/:id}`, component: AlbumsListComponent }])
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    location = TestBed.get(Location);

    component = fixture.componentInstance;
    component.album = albumViewModel;
    fixture.detectChanges();
  });

  it('should be create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to photo list on album clicking', () => {
    const a = fixture.debugElement.nativeElement.querySelector('a');
    a.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe(`/${albumsPath}/${albumViewModel.id}`);
    });
  });
  it('should have owner name displayed', () => {
    const componentElement: DebugElement = fixture.debugElement;
    const albumOwnerDiv = componentElement.query(By.css('.album__owner'));
    const div: HTMLElement = albumOwnerDiv.nativeElement;
    expect(div.textContent).toEqual(albumViewModel.ownerName);
  });
  it('should have thumbnail img', () => {
    const componentElement: DebugElement = fixture.debugElement;
    const albumCoverImg = componentElement.query(By.css('.album__cover'));
    const img: HTMLElement = albumCoverImg.nativeElement;
    expect(img.attributes.getNamedItem('src').value).toEqual(albumViewModel.coverImageUrl);
  });
});
