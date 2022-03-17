import { Funcionario } from 'src/app/modelos/funcModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../modelos/cargoModel';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  baseUrl: string = "http://localhost:8080/empresa"

  constructor(private http:HttpClient,
              private location:Location,
              private snackBar: MatSnackBar) { }

  mensagem(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['cor-mensagem']
    })
  }//

  listaFuncs(id_cargo:String):Observable<Funcionario[]>{
    const url = `${this.baseUrl}/funcionario/busca-cargo/${id_cargo}`
    return this.http.get<Funcionario[]>(url)
  }

  cadastrarFuncComCargo(funcionario:Funcionario, id_cargo:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/cargo/${id_cargo}`
    return this.http.post<Funcionario>(url, funcionario)
  }

  cadastraFuncSemCargo(funcionario:Funcionario):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario`
    return this.http.post<Funcionario>(url, funcionario)
  }

  //dado o id de um funcionario retorna do BD o id da turma dele
  buscaIdCargo(id_funcionario:String):Observable<String>{
    const url = `${this.baseUrl}/funcionario/buscar-id-cargo/${id_funcionario}`
    return this.http.get<String>(url)
  }

  //busca as informaçoes de um funcionario pelo seu id
  buscaFunc(id_funcionario:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.http.get<Funcionario>(url)
  }

  deletarFunc(id_funcionario:String):Observable<void>{
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.http.delete<void>(url)
  }

  editarFunc(id_funcionario:String, funcionario:Funcionario):Observable<void>{
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.http.put<void>(url, funcionario)
  }

  buscarFuncionariosComCargo():Observable<Object[]>{
    const url = `${this.baseUrl}/funcionario-cargo`
    return this.http.get<Object[]>(url)
  }

  deixarFuncionarioSemCargo(id_funcionario:any, funcionario:Funcionario):Observable<void>{
    const url = `${this.baseUrl}/funcionario/deixarSemCargo/${id_funcionario}`
    return this.http.put<void>(url, funcionario);
  }

  atribuirCargoFuncionario(id_funcionario:any, cargo: Cargo):Observable<void>{
    const url = `${this.baseUrl}/funcionario/inserirCargo/${id_funcionario}`
    return this.http.put<void>(url,cargo)
  }

  buscarFuncionarioPeloNome(nome_func:String):Observable<Funcionario>{
    const url = `${this.baseUrl}/funcionario/bucarPeloNome/${nome_func}`
    return this.http.get<Funcionario>(url)
  }

  voltar(){
    this.location.back()
  }

  //retorna os dados dos funcionarios = dados do funcionario + dados do cargo dele, o difernte é a inclusão da foto no retorno
  registroFuncionarios():Observable<any[]>{
    const url = `${this.baseUrl}/funcionario/registros`
    return this.http.get<any[]>(url)
  }
}
