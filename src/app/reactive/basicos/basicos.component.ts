import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  /*   miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl('Ejemplo producto'),
    precio: new FormControl(1000),
    existencias: new FormControl(12),
  }); */

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'Ejemplo de producto',
      precio: 1000,
      existencias: 2,
    });
  }

  campoNoEsValido(campo: string) {
    return (
      this.miFormulario?.controls[campo].invalid &&
      this.miFormulario?.controls.nombre?.touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log('Guardado: ' + this.miFormulario.value);
    this.miFormulario.reset();
  }
}
