import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { provideNgxMask } from 'ngx-mask';
import { BaseFormComponent } from '../../../../../../core/base/base-form.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { FieldMessageComponent } from '../../../../../../shared/components/field-message/field-message.component';
import { NotaFiscalDTO } from '../../../models/nota-fiscal-dto';
import { NotaFiscalService } from '../../../services/nota-fiscal.service';

defineLocale('pt-br', ptBrLocale);
@Component({
  selector: 'app-nota-fiscal-form',
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
  templateUrl: './nota-fiscal-form.component.html',
  styleUrl: './nota-fiscal-form.component.scss'
})
export class NotaFiscalFormComponent extends BaseFormComponent<NotaFiscalDTO> implements OnInit {

  @Output() registroIncluido = new EventEmitter<void>();

  constructor(
    public override activatedRoute: ActivatedRoute,
    private notaFiscalService: NotaFiscalService,
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
      chaveDeAcesso: new FormControl('', [Validators.required])
    });
  }


  // Retorna os dados do formulário como uma nova instância do modelo Exemplo.
  getDataCreate(): NotaFiscalDTO {
    const formValue = { ...this.form.value } as NotaFiscalDTO; // Espalha as propriedades do formulário no modelo
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
      this.notaFiscalService.create(this.getDataCreate()).subscribe({
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
