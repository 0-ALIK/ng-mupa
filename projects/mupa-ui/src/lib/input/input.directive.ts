import { Directive } from '@angular/core';

/**
 * Aplica los estilos oficiales de `forms/field.css` a un input o textarea nativo.
 *
 * No gestiona el valor ni implementa ControlValueAccessor. El control sigue
 * siendo nativo, por lo que funciona con Reactive Forms, Template-driven,
 * Signal Forms y formularios HTML vanilla.
 *
 * Los estilos viven en `theme/forms.css`. El consumidor debe cargar ese CSS
 * globalmente.
 */
@Directive({
  selector: 'input[mupaInput], textarea[mupaInput]',
  host: {
    class: 'mupa-field__input',
  },
})
export class MupaInputDirective {}
