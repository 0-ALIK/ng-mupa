import { Component, input, model } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { OpcionSegmentada } from './segmented.types';

/**
 * Control segmentado compacto.
 *
 * Réplica del patrón `.seg` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-segmented',
  imports: [MupaIcon],
  template: `
    <div class="mupa-segmented" role="group" [attr.aria-label]="ariaLabel()">
      @for (opcion of opciones(); track opcion.valor) {
        <button
          type="button"
          class="mupa-segmented__opcion"
          [class.mupa-segmented__opcion--activa]="valor() === opcion.valor"
          [attr.aria-pressed]="valor() === opcion.valor"
          [disabled]="opcion.deshabilitada ?? false"
          (click)="seleccionar(opcion.valor)"
        >
          @if (opcion.icono) {
            <mupa-icon [nombre]="opcion.icono" [tamano]="16" />
          }
          {{ opcion.etiqueta }}
        </button>
      }
    </div>
  `,
  styleUrl: './segmented.component.css',
})
export class MupaSegmented {
  /** Opciones del control. */
  readonly opciones = input.required<readonly OpcionSegmentada[]>();

  /** Valor seleccionado. */
  readonly valor = model<string>('');

  /** Nombre accesible del grupo. */
  readonly ariaLabel = input('Opciones');

  protected seleccionar(valor: string): void {
    this.valor.set(valor);
  }
}
