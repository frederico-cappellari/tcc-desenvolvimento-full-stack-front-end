import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FieldMessageComponent } from '../../../../../shared/components/field-message/field-message.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { BaseFormComponent } from '../../../../../core/base/base-form.component';
import { ListaComprasService } from '../../../services/lista-compras.service';
import { ItemCompraDTO } from '../../../../../shared/models/item-compra-dto';

defineLocale('pt-br', ptBrLocale);
@Component({
  selector: 'app-lista-compras-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule,
    FieldMessageComponent,
    ButtonComponent
  ],
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './lista-compras-form.component.html',
  styleUrl: './lista-compras-form.component.scss'
})
export class ListaComprasFormComponent extends BaseFormComponent<ItemCompraDTO> implements OnInit {

  @Output() registroIncluido = new EventEmitter<void>();

  constructor(
    public override activatedRoute: ActivatedRoute,
    private listaComprasService: ListaComprasService,
    private localeService: BsLocaleService,
  ) {
    super(activatedRoute); // Chama o construtor da classe base para inicializar o roteamento.
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.initForm(); // Inicializa o formulário.
  }

  private initForm(): void {
    // Configura o formulário com controles e validadores.
    this.form = new FormGroup({
      descricao: new FormControl('', [Validators.required])
    });
  }


  // Retorna os dados do formulário como uma nova instância do modelo Exemplo.
  getDataCreate(): ItemCompraDTO {
    const formValue = { ...this.form.value } as ItemCompraDTO; // Espalha as propriedades do formulário no modelo
    formValue.usuarioLogin = localStorage.getItem('user') ?? ''; // Adiciona o login do usuário logado
    return formValue;
  }

  salvar(): void {
    if (this.form.invalid) {
      this.markAsDirty(); // Marca todos os campos como "dirty" para exibir os erros de validação.
      return;
    }
    this.loading(); // Inicia o estado de carregamento enquanto a operação de salvamento está em andamento.
    // Subscreve-se à operação de salvamento e gerencia o sucesso e o erro.
    this.addSub(
      this.listaComprasService.create(this.getDataCreate()).subscribe({
        next: () => this.onSaveSuccess(), // Chama o método de sucesso ao salvar.
        error: (error) => this.onSaveError(error), // Chama o método de erro ao salvar.
      })
    );
  }

  onSaveSuccess(): void {
    const message = 'Criado com sucesso!'; // Define a mensagem de sucesso.
    this.msgSuccess(message);
    this.loaded();
    this.registroIncluido.emit(); // Emite o evento de registro incluído.
    this.form.reset(); // Reseta o formulário após o salvamento.
  }

  onSaveError(error: any): void {
    // Exibe uma mensagem de erro com a resposta do servidor ou uma mensagem genérica.
    this.msgError(error?.error?.message || 'Erro ao salvar.');
    this.loaded(); // Finaliza o estado de carregamento.
  }

}
