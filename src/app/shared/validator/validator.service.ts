import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  noPuedeSerRebeco(control: FormControl): ValidationErrors | null {
    const valor = control.value?.trim().toLowerCase();
    if (valor === 'rebeco') {
      return {
        esRebeco: true,
      };
    }
    return null; // No hay errores
  }

  camposIguales(campo1: string, campo2: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value1 = control.get(campo1)?.value;
      const value2 = control.get(campo2)?.value;

      if (value1 !== value2) {
        control.get(campo2)?.setErrors({ camposIguales: false });
        return {
          camposIguales: false,
        };
      }

      // Cuidado que esto elimina el error de campos iguales y cualquier otro que tuviera
      control.get(campo2)?.setErrors(null);
      return null;
    };
  }
}
