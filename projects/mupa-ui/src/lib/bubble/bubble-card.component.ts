import { Component, computed, input } from '@angular/core';

import type { AnchoBurbuja } from './bubble.types';

/**
 * Tarjeta embebida dentro de un mensaje del asistente.
 *
 * Réplica de `BubbleCard` en el Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-bubble-card',
  template: `
    <div class="mupa-bubble-card" [style.max-width]="anchoMaximoValor()">
      <ng-content />
    </div>
  `,
  styleUrl: './bubble-card.component.css',
})
export class MupaBubbleCard {
  /** Ancho máximo de la tarjeta. */
  readonly anchoMaximo = input<AnchoBurbuja>(460);

  protected readonly anchoMaximoValor = computed(() => {
    const valor = this.anchoMaximo();
    if (typeof valor === 'number' && Number.isFinite(valor)) {
      return `${valor}px`;
    }
    if (typeof valor === 'string' && valor.trim()) return valor;
    return '460px';
  });
}
