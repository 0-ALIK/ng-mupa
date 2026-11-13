import { Directive, inject, input } from '@angular/core';

import { MupaConfettiService } from './confetti.service';
import type { OpcionesConfeti } from './confetti.types';

/**
 * Aplica el disparo de confeti a cualquier elemento.
 *
 * Calcula el origen desde el centro del elemento anfitrión y respeta
 * `opcionesConfeti.origen` cuando se proporciona.
 *
 * ```html
 * <button type="button" mupaDisparadorConfeti [opcionesConfeti]="opciones">
 *   Celebrar
 * </button>
 * ```
 */
@Directive({
  selector: '[mupaDisparadorConfeti]',
  host: {
    '(click)': 'alClic($event)',
  },
})
export class MupaDisparadorConfeti {
  private readonly confetti = inject(MupaConfettiService);

  /** Opciones de la explosión. */
  readonly opcionesConfeti = input<OpcionesConfeti>({});

  protected alClic(evento: MouseEvent): void {
    const objetivo = evento.currentTarget as HTMLElement;

    if (objetivo instanceof HTMLButtonElement && objetivo.disabled) return;
    if (typeof window === 'undefined') return;

    const rect = objetivo.getBoundingClientRect();
    const origen = this.opcionesConfeti().origen ?? {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    this.confetti.disparar({ ...this.opcionesConfeti(), origen });
  }
}
