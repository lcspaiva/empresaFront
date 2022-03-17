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

  id_funcionario: any
  codigo: any

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

  preencheCampos(){
    this.pagamentoService.mostraUmPagamento(this.codigo).subscribe(resposta => {
      this.pagamento = resposta
      this.pagamento.pa_lancamento = resposta.pa_lancamento.slice(0,10)
    })
  }

  editarPagamento(){
    this.pagamentoService.editarPagamento(this.codigo, this.id_funcionario, this.pagamento).subscribe({
      complete: () => {this.pagamentoService.mensagem("Pagamento editado com sucesso"),
                      this.location.back()},
      error: () => {this.pagamentoService.mensagem("ERRO: Pagamento não foi editado")}
    })
  }

  voltarPag(){
    this.location.back()
  }
}
