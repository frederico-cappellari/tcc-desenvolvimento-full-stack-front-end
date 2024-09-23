# APMAngular18

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.2.

## Dicas para iniciar o projeto:

1. Instalar o TypeScript (caso não esteja instalado):

   - Ver instruções aqui: https://www.typescriptlang.org/#installation

2. Instalar o Node JS https://nodejs.org/en/download/
   2.1 Configurar para apontar para o Azure Artifacts:
   ```
   >npm config set registry https://azuredevops.pro.intra.rs.gov.br/tfs/PROCERGSCollection/_packaging/procergs/npm/registry/
   ```
   Obs.: Alternativamente, pode-se apontar diretamente para o repositorio original (https://registry.npmjs.org/) configurando o proxy Procergs:
   ```
   >npm config set proxy http://nome-sobrenome:senha@proxy.procergs.reders:3128
   >npm config set https-proxy http://nome-sobrenome:senha@proxy.procergs.reders:3128
   >npm config set strict-ssl false
   ```
3. Instalar o Visual Studio Code: https://code.visualstudio.com/download
   - Configurar proxy, em Settings, editar:
     ```
     "http.proxy": "http://nome-sobrenome:senha@proxy.procergs.reders:3128",
     "http.proxyStrictSSL": false,
     ```
4. Reiniciar o computador para que o Integrated Terminal do Vs Code reconheça os comandos npm.

5. Abrir e executar a aplicação no Visual Studio Code:
   - Clicar em File -> Open Folder... e selecionar a pasta raíz do projeto
   - Clicar em View -> Integrated Terminal, para abrir o terminal:
   - Fazer o restore dos pacotes:
     ```
     > npm install
     ```
   - Compilar a aplicação:
     ```
     > ng build
     ```
     Obs.: se não reconhecer o comando 'ng', executar o comando abaixo para instalar o angular-cli:
     ```
     > npm install -g @angular/cli
     ```
   - Executar a aplicação:
     ```
     > ng serve
     ```
   - abrir no browser: `http://localhost:4200/`

## Outras dicas:

1. Rodar a verificação de código:

   ```
   > ng lint
   ```

2. Executar os testes:

   ```
   > ng test
   ```

3. Para fazer o Deploy/Release da aplicação:
   - Executar o comando:
     ```
     > ng build --prod --base-href
     ```
   - Copiar o conteúdo gerado na pasta `dist` do projeto.

## Links Úteis:

Este projeto utiliza uma variedade de bibliotecas para fornecer funcionalidades avançadas, como componentes de interface de usuário, gráficos, ícones e alertas modais. Abaixo, você encontrará uma breve descrição de cada uma dessas bibliotecas, juntamente com links para suas respectivas documentações.

1. bootstrap v5.3
   O bootstrap é uma das bibliotecas de front-end mais populares para o desenvolvimento de interfaces web responsivas e móveis. Ele fornece uma ampla gama de componentes, como botões, formulários, tabelas e grids.
   Documentação: [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

2. bootstrap-icons
   O bootstrap-icons é um pacote oficial de ícones SVG para o Bootstrap. Ele fornece ícones de alta qualidade que podem ser facilmente integrados em um projeto usando classes CSS.
   Documentação: [Bootstrap Icons](https://icons.getbootstrap.com/)

3. ng-bootstrap
   O ng-bootstrap é um conjunto de componentes Angular construídos sobre o Bootstrap, uma biblioteca popular de CSS. Ele permite que você utilize componentes Bootstrap nativos como modais, tooltips, carrosséis, entre outros, em um projeto Angular.
   Documentação: [ng-bootstrap](https://ng-bootstrap.github.io/#/home)

4. ngx-bootstrap
   O ngx-bootstrap oferece um conjunto de componentes Bootstrap especificamente adaptados para Angular. Ele inclui funcionalidades como modais, popovers, tabs, e mais, permitindo uma integração perfeita com projetos Angular.
   Documentação: [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/components)

5. ng-select
   O @ng-select/ng-select é uma biblioteca de componentes para Angular que fornece um poderoso componente de seleção (dropdown) com suporte para opções múltiplas, pesquisa, templates personalizados, entre outros.
   Documentação: [ng-select](https://www.npmjs.com/package/@ng-select/ng-select)

6. ng2-charts
   O ng2-charts é uma biblioteca Angular que facilita a integração com o Chart.js, permitindo criar gráficos interativos e personalizáveis em um projeto Angular.
   Documentação: [ng2-charts](https://valor-software.com/ng2-charts/)
   Documentação: [Chart.js](https://www.chartjs.org/docs/latest/charts/line.html)

7. sweetalert2
   O sweetalert2 é uma biblioteca independente que permite a criação de modais customizados e responsivos com uma interface de usuário agradável. É amplamente utilizada para mostrar alertas, confirmações e outros tipos de diálogos modais.
   Documentação: [SweetAlert2](https://sweetalert2.github.io/)

8. ngx-mask
   Este pacote simplifica a aplicação de máscaras em inputs. Ele é particularmente útil quando se trata de formatar e validar dados de entrada, como números de telefone, datas, CPFs, entre outros, em formulários web.
   Documentação: [ngx-mask](https://github.com/JsDaddy/ngx-mask/blob/develop/USAGE.md)
