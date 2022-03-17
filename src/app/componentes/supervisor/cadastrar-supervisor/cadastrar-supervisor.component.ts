import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SupervisorService } from './../../../servicos/supervisor.service';
import { Component, OnInit } from '@angular/core';
import { Supervisor } from 'src/app/modelos/supervisorModel';

@Component({
  selector: 'app-cadastrar-supervisor',
  templateUrl: './cadastrar-supervisor.component.html',
  styleUrls: ['./cadastrar-supervisor.component.css']
})
export class CadastrarSupervisorComponent implements OnInit {

  //armazenará o id do supervisor que receberá a foto
  idSupervisorCadastrado: any

  //indicará se o supervisor já está cadastrado no banco e portanto pode receber uma foto
  isSupervisorCadastrado: boolean = false

  //receberá a foto que foi upada
  foto:any

  //modelo dos dados do obj supervisor
  supervisor: Supervisor = {
    id_supervisor: '',
    su_nome: '',
    su_setor: '',
    su_foto: ''
  }

  constructor(private supervisorService: SupervisorService,
              private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  //faz o cadastro do supervisor
  cadastrarSupervisor(){
    this.supervisorService.cadastrarSupervisor(this.supervisor).subscribe(resposta => {
      let supervisorCadastrado:Supervisor = resposta
      this.idSupervisorCadastrado = supervisorCadastrado.id_supervisor
      this.isSupervisorCadastrado = true
      this.supervisorService.mensagem("Supervisor Cadastrado")
    })
  }//cadastrarSupervisor

  //faz o upload da foto e vincula ao supervisor que está sendo cadastrado no momento
  uparFoto(event:any){
    if(event.target.files && event.target.files[0]){
      let dest = 1
      this.foto = event.target.files[0]
      const formData = new FormData
      formData.append("foto", this.foto)

      // ditando como será o nome do arquivo upado
      const nome:String = this.supervisor.su_nome + '-' + event.target.files[0].name
      this.http.post(`http://localhost:8080/empresa/envio/${this.idSupervisorCadastrado}/${dest}?nome=${nome}`,formData).subscribe({
        complete: () => {console.log("foto enviada")}
      })
      this.supervisor.su_foto = "assets/fotos/" + nome
      this.supervisorService.mensagem("foto anexada ao supervisor")
      this.router.navigate(['/listarSupervisor'])
    }
  }
}
