import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BaseFormComponent } from '../../../../core/base/base-form.component';
import { FieldMessageComponent } from '../../../../shared/components/field-message/field-message.component';
import { Exemplo } from '../../models/exemplo.model';
import { ExemploService } from '../../services/exemplo.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

defineLocale('pt-br', ptBrLocale);
@Component({
  selector: 'app-exemplo-edit',
  imports: [
    // Importações necessárias para o funcionamento do formulário e dos componentes utilizados.
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective,
    NgSelectComponent,
    BsDatepickerModule,
    FieldMessageComponent,
    ButtonComponent,
  ],
  providers: [
    ExemploService,
    provideNgxMask(),
  ],
  templateUrl: './exemplo-edit.component.html',
  styleUrls: ['./exemplo-edit.component.scss'],
})
export class ExemploEditComponent extends BaseFormComponent<Exemplo> implements OnInit {

  list: any[] = []; // Armazena a lista recuperados do serviço.

  constructor(
    public override activatedRoute: ActivatedRoute,
    public router: Router,
    private exemploService: ExemploService, // Serviço injetado para manipular operações relacionadas ao modelo.
    private localeService: BsLocaleService,
  ) {
    super(activatedRoute); // Chama o construtor da classe base para inicializar o roteamento.
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.list = this.exemploService.getCursos(); // Carrega a lista de cursos ao inicializar o componente.
    this.initForm(); // Inicializa o formulário.
    this.loaded();// Indica que o componente foi carregado com sucesso.
  }

  private initForm(): void {
    // Configura o formulário com controles e validadores.
    this.form = new FormGroup({
      nomeAlu: new FormControl('', [Validators.required]),
      id: new FormControl({ value: null, disabled: true }),
      curso: new FormControl(null),
      ano: new FormControl(null),
      data: new FormControl(null),
    });

    // Se a entidade já existir (edição), preenche o formulário com os dados existentes.
    if (this.entity?.id) {
      this.actionLabel = 'Editar'; // Atualiza o rótulo de ação para indicar que é uma edição.
      this.form.patchValue(this.entity); // Preenche o formulário com os valores da entidade.
    }
  }

  // Retorna os dados do formulário como uma nova instância do modelo Exemplo.
  getDataCreate(): Exemplo {
    const formValue = { ...this.form.value } as Exemplo; // Espalha as propriedades do formulário no modelo
    formValue.data = formValue.data ? this.formataData(formValue.data) : null; // Formata a data corretamente
    return formValue;
  }

  salvar(): void {
    if (this.form.invalid) {
      this.markAsDirty(); // Marca todos os campos como "dirty" para exibir os erros de validação.
      return;
    }
    this.loading(); // Inicia o estado de carregamento enquanto a operação de salvamento está em andamento.

    // Determina se deve ser realizada uma criação ou atualização com base na existência de um ID na entidade.
    const saveOperation = this.entity?.id
      ? this.exemploService.update(this.getDataCreate(), this.entity.id)
      : this.exemploService.create(this.getDataCreate());

    // Subscreve-se à operação de salvamento e gerencia o sucesso e o erro.
    this.addSub(
      saveOperation.subscribe({
        next: () => this.onSaveSuccess(), // Chama o método de sucesso ao salvar.
        error: (error) => this.onSaveError(error), // Chama o método de erro ao salvar.
      })
    );
  }

  onSaveSuccess(): void {
    const message = this.entity?.id ? 'Alterado com sucesso!' : 'Criado com sucesso!'; // Define a mensagem de sucesso.

    // Se for uma atualização, exibe a mensagem de sucesso e finaliza o carregamento.
    if (this.entity?.id) {
      this.msgSuccess(message);
      this.loaded();
    } else {
      // Se for uma criação, exibe a confirmação e possibilita redirecionar para outra página.
      this.confirmation(message).subscribe(() => {
        this.router.navigate(["/exemplo/lista"]);
      });
      this.loaded();
    }
  }

  onSaveError(error: any): void {
    // Exibe uma mensagem de erro com a resposta do servidor ou uma mensagem genérica.
    this.msgError(error?.error?.message || 'Erro ao salvar.');
    this.loaded(); // Finaliza o estado de carregamento.
  }
}
