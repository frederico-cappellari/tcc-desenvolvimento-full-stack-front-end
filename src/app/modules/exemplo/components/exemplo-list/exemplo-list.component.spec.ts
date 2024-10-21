import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExemploListComponent } from './exemplo-list.component';
import { of } from 'rxjs';
import { ExemploService } from '../../services/exemplo.service';
import { EventSharedService } from '../../../../shared/services/event-shared.service';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('ExemploListComponent', () => {
  let component: ExemploListComponent;
  let fixture: ComponentFixture<ExemploListComponent>;
  let exemploService: ExemploService;
  let eventSharedService: EventSharedService;

  let loading: jest.Mock;
  let loaded: jest.Mock;
  let alertConfirmation: jest.Mock;
  let confirmation: jest.Mock;
  let handleError: jest.Mock;

  beforeEach(async () => {
    exemploService = {
      getListPaginate: jest.fn().mockReturnValue(of({ data: [], page: 1, pageSize: 10, total: 0 })),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ExemploService>;

    eventSharedService = {
      get: jest.fn().mockReturnValue(of({ subscribe: () => {} })),
    } as unknown as jest.Mocked<EventSharedService>;

    await TestBed.configureTestingModule({
      imports: [ExemploListComponent, HttpClientTestingModule],
      providers: [
        { provide: ExemploService, useValue: exemploService },
        { provide: EventSharedService, useValue: eventSharedService },
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              // Provide mock data if needed
            }
          } 
        }
      ],
    }).compileComponents();

    loading = jest.fn();
    loaded = jest.fn();
    alertConfirmation = jest.fn();
    confirmation = jest.fn();
    handleError = jest.fn();

    fixture = TestBed.createComponent(ExemploListComponent);
    component = fixture.componentInstance;
    exemploService = TestBed.inject(ExemploService);
    eventSharedService = TestBed.inject(EventSharedService);

    component.loading = loading;
    component.loaded = loaded;
    component.alertConfirmation = alertConfirmation;
    component.confirmation = confirmation;
    component.handleError = handleError;
    component.excluir = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initList on ngOnInit', () => {
    const initList = component.initList = jest.fn();
    component.ngOnInit();

    expect(initList).toHaveBeenCalled();
  });

  it('should call initList on onChangePage', () => {
    const initList = component.initList = jest.fn();
    const mockEventEmitter = new EventEmitter<number>(); // Create a mock EventEmitter
    const subscribeSpy = jest.spyOn(EventSharedService, 'get').mockReturnValue(mockEventEmitter); 

    component.onChangePage();
    mockEventEmitter.emit(1); // Emit a value to trigger the subscription

    expect(subscribeSpy).toHaveBeenCalledWith('loadList');
    expect(initList).toHaveBeenCalled();
  });

  it('should call excluir if confirmed', () => {
    const id = 1;
    alertConfirmation.mockReturnValue(of(true)); // Simulate confirmation

    component.confirmDelete(id);

    expect(alertConfirmation).toHaveBeenCalled();
    expect(component.excluir).toHaveBeenCalledWith(id);
  });

  it('should not call excluir if not confirmed', () => {
    const id = 1;
    alertConfirmation.mockReturnValue(of(false)); // Simulate cancellation

    component.confirmDelete(id);

    expect(alertConfirmation).toHaveBeenCalled();
    expect(component.excluir).not.toHaveBeenCalled();
  });
});