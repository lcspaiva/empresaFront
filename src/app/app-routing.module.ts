import { ColaboradoresComponent } from './componentes/paginas/colaboradores/colaboradores.component';
import { CadastrarFuncionarioCargolessComponent } from './componentes/funcionario/cadastrar-funcionario-cargoless/cadastrar-funcionario-cargoless.component';
import { SupervisorCargosDisponiveisComponent } from './componentes/supervisor/supervisor-cargos-disponiveis/supervisor-cargos-disponiveis.component';
import { EditarSupervisorComponent } from './componentes/supervisor/editar-supervisor/editar-supervisor.component';
import { ListarTodosPagamentosComponent } from './componentes/pagamento/listar-todos-pagamentos/listar-todos-pagamentos.component';
import { EdicaoPagamentoComponent } from './componentes/pagamento/edicao-pagamento/edicao-pagamento.component';
import { CadastrarPagamentoComponent } from './componentes/pagamento/cadastrar-pagamento/cadastrar-pagamento.component';
import { ListaPagamentoFuncionarioComponent } from './componentes/pagamento/lista-pagamento-funcionario/lista-pagamento-funcionario.component';
import { CadastrarSupervisorComponent } from './componentes/supervisor/cadastrar-supervisor/cadastrar-supervisor.component';
import { AtribuirFuncCargoComponent } from './componentes/funcionario/atribuir-func-cargo/atribuir-func-cargo.component';
import { ListarSupervisorComponent } from './componentes/supervisor/listar-supervisor/listar-supervisor.component';
import { SupervisorCargoComponent } from './componentes/supervisor/supervisor-cargo/supervisor-cargo.component';
import { ListaGeralFuncionariosComponent } from './componentes/funcionario/lista-geral-funcionarios/lista-geral-funcionarios.component';
import { EdicaoFuncionarioComponent } from './componentes/funcionario/edicao-funcionario/edicao-funcionario.component';
import { CadastroFuncionarioComponent } from './componentes/funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListarFuncionarioComponent } from './componentes/funcionario/listar-funcionario/listar-funcionario.component';
import { EdicaoCargoComponent } from './componentes/cargo/edicao-cargo/edicao-cargo.component';
import { CadastroCargoComponent } from './componentes/cargo/cadastro-cargo/cadastro-cargo.component';
import { ListarTurmaComponent } from './componentes/cargo/listar-turma/listar-turma.component';
import { HomeComponent } from './componentes/paginas/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:"home", component:HomeComponent},

  {path:"cargos", component:ListarTurmaComponent},
  {path:"cadastroCargo", component:CadastroCargoComponent},
  {path:"edicaoCargo/:id", component:EdicaoCargoComponent},
  {path:"cargoSupervisor/:id_cargo", component:SupervisorCargosDisponiveisComponent},

  {path:"listarFuncionario/:id_cargo", component:ListarFuncionarioComponent},
  {path:"cadastroFuncionario/:id_cargo", component:CadastroFuncionarioComponent},
  {path:"edicaoFuncionario/:id_funcionario", component:EdicaoFuncionarioComponent},
  {path:"listaGeralFuncionarios", component:ListaGeralFuncionariosComponent},
  {path:"atribuirFuncionarioCargo/:id_funcionario/:id_cargo", component:AtribuirFuncCargoComponent},
  {path: "cadastarFuncionarioCargoless", component: CadastrarFuncionarioCargolessComponent},

  {path:"colaboradores", component: ColaboradoresComponent},

  {path:"supervisorCargo/:id_supervisor", component:SupervisorCargoComponent},
  {path:"listarSupervisor", component:ListarSupervisorComponent},
  {path:"cadastrarSupervisor", component: CadastrarSupervisorComponent},
  {path:"editarSupervisor/:id_supervisor", component: EditarSupervisorComponent},

  {path:"pagamentoFuncionario/:id_funcionario", component: ListaPagamentoFuncionarioComponent},
  {path:"cadastrarPagamento/:id_funcionario", component: CadastrarPagamentoComponent},
  {path:"editarPagamento/:codigo/:id_funcionario", component: EdicaoPagamentoComponent},
  {path:"listarTodosPagamentos", component:ListarTodosPagamentosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
