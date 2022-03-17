import { MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../modelos/cargoModel';


@Injectable({
  providedIn: 'root'
})
export class CargoService {

  baseUrl: String = "http://localhost:8080/empresa";

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }


  //dados para exibir o alert
  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }

  //exibe todos os cargos e seus respectivos supervisores
  mostrarTodosCargos():Observable<any[]>{
    const url = `${this.baseUrl}/cargo/cargo-supervisor`;
    return this.http.get<any[]>(url);
  }

  //teste
  mostrarTodosCargosAlterado():Observable<Cargo[]>{
    const url = `${this.baseUrl}/cargo/cargo-supervisor`;
    return this.http.get<Cargo[]>(url);
  }

  //exibe um cargo buscado pelo seu id
  mostrarUmCargo(id:String):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.get<Cargo>(url);
  }

  //cadastra um novo cargo no banco
  cadastrarCargo(cargo:Cargo):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo`;
    return this.http.post<Cargo>(url, cargo)
  }

  //exclui um cargo do banco
  excluirCargo(id:String):Observable<void>{
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.delete<void>(url)
  }

  //edita um cargo do banco
  editarCargo(cargo:Cargo):Observable<void>{
    const url = `${this.baseUrl}/cargo/${cargo.id_cargo}`;
    return this.http.put<void>(url, cargo)
  }

  //faz o vinculo entre supervisor e cargo
  atribuirSupervisor(cargo:Cargo, id_cargo:String, id_supervisor:String){
    const url = `${this.baseUrl}/cargo/definirSupervisor/${id_cargo}/${id_supervisor}`
    return this.http.put<void>(url, cargo)
  }

  //desfaz o vinculo entre supervisor e cargo
  deixarCargoSemSupervisor(cargo:Cargo, id_cargo:String, id_supervisor:String){
    ///cargo/tirarSupervisor/{id_cargo}/{id_supervisor}
    const url = `${this.baseUrl}/cargo/tirarSupervisor/${id_cargo}/${id_supervisor}`
    return this.http.put<void>(url, cargo)
  }

  //exibe todos os cargos que não possuem um supervisor vinculado
  mostraCargosSemSupervisor():Observable<Cargo[]>{
    const url = `${this.baseUrl}/cargoSemSupervisor`
    return this.http.get<Cargo[]>(url)
  }
}
