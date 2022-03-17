import { HttpClient } from '@angular/common/http';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Funcionario } from 'src/app/modelos/funcModel';

@Component({
  selector: 'app-cadastrar-funcionario-cargoless',
  templateUrl: './cadastrar-funcionario-cargoless.component.html',
  styleUrls: ['./cadastrar-funcionario-cargoless.component.css']
})
export class CadastrarFuncionarioCargolessComponent implements OnInit {

  idFuncCadastrado: any
  isFuncionarioCadastrado: boolean = false
  foto: any

  funcionario:Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: '',
    func_foto: ''
  }

  constructor(private funcionarioService:FuncionarioService,
              private location:Location,
              private http:HttpClient) { }

  ngOnInit(): void {
  }

  voltar(){
    this.location.back()
  }

  cadastrarFuncionario(){
    this.funcionarioService.cadastraFuncSemCargo(this.funcionario).subscribe(resposta => {
      let funcionarioCadastrado:Funcionario = resposta
      this.isFuncionarioCadastrado = true
      this.idFuncCadastrado = funcionarioCadastrado.id_funcionario
      this.funcionarioService.mensagem("Funcionário Cadastrado com sucesso")
      })
  }

  uparFoto(event:any){
    if(event.target.files && event.target.files[0]){
      let dest = 2
      this.foto = event.target.files[0]
      const formData = new FormData
      formData.append("foto", this.foto)

      // ditando como será o nome do arquivo upado
      const nome:String = this.funcionario.func_nome + '-' + event.target.files[0].name
      this.http.post(`http://localhost:8080/empresa/envio/${this.idFuncCadastrado}/${dest}?nome=${nome}`,formData).subscribe({
        complete: () => {console.log("foto enviada")}
      })
      this.funcionario.func_foto = "assets/fotos/" + nome
      this.funcionarioService.mensagem("foto anexada ao funcionário")
      this.location.back()
    }
  }
}
