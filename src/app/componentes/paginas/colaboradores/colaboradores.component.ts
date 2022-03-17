import { Supervisor } from './../../../modelos/supervisorModel';
import { Funcionario } from './../../../modelos/funcModel';
import { SupervisorService } from 'src/app/servicos/supervisor.service';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent implements OnInit {

  // guardará os objetos referentes ao funcionario que constarem na base de dados
  funcionarios: any = []

  // guardará os objetos referentes ao funcionario que constarem na base de dados
  supervisores: any = []

  constructor(private funcionarioService:FuncionarioService,
              private supervisorService: SupervisorService) { }

  ngOnInit(): void {
    this.listarFuncionarios()
    this.listarSupervisores()
  }

  //lista todos os funcionarios que constarem na base de dados
  listarFuncionarios(){
    this.funcionarioService.registroFuncionarios().subscribe(resposta => {
      resposta.forEach((func: any) => {

        let func_aux = {
          id_funcionario: func[0],
          func_nome: func[1],
          func_cidade: func[2],
          func_foto: func[3],
          id_cargo: func[6],
          car_nome: func[4],
          car_desc: func[5]
        }

        this.funcionarios.push(func_aux)
      });
    })
  }

  //lista todos os supervisores que constarem na base de dados
  listarSupervisores(){
    this.supervisorService.supevisorRegistro().subscribe(resposta => {

      resposta.forEach((supp: any[]) => {

        let supp_aux = {
          id_supervisor: supp[0],
          sup_nome: supp[1],
          sup_setor: supp[2],
          sup_foto: supp[3],

          id_cargo: supp[4],
          sup_cargo: supp[5],
          sup_desc: supp[6]
        }

        this.supervisores.push(supp_aux)
      })

    })
  }

}
