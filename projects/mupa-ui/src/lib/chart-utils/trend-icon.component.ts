import { Component, input } from '@angular/core';

import type { DireccionTendencia } from './chart.types';

/** Flecha de tendencia usada en el pie de los gráficos. */
@Component({
  selector: 'mupa-trend-icon',
  template: `
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color()"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @if (direccion() === 'down') {
        <g>
          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
          <polyline points="16 17 22 17 22 11"></polyline>
        </g>
      } @else {
        <g>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </g>
      }
    </svg>
  `,
  styleUrl: './trend-icon.component.css',
})
export class MupaTrendIcon {
  readonly direccion = input<DireccionTendencia>('up');
  readonly color = input('var(--color-success-700)');
}
