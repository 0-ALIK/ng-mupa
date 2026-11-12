import { Component, computed, input, output } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { ElementoSugerenciaBurbuja } from './bubble.types';

interface SugerenciaNormalizada {
  etiqueta: string;
  valor: string;
}

/**
 * Respuestas rápidas de una conversación.
 *
 * Réplica de `BubbleSuggestions` en el Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-bubble-suggestions',
  imports: [MupaIcon],
  template: `
    <div class="mupa-bubble-suggestions" role="group" aria-label="Sugerencias">
      @for (sugerencia of sugerencias(); track $index) {
        <button
          type="button"
          class="mupa-bubble-suggestions__chip"
          (click)="seleccionar.emit(sugerencia.valor)"
        >
          <mupa-icon nombre="corner-down-right" [tamano]="16" color="var(--color-primary-500)" />
          {{ sugerencia.etiqueta }}
        </button>
      }
    </div>
  `,
  styleUrl: './bubble-suggestions.component.css',
})
export class MupaBubbleSuggestions {
  /** Sugerencias como texto o como etiqueta/valor. */
  readonly elementos = input<readonly ElementoSugerenciaBurbuja[]>([]);

  /** Emitido con el valor de la sugerencia elegida. */
  readonly seleccionar = output<string>();

  protected readonly sugerencias = computed<SugerenciaNormalizada[]>(() =>
    this.elementos().map((elemento) =>
      typeof elemento === 'string'
        ? { etiqueta: elemento, valor: elemento }
        : {
            etiqueta: elemento.etiqueta,
            valor: elemento.valor ?? elemento.etiqueta,
          },
    ),
  );
}
