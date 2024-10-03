import { TestBed } from '@angular/core/testing';
import { BaseComponent } from './base.component'; // Adjust the path as necessary
import { EventSharedService } from '../../shared/services/event-shared.service';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

class TestComponent extends BaseComponent { }

describe('BaseComponent', () => {
    let component: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TestComponent]
        });

        component = TestBed.inject(TestComponent);
    });

    afterEach(() => {
        jest.clearAllMocks();
        component.unsubscribeList(); // Clean up subscriptions after each test
    });

    it('should set loading state to true and emit loadingState', () => {
        const emitSpy = jest.spyOn(EventSharedService.get('loadingState'), 'emit');

        component.loading();
        expect(component.isLoading).toBe(true);
        expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should set loading state to false and emit loadingState', () => {
        const emitSpy = jest.spyOn(EventSharedService.get('loadingState'), 'emit');

        component.loaded();
        expect(component.isLoading).toBe(false);
        expect(emitSpy).toHaveBeenCalledWith(false);
    });

    it('should return an observable that emits true on confirmation', (done) => {
        (Swal.fire as jest.Mock).mockResolvedValueOnce({ isConfirmed: true });

        component.alertConfirmation().subscribe(result => {
            expect(result).toBe(true);
            done();
        });
    });

    it('should return an observable that emits false on cancellation', (done) => {
        (Swal.fire as jest.Mock).mockResolvedValueOnce({ isConfirmed: false });

        component.alertConfirmation().subscribe(result => {
            expect(result).toBe(false);
            done();
        });
    });

    it('should call msgError and loaded on error', () => {
        const error = { error: { message: 'Error occurred' } };
        const msgErrorSpy = jest.spyOn(component, 'msgError');
        const loadedSpy = jest.spyOn(component, 'loaded');

        component.handleError(error);

        expect(msgErrorSpy).toHaveBeenCalledWith('Error occurred');
        expect(loadedSpy).toHaveBeenCalled();
    });

    it('should call Swal.fire with default error message', () => {
        component.msgError();

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Erro na Solicitação',
            text: '',
            icon: 'error',
        });
    });

    it('should call Swal.fire with a custom error message', () => {
        const customErrorMessage = 'An unexpected error occurred';
        component.msgError(customErrorMessage);

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Erro na Solicitação',
            text: customErrorMessage,
            icon: 'error',
        });
    });

    it('should add subscriptions and unsubscribe properly', () => {
        const mockSub = { unsubscribe: jest.fn() };
        component.addSub(mockSub as any);

        expect(component['_sub'].length).toBe(1); // Check that the subscription was added

        component.unsubscribeList(); // Unsubscribe from all subscriptions

        expect(mockSub.unsubscribe).toHaveBeenCalled(); // Check that unsubscribe was called
    });

    it('should return true when confirmed', (done) => {
        (Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true });

        const msg = 'Test message';
        component.confirmation(msg).subscribe((result) => {
            expect(result).toBe(true);
            done();
        });

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Sucesso',
            text: msg,
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        });
    });

    it('should return false when cancelled', (done) => {
        (Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: false });

        const msg = 'Test message';
        component.confirmation(msg, 'Test Title', 'warning', true).subscribe((result) => {
            expect(result).toBe(false);
            done();
        });

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Test Title',
            text: msg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        });
    });

    it('should use the default message when none is provided and return true', (done) => {
        (Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: true });

        component.confirmation().subscribe((result) => {
            expect(result).toBe(true);
            done();
        });

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Sucesso',
            text: 'Operação realizada com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        });
    });

    it('should use the default message when none is provided and return false on cancel', (done) => {
        (Swal.fire as jest.Mock).mockResolvedValue({ isConfirmed: false });

        component.confirmation().subscribe((result) => {
            expect(result).toBe(false);
            done();
        });

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Sucesso',
            text: 'Operação realizada com sucesso!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        });
    });

    it('should call Swal.fire with the default success message', () => {
        component.msgSuccess();

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Sucesso!',
            text: 'Deletado com sucesso',
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    });

    it('should call Swal.fire with a custom success message', () => {
        const customMessage = 'Item removed successfully';
        component.msgSuccess(customMessage);

        expect(Swal.fire).toHaveBeenCalledWith({
            title: 'Sucesso!',
            text: customMessage,
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    });
});
