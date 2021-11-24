import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;
  constructor() {}

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Pedro',
    favoritos: [
      {
        id: 1,
        nombre: 'John Company',
      },
      {
        id: 2,
        nombre: 'Coin Series',
      },
    ],
  };

  ngOnInit(): void {}

  guardar() {
    console.log('Formulario posteado');
  }

  nombreValido(): boolean {
    return (
      this.miFormulario?.controls.nombre?.invalid &&
      this.miFormulario?.controls.nombre?.touched
    );
  }

  eliminar(indice: number) {
    this.persona.favoritos.splice(indice, 1);
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego,
    };

    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }
}
