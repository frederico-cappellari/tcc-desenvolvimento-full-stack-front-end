import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { BaseFormComponent } from '../../../../core/base/base-form.component';
import { FieldMessageComponent } from '../../../../shared/components/field-message/field-message.component';
import { Country } from '../../models/example.model';
import { ExampleService } from '../../services/example.service';

@Component({
  selector: 'app-example-edit',
  standalone: true,
  imports: [
    // Importações necessárias para o funcionamento do formulário e dos componentes utilizados.
    FormsModule,
    ReactiveFormsModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    FieldMessageComponent,
  ],
  providers: [
    ExampleService,
  ],
  templateUrl: './example-edit.component.html',
  styleUrls: ['./example-edit.component.scss'],
})
export class ExampleEditComponent extends BaseFormComponent<Country> implements OnInit {

  list: any[] = []; // Armazena a lista recuperados do serviço.

  constructor(
    public override activatedRoute: ActivatedRoute,
    private exampleService: ExampleService, // Serviço injetado para manipular operações relacionadas ao modelo.
  ) {
    super(activatedRoute); // Chama o construtor da classe base para inicializar o roteamento.
  }

  ngOnInit(): void {
    this.list = this.exampleService.getContinents(); // Carrega a lista de continentes ao inicializar o componente.
    this.initForm(); // Inicializa o formulário.
    this.loaded();// Indica que o componente foi carregado com sucesso.
  }

  private initForm(): void {
    // Configura o formulário com controles e validadores.
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      population: new FormControl(null, [Validators.required]),
      continent: new FormControl(null, [Validators.required]),
    });

    // Se a entidade já existir (edição), preenche o formulário com os dados existentes.
    if (this.entity?.id) {
      this.actionLabel = 'Editar'; // Atualiza o rótulo de ação para indicar que é uma edição.
      this.form.patchValue(this.entity); // Preenche o formulário com os valores da entidade.
    }
  }

  private getDataCreate(): Country {
    // Retorna os dados do formulário como uma nova instância do modelo Country.
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
      ? this.exampleService.update(this.getDataCreate(), this.entity.id)
      : this.exampleService.create(this.getDataCreate());

    // Subscreve-se à operação de salvamento e gerencia o sucesso e o erro.
    this.addSub(
      saveOperation.subscribe({
        next: (res) => this.onSaveSuccess(res), // Chama o método de sucesso ao salvar.
        error: (error) => this.onSaveError(error), // Chama o método de erro ao salvar.
      })
    );
  }

  private onSaveSuccess(res: Country): void {
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
