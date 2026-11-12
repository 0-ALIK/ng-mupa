import { Component, input } from '@angular/core';

/**
 * Píldora de reacciones bajo un mensaje.
 *
 * Réplica de `BubbleReactions` en el Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-bubble-reactions',
  template: `
    <span class="mupa-bubble-reactions" role="img" [attr.aria-label]="etiquetaAria()">
      <ng-content />
    </span>
  `,
  styleUrl: './bubble-reactions.component.css',
})
export class MupaBubbleReactions {
  /** Nombre accesible de las reacciones. */
  readonly etiquetaAria = input('Reacciones');
}
