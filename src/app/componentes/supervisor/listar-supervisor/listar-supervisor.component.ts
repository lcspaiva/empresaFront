import { Supervisor } from './../../../modelos/supervisorModel';
import { SupervisorService } from './../../../servicos/supervisor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-supervisor',
  templateUrl: './listar-supervisor.component.html',
  styleUrls: ['./listar-supervisor.component.css']
})
export class ListarSupervisorComponent implements OnInit {

  supervisores: any = []

  //guarda o id do supervisor que foi selecionado para exclusão
  idSupervisorExclusao: any

  constructor(private supervisorService:SupervisorService) { }

  ngOnInit(): void {
    this.buscaTodosSupervisores()
  }

  buscaTodosSupervisores(){
    this.supervisorService.buscarTodosSupervisores().subscribe((resposta) => {
      this.supervisores = []

      resposta.forEach((supervisorCargo:any[]) => {
        let sup: any = {
          id_supervisor: '',
          su_nome: '',
          su_setor: '',
          id_cargo: '',
          car_nome: '',
          car_descricao: ''
        }

        sup.id_supervisor = supervisorCargo[0]
        sup.su_nome = supervisorCargo[1]
        sup.su_setor = supervisorCargo[2]

        if(supervisorCargo[3] != null){
          sup.id_cargo = supervisorCargo[3]
          sup.car_nome = supervisorCargo[4]
          sup.car_descricao = supervisorCargo[5]
        }else{
          sup.id_cargo = 0
          sup.car_nome = "-----"
          sup.car_descricao = "-----"
        }

        this.supervisores.push(sup)
      });
    })
  }//buscarTodosSupervisores

  idSelecionado(id_supervisor:any){
    this.idSupervisorExclusao = id_supervisor
  }

  excluirSupervisor(){
    this.supervisorService.deletarSupervisor(this.idSupervisorExclusao).subscribe({
      complete: () => {
          this.supervisorService.mensagem("supervisor deletado")
          this.buscaTodosSupervisores()
      },
      error: () => this.supervisorService.mensagem("Erro ao deletar o supervisor")
    })
  }//excluirsupervisor

}
