import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BaseFormComponent } from '../../../../../../core/base/base-form.component';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { FieldMessageComponent } from '../../../../../../shared/components/field-message/field-message.component';
import { TransacaoFinanceiraDTO } from '../../../../../../shared/models/transacao-financeira-dto';
import { CategoriaTransacaoFinanceiraDTO } from '../../../models/categoria-transacao-financeira-dto';
import { TransacaoFinanceiraService } from '../../../services/transacao-financeira.service';

defineLocale('pt-br', ptBrLocale);
@Component({
  selector: 'app-receita-despesa-form',
  imports: [
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      NgSelectComponent,
      NgxMaskDirective,
      BsDatepickerModule,
      FieldMessageComponent,
      ButtonComponent
  ],
  providers: [
      provideNgxMask(),
  ],
  templateUrl: './receita-despesa-form.component.html',
  styleUrl: './receita-despesa-form.component.scss'
})
export class ReceitaDespesaFormComponent extends BaseFormComponent<TransacaoFinanceiraDTO> implements OnInit {

  listaCategorias: CategoriaTransacaoFinanceiraDTO[] = []; // Armazena a lista de categorias recuperadas do serviço.
  listaTipos: any[] = [ {value: 'RECEITA', label: 'Receita'}, {value: 'DESPESA', label: 'Despesa'} ];; // Lista de tipos de transação financeira.
  listaRecorrente: any[] = [ { value: true, label: 'Sim' }, { value: false, label: 'Não' } ];

  @Output() registroIncluido = new EventEmitter<void>();

  constructor(
      public override activatedRoute: ActivatedRoute,
      public router: Router,
      private transacaoFinanceiraService: TransacaoFinanceiraService,
      private localeService: BsLocaleService,
    ) {
      super(activatedRoute); // Chama o construtor da classe base para inicializar o roteamento.
      this.localeService.use('pt-br');
    }

 ngOnInit(): void {
    this.carregaCategorias(); // Carrega a lista de categorias ao inicializar o componente.
    this.initForm(); // Inicializa o formulário.
     // Indica que o componente foi carregado com sucesso.
  }

   private initForm(): void {
    // Configura o formulário com controles e validadores.
    this.form = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      categoriaId: new FormControl('', [Validators.required]),
      recorrente: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
    });
  }

  private carregaCategorias(): void {
    this.addSub(
      this.transacaoFinanceiraService.getCategorias().subscribe({
        next: (res) => {
          this.listaCategorias = res;
          this.loaded();
        },
        error: (error) => {
          this.handleError(error);
        }
      })
    );
  }

  // Retorna os dados do formulário como uma nova instância do modelo Exemplo.
    getDataCreate(): TransacaoFinanceiraDTO {
      const formValue = { ...this.form.value } as TransacaoFinanceiraDTO; // Espalha as propriedades do formulário no modelo
      formValue.data = formValue.data ? this.formataData(formValue.data) : null; // Formata a data corretamente
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
        this.transacaoFinanceiraService.create(this.getDataCreate()).subscribe({
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
