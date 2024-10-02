import { HttpClient } from '@angular/common/http';
import { TestBed, getTestBed } from '@angular/core/testing';
import { BaseService } from './base.service'; // Adjust the import as necessary
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

class TestService extends BaseService<any> {
    public getPathModule(): string {
        return '/test';
    }
}

describe('BaseService', () => {
    let service: TestService;
    let httpClientMock: jest.Mocked<HttpClient>;
    let http: HttpClient;
    let httpMock: HttpTestingController;
    let injector: TestBed;

    beforeEach(() => {
        httpClientMock = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
            deleteAll: jest.fn(),
        } as unknown as jest.Mocked<HttpClient>;

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TestService,
                {
                    provide: HttpClient, useValue: {
                        provide: HttpClient, useValue: {
                            get: jest.fn(), post: jest.fn(), put: jest.fn(),
                            delete: jest.fn(),
                        }
                    },
                },
            ],
        });

        service = TestBed.inject(TestService);
        http = TestBed.inject(HttpClient);
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });
});
