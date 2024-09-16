import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EventSharedService } from '../../shared/services/event-shared.service';

export abstract class BaseComponent {

  private _sub: Subscription[] = [];
  private _loading = true;

  /**
   * Adicionar uma Subscription a lista.
   *
   * @param sub
   */
  addSub(sub: Subscription): void { this._sub.push(sub); }

  /**
   * Realizar unsubscribe/dispose nos itens adicionados anteriomente a lista.
   */
  unsubscribeList(): void { this._sub.forEach(s => s.unsubscribe()); }

  /**
   * Início do carregamento. Este método é utilizado para um controle único de loading.
   */
  loading = (): void => {
    this._loading = true;
    EventSharedService.get('loadingState').emit(this._loading);
  }

  /**
   * Final do carregamento. Este método é utilizado para um controle único de loading.
   */
  loaded = (): void => {
    this._loading = false;
    EventSharedService.get('loadingState').emit(this._loading);
  }

  /**
   * #######################
   * ## Getters e Setters ##
   * #######################
   */

  get isLoading() { return this._loading; }


  /**
   * Alertas
   */
  alertConfirmation(msg = 'Tem certeza que deseja excluir?') {
    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: '',
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  confirmation(msg = 'Operação realizada com sucesso!', title = 'Sucesso', icon: any = 'success', cancel = false) {
    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: title,
        text: msg,
        icon: icon,
        showCancelButton: cancel,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  msgSuccess(msg = 'Deletado com sucesso') {
    Swal.fire({
      title: 'Sucesso!',
      text: msg,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  msgError(erro = '') {
    Swal.fire({
      title: 'Erro na Solicitação',
      text: erro,
      icon: 'error',
    });
  }

  handleError(error: any) {
    this.msgError(error?.error?.message);
    this.loaded();
  }
}
