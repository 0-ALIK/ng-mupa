import { Component, computed, input } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaIcon } from '../icon/icon.component';
import type { ItemBarList } from './bar-list.types';

interface ItemBarListCalculado extends ItemBarList {
  porcentaje: number;
  textoCalculado: string;
}

/**
 * Ranking en barras horizontales.
 *
 * Réplica de `BarList` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-bar-list',
  imports: [MupaChartCard, MupaIcon],
  template: `
    <mupa-chart-card
      [titulo]="titulo() ?? 'Bar list'"
      [descripcion]="descripcion()"
      [mostrarCabecera]="!!titulo() || !!descripcion()"
      [mostrarDatos]="false"
    >
      <div class="mupa-bar-list">
        @if (etiquetaValor()) {
          <div class="mupa-bar-list__cabecera">
            <span>Fuente</span>
            <span>{{ etiquetaValor() }}</span>
          </div>
        }

        <ul class="mupa-bar-list__lista">
          @for (item of itemsCalculados(); track $index) {
            <li class="mupa-bar-list__item">
              <span class="mupa-bar-list__etiqueta">
                @if (item.icono) {
                  <mupa-icon [nombre]="item.icono" [tamano]="15" />
                }
                <span class="mupa-bar-list__texto">{{ item.etiqueta }}</span>
              </span>

              <span class="mupa-bar-list__valor">{{ item.textoCalculado }}</span>

              <span
                class="mupa-bar-list__barra"
                role="img"
                [attr.aria-label]="item.etiqueta + ': ' + item.textoCalculado"
              >
                <span
                  class="mupa-bar-list__relleno"
                  [style.width.%]="item.porcentaje"
                  [style.background]="color()"
                ></span>
              </span>
            </li>
          }
        </ul>
      </div>
    </mupa-chart-card>
  `,
  styleUrl: './bar-list.component.css',
})
export class MupaBarList {
  /** Título opcional de la tarjeta. */
  readonly titulo = input<string>();

  /** Descripción opcional. */
  readonly descripcion = input<string>();

  /** Elementos del ranking. */
  readonly elementos = input<readonly ItemBarList[]>([]);

  /** Color de las barras. */
  readonly color = input('var(--color-primary-500)');

  /** Escala máxima; por defecto, el mayor valor. */
  readonly maximo = input<number>();

  /** Encabezado de la columna de valores. */
  readonly etiquetaValor = input<string>();

  /** Locale para formatear los números. */
  readonly locale = input('es-PA');

  protected readonly itemsCalculados = computed<ItemBarListCalculado[]>(() => {
    const maximo =
      this.maximo() || Math.max(1, ...this.elementos().map((item) => Number(item.valor) || 0));

    return this.elementos().map((item) => ({
      ...item,
      porcentaje: Math.max(0, Math.min(100, ((Number(item.valor) || 0) / maximo) * 100)),
      textoCalculado: item.texto ?? Number(item.valor).toLocaleString(this.locale()),
    }));
  });
}
