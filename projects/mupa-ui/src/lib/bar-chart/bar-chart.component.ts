import { booleanAttribute, Component, computed, input, signal } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaChartLegend } from '../chart-utils/chart-legend.component';
import { MupaChartResizeDirective } from '../chart-utils/chart-resize.directive';
import { MupaChartTooltip } from '../chart-utils/chart-tooltip.component';
import { barraSuperiorRedondeada } from '../chart-utils/chart-geometry';
import { PALETA_GRAFICOS, colorDePaleta } from '../chart-utils/chart-palette';
import type { DireccionTendencia } from '../chart-utils/chart.types';
import type { DatoBarChart, SerieBarChart } from './bar-chart.types';

interface SerieCalculada extends SerieBarChart {
  color: string;
}

/**
 * Gráfico de barras, simple o agrupado.
 *
 * Réplica de `BarChart` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-bar-chart',
  imports: [MupaChartCard, MupaChartLegend, MupaChartResizeDirective, MupaChartTooltip],
  template: `
    <mupa-chart-card
      [titulo]="titulo()"
      [descripcion]="descripcion()"
      [datos]="datos()"
      [mostrarCabecera]="mostrarCabecera()"
      [mostrarTitulo]="mostrarTitulo()"
      [mostrarDescripcion]="mostrarDescripcion()"
      [mostrarDatos]="mostrarDatos()"
      [mostrarBorde]="mostrarBorde()"
      [tendencia]="tendencia()"
      [direccionTendencia]="direccionTendencia()"
      [notaAlPie]="notaAlPie()"
    >
      <div class="mupa-bar-chart__cuerpo">
        <div class="mupa-bar-chart__plot" mupaChartResize (anchoCambio)="ancho.set($event)">
          <svg
            class="mupa-bar-chart__svg"
            [attr.width]="ancho()"
            [attr.height]="altura()"
            role="img"
            [attr.aria-label]="titulo()"
            (mouseleave)="hover.set(null)"
          >
            @for (valor of gridVals(); track $index) {
              <line
                x1="0"
                [attr.x2]="ancho()"
                [attr.y1]="y(valor)"
                [attr.y2]="y(valor)"
                stroke="var(--border-default)"
                stroke-dasharray="3 4"
              ></line>
            }

            <line
              x1="0"
              [attr.x2]="ancho()"
              [attr.y1]="y(0)"
              [attr.y2]="y(0)"
              stroke="var(--border-default)"
            ></line>

            @for (fila of datos(); track $index; let indice = $index) {
              <g class="mupa-bar-chart__grupo" (mouseenter)="hover.set(indice)">
                <rect
                  [attr.x]="slot() * indice"
                  y="12"
                  [attr.width]="slot()"
                  [attr.height]="altoPlot()"
                  [attr.fill]="hover() === indice ? 'rgba(6,96,255,0.06)' : 'transparent'"
                  rx="8"
                ></rect>

                @for (columna of columnas(); track columna.clave; let ci = $index) {
                  <path
                    [attr.d]="barra(fila, columna, ci, indice)"
                    [attr.fill]="columna.color"
                    [attr.opacity]="hover() !== null && hover() !== indice ? 0.45 : 1"
                    class="mupa-bar-chart__barra"
                  >
                    <title>{{ etiquetaBarra(fila, columna) }}</title>
                  </path>
                }

                <text
                  [attr.x]="slot() * indice + slot() / 2"
                  [attr.y]="altura() - 8"
                  text-anchor="middle"
                  fill="var(--fg-muted)"
                  class="mupa-bar-chart__etiqueta-eje"
                >
                  {{ etiquetaCategoria(fila[claveCategoria()]) }}
                </text>
              </g>
            }
          </svg>

          @if (hover() !== null) {
            <mupa-chart-tooltip
              [titulo]="tituloTooltip()"
              [filas]="filasTooltip()"
              [izquierda]="izquierdaTooltip()"
              [arriba]="arribaTooltip()"
              ancho="168px"
              transformacion="translateY(-100%)"
            />
          }
        </div>

        @if (columnas().length > 1) {
          <mupa-chart-legend class="mupa-bar-chart__leyenda" [elementos]="elementosLeyenda()" />
        }
      </div>
    </mupa-chart-card>
  `,
  styleUrl: './bar-chart.component.css',
})
export class MupaBarChart {
  readonly titulo = input('Gráfico de barras');
  readonly descripcion = input<string>();
  readonly datos = input<readonly DatoBarChart[]>([]);
  readonly claveCategoria = input('month');
  readonly series = input<readonly SerieBarChart[]>([]);
  readonly longitudEtiqueta = input(3);
  readonly mostrarCabecera = input(true, { transform: booleanAttribute });
  readonly mostrarTitulo = input(true, { transform: booleanAttribute });
  readonly mostrarDescripcion = input(true, { transform: booleanAttribute });
  readonly mostrarDatos = input(true, { transform: booleanAttribute });
  readonly mostrarBorde = input(true, { transform: booleanAttribute });
  readonly tendencia = input<string>();
  readonly direccionTendencia = input<DireccionTendencia>('up');
  readonly notaAlPie = input<string>();
  readonly altura = input(250);
  readonly locale = input('es-PA');
  readonly radio = input<number>();

  protected readonly hover = signal<number | null>(null);
  protected readonly ancho = signal(600);

  protected readonly columnas = computed<SerieCalculada[]>(() =>
    this.series().map((serie, indice) => ({
      ...serie,
      color: serie.color ?? colorDePaleta(indice, PALETA_GRAFICOS),
    })),
  );

  protected readonly altoPlot = computed(() => this.altura() - 12 - 30);

  protected readonly maximo = computed(
    () =>
      Math.max(
        1,
        ...this.datos().flatMap((fila) =>
          this.columnas().map((columna) => Number(fila[columna.clave]) || 0),
        ),
      ) * 1.08,
  );

  protected readonly slot = computed(() =>
    this.datos().length ? this.ancho() / this.datos().length : this.ancho(),
  );

  protected readonly anchoGrupo = computed(() => this.slot() * 0.62);

  protected readonly separacion = computed(() => (this.columnas().length > 1 ? 4 : 0));

  protected readonly anchoBarra = computed(
    () =>
      (this.anchoGrupo() - this.separacion() * (this.columnas().length - 1)) /
      Math.max(1, this.columnas().length),
  );

  protected readonly gridVals = computed(() =>
    [0.25, 0.5, 0.75, 1].map((factor) => factor * this.maximo()),
  );

  protected readonly elementosLeyenda = computed(() =>
    this.columnas().map((columna) => ({
      color: columna.color,
      etiqueta: columna.etiqueta,
    })),
  );

  protected readonly tituloTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '';
    const fila = this.datos()[indice];
    return fila ? String(fila[this.claveCategoria()] ?? '') : '';
  });

  protected readonly filasTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return [];
    const fila = this.datos()[indice];
    if (!fila) return [];
    const marcador: 'linea' | 'punto' = this.columnas().length > 1 ? 'linea' : 'punto';

    return this.columnas().map((columna) => ({
      color: columna.color,
      etiqueta: columna.etiqueta,
      valor: (Number(fila[columna.clave]) || 0).toLocaleString(this.locale()),
      marcador,
    }));
  });

  protected readonly izquierdaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0px';
    const centro = this.slot() * indice + this.slot() / 2;
    return `${Math.min(Math.max(centro - 84, 0), this.ancho() - 168)}px`;
  });

  protected readonly arribaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0px';
    const fila = this.datos()[indice];
    if (!fila) return '0px';
    const maximo = Math.max(...this.columnas().map((columna) => Number(fila[columna.clave]) || 0));
    return `${Math.max(0, this.y(maximo) - 12)}px`;
  });

  protected y(valor: number): number {
    return 12 + this.altoPlot() - (valor / this.maximo()) * this.altoPlot();
  }

  protected barra(
    fila: DatoBarChart,
    columna: SerieCalculada,
    indiceColumna: number,
    indiceFila: number,
  ): string {
    const x0 = this.slot() * indiceFila + (this.slot() - this.anchoGrupo()) / 2;
    const valor = Number(fila[columna.clave]) || 0;
    const x = x0 + indiceColumna * (this.anchoBarra() + this.separacion());
    const y = this.y(valor);
    const alto = this.y(0) - y;
    const radio = this.radio() ?? (this.columnas().length > 1 ? 4 : 8);

    return barraSuperiorRedondeada(x, y, this.anchoBarra(), alto, radio);
  }

  protected etiquetaBarra(fila: DatoBarChart, columna: SerieCalculada): string {
    const valor = Number(fila[columna.clave]) || 0;
    return `${fila[this.claveCategoria()]} · ${
      columna.etiqueta
    }: ${valor.toLocaleString(this.locale())}`;
  }

  protected etiquetaCategoria(valor: number | string | undefined): string {
    const texto = String(valor ?? '');
    return this.longitudEtiqueta() ? texto.slice(0, this.longitudEtiqueta()) : texto;
  }
}
