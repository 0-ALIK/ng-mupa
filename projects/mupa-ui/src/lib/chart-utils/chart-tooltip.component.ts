import { booleanAttribute, Component, input } from '@angular/core';

import type { FilaTooltipGrafico } from './chart.types';

/**
 * Globo de detalle de los gráficos. Es infraestructura interna: la tabla de
 * datos sigue siendo la alternativa accesible.
 */
@Component({
  selector: 'mupa-chart-tooltip',
  host: {
    'aria-hidden': 'true',
    '[class.mupa-chart-tooltip--ahora]': 'ahoraBlanco()',
    '[class.mupa-chart-tooltip--elevado]': 'elevado()',
    '[style.left]': 'izquierda()',
    '[style.top]': 'arriba()',
    '[style.width]': 'ancho()',
    '[style.min-width]': 'minAncho()',
    '[style.transform]': 'transformacion()',
  },
  template: `
    @if (titulo()) {
      <div class="mupa-chart-tooltip__titulo">{{ titulo() }}</div>
    }

    @for (fila of filas(); track $index) {
      <div class="mupa-chart-tooltip__fila">
        @switch (fila.marcador ?? 'punto') {
          @case ('linea') {
            <span
              class="mupa-chart-tooltip__marcador-linea"
              [style.border-left-color]="fila.color"
            ></span>
          }
          @case ('barra') {
            <span class="mupa-chart-tooltip__marcador-barra" [style.background]="fila.color"></span>
          }
          @default {
            <span class="mupa-chart-tooltip__marcador-punto" [style.background]="fila.color"></span>
          }
        }

        <span class="mupa-chart-tooltip__etiqueta">{{ fila.etiqueta }}</span>
        <span class="mupa-chart-tooltip__valor">{{ fila.valor }}</span>
      </div>
    }

    @if (nota()) {
      <div class="mupa-chart-tooltip__nota">{{ nota() }}</div>
    }
  `,
  styleUrl: './chart-tooltip.component.css',
})
export class MupaChartTooltip {
  readonly titulo = input<string>();
  readonly filas = input<readonly FilaTooltipGrafico[]>([]);
  readonly nota = input<string>();
  readonly izquierda = input<string>();
  readonly arriba = input<string>();
  readonly ancho = input<string>();
  readonly minAncho = input<string>();
  readonly transformacion = input<string>();
  readonly ahoraBlanco = input(false, { transform: booleanAttribute });
  readonly elevado = input(false, { transform: booleanAttribute });
}
