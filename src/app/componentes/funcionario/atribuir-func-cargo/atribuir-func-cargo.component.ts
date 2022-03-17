import { CargoService } from 'src/app/servicos/cargo.service';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/modelos/funcModel';
import { Cargo } from 'src/app/modelos/cargoModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atribuir-func-cargo',
  templateUrl: './atribuir-func-cargo.component.html',
  styleUrls: ['./atribuir-func-cargo.component.css']
})
export class AtribuirFuncCargoComponent implements OnInit {

  //guarda qual o id do objeto que está sendo trabalhado
  id_funcionario: any = ''

  //guarda qual o id do cargo do objeto que está sendo trabalhado (caso ele possua um)
  id_cargo: any = ''

  cargosDisponiveis: Cargo[] = []

  //denota o cargo que será escolhido no select dos cargos disponiveis
  cargoEscolhido: any

  //determina se o funcionario já possui um cargo
  isVinculado:boolean = false

  //modelo do objeto
  funcionario: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: '',
    func_foto: ''
  }

  //modelo do objeto
  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_descricao: ''
  }

  constructor(private route:ActivatedRoute,
              private funcionarioService:FuncionarioService,
              private cargoService:CargoService,
              private router:Router,
              private location:Location) {
              }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.buscaCargo()
    this.buscaFuncionario()
    this.mostrarCargosDisponiveis()
  }

  //traz os dados referentes a um usuário determinado por um id
  buscaFuncionario(){
    this.funcionarioService.buscaFunc(this.id_funcionario).subscribe(resposta => {
      this.funcionario = resposta
    })
  }

  ////traz os dados referentes a um cargo determinado por um id (caso ele exista)
  buscaCargo(){
    if(this.id_cargo != '0'){
      this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resposta => {
        this.cargo = resposta
        this.isVinculado = true
      })
    }
  }

  //exibe os dados do cargo na página (caso possua)
  mostrarCargo(){
    this.cargo = this.cargoEscolhido
  }

  //exibe todos os cargos que não possuem nenhum supervisor relacionado
  mostrarCargosDisponiveis(){
    this.cargoService.mostrarTodosCargos().subscribe(resposta => {
      // this.cargosDisponiveis = resposta

      resposta.forEach((val:any[])=>{
        let aux:Cargo = {
          id_cargo: val[0],
          car_nome: val[1],
          car_descricao: val[2]
        }
        this.cargosDisponiveis.push(aux)
      })
      console.log(this.cargosDisponiveis)
    })
  }

  //faz a atribuição do funcionario focado em um cargo listado
  atribuirCargo(){
    //funcionario
    //cargoescolhido
    this.funcionarioService.atribuirCargoFuncionario(this.id_funcionario, this.cargo).subscribe({
      complete: () => { this.funcionarioService.mensagem("Funcionário vinculado com sucesso")
                        this.location.back()
                      },
      error: () => { this.funcionarioService.mensagem("Erro ao processar a operação")
                      this.location.back()
                     }
    })
  }

  //desvincula o funcionário tema da página de seu presente cargo (caso possua um cargo)
  deixarFuncionarioSemCargo(){
    this.funcionarioService.deixarFuncionarioSemCargo(this.id_funcionario, this.funcionario).subscribe({
      complete: () => { this.funcionarioService.mensagem("Funcioonário liberado do cargo")
                        this.location.back()
      },
    error: () => { this.funcionarioService.mensagem("Erro ao remover o funcionario do cargo atual")
                   this.location.back()
        },
    })
  }

}
