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


  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }//

  //dizendo que traremos uma lista do tipo Cargo
  mostrarTodosCargos():Observable<any[]>{
    const url = `${this.baseUrl}/cargo/cargo-supervisor`;
    return this.http.get<any[]>(url);
  }

  mostrarTodosCargosAlterado():Observable<Cargo[]>{
    const url = `${this.baseUrl}/cargo/cargo-supervisor`;
    return this.http.get<Cargo[]>(url);
  }


  mostrarUmCargo(id:String):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.get<Cargo>(url);
  }

  cadastrarCargo(cargo:Cargo):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo`;
    return this.http.post<Cargo>(url, cargo)
  }

  excluirCargo(id:String):Observable<void>{
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.delete<void>(url)
  }

  editarCargo(cargo:Cargo):Observable<void>{
    const url = `${this.baseUrl}/cargo/${cargo.id_cargo}`;
    return this.http.put<void>(url, cargo)
  }

  atribuirSupervisor(cargo:Cargo, id_cargo:String, id_supervisor:String){
    const url = `${this.baseUrl}/cargo/definirSupervisor/${id_cargo}/${id_supervisor}`
    return this.http.put<void>(url, cargo)
  }

  deixarCargoSemSupervisor(cargo:Cargo, id_cargo:String, id_supervisor:String){
    ///cargo/tirarSupervisor/{id_cargo}/{id_supervisor}
    const url = `${this.baseUrl}/cargo/tirarSupervisor/${id_cargo}/${id_supervisor}`
    return this.http.put<void>(url, cargo)
  }

  mostraCargosSemSupervisor():Observable<Cargo[]>{
    const url = `${this.baseUrl}/cargoSemSupervisor`
    return this.http.get<Cargo[]>(url)
  }
}
