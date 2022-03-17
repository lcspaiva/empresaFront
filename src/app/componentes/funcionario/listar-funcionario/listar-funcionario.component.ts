import { CargoService } from './../../../servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../modelos/funcModel';
import { Cargo } from 'src/app/modelos/cargoModel';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ListarFuncionarioComponent implements OnInit {

  funcionarios: Funcionario[] = []
  id_cargo: String = ''

  //guarda o id do funcionario que será ou não deletado pelo modal
  idExclusao: any

  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_descricao: ''
  }

  constructor(private funcionarioService: FuncionarioService,
              private cargoService: CargoService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!;
    this.buscarDadosCargo();
    this.buscarFuncCargo();
  }

  buscarFuncCargo(){
    this.funcionarioService.listaFuncs(this.id_cargo).subscribe((resultado) => {
      this.funcionarios = []
      this.funcionarios = resultado;
    })
  }

  buscarDadosCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resposta => {
      this.cargo = resposta
    })
  }

  pegaIdExclusao(id_func:any){
    this.idExclusao = id_func
  }

  excluirFuncionario(){
    this.funcionarioService.deletarFunc(this.idExclusao).subscribe({
      complete: () => {
        this.funcionarioService.mensagem("O funcionário foi excluído com sucesso")
        this.buscarFuncCargo()
      },
      error: () => {
        this.funcionarioService.mensagem("Erro ao excluir o funcionário :(~ ")
      }
    })
  }

  desvincular(id_funcionario:String, funcionario:Funcionario){
    this.funcionarioService.deixarFuncionarioSemCargo(id_funcionario, funcionario).subscribe({
      complete: () => {
        this.funcionarioService.mensagem("Funcionário desvinculado do cargo atual")
        this.ngOnInit()
      },
      error: () => {this.funcionarioService.mensagem("Erro ao desvincular o funcionario")}
    })
  }
}
