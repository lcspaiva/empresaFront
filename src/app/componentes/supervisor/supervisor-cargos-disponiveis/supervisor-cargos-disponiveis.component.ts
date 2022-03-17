import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/modelos/cargoModel';
import { Supervisor } from 'src/app/modelos/supervisorModel';
import { CargoService } from 'src/app/servicos/cargo.service';
import { SupervisorService } from 'src/app/servicos/supervisor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-supervisor-cargos-disponiveis',
  templateUrl: './supervisor-cargos-disponiveis.component.html',
  styleUrls: ['./supervisor-cargos-disponiveis.component.css']
})
export class SupervisorCargosDisponiveisComponent implements OnInit {

  //id do cargo
  id_cargo: any

  //guarda o objeto que foi selecionado no select
  superEscolhido: any

  //armazena os objetos dos supervisores que não possuem nenhum cargo associado
  supervisoresLivres: Supervisor[] = []

  //determina se o cargo possui algum supervisor vinculado a ele
  existeSupervisor:boolean = false

  //obj do modelo cargo
  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_descricao: ''
  }

  //obj do modelo supervisor
  supervisor: Supervisor = {
    id_supervisor: '',
    su_nome: '',
    su_setor: '',
    su_foto: ''
  }

  constructor(private route:ActivatedRoute,
    private supervisorService:SupervisorService,
    private cargoService:CargoService,
    private router:Router,
    private location:Location) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")
    this.mostraCargo()
    this.buscarSupervisorCargo()
    this.buscarSuperLivres()
  }

  //preenche os campos com os dados do presente cargo
  mostraCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resposta => {
      this.cargo = resposta
    })
  }

  //buscar se existe um supervisor vinculado a esse cargo
  buscarSupervisorCargo(){
    this.supervisorService.buscarSupervisorCargo(this.id_cargo).subscribe(resposta => {
      if(resposta == null){
        //esse cargo não tem supervisor
        this.existeSupervisor = false
      }else{
        this.supervisor = resposta
        this.existeSupervisor = true
      }
    })
  }

  //traz do banco os supervisores que não possuem nenhum cargo associado
  buscarSuperLivres(){
    this.supervisorService.buscarSupervisoresLivres().subscribe(resposta => {
      this.supervisoresLivres = resposta
    })
  }

  //vincula um cargo a um supervisor
  atribuirCargo(){
    this.supervisorService.buscarUmSupervisor(this.supervisor.id_supervisor).subscribe(resposta => {
      this.supervisor = resposta
    })

    this.cargoService.atribuirSupervisor(this.cargo, this.cargo.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {
        alert("O supervisor foi atribuido")
        console.log("O supervisor foi atribuido")
        this.location.back()
      },
      error: () => {
        this.supervisorService.mensagem("Erro ao atribuir o professor")
        console.log("Erro ao atribuir o professor")
        this.location.back()
      }
    })
  }

  //mostra os dados do supervisor escolhido no select
  mostrarSupervisor(){
    this.supervisor = this.superEscolhido
  }

  //remove vinculo entre supervisor e cargo
  deixarCargoSemSupervisor(){
    this.cargoService.deixarCargoSemSupervisor(this.cargo, this.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {
        this.supervisorService.mensagem("O supervisor foi desvinculado")
        this.location.back()
      },
      error: () => {
        this.supervisorService.mensagem("Erro ao desvincular o professor")
        this.location.back()
      }
    })
  }
}
