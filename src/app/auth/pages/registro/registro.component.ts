import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.noPuedeSerRebeco],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Pedro Leon',
      email: 'test1@test.com',
      username: 'pedro.leon',
      password: '123456',
      password2: '123456',
    });
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.controls['email'].errors;

    if (errors?.required) return 'El email es obligatorio';
    else if (errors?.pattern) return 'El email no tiene un formato válido';
    else if (errors?.emailYaExiste) return 'El email ya existe en la BD';

    return '';
  }

  campoNoEsValido(campo: string) {
    return (
      this.miFormulario?.controls[campo].invalid &&
      this.miFormulario?.controls[campo]?.touched
    );
  }

  submitFormulario() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
