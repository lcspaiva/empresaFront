import { Router } from '@angular/router';
import { CargoService } from '../../../servicos/cargo.service';
import { Component, OnInit } from '@angular/core';
import { Cargo } from '../../../modelos/cargoModel';

@Component({
  selector: 'app-listar-turma',
  templateUrl: './listar-turma.component.html',
  styleUrls: ['./listar-turma.component.css']
})
export class ListarTurmaComponent implements OnInit {

  //cargos: Cargo[] = [];
  cargos: any = []

  //armazena o id da linha selecionada para exclui-lo dps
  idExclusao: any

  constructor(private cargoService:CargoService,
              private router: Router) { }

  ngOnInit(): void {
    this.mostrarTodosCargos();
    this.cargos = []
  }

  mostrarTodosCargos(){
    this.cargoService.mostrarTodosCargos().subscribe(resp =>{
      //this.cargos = resp;

      resp.forEach((cargo: any[]) => {
        let cargoSupervisor: any = {
          id_cargo: '',
          car_nome: '',
          car_descricao:'',
          id_supervisor: '',
          su_nome: '',
          su_setor: ''
        }

        cargoSupervisor.id_cargo = cargo[0]
        cargoSupervisor.car_nome = cargo[1]
        cargoSupervisor.car_descricao = cargo[2]
        if(cargo[3] != null){
          cargoSupervisor.id_supervisor = cargo[3]
          cargoSupervisor.su_nome = cargo[4]
          cargoSupervisor.su_setor = cargo[5]
        }else{
          cargoSupervisor.id_supervisor = 0
          cargoSupervisor.su_nome = "-----"
          cargoSupervisor.su_setor = "-----"
        }

        this.cargos.push(cargoSupervisor)
      });
    } )
  }
  pegaIdExclusao(id:any){
    this.idExclusao = id
  }

  //fazer o cargo colocar todos os funcionario dele pra null
  excluirCargo(){
    console.log("Vou excluir o cargo:" + this.idExclusao)
    this.cargoService.excluirCargo(this.idExclusao).subscribe({
      complete: () => {this.cargoService.mensagem("Cargo excluído com sucesso")
                       this.ngOnInit();
                      },
      error: () => {this.cargoService.mensagem("Erro ao excluir o cargo, operação não concluída")}
    })
    // this.router.navigate(['/cargos'])
  }

}
