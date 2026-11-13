import { booleanAttribute, Component, input, model } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { OpcionRadio, OrientacionRadio, VarianteRadio } from './radio.types';

/**
 * Grupo de radio.
 *
 * Por defecto usa la apariencia simple del sistema; con `variante="tarjeta"`
 * adopta el patrón de tarjetas seleccionables del Lego Design System.
 */
@Component({
  selector: 'mupa-radio',
  imports: [MupaIcon],
  template: `
    <div
      class="mupa-radio"
      [class.mupa-radio--tarjeta]="variante() === 'tarjeta'"
      [class.mupa-radio--horizontal]="orientacion() === 'horizontal'"
      role="radiogroup"
      [attr.aria-label]="ariaLabel() ?? null"
    >
      @for (opcion of opciones(); track opcion.valor) {
        <label
          class="mupa-radio__opcion"
          [class.mupa-radio__opcion--activa]="valor() === opcion.valor"
          [class.mupa-radio__opcion--deshabilitada]="deshabilitado() || opcion.deshabilitada"
        >
          <input
            type="radio"
            class="mupa-radio__input"
            [name]="nombre()"
            [value]="opcion.valor"
            [checked]="valor() === opcion.valor"
            [disabled]="deshabilitado() || opcion.deshabilitada"
            (change)="seleccionar(opcion.valor)"
          />

          <span class="mupa-radio__marca" aria-hidden="true"></span>

          <span class="mupa-radio__contenido">
            <span class="mupa-radio__etiqueta">
              @if (opcion.icono) {
                <mupa-icon [nombre]="opcion.icono" [tamano]="16" />
              }
              {{ opcion.etiqueta }}
            </span>
            @if (opcion.descripcion) {
              <span class="mupa-radio__descripcion">
                {{ opcion.descripcion }}
              </span>
            }
          </span>
        </label>
      }
    </div>
  `,
  styleUrl: './radio.component.css',
})
export class MupaRadio {
  /** Opciones del grupo. */
  readonly opciones = input.required<readonly OpcionRadio[]>();

  /** Nombre nativo del grupo; debe ser único en el formulario. */
  readonly nombre = input.required<string>();

  /** Apariencia: simple o tarjeta. */
  readonly variante = input<VarianteRadio>('simple');

  /** Disposición de las opciones. */
  readonly orientacion = input<OrientacionRadio>('vertical');

  /** Deshabilita todo el grupo. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Nombre accesible del grupo. */
  readonly ariaLabel = input<string>();

  /** Valor seleccionado. */
  readonly valor = model<string | null>(null);

  protected seleccionar(valor: string): void {
    this.valor.set(valor);
  }
}
