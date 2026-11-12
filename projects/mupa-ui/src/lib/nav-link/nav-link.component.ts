import { Component, computed, input } from '@angular/core';

import type { EstadoNavLink } from './nav-link.types';

/**
 * Espécimen estático de los estados de un enlace de landing.
 *
 * Réplica de `NavLink` en el Lego Design System — Alcaldía de Panamá. Se usa para
 * documentar los estados visuales; no es un enlace interactivo.
 */
@Component({
  selector: 'mupa-nav-link',
  template: `
    <span [class]="clases()">
      <span class="mupa-nav-link__etiqueta">
        <span class="mupa-nav-link__etiqueta-fantasma" aria-hidden="true">
          {{ etiqueta() }}
        </span>
        <span>{{ etiqueta() }}</span>
      </span>
      <span class="mupa-nav-link__indicador" aria-hidden="true"></span>
    </span>
  `,
  styleUrl: './nav-link.component.css',
})
export class MupaNavLink {
  /** Texto del enlace. */
  readonly etiqueta = input.required<string>();

  /** Estado visual que se desea mostrar. */
  readonly estado = input<EstadoNavLink>('default');

  protected readonly clases = computed(() => `mupa-nav-link mupa-nav-link--${this.estado()}`);
}
