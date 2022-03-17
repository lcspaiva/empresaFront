import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Pagamento } from './../../../modelos/pagamentoModel';
import { ActivatedRoute } from '@angular/router';
import { PagamentoService } from './../../../servicos/pagamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pagamento-funcionario',
  templateUrl: './lista-pagamento-funcionario.component.html',
  styleUrls: ['./lista-pagamento-funcionario.component.css']
})
export class ListaPagamentoFuncionarioComponent implements OnInit {

  id_funcionario: any
  nome_funcionario: any

  //pega o codigo do pagamento que foi clicado, para poder vincular no botao do modal
  codigoExclusao: any

  pagamentos:Pagamento[] = []

  constructor(private pagamentoService: PagamentoService,
              private funcionarioService:FuncionarioService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")
    this.mostraPagamentosFuncionario()
    this.mostraNomeFuncionario()
  }

  mostraPagamentosFuncionario(){
    this.pagamentoService.mostraPagamentosFuncionario(this.id_funcionario).subscribe(resposta => {
      this.pagamentos = resposta
    })
  }

  mostraNomeFuncionario(){
    this.funcionarioService.buscaFunc(this.id_funcionario).subscribe(resposta => {
      this.nome_funcionario = resposta.func_nome;
    })
  }

  efetuarPagamento(pagamento:Pagamento, codigo:any){
    this.pagamentoService.efetuarPagamento(pagamento, codigo).subscribe({
      complete: () => {this.pagamentoService.mensagem("pagamento realizado")
                        this.mostraPagamentosFuncionario()},
      error: () => {this.pagamentoService.mensagem("Erro, pagamento falhou")}
    })
  }

  cancelarPagamento(pagamento:Pagamento, codigo:any){
    this.pagamentoService.cancelarPagamento(pagamento, codigo).subscribe({
      complete: () => {this.pagamentoService.mensagem("pagamento realizado")
                      this.mostraPagamentosFuncionario()},
      error: () => {this.pagamentoService.mensagem("Erro, pagamento falhou")}
    })
  }

  pegaIdExclusao(codigo:any){
    this.codigoExclusao = codigo
  }

  excluirPagamento(){
    this.pagamentoService.deletarPagamento(this.codigoExclusao).subscribe({
      complete: () => {this.pagamentoService.mensagem("Pagamento excluído")
                      this.mostraPagamentosFuncionario()
                      },
      error: () => this.pagamentoService.mensagem("Erro, o pagamento não pôde ser excluido")
    })
  }
}
