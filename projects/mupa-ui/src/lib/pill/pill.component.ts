import { booleanAttribute, Component, computed, input, output } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import {
  COLORES_PILL,
  CONFIGURACION_CONTORNO,
  CONFIGURACION_SOLIDA,
  type ColorPill,
  type DisenoPill,
  type TamanoPill,
} from './pill.types';

/**
 * Chip o etiqueta del sistema de diseño.
 *
 * Unifica el `Pill` de `AppKit.jsx`, el `Chip` de `WebKit.jsx` y las variantes
 * del preview `comp-pills.html`: categorías, estados semánticos, sólido,
 * contorno, icono y eliminación.
 */
@Component({
  selector: 'mupa-pill',
  imports: [MupaIcon],
  template: `
    <span
      [class]="clases()"
      [style.background]="configuracion().fondo"
      [style.color]="configuracion().texto"
      [style.border-color]="configuracion().borde"
    >
      @if (icono()) {
        <mupa-icon [nombre]="icono()!" [tamano]="tamanoIcono()" />
      }

      <span class="mupa-pill__texto">
        @if (etiqueta()) {
          {{ etiqueta() }}
        } @else {
          <ng-content />
        }
      </span>

      @if (removible()) {
        <button
          type="button"
          class="mupa-pill__quitar"
          aria-label="Quitar etiqueta"
          (click)="quitar.emit()"
        >
          <mupa-icon nombre="x" [tamano]="tamanoIcono()" />
        </button>
      }
    </span>
  `,
  styleUrl: './pill.component.css',
})
export class MupaPill {
  /** Texto de la etiqueta. Si se omite, se proyecta contenido. */
  readonly etiqueta = input<string>();

  /** Color de categoría o estado. */
  readonly color = input<ColorPill>('blue');

  /** Diseño: relleno, sólido o contorno. */
  readonly diseno = input<DisenoPill>('relleno');

  /** Tamaño del chip. */
  readonly tamano = input<TamanoPill>('sm');

  /** Nombre de icono Lucide opcional. */
  readonly icono = input<string>();

  /** Muestra el botón para quitar la etiqueta. */
  readonly removible = input(false, { transform: booleanAttribute });

  /** Emitido al pulsar el botón de quitar. */
  readonly quitar = output<void>();

  protected readonly configuracion = computed(() => {
    if (this.diseno() === 'solido') return CONFIGURACION_SOLIDA;
    if (this.diseno() === 'contorno') return CONFIGURACION_CONTORNO;
    return COLORES_PILL[this.color()] ?? COLORES_PILL.blue;
  });

  protected readonly tamanoIcono = computed(() => (this.tamano() === 'md' ? 14 : 13));

  protected readonly clases = computed(
    () => `mupa-pill mupa-pill--${this.diseno()} mupa-pill--${this.tamano()}`,
  );
}
