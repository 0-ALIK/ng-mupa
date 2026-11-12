import {
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';

import { MupaFormControlBase } from '../forms/form-control-base';
import type { EstadoCheckbox } from './checkbox.types';

let siguienteId = 0;

/**
 * Casilla de verificación del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: caja de 20 px con radio de
 * 6 px, borde de 1.5 px, marca SVG local y estado indeterminado.
 */
@Component({
  selector: 'mupa-checkbox',
  template: `
    <label
      class="mupa-checkbox"
      [class.mupa-checkbox--activo]="activo()"
      [class.mupa-checkbox--deshabilitado]="estaDeshabilitado()"
      [class.mupa-checkbox--error]="mostrarError()"
      [attr.data-estado]="estado()"
    >
      <input
        #inputNativo
        class="mupa-checkbox__input"
        type="checkbox"
        [id]="id()"
        [checked]="marcado()"
        [disabled]="estaDeshabilitado()"
        [required]="requerido()"
        [indeterminate]="indeterminado()"
        [attr.aria-checked]="indeterminado() ? 'mixed' : null"
        [attr.aria-required]="requerido() || requeridoFormulario() ? 'true' : null"
        [attr.aria-invalid]="invalido() ? 'true' : null"
        (change)="alCambiar($event)"
        (blur)="notificarTocado()"
      />

      <span class="mupa-checkbox__caja" aria-hidden="true">
        @if (indeterminado()) {
          <span class="mupa-checkbox__guion"></span>
        } @else if (marcado()) {
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        }
      </span>

      @if (etiqueta()) {
        <span class="mupa-checkbox__etiqueta">{{ etiqueta() }}</span>
      }
    </label>
  `,
  styleUrl: './checkbox.component.css',
})
export class MupaCheckbox extends MupaFormControlBase<boolean> {
  private readonly inputNativo = viewChild<ElementRef<HTMLInputElement>>('inputNativo');

  /** Estado marcado. Admite enlace bidireccional con `[(marcado)]`. */
  readonly marcado = model(false);

  /** Muestra un guion en lugar de la marca. */
  readonly indeterminado = input(false, { transform: booleanAttribute });

  /** Deshabilita la interacción. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Marca el control como requerido en el formulario. */
  readonly requerido = input(false, { transform: booleanAttribute });

  /** Texto opcional junto a la casilla. */
  readonly etiqueta = input<string>();

  /** Identificador del input nativo. */
  readonly id = input(`mupa-checkbox-${++siguienteId}`);

  protected readonly activo = computed(() => this.marcado() || this.indeterminado());

  protected readonly estaDeshabilitado = computed(
    () => this.deshabilitado() || this.deshabilitadoEfectivo(),
  );

  protected readonly invalido = computed(() => this.invalidoFormulario());

  protected readonly mostrarError = computed(
    () => this.invalidoFormulario() && this.tocadoFormulario(),
  );

  protected readonly estado = computed<EstadoCheckbox>(() => {
    if (this.indeterminado()) return 'indeterminado';
    return this.marcado() ? 'marcado' : 'sin-marcar';
  });

  protected alCambiar(evento: Event): void {
    const marcado = (evento.target as HTMLInputElement).checked;
    this.marcado.set(marcado);
    this.notificarCambio(marcado);
  }

  protected escribirValor(valor: boolean): void {
    this.marcado.set(Boolean(valor));
  }

  focus(): void {
    this.inputNativo()?.nativeElement.focus();
  }
}
