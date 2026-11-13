import {
  booleanAttribute,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import { MupaConfettiService } from './confetti.service';
import type { OpcionesConfeti, VarianteBotonConfeti } from './confetti.types';

/**
 * Botón de sistema de diseño que lanza confeti desde su centro.
 *
 * Réplica de `ConfettiButton` de `DESARROLLO/confetti/Confetti.jsx`.
 */
@Component({
  selector: 'mupa-boton-confeti',
  imports: [MupaIcon],
  template: `
    <button
      [attr.type]="tipo()"
      class="mupa-boton-confeti"
      [class.mupa-boton-confeti--secundario]="variante() === 'secundario'"
      [class.mupa-boton-confeti--presionado]="presionado()"
      [disabled]="deshabilitado()"
      [attr.aria-label]="etiquetaAria() ?? null"
      (click)="alClic($event)"
      (mousedown)="presionado.set(true)"
      (mouseup)="presionado.set(false)"
      (mouseleave)="presionado.set(false)"
    >
      @if (icono()) {
        <mupa-icon [nombre]="icono()!" [tamano]="18" [color]="colorIcono()" />
      }

      <ng-content>Celebrar</ng-content>
    </button>
  `,
  styleUrl: './boton-confeti.component.css',
  host: {
    class: 'mupa-boton-confeti-host',
  },
})
export class MupaBotonConfeti {
  private readonly confetti = inject(MupaConfettiService);

  /** Opciones de la explosión. */
  readonly opciones = input<OpcionesConfeti>({});

  /** Variante visual del botón. */
  readonly variante = input<VarianteBotonConfeti>('primario');

  /** Nombre del icono Lucide anterior al texto. `null` lo oculta. */
  readonly icono = input<string | null>('party-popper');

  /** Tipo nativo del botón. */
  readonly tipo = input<'button' | 'submit' | 'reset'>('button');

  /** Etiqueta accesible cuando el contenido no aporta texto. */
  readonly etiquetaAria = input<string>();

  /** Deshabilita el botón. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Emitido después de lanzar el confeti. */
  readonly clic = output<MouseEvent>();

  protected readonly presionado = signal(false);

  protected readonly colorIcono = computed(() =>
    this.variante() === 'primario' ? 'var(--fg-on-brand)' : 'var(--color-primary-700)',
  );

  protected alClic(evento: MouseEvent): void {
    if (this.deshabilitado()) return;

    if (typeof window !== 'undefined') {
      const rect = (evento.currentTarget as HTMLElement).getBoundingClientRect();
      const origen = this.opciones().origen ?? {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      };

      this.confetti.disparar({ ...this.opciones(), origen });
    }

    this.clic.emit(evento);
  }
}
