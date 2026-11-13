import { booleanAttribute, Component, effect, inject, input, untracked } from '@angular/core';

import { MupaConfettiService } from './confetti.service';
import type { OpcionesConfeti } from './confetti.types';

/**
 * Disparador headless de confeti.
 *
 * Réplica de `Confetti` del Lego Design System — Alcaldía de Panamá: no renderiza
 * interfaz y lanza una explosión cuando cambia `disparador`.
 *
 * ```html
 * <mupa-confetti #confeti="mupaConfetti" [disparador]="senal()" />
 * <button (click)="confeti.disparar()">Celebrar</button>
 * ```
 */
@Component({
  selector: 'mupa-confetti',
  template: '',
  styleUrl: './confetti.component.css',
  exportAs: 'mupaConfetti',
})
export class MupaConfetti {
  private readonly confetti = inject(MupaConfettiService);
  private primeraEjecucion = true;

  /** Cambiar este valor lanza una explosión. */
  readonly disparador = input<unknown>();

  /** Lanza una explosión en el primer render. */
  readonly dispararAlCargar = input(false, { transform: booleanAttribute });

  /** Opciones de la explosión. */
  readonly opciones = input<OpcionesConfeti>({});

  constructor() {
    effect(() => {
      this.disparador();

      if (this.primeraEjecucion) {
        this.primeraEjecucion = false;

        if (!untracked(() => this.dispararAlCargar())) {
          return;
        }
      }

      this.confetti.disparar(untracked(() => this.opciones()));
    });
  }

  /** Lanza una explosión de forma imperativa. */
  disparar(): void {
    this.confetti.disparar(this.opciones());
  }
}
