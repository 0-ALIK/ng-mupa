import { booleanAttribute, Component, input, linkedSignal } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { ItemAcordeon } from './accordion.types';

/**
 * Acordeón de preguntas y respuestas.
 *
 * Réplica del patrón `.acc` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-accordion',
  imports: [MupaIcon],
  template: `
    <div class="mupa-accordion">
      @for (item of items(); track item.id; let indice = $index) {
        <div
          class="mupa-accordion__item"
          [class.mupa-accordion__item--abierto]="estaAbierto(item.id)"
        >
          <button
            type="button"
            class="mupa-accordion__pregunta"
            [id]="idBoton(indice)"
            [attr.aria-expanded]="estaAbierto(item.id)"
            [attr.aria-controls]="idPanel(indice)"
            [disabled]="item.deshabilitado ?? false"
            (click)="alternar(item.id)"
          >
            <span>{{ item.titulo }}</span>
            <mupa-icon nombre="chevron-down" [tamano]="18" />
          </button>

          @if (estaAbierto(item.id)) {
            <div
              class="mupa-accordion__respuesta"
              role="region"
              [id]="idPanel(indice)"
              [attr.aria-labelledby]="idBoton(indice)"
            >
              {{ item.contenido }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './accordion.component.css',
})
export class MupaAccordion {
  private static secuencia = 0;
  private readonly id = ++MupaAccordion.secuencia;

  /** Elementos del acordeón. */
  readonly items = input.required<readonly ItemAcordeon[]>();

  /** Permite mantener varios paneles abiertos a la vez. */
  readonly permitirMultiple = input(false, { transform: booleanAttribute });

  protected readonly abiertos = linkedSignal(() =>
    this.items()
      .filter((item) => item.abierto)
      .map((item) => item.id),
  );

  protected estaAbierto(id: string): boolean {
    return this.abiertos().includes(id);
  }

  protected alternar(id: string): void {
    const actuales = new Set(this.abiertos());

    if (actuales.has(id)) {
      actuales.delete(id);
    } else {
      if (!this.permitirMultiple()) actuales.clear();
      actuales.add(id);
    }

    this.abiertos.set([...actuales]);
  }

  protected idBoton(indice: number): string {
    return `mupa-accordion-${this.id}-boton-${indice}`;
  }

  protected idPanel(indice: number): string {
    return `mupa-accordion-${this.id}-panel-${indice}`;
  }
}
