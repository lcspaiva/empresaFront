import { CargoService } from 'src/app/servicos/cargo.service';
import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/modelos/cargoModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edicao-cargo',
  templateUrl: './edicao-cargo.component.html',
  styleUrls: ['./edicao-cargo.component.css']
})
export class EdicaoCargoComponent implements OnInit {

  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_descricao: ''
  }

  constructor(private cargoService:CargoService, private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id')
    this.mostrarUmCargo();
  }

  mostrarUmCargo(){
    this.cargoService.mostrarUmCargo(this.cargo.id_cargo).subscribe(resultado => {
      this.cargo = resultado;
    })
  }

  editarCargo(){
    this.cargoService.editarCargo(this.cargo).subscribe({
      complete: () => this.cargoService.mensagem("Cargo editado com sucesso."),
      error: () => this.cargoService.mensagem("Erro, esse cargo não pôde ser editado.")
    })
    setTimeout(() => 1000);
    this.router.navigate(['/cargos'])
  }
}
