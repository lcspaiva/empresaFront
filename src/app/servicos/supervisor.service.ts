import { Supervisor } from 'src/app/modelos/supervisorModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  baseUrl = "http://localhost:8080/empresa"

  constructor(private http:HttpClient,
              private snackBar: MatSnackBar) { }

  //dados para exibir o alert
  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }//

  //busca o supervisor que está vinculado àquele cargo
  buscarSupervisorCargo(id_cargo:String):Observable<Supervisor>{
    const url = `${this.baseUrl}/supervisor-cargo/${id_cargo}`
    return this.http.get<Supervisor>(url);
  }

  //traz do banco todos os supervisores que não estao alocados a nenhum cargo
  buscarSupervisoresLivres():Observable<Supervisor[]>{
    const url = `${this.baseUrl}/supervisor-livres`
    return this.http.get<Supervisor[]>(url)
  }

  //traz todos os supervisores cadastrados
  buscarTodosSupervisores():Observable<any[]>{
    const url =  `${this.baseUrl}/supervisor/supervisor-cargo`
    return this.http.get<any[]>(url)
  }

  //busca um supervisor pelo seu nome
  buscarServidorByNome(supervisorNome:String):Observable<Supervisor>{
    const url = `${this.baseUrl}/supervisor/buscarSupervisorByNome/${supervisorNome}`
    return this.http.get<Supervisor>(url);
  }

  //faz o cadastro de um novo supervisor
  cadastrarSupervisor(supervisor: Supervisor):Observable<Supervisor>{
    const url = `${this.baseUrl}/supervisor`
    return this.http.post<Supervisor>(url, supervisor)
  }

  //busca o supervisor pelo seu id
  buscarUmSupervisor(id_supervisor:String):Observable<Supervisor>{
    const url = `${this.baseUrl}/supervisor/${id_supervisor}`
    return this.http.get<Supervisor>(url)
  }

  //edita os dados de um supervisor
  editarSupervisor(id_supervisor: any, supervisor:Supervisor):Observable<Supervisor>{
    const url = `${this.baseUrl}/supervisor/${id_supervisor}`
    return this.http.put<Supervisor>(url, supervisor)
  }

  //deleta um supervisor
  deletarSupervisor(id_supervisor:any):Observable<Supervisor>{
    //desvincular o supervisor do cargo e vice-versa
    //verifica se ele tem o id_cargo == null, se sim deleta direto
    //caso contrario tem que encontrar o id do cargo e fazer ele receber null, então o supervisor tbm recebe null, e então é excluido
    const url = `${this.baseUrl}/supervisor/${id_supervisor}`
    return this.http.delete<Supervisor>(url)
  }

  //traz os dados de um supervisor e seu respectivo cargo
  buscarCargoSupervisor(id_supervisor:String):Observable<any>{
    const url = `${this.baseUrl}/supervisor/checaCargo/${id_supervisor}`
    return this.http.get<any>(url)
  }

  supevisorRegistro():Observable<any[]>{
    const url = `${this.baseUrl}/supervisor/registros`
    return this.http.get<any[]>(url)
  }
}
