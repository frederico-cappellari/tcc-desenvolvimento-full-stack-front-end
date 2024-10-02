import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let oidcSecurityServiceMock: Partial<OidcSecurityService>;

  beforeEach(async () => {
    oidcSecurityServiceMock = {
      checkAuth: jest.fn().mockReturnValue(of({ isAuthenticated: false })),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: OidcSecurityService, useValue: oidcSecurityServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'APM.Angular18' title`, () => {
    expect(component.title).toEqual('APM.Angular18');
  });

  it('should call checkAuth on ngOnInit and log error if not authenticated', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();

    expect(oidcSecurityServiceMock.checkAuth).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Autenticação falhou');

    consoleErrorSpy.mockRestore();
  });

  it('should not log error if authenticated', () => {
    oidcSecurityServiceMock.checkAuth = jest.fn().mockReturnValue(of({ isAuthenticated: true }));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();

    expect(oidcSecurityServiceMock.checkAuth).toHaveBeenCalled();
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});