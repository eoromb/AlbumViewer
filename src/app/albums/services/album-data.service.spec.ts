import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { AlbumDataService } from './album-data.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { Album } from '../models/album.model';

/**
 * Album data service test
 */
describe('AlbumDataService', () => {
    let service: AlbumDataService;
    let configService: ConfigService;
    const page = 1;
    const limit = 25;
    const albumsUrl = 'url';
    const album: Album = { id: 1, title: 'aaa' } as Album;
    const albums: Album[] = [album];
    let httpClient: HttpClient;

    beforeEach(() => {
        const headers = new HttpHeaders();
        headers.set('x-total-count', '100');
        const httpResponse = new HttpResponse({body: albums, headers});
        configService = jasmine.createSpyObj('ConfigService', { getAlbumsUrl: albumsUrl });
        httpClient = jasmine.createSpyObj('HttpClient', { get: of(httpResponse) });
        service = new AlbumDataService(httpClient, configService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should get albums url from config server', () => {
        const sub = service.getAlbums(page, limit).subscribe();
        expect(configService.getAlbumsUrl).toHaveBeenCalledTimes(1);
        sub.unsubscribe();
    });
    it('should call get paginated album list endpoint', () => {
        const sub = service.getAlbums(page, limit).subscribe(data => {
            expect(data).toEqual(albums);
        });
        expect(httpClient.get).toHaveBeenCalledWith(`${albumsUrl}?_start=${limit * page}&_limit=${limit}`, {observe: 'response'});
        sub.unsubscribe();
    });
    it('shoud call get album by id endpoint', () => {
        const sub = service.getAlbumById(album.id).subscribe(data => {
            expect(data).toEqual(album);
        });
        expect(httpClient.get).toHaveBeenCalledWith(`${albumsUrl}?id=${album.id}`);
        sub.unsubscribe();
    });
});
