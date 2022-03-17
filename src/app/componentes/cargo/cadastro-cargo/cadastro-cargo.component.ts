import { CargoService } from '../../../servicos/cargo.service';
import { Cargo } from '../../../modelos/cargoModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cargo',
  templateUrl: './cadastro-cargo.component.html',
  styleUrls: ['./cadastro-cargo.component.css']
})
export class CadastroCargoComponent implements OnInit {

  cargo:Cargo = {
    car_nome: '',
    car_descricao: '',
  }

  constructor(private cargoService:CargoService,
              private router:Router) { }

  ngOnInit(): void {
  }

  //função para fazer o cadastro de um novo cargo, para tal enviamos um objeto contendo os dados no formato do modelo criado no arquivo de modelo
  cadastrarCargo(){
    this.cargoService.cadastrarCargo(this.cargo).subscribe(resultado => {
      this.cargoService.mensagem("Novo cargo cadastrado")
      this.router.navigate(['/cargos'])
    })
  }

}
