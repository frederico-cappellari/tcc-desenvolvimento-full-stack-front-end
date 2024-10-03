import { TestBed } from '@angular/core/testing';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('Auth Service', () => {
    let service: AuthService;    
    let oidcSecurityServiceMock: Partial<OidcSecurityService>;

    beforeEach(async () => {
        oidcSecurityServiceMock = {
            authorize: jest.fn(),
            logoff: jest.fn().mockReturnValue(of({ success: true })),
            getAccessToken: jest.fn().mockReturnValue('mockAccessToken')
        };

        await TestBed.configureTestingModule({
            providers: [
                { provide: OidcSecurityService, useValue: oidcSecurityServiceMock },
            ]
        }).compileComponents();

        service = TestBed.inject(AuthService);
    });

    it('should create the auth service', () => {
        expect(service).toBeTruthy();
    });

    it('should call authorize on login', () => {
        service.login();
        expect(oidcSecurityServiceMock.authorize).toHaveBeenCalled();
    });

    it('should call logoff and log the result', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        service.logout();
        expect(oidcSecurityServiceMock.logoff).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith({ success: true });
        consoleSpy.mockRestore();
    });

    it('should return access token', () => {
        const token = service.getAccessToken();
        expect(token).toBe('mockAccessToken');
        expect(oidcSecurityServiceMock.getAccessToken).toHaveBeenCalled();
    });
});