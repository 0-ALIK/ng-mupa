import { Component, input } from '@angular/core';

import type { ElementoLeyendaGrafico, TipoMarcadorLeyenda } from './chart.types';

/** Leyenda de series de un gráfico. Infraestructura interna. */
@Component({
  selector: 'mupa-chart-legend',
  host: {
    '[class.mupa-chart-legend--inicio]': 'justificar() === "inicio"',
  },
  template: `
    @for (elemento of elementos(); track $index) {
      <span class="mupa-chart-legend__elemento">
        <span
          class="mupa-chart-legend__marcador"
          [class.mupa-chart-legend__marcador--punto]="marcador() === 'punto'"
          [style.background]="elemento.color"
        ></span>
        {{ elemento.etiqueta }}
      </span>
    }
  `,
  styleUrl: './chart-legend.component.css',
})
export class MupaChartLegend {
  readonly elementos = input<readonly ElementoLeyendaGrafico[]>([]);
  readonly marcador = input<TipoMarcadorLeyenda>('cuadro');
  readonly justificar = input<'centro' | 'inicio'>('centro');
}
