import { Location } from '@angular/common';
import { FuncionarioService } from '../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-geral-funcionarios',
  templateUrl: './lista-geral-funcionarios.component.html',
  styleUrls: ['./lista-geral-funcionarios.component.css']
})
export class ListaGeralFuncionariosComponent implements OnInit {

  //variavel para guardar os objetos dos funcionarios
  funcs: any[] = []

  //guarda o id do funcionario que foi escolhido para deleção
  idFuncExclusao: any
  constructor(private funcionarioService:FuncionarioService,
              private location:Location) { }

  ngOnInit(): void {
    this.mostrarFuncsComCargo()
  }

  //exibe todos os funcionários e seus respectivos cargos, caso existam
  mostrarFuncsComCargo(){
    this.funcionarioService.buscarFuncionariosComCargo().subscribe((resultado) => {
      this.funcs = []
      resultado.forEach((funcionario: any = [])=>{
        let funcCargo = {
          id_func: funcionario[0],
          func_nome: funcionario[1],
          func_cidade: funcionario[2],
          id_cargo: funcionario[5],
          car_nome: funcionario[3],
          car_descricao: funcionario[4]
        }

        if(funcCargo.id_cargo == null){
          funcCargo.id_cargo = 0
          funcCargo.car_nome = '----'
          funcCargo.car_descricao = '----'
        }
        this.funcs.push(funcCargo)
      })
    })
  }//mostrarfuncs

  //captura o id do funcionario que teve o ícone de lixeira clicado na tabela
  pegaIdExclusao(id_funcionario:any){
    this.idFuncExclusao = id_funcionario
  }

  //faz a requisição de exclusão ao backend de um funcionário mediante seu id
  excluirFuncionario(){
    this.funcionarioService.deletarFunc(this.idFuncExclusao).subscribe({
      complete: () => {this.funcionarioService.mensagem("Funcionário excluido")
                       this.mostrarFuncsComCargo()},
      error: () => {this.funcionarioService.mensagem("Erro ao excluir funcionário")}
    })
  }

}
