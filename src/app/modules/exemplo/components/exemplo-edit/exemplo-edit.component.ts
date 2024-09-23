import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BaseFormComponent } from '../../../../core/base/base-form.component';
import { FieldMessageComponent } from '../../../../shared/components/field-message/field-message.component';
import { Exemplo } from '../../models/examplo.model';
import { ExemploService } from '../../services/exemplo.service';

@Component({
  selector: 'app-exemplo-edit',
  standalone: true,
  imports: [
    // Importações necessárias para o funcionamento do formulário e dos componentes utilizados.
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    FieldMessageComponent,
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
    private exemploService: ExemploService, // Serviço injetado para manipular operações relacionadas ao modelo.
  ) {
    super(activatedRoute); // Chama o construtor da classe base para inicializar o roteamento.
  }

  ngOnInit(): void {
    this.list = this.exemploService.getCursos(); // Carrega a lista de cursos ao inicializar o componente.
    this.initForm(); // Inicializa o formulário.
    this.loaded();// Indica que o componente foi carregado com sucesso.
  }

  private initForm(): void {
    // Configura o formulário com controles e validadores.
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      matricula: new FormControl(null, [Validators.required]),
      curso: new FormControl(null, [Validators.required]),
      ano: new FormControl(null, [Validators.required]),
    });

    // Se a entidade já existir (edição), preenche o formulário com os dados existentes.
    if (this.entity?.id) {
      this.actionLabel = 'Editar'; // Atualiza o rótulo de ação para indicar que é uma edição.
      this.form.patchValue(this.entity); // Preenche o formulário com os valores da entidade.
    }
  }

  private getDataCreate(): Exemplo {
    // Retorna os dados do formulário como uma nova instância do modelo Exemplo.
    return { ...this.form.value };
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
        next: (res) => this.onSaveSuccess(res), // Chama o método de sucesso ao salvar.
        error: (error) => this.onSaveError(error), // Chama o método de erro ao salvar.
      })
    );
  }

  private onSaveSuccess(res: Exemplo): void {
    this.entity = res; // Atualiza a entidade com os dados retornados.
    const message = this.entity?.id ? 'Alterado com sucesso!' : 'Criado com sucesso!'; // Define a mensagem de sucesso.

    // Se for uma atualização, exibe a mensagem de sucesso e finaliza o carregamento.
    if (this.entity?.id) {
      this.msgSuccess(message);
      this.loaded();
    } else {
      // Se for uma criação, exibe a confirmação e possibilita redirecionar para outra página.
      this.confirmation(message).subscribe(() => {
        // Código para redirecionamento aqui.
      });
      this.loaded();
    }
  }

  private onSaveError(error: any): void {
    // Exibe uma mensagem de erro com a resposta do servidor ou uma mensagem genérica.
    this.msgError(error?.error?.message || 'Erro ao salvar.');
    this.loaded(); // Finaliza o estado de carregamento.
  }
}
