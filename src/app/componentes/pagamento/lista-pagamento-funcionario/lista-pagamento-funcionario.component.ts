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

  //guarda o id do funcionário
  id_funcionario: any

  //guarda o nome do funcionario
  nome_funcionario: any

  //pega o codigo do pagamento que foi clicado, para poder vincular no botao do modal
  codigoExclusao: any

  //guardará os obj dos pagamentos de um funcionario especifico
  pagamentos:Pagamento[] = []

  constructor(private pagamentoService: PagamentoService,
              private funcionarioService:FuncionarioService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")
    this.mostraPagamentosFuncionario()
    this.mostraNomeFuncionario()
  }

  //mostra todos os pagamentos vinculados a um funcionario especifico
  mostraPagamentosFuncionario(){
    this.pagamentoService.mostraPagamentosFuncionario(this.id_funcionario).subscribe(resposta => {
      this.pagamentos = resposta
    })
  }

  //busca o nome do funcionario pelo seu id. Esse nome será exibido na página
  mostraNomeFuncionario(){
    this.funcionarioService.buscaFunc(this.id_funcionario).subscribe(resposta => {
      this.nome_funcionario = resposta.func_nome;
    })
  }

  //faz o pagamento de um pagamento
  efetuarPagamento(pagamento:Pagamento, codigo:any){
    this.pagamentoService.efetuarPagamento(pagamento, codigo).subscribe({
      complete: () => {this.pagamentoService.mensagem("pagamento realizado")
                        this.mostraPagamentosFuncionario()},
      error: () => {this.pagamentoService.mensagem("Erro, pagamento falhou")}
    })
  }

  //cancela um pagamento
  cancelarPagamento(pagamento:Pagamento, codigo:any){
    this.pagamentoService.cancelarPagamento(pagamento, codigo).subscribe({
      complete: () => {this.pagamentoService.mensagem("pagamento realizado")
                      this.mostraPagamentosFuncionario()},
      error: () => {this.pagamentoService.mensagem("Erro, pagamento falhou")}
    })
  }

  //captura o id do pagamento que será excluido
  pegaIdExclusao(codigo:any){
    this.codigoExclusao = codigo
  }

  //faz a requisição ao banco para excluir um pagamento mediante seu codigo
  excluirPagamento(){
    this.pagamentoService.deletarPagamento(this.codigoExclusao).subscribe({
      complete: () => {this.pagamentoService.mensagem("Pagamento excluído")
                      this.mostraPagamentosFuncionario()
                      },
      error: () => this.pagamentoService.mensagem("Erro, o pagamento não pôde ser excluido")
    })
  }
}
