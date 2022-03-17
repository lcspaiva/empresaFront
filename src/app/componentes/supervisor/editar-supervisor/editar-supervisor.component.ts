import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SupervisorService } from './../../../servicos/supervisor.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Supervisor } from 'src/app/modelos/supervisorModel';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-supervisor',
  templateUrl: './editar-supervisor.component.html',
  styleUrls: ['./editar-supervisor.component.css']
})
export class EditarSupervisorComponent implements OnInit {

  id_supervisor: any

  foto:any = ''

  supervisor:Supervisor = {
    id_supervisor: '',
    su_nome: '',
    su_setor: '',
    su_foto: ''
  }

  constructor(private supervisorService: SupervisorService,
              private location: Location,
              private route: ActivatedRoute,
              private http:HttpClient,
              private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.id_supervisor = this.route.snapshot.paramMap.get("id_supervisor")
    this.mostraSupervisor()
  }

  sanitize(url:any){
    console.log(url.replaceAll("\\", "/"))
    return this.sanitizer.bypassSecurityTrustUrl(url.replaceAll("\\", "/"));
  }

  limpaPath(url:String){
    //D:\Estudos\SoulCode\Extensão Java\empresaFront\src\assets\fotos\
    console.log(url.slice(64))
    return "assets/fotos/" + url.slice(64)
  }

  mostraSupervisor(){
    this.supervisorService.buscarUmSupervisor(this.id_supervisor).subscribe(resposta => {
      this.supervisor = resposta;
    })
  }

  editarFunc(){
    this.supervisorService.editarSupervisor(this.id_supervisor, this.supervisor).subscribe({
      complete: () => {this.supervisorService.mensagem("supervisor editado")
                      this.location.back()},
      error: () => {this.supervisorService.mensagem("Erro: edição não concluida")}
    })
  }

  voltarPag(){
    this.location.back()
  }

  uparFoto(event:any){
    if(event.target.files && event.target.files[0]){
      let dest = 1
      this.foto = event.target.files[0]
      const formData = new FormData
      formData.append("foto", this.foto)

      // ditando como será o nome do arquivo upado
      const nome:String = this.supervisor.su_nome + '-' + event.target.files[0].name
      this.http.post(`http://localhost:8080/empresa/envio/${this.id_supervisor}/${dest}?nome=${nome}`,formData).subscribe({
        complete: () => {
          console.log("foto enviada")
          }
      })

      this.supervisorService.mensagem("foto anexada ao supervisor")
      this.location.back()
    }
  }

}
