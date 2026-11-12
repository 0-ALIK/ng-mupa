import { Component, computed, input } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import { TONOS_BANNER, type TonoBanner } from './banner.types';

/**
 * Aviso informativo del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: fondo tintado, barra
 * izquierda de color, icono de contorno y textos con el color del tono.
 */
@Component({
  selector: 'mupa-banner',
  imports: [MupaIcon],
  template: `
    <div [class]="clases()">
      <mupa-icon class="mupa-banner__icono" [nombre]="iconoEfectivo()" [tamano]="20" />

      <div class="mupa-banner__contenido">
        @if (titulo()) {
          <p class="mupa-banner__titulo">{{ titulo() }}</p>
        }

        <div class="mupa-banner__mensaje">
          @if (mensaje()) {
            {{ mensaje() }}
          }
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styleUrl: './banner.component.css',
})
export class MupaBanner {
  /** Tono semántico del aviso. */
  readonly tono = input<TonoBanner>('info');

  /** Título en negrita del aviso. */
  readonly titulo = input<string>();

  /** Icono Lucide opcional. Si se omite, usa el icono del tono. */
  readonly icono = input<string>();

  /** Mensaje de conveniencia. También se puede proyectar contenido. */
  readonly mensaje = input<string>();

  protected readonly tonoEfectivo = computed<TonoBanner>(() =>
    this.tono() in TONOS_BANNER ? this.tono() : 'info',
  );

  protected readonly configuracion = computed(() => TONOS_BANNER[this.tonoEfectivo()]);

  protected readonly clases = computed(() => `mupa-banner mupa-banner--${this.tonoEfectivo()}`);

  protected readonly iconoEfectivo = computed(() => this.icono() ?? this.configuracion().icono);
}
