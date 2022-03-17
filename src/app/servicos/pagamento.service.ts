import { Pagamento } from './../modelos/pagamentoModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  baseUrl = `http://localhost:8080/empresa`


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
  }

  //retorna todos os pagamentos associado a um determinado funcionario
  mostraPagamentosFuncionario(id_funcionario:String):Observable<Pagamento[]>{
    const url = `${this.baseUrl}/pagamento/funcionario/${id_funcionario}`
    return this.http.get<Pagamento[]>(url)
  }

  //exibe todos os pagamentos presentes no banco
  mostraTodosPagamentos():Observable<Pagamento[]>{
    const url = `${this.baseUrl}/pagamento`
    return this.http.get<Pagamento[]>(url)
  }

  //exibe um único pagamento por meio do seu id
  mostraUmPagamento(codigo:String):Observable<Pagamento>{
    const url = `${this.baseUrl}/pagamento/${codigo}`
    return this.http.get<Pagamento>(url)
  }

  //faz o cadastro de um pagamento e o vincula a um funcionario
  cadastrarPagamento(id_funcionario:String, pagamento:Pagamento):Observable<Pagamento>{
    const url = `${this.baseUrl}/pagamento/cadastrarPagamento/${id_funcionario}`
    return this.http.post<Pagamento>(url, pagamento)
  }

  //faz o pagamento de uma fatura
  efetuarPagamento(pagamento:Pagamento, codigo:any):Observable<Pagamento>{
    const url = `${this.baseUrl}/pagamento/efetuarPagamento/${codigo}`
    return this.http.put<Pagamento>(url, pagamento)
  }

  //faz o cancelamento de uma fatura
  cancelarPagamento(pagamento:Pagamento, codigo:any):Observable<Pagamento>{
    const url = `${this.baseUrl}/pagamento/cancelarPagamento/${codigo}`
    return this.http.put<Pagamento>(url, pagamento)
  }

  //edita um pagamento
  editarPagamento(codigo:String, id_funcionario:String, pagamento:Pagamento):Observable<Pagamento>{
    const url = `${this.baseUrl}/pagamento/editarPagamento/${codigo}/${id_funcionario}`
    return this.http.put<Pagamento>(url, pagamento)
  }

  //deleta um pagamento
  deletarPagamento(codigo:String):Observable<Pagamento>{
    const url = `${this.baseUrl}/pagamento/deletarPagamento/${codigo}`
    return this.http.delete<Pagamento>(url)
  }

  //retorna o id de um funcionario mediante um codigo de pagamento
  fetchFuncByCod(codigo:any):Observable<String>{
    const url = `${this.baseUrl}/pagamento/fetchFuncionario/${codigo}`
    return this.http.get<String>(url)
  }
}

