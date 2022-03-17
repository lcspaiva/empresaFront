import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/estrutura/header/header.component';
import { FooterComponent } from './componentes/estrutura/footer/footer.component';
import { ListarTurmaComponent } from './componentes/cargo/listar-turma/listar-turma.component';
import { HomeComponent } from './componentes/paginas/home/home.component';
import { CadastroCargoComponent } from './componentes/cargo/cadastro-cargo/cadastro-cargo.component';
import { EdicaoCargoComponent } from './componentes/cargo/edicao-cargo/edicao-cargo.component';
import { ListarFuncionarioComponent } from './componentes/funcionario/listar-funcionario/listar-funcionario.component';
import { CadastroFuncionarioComponent } from './componentes/funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { EdicaoFuncionarioComponent } from './componentes/funcionario/edicao-funcionario/edicao-funcionario.component';
import { ListaGeralFuncionariosComponent } from './componentes/funcionario/lista-geral-funcionarios/lista-geral-funcionarios.component';
import { SupervisorCargoComponent } from './componentes/supervisor/supervisor-cargo/supervisor-cargo.component';
import { ListarSupervisorComponent } from './componentes/supervisor/listar-supervisor/listar-supervisor.component';
import { AtribuirFuncCargoComponent } from './componentes/funcionario/atribuir-func-cargo/atribuir-func-cargo.component';
import { CadastrarSupervisorComponent } from './componentes/supervisor/cadastrar-supervisor/cadastrar-supervisor.component';
import { ListaPagamentoFuncionarioComponent } from './componentes/pagamento/lista-pagamento-funcionario/lista-pagamento-funcionario.component';
import { CadastrarPagamentoComponent } from './componentes/pagamento/cadastrar-pagamento/cadastrar-pagamento.component';
import { EdicaoPagamentoComponent } from './componentes/pagamento/edicao-pagamento/edicao-pagamento.component';
import { ListarTodosPagamentosComponent } from './componentes/pagamento/listar-todos-pagamentos/listar-todos-pagamentos.component';
import { EditarSupervisorComponent } from './componentes/supervisor/editar-supervisor/editar-supervisor.component';
import { SupervisorCargosDisponiveisComponent } from './componentes/supervisor/supervisor-cargos-disponiveis/supervisor-cargos-disponiveis.component';
import { CadastrarFuncionarioCargolessComponent } from './componentes/funcionario/cadastrar-funcionario-cargoless/cadastrar-funcionario-cargoless.component';
import { ColaboradoresComponent } from './componentes/paginas/colaboradores/colaboradores.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListarTurmaComponent,
    HomeComponent,
    CadastroCargoComponent,
    EdicaoCargoComponent,
    ListarFuncionarioComponent,
    CadastroFuncionarioComponent,
    EdicaoFuncionarioComponent,
    ListaGeralFuncionariosComponent,
    SupervisorCargoComponent,
    ListarSupervisorComponent,
    AtribuirFuncCargoComponent,
    CadastrarSupervisorComponent,
    ListaPagamentoFuncionarioComponent,
    CadastrarPagamentoComponent,
    EdicaoPagamentoComponent,
    ListarTodosPagamentosComponent,
    EditarSupervisorComponent,
    SupervisorCargosDisponiveisComponent,
    CadastrarFuncionarioCargolessComponent,
    ColaboradoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxCurrencyModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [{provide:LOCALE_ID, useValue:"pt-BR"},
              {provide:DEFAULT_CURRENCY_CODE, useValue:"BRL"},
              CurrencyPipe
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
