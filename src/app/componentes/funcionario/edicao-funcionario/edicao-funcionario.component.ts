import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CargoService } from '../../../servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../servicos/funcionario.service';
import { Funcionario } from '../../../modelos/funcModel';
import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/modelos/cargoModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-funcionario',
  templateUrl: './edicao-funcionario.component.html',
  styleUrls: ['./edicao-funcionario.component.css']
})
export class EdicaoFuncionarioComponent implements OnInit {

  func: Funcionario = {
    id_funcionario:'',
    func_cidade:'',
    func_nome:'',
    func_foto: ''
  }

  //são os dados do cargo do funcionario
  cargo: Cargo = {
    id_cargo:'',
    car_descricao:'',
    car_nome:''
  }

  //armazenará os dados do cargo que foi escolhido no select
  cargoEscolhido: Cargo = {
    id_cargo:'',
    car_descricao:'',
    car_nome:''
  }

  cargosDisponiveis: Cargo[] = []

  foto:any

  //é o id do cargo do funcionario que já veio
  id_cargo: String = ''

  new_cargo: String = ''

  constructor(private funcionarioService:FuncionarioService,
    private route:ActivatedRoute,
    private router:Router,
    private cargoService:CargoService,
    private location: Location,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
    this.func.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.buscaIdCargo()
    this.buscaInfoFunc()
    this.listaCargos()
    this.pegaCargo()
  }

  //pega o id do cargo que está vinculado ao funcionario
  buscaIdCargo(){
    this.funcionarioService.buscaIdCargo(this.func.id_funcionario).subscribe((result) =>{
      this.id_cargo = result
      if(this.id_cargo != undefined){
        this.pegaCargo()
      }
    })
  }

  pegaCargo(){
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resposta => {
      this.cargo = resposta;
      console.log(this.cargo)
    })
  }

  //busca as informações do funcionario para preencher o formulario
  buscaInfoFunc(){
    this.funcionarioService.buscaFunc(this.func.id_funcionario).subscribe((result) => {
      this.func = result
    })
  }

  editarFunc(){
    this.funcionarioService.editarFunc(this.func.id_funcionario, this.func).subscribe({
      complete:()=>{
        this.funcionarioService.mensagem("Funcionário editado com sucesso")
        this.location.back()
      },
      error: () =>{
        this.funcionarioService.mensagem("Erro ao editar funcionário")
        this.location.back()
      }
    })
  }

  listaCargos(){
    this.cargoService.mostrarTodosCargos().subscribe((resultado) => {
      resultado.forEach((val:any[])=>{
        let cargo: any = {
          id_cargo: val[0],
          car_nome: val[1],
          car_descricao: val[2]
        }
        this.cargosDisponiveis.push(cargo)
      })
    }
  )}


  uparFoto(event:any){
    if(event.target.files && event.target.files[0]){
      let dest = 2
      this.foto = event.target.files[0]
      const formData = new FormData
      formData.append("foto", this.foto)

      // ditando como será o nome do arquivo upado
      const nome:String = this.func.func_nome + '-' + event.target.files[0].name
      this.http.post(`http://localhost:8080/empresa/envio/${this.func.id_funcionario}/${dest}?nome=${nome}`,formData).subscribe({
        complete: () => {console.log("foto enviada")}
      })
      this.func.func_foto = "assets/fotos/" + nome
      this.funcionarioService.mensagem("foto anexada ao funcionario")
      this.location.back()
    }
  }

  mostrarCargo(){
    this.cargo = this.cargoEscolhido
  }

  voltarPag(){
    this.location.back()
  }
}
