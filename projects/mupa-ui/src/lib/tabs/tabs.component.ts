import { Component, ElementRef, input, model, viewChildren } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { Pestana } from './tabs.types';

/**
 * Pestañas horizontales tipo píldora.
 *
 * Réplica del patrón `.tabs` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-tabs',
  imports: [MupaIcon],
  template: `
    <div
      class="mupa-tabs"
      role="tablist"
      [attr.aria-label]="ariaLabel()"
      (keydown)="alTeclado($event)"
    >
      @for (pestana of pestanas(); track pestana.id; let indice = $index) {
        <button
          #botonPestana
          type="button"
          role="tab"
          [id]="pestana.id"
          class="mupa-tabs__pestana"
          [class.mupa-tabs__pestana--activa]="activa() === pestana.id"
          [attr.aria-selected]="activa() === pestana.id"
          [attr.aria-controls]="panelId() ?? null"
          [attr.tabindex]="activa() === pestana.id ? 0 : -1"
          [disabled]="pestana.deshabilitada ?? false"
          (click)="seleccionar(pestana.id)"
        >
          @if (pestana.icono) {
            <mupa-icon [nombre]="pestana.icono" [tamano]="16" />
          }
          {{ pestana.etiqueta }}
        </button>
      }
    </div>
  `,
  styleUrl: './tabs.component.css',
})
export class MupaTabs {
  /** Pestañas disponibles. */
  readonly pestanas = input.required<readonly Pestana[]>();

  /** Identificador de la pestaña activa. */
  readonly activa = model<string>('');

  /** Nombre accesible del tablist. */
  readonly ariaLabel = input('Pestañas');

  /** Identificador del panel controlado por las pestañas. */
  readonly panelId = input<string>();

  private readonly botones = viewChildren<ElementRef<HTMLButtonElement>>('botonPestana');

  protected seleccionar(id: string): void {
    this.activa.set(id);
  }

  protected alTeclado(evento: KeyboardEvent): void {
    const teclas = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!teclas.includes(evento.key)) return;

    evento.preventDefault();
    const pestanas = this.pestanas();
    if (!pestanas.length) return;

    const actual = Math.max(
      0,
      pestanas.findIndex((pestana) => pestana.id === this.activa()),
    );

    let siguiente = actual;
    if (evento.key === 'ArrowRight') siguiente = (actual + 1) % pestanas.length;
    if (evento.key === 'ArrowLeft') {
      siguiente = (actual - 1 + pestanas.length) % pestanas.length;
    }
    if (evento.key === 'Home') siguiente = 0;
    if (evento.key === 'End') siguiente = pestanas.length - 1;

    for (let intento = 0; intento < pestanas.length; intento++) {
      if (!pestanas[siguiente]?.deshabilitada) break;
      siguiente = (siguiente + 1) % pestanas.length;
    }

    const destino = pestanas[siguiente];
    if (!destino || destino.deshabilitada) return;

    this.activa.set(destino.id);
    this.botones()[siguiente]?.nativeElement.focus();
  }
}
