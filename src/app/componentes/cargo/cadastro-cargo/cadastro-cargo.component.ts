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

  cadastrarCargo(){
    this.cargoService.cadastrarCargo(this.cargo).subscribe(resultado => {
      this.cargoService.mensagem("Novo cargo cadastrado")
      this.router.navigate(['/cargos'])
    })
  }

}
