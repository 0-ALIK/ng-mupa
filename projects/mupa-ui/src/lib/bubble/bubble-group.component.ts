import { Component, contentChildren, effect, input, numberAttribute } from '@angular/core';

import { MupaBubble } from './bubble.component';
import type { PosicionBurbuja } from './bubble.types';

/**
 * Agrupa burbujas consecutivas y calcula su posición para unir los radios.
 *
 * Réplica de `BubbleGroup` en el Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-bubble-group',
  host: {
    role: 'group',
    '[style.gap.px]': 'espacio()',
  },
  template: '<ng-content />',
  styleUrl: './bubble-group.component.css',
})
export class MupaBubbleGroup {
  /** Separación entre mensajes en píxeles. */
  readonly espacio = input(6, { transform: numberAttribute });

  private readonly burbujas = contentChildren(MupaBubble);

  constructor() {
    effect(() => {
      const lista = this.burbujas();

      lista.forEach((burbuja, indice) => {
        const posicion: PosicionBurbuja =
          lista.length === 1
            ? 'single'
            : indice === 0
              ? 'first'
              : indice === lista.length - 1
                ? 'last'
                : 'middle';
        burbuja.posicion.set(posicion);
      });
    });
  }
}
