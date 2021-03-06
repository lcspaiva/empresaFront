import { ActivatedRoute } from '@angular/router';
import { PagamentoService } from './../../../servicos/pagamento.service';
import { Pagamento } from './../../../modelos/pagamentoModel';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-pagamento',
  templateUrl: './cadastrar-pagamento.component.html',
  styleUrls: ['./cadastrar-pagamento.component.css']
})
export class CadastrarPagamentoComponent implements OnInit {

  //guarda o id de um funcionario
  id_funcionario: any

  //modelo do obj pagamento
  pagamento: Pagamento = {
    codigo: '',
    pa_descricao: '',
    pa_categoria: 'PENDENTE',
    pa_lancamento: '',
    pa_valor: ''
  }

  constructor(private pagamentoService:PagamentoService,
              private route:ActivatedRoute,
              private location:Location) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get("id_funcionario")
  }

  //faz o envio dos dados referentes a um novo pagamento vinculado a um funcionario. Para tal devemos passar o id do funcionario
  cadastrarPagamento(){
    this.pagamentoService.cadastrarPagamento(this.id_funcionario, this.pagamento).subscribe({
      complete: () => {this.pagamentoService.mensagem("Pagamento cadastrado com sucesso")
                        this.location.back()},
      error: () => {this.pagamentoService.mensagem("Erro, pagamento não pôde ser efetuado")}
    })
  }
}
