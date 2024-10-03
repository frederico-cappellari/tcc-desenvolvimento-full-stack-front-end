import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpRequest,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor;
    let authServiceMock: Partial<AuthService>;
    let routerMock: Partial<Router>;

    beforeEach(() => {
        authServiceMock = {
            getAccessToken: jest.fn().mockResolvedValue('mockToken'),
            logout: jest.fn(),
        };

        routerMock = {
            navigate: jest.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                AuthInterceptor,
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock },
            ],
        });

        interceptor = TestBed.inject(AuthInterceptor);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should not add Authorization header for login requests', (done) => {
        const request = new HttpRequest('POST', '/api/login', {
            headers: new HttpHeaders(),
        });

        const next: HttpHandler = {
            handle: jest.fn().mockReturnValue(of({} as HttpEvent<any>)),
        };

        interceptor.intercept(request, next).subscribe(() => {
            expect(next.handle).toHaveBeenCalledWith(request);
            done();
        }, done);
    });

    it('should handle 403 error and navigate to home', (done) => {
        const request = new HttpRequest('GET', '/api/data');
        const next: HttpHandler = {
            handle: jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 403 }))),
        };

        interceptor.intercept(request, next).subscribe({
            next: () => { },
            error: () => {
                expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
                done();
            },
        });
    });

    it('should handle 401 error and call logout', async () => {
        const request = new HttpRequest('GET', '/api/data');
        const next: HttpHandler = {
            handle: jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 401 }))),
        };

        await interceptor.intercept(request, next).toPromise().catch(() => {
            expect(authServiceMock.logout).toHaveBeenCalled();
        });
    });

    it('should propagate other errors', (done) => {
        const request = new HttpRequest('GET', '/api/data');
        const next: HttpHandler = {
            handle: jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 }))),
        };

        interceptor.intercept(request, next).subscribe({
            next: () => { },
            error: (error) => {
                expect(error.status).toBe(500);
                done();
            },
        });
    });

    it('should copy all header values correctly', (done) => {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Custom-Header': 'CustomValue',
            'X-Multi-Value-Header': ['Value1', 'Value2'], 
        });

        const request = new HttpRequest('GET', '/api/data', { headers });
        const handleMock = jest.fn().mockReturnValue(of({} as HttpEvent<any>));

        const next: HttpHandler = {
            handle: handleMock,
        };

        interceptor.intercept(request, next).subscribe(() => {
            const modifiedRequest = handleMock.mock.calls[0][0];

            expect(modifiedRequest.headers.get('Content-Type')).toBe('application/json');
            expect(modifiedRequest.headers.get('Accept')).toBe('application/json');
            expect(modifiedRequest.headers.get('X-Custom-Header')).toBe('CustomValue');

            expect(modifiedRequest.headers.getAll('X-Multi-Value-Header')).toEqual(['Value1', 'Value2']);

            done();
        }, done);
    });
});
