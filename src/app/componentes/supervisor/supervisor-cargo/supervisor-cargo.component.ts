import { CargoService } from 'src/app/servicos/cargo.service';
import { Supervisor } from './../../../modelos/supervisorModel';
import { SupervisorService } from './../../../servicos/supervisor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/modelos/cargoModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-supervisor-cargo',
  templateUrl: './supervisor-cargo.component.html',
  styleUrls: ['./supervisor-cargo.component.css']
})
export class SupervisorCargoComponent implements OnInit {

  // armazena o id do cargo que está vinculado ao supervisor
  // usado para puxar os dados do supervisor
  id_supervisor: any = ""

  //modelo do obj cargo
  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_descricao: ''
  }

  // determina se já existe um cargo atrelado a esse supervisor
  isCargo: boolean = false;
  idCargo: any

  //determinará qual foi o supervisor escolhido dentro do select
  cargoEscolhido: any

  //armazenará a lista contendo os supervisores qu enão estao vinculados à nenhum cargo
  //sera utilizada para listar no select na hora de escolher um supervisor para aquele cargo
  cargosLivres: Cargo[] = []

  //modelo do obj supervisor
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
    this.id_supervisor = this.route.snapshot.paramMap.get("id_supervisor")
    this.buscarSupervisor()
    this.buscarCargoDoSupervisor()
    this.buscarCargosSemSupervisor()

  }

  //puxa os dados do cargo
  buscarSupervisor(){
    this.supervisorService.buscarUmSupervisor(this.id_supervisor).subscribe(resposta => {
      this.supervisor = resposta
    })
  }

  //puxa os dados do cargo que está vinculado a esse supervisor
  buscarCargoDoSupervisor(){
    this.supervisorService.buscarCargoSupervisor(this.id_supervisor).subscribe(resposta => {
      this.idCargo = resposta
      this.supervisorService.mensagem("id_cargo: " + this.idCargo)
      this.buscarDadosCargo()
    })
  }

  //busca os dados do cargo somente se ele existir
  buscarDadosCargo(){
      if(this.idCargo == undefined){
        this.isCargo = false
      }else{
        this.isCargo = true
        this.cargoService.mostrarUmCargo(this.idCargo).subscribe(resposta => {
          this.cargo = resposta
        })
      }
  }//buscaSupervisor

  //busca os cargos que estão sem supervisor
  buscarCargosSemSupervisor(){
    this.cargoService.mostraCargosSemSupervisor().subscribe(resposta => {
      this.cargosLivres = resposta
      // console.log("Cargos livres")
      // console.log(this.cargosLivres)
    })
  }//buscarcargosLivres

  //pega os dados do supervisor do select e solta nos campos
  mostrarSupervisor(){
    this.cargo = this.cargoEscolhido
    console.log(this.cargo)
  }

  //faz a vinculação entre o cargo e um supervisor
  associarCargoSupervisor(){
    this.cargoService.atribuirSupervisor(this.cargo, this.cargo.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {
        this.supervisorService.mensagem("o professor foi atribuido com sucesso")
        this.location.back()
      },
      error: () => {this.supervisorService.mensagem("ERRO: o professor não pôde ser atribuido")}
    })
  }

  //remove o vinculo entro supervisor e seu cargo
  deixarCargoSemSupervisor(){
    this.cargoService.deixarCargoSemSupervisor(this.cargo, this.cargo.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {this.supervisorService.mensagem("Atenção! A partir de agora o cargo não está sendo supervionado")
                      this.router.navigate(['/cargos'])},
      error: () => {this.supervisorService.mensagem("Erro: não foi possível desvincular o supervisor do cargo")
                    this.router.navigate(['/cargos']) }
    })
  }
}
