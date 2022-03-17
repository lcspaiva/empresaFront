import { Router } from '@angular/router';
import { Pagamento } from './../../../modelos/pagamentoModel';
import { PagamentoService } from './../../../servicos/pagamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-todos-pagamentos',
  templateUrl: './listar-todos-pagamentos.component.html',
  styleUrls: ['./listar-todos-pagamentos.component.css']
})
export class ListarTodosPagamentosComponent implements OnInit {

  pagamentos: Pagamento[] = []
  codigoExclusao: any
  constructor(private pagamentoService: PagamentoService,
              private router:Router) { }

  ngOnInit(): void {
    this.listarTodosPagamentos()
  }

  listarTodosPagamentos(){
    this.pagamentoService.mostraTodosPagamentos().subscribe(resposta => {
      this.pagamentos = resposta
    })
  }

  efetuarPagamento(pagamento:Pagamento, codigo:any){
    this.pagamentoService.efetuarPagamento(pagamento, codigo).subscribe({
      complete: () => {this.pagamentoService.mensagem("pagamento realizado")
                        this.listarTodosPagamentos()},
      error: () => {this.pagamentoService.mensagem("Erro, pagamento falhou")}
    })
  }

  cancelarPagamento(pagamento:Pagamento, codigo:any){
    this.pagamentoService.cancelarPagamento(pagamento, codigo).subscribe({
      complete: () => {this.pagamentoService.mensagem("pagamento realizado")
                      this.listarTodosPagamentos()},
      error: () => {this.pagamentoService.mensagem("Erro, pagamento falhou")}
    })
  }

  pegaIdExclusao(codigo:any){
    this.codigoExclusao = codigo
  }

  excluirPagamento(){
    this.pagamentoService.deletarPagamento(this.codigoExclusao).subscribe({
      complete: () => {this.pagamentoService.mensagem("Pagamento excluído")
                      this.listarTodosPagamentos()
                      },
      error: () => this.pagamentoService.mensagem("Erro, o pagamento não pôde ser excluido")
    })
  }

  editarPagamento(codigo:any){
    this.pagamentoService.fetchFuncByCod(codigo).subscribe(resposta => {
      this.router.navigate([`/editarPagamento/${codigo}/${resposta}`])
    })
  }
}
