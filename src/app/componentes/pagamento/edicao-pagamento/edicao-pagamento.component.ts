import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PagamentoService } from './../../../servicos/pagamento.service';
import { Component, OnInit } from '@angular/core';
import { Pagamento } from 'src/app/modelos/pagamentoModel';

@Component({
  selector: 'app-edicao-pagamento',
  templateUrl: './edicao-pagamento.component.html',
  styleUrls: ['./edicao-pagamento.component.css']
})
export class EdicaoPagamentoComponent implements OnInit {

  //guarda o id de um funcionario
  id_funcionario: any

  //guarda o codigo do pagamento
  codigo: any

  //modelo do obj pagamento
  pagamento: Pagamento = {
    codigo: '',
    pa_descricao: '',
    pa_categoria: '',
    pa_lancamento: '',
    pa_valor: ''
  }

  constructor(private pagamentoService:PagamentoService,
              private location:Location,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")
    this.codigo = this.route.snapshot.paramMap.get("codigo")
    this.preencheCampos()
  }

  //puxa os dados de um pagamento do banco de dados por meio do seu código
  preencheCampos(){
    this.pagamentoService.mostraUmPagamento(this.codigo).subscribe(resposta => {
      this.pagamento = resposta
      this.pagamento.pa_lancamento = resposta.pa_lancamento.slice(0,10)
    })
  }

  //edita os dados de um pagamento ao enviar o obj contendo os novos dados. Esses dados serão enviados e salvos no banco de dados
  editarPagamento(){
    this.pagamentoService.editarPagamento(this.codigo, this.id_funcionario, this.pagamento).subscribe({
      complete: () => {this.pagamentoService.mensagem("Pagamento editado com sucesso"),
                      this.location.back()},
      error: () => {this.pagamentoService.mensagem("ERRO: Pagamento não foi editado")}
    })
  }

  //função para voltar à página anterior
  voltarPag(){
    this.location.back()
  }
}
