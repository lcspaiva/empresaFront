import { HttpClient } from '@angular/common/http';
import { CargoService } from './../../../servicos/cargo.service';
import { FuncionarioService } from '../../../servicos/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/modelos/funcModel';
import { Cargo } from 'src/app/modelos/cargoModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {

  //guarda o caminho da foto que foi anexada
  foto: any

  //guarda o id do cargo
  id_cargo: String = ''

  //determina se o funcionario já foi cadastrado, utilizado para ativar o envio da foto
  isFuncionarioCadastrado: boolean = false

  //guarda o id do funcionario que acabou de ser inserido no sistema, será utilizado para vincular a foto ao seu registro no banco de dados
  idFuncionarioCadastrado: any

  //modelo do objeto do funcionário
  func: Funcionario = {
    id_funcionario: '',
    func_cidade: '',
    func_nome:'',
    func_foto: ''
  }
  //modelo do objeto do cargo
  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_descricao: ''
  }

  constructor(private route:ActivatedRoute,
    private router:Router,
    private funcionarioService:FuncionarioService,
    private cargoService: CargoService,
    private http:HttpClient,
    private location:Location) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")!
    this.mostraCargo()
  }

  //busca as informações de um cargo dado o seu id
  mostraCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resposta => {
      this.cargo = resposta
    })
  }

  //faz o cadastro de um funcionario ao sistema
  cadastrarFuncionario(){
    this.funcionarioService.cadastrarFuncComCargo(this.func, this.id_cargo).subscribe(resposta => {
      let funcionarioCadastrado: Funcionario = resposta
      this.idFuncionarioCadastrado = funcionarioCadastrado.id_funcionario
      this.isFuncionarioCadastrado  = true
      this.funcionarioService.mensagem("Funcionário cadastrado com sucesso")
    })
  }//cadastrar Funcionario

  //faz o upload da foto no sistema
  uparFoto(event:any){
    if(event.target.files && event.target.files[0]){
      let dest = 2
      this.foto = event.target.files[0]
      const formData = new FormData
      formData.append("foto", this.foto)

      // ditando como será o nome do arquivo upado
      const nome:String = this.func.func_nome + '-' + event.target.files[0].name
      this.http.post(`http://localhost:8080/empresa/envio/${this.idFuncionarioCadastrado}/${dest}?nome=${nome}`,formData).subscribe({
        complete: () => {console.log("foto enviada")}
      })
      this.func.func_foto = "assets/fotos/" + nome
      this.funcionarioService.mensagem("foto anexada ao supervisor")
      this.location.back()
    }
  }
}
