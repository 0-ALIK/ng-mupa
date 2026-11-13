import { booleanAttribute, Component, computed, input, linkedSignal, signal } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaChartHeaderDirective } from '../chart-utils/chart-header.directive';
import { MupaChartResizeDirective } from '../chart-utils/chart-resize.directive';
import { MupaChartTooltip } from '../chart-utils/chart-tooltip.component';
import { parsearFecha, rutaSuave } from '../chart-utils/chart-geometry';
import { PALETA_GRAFICOS, colorDePaleta } from '../chart-utils/chart-palette';
import type { PuntoGrafico } from '../chart-utils/chart.types';
import type { DatoLineChart, SerieLineChart } from './line-chart.types';

interface SerieCalculada extends SerieLineChart {
  color: string;
}

/**
 * Gráfico de líneas con selector de serie y totales.
 *
 * Réplica de `LineChart` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-line-chart',
  imports: [MupaChartCard, MupaChartHeaderDirective, MupaChartResizeDirective, MupaChartTooltip],
  template: `
    @if (!hayDatos()) {
      <div class="mupa-line-chart__sin-datos" role="status">
        {{ titulo() }}: no hay datos disponibles.
      </div>
    } @else {
      <mupa-chart-card
        [titulo]="titulo()"
        [descripcion]="descripcion()"
        [datos]="datos()"
        [cabeceraPersonalizada]="true"
        nombreContenedor="mupa-line"
      >
        <div mupaChartHeader class="mupa-line-chart__cabecera">
          <div class="mupa-line-chart__titulo-bloque">
            <div class="mupa-line-chart__titulo">{{ titulo() }}</div>
            @if (descripcion()) {
              <div class="mupa-line-chart__descripcion">
                {{ descripcion() }}
              </div>
            }
          </div>

          @if (mostrarTotales() && columnas().length > 1) {
            <div class="mupa-line-chart__series-movil">
              <label [attr.for]="idSelector">Serie</label>
              <select
                [id]="idSelector"
                [value]="colActiva().clave"
                (change)="elegirSerieDesdeEvento($event)"
              >
                @for (columna of columnas(); track columna.clave) {
                  <option [value]="columna.clave">
                    {{ columna.etiqueta }}
                  </option>
                }
              </select>
              <span class="mupa-line-chart__total" role="status">
                Total de {{ colActiva().etiqueta }}:
                {{ totalActivo() }}
              </span>
            </div>

            <div class="mupa-line-chart__series" role="group" aria-label="Serie">
              @for (columna of columnas(); track columna.clave) {
                <button
                  type="button"
                  class="mupa-line-chart__serie"
                  [class.mupa-line-chart__serie--activa]="columna.clave === colActiva().clave"
                  [attr.aria-pressed]="columna.clave === colActiva().clave"
                  [style.box-shadow]="
                    columna.clave === colActiva().clave ? 'inset 0 -3px 0 ' + columna.color : null
                  "
                  (click)="elegirSerie(columna.clave)"
                >
                  <span class="mupa-line-chart__serie-etiqueta">
                    <span class="mupa-line-chart__punto" [style.background]="columna.color"></span>
                    {{ columna.etiqueta }}
                  </span>
                  <span class="mupa-line-chart__serie-total">
                    {{ totalDe(columna.clave) }}
                  </span>
                </button>
              }
            </div>
          }
        </div>

        <div class="mupa-line-chart__cuerpo">
          <div class="mupa-line-chart__plot" mupaChartResize (anchoCambio)="ancho.set($event)">
            <svg
              class="mupa-line-chart__svg"
              [attr.width]="ancho()"
              [attr.height]="altura()"
              role="img"
              [attr.aria-label]="titulo() + ' — ' + colActiva().etiqueta"
              (mousemove)="alMover($event)"
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

              <path
                [attr.d]="ruta()"
                fill="none"
                [attr.stroke]="colActiva().color"
                stroke-width="2"
                stroke-linejoin="round"
              ></path>

              @for (indice of ticks(); track indice) {
                <text
                  [attr.x]="x(indice)"
                  [attr.y]="altura() - 8"
                  [attr.text-anchor]="indice === 0 ? 'start' : 'middle'"
                  fill="var(--fg-muted)"
                  class="mupa-line-chart__etiqueta-eje"
                >
                  {{ etiquetaFecha(indice) }}
                </text>
              }

              @if (hover() !== null) {
                <g>
                  <line
                    [attr.x1]="x(hover()!)"
                    [attr.x2]="x(hover()!)"
                    y1="12"
                    [attr.y2]="y(0)"
                    stroke="var(--border-strong)"
                    stroke-dasharray="3 3"
                  ></line>
                  <circle
                    [attr.cx]="x(hover()!)"
                    [attr.cy]="y(valores()[hover()!])"
                    r="4.5"
                    fill="#FFFFFF"
                    [attr.stroke]="colActiva().color"
                    stroke-width="2"
                  ></circle>
                </g>
              }
            </svg>

            @if (hover() !== null) {
              <mupa-chart-tooltip
                [titulo]="tituloTooltip()"
                [filas]="filasTooltip()"
                [izquierda]="izquierdaTooltip()"
                arriba="12px"
                ancho="168px"
              />
            }
          </div>
        </div>
      </mupa-chart-card>
    }
  `,
  styleUrl: './line-chart.component.css',
})
export class MupaLineChart {
  private static secuencia = 0;

  readonly titulo = input('Gráfico de líneas');
  readonly descripcion = input<string>();
  readonly datos = input<readonly DatoLineChart[]>([]);
  readonly series = input<readonly SerieLineChart[]>([]);
  readonly seriePorDefecto = input<string>();
  readonly mostrarTotales = input(true, { transform: booleanAttribute });
  readonly altura = input(250);
  readonly locale = input('es-PA');

  protected readonly hover = signal<number | null>(null);
  protected readonly ancho = signal(600);

  protected readonly columnas = computed<SerieCalculada[]>(() =>
    this.series().map((serie, indice) => ({
      ...serie,
      color: serie.color ?? colorDePaleta(indice, PALETA_GRAFICOS),
    })),
  );

  protected readonly activa = linkedSignal(
    () => this.seriePorDefecto() ?? this.columnas()[0]?.clave ?? '',
  );

  protected readonly colActiva = computed<SerieCalculada>(
    () =>
      this.columnas().find((columna) => columna.clave === this.activa()) ??
      this.columnas()[0] ?? {
        clave: '',
        etiqueta: '',
        color: PALETA_GRAFICOS[0],
      },
  );

  protected readonly hayDatos = computed(
    () => this.columnas().length > 0 && this.datos().length > 0,
  );

  protected readonly idSelector = `mupa-line-chart-${++MupaLineChart.secuencia}-serie`;

  protected readonly valores = computed(() =>
    this.datos().map((fila) => Number(fila[this.colActiva()?.clave ?? '']) || 0),
  );

  protected readonly totales = computed<Record<string, number>>(() => {
    const resultado: Record<string, number> = {};
    for (const columna of this.columnas()) {
      resultado[columna.clave] = this.datos().reduce(
        (suma, fila) => suma + (Number(fila[columna.clave]) || 0),
        0,
      );
    }
    return resultado;
  });

  protected readonly totalActivo = computed(() =>
    (this.totales()[this.colActiva()?.clave ?? ''] ?? 0).toLocaleString(this.locale()),
  );

  protected readonly maximo = computed(() => Math.max(1, ...this.valores()) * 1.08);

  protected readonly puntos = computed<readonly PuntoGrafico[]>(() =>
    this.valores().map((valor, indice) => [this.x(indice), this.y(valor)]),
  );

  protected readonly ruta = computed(() => rutaSuave(this.puntos()));

  protected readonly gridVals = computed(() =>
    [0.25, 0.5, 0.75, 1].map((factor) => factor * this.maximo()),
  );

  protected readonly ticks = computed(() => {
    const paso = Math.max(
      1,
      Math.ceil(this.datos().length / Math.max(2, Math.floor(this.ancho() / 90))),
    );
    return this.datos()
      .map((_, indice) => indice)
      .filter((indice) => indice % paso === 0);
  });

  protected readonly tituloTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '';
    const fila = this.datos()[indice];
    return fila
      ? parsearFecha(fila.date).toLocaleDateString(this.locale(), {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
  });

  protected readonly filasTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return [];
    const columna = this.colActiva();
    if (!columna) return [];

    return [
      {
        color: columna.color,
        etiqueta: columna.etiqueta,
        valor: (this.valores()[indice] ?? 0).toLocaleString(this.locale()),
        marcador: 'punto' as const,
      },
    ];
  });

  protected readonly izquierdaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0px';
    const x = this.x(indice);
    return `${x + 12 + 168 > this.ancho() ? x - 12 - 168 : x + 12}px`;
  });

  protected x(indice: number): number {
    return (
      6 + (this.datos().length < 2 ? 0 : (indice / (this.datos().length - 1)) * (this.ancho() - 12))
    );
  }

  protected y(valor: number): number {
    const altoPlot = this.altura() - 12 - 30;
    return 12 + altoPlot - (valor / this.maximo()) * altoPlot;
  }

  protected etiquetaFecha(indice: number): string {
    const fila = this.datos()[indice];
    return fila
      ? parsearFecha(fila.date).toLocaleDateString(this.locale(), {
          month: 'short',
          day: 'numeric',
        })
      : '';
  }

  protected totalDe(clave: string): string {
    return (this.totales()[clave] ?? 0).toLocaleString(this.locale());
  }

  protected elegirSerie(clave: string): void {
    this.activa.set(clave);
    this.hover.set(null);
  }

  protected elegirSerieDesdeEvento(evento: Event): void {
    this.elegirSerie((evento.target as HTMLSelectElement).value);
  }

  protected alMover(evento: MouseEvent): void {
    if (this.datos().length < 2) {
      this.hover.set(0);
      return;
    }

    const rect = (evento.currentTarget as SVGSVGElement).getBoundingClientRect();
    const px = evento.clientX - rect.left;
    const indice = Math.round(((px - 6) / (this.ancho() - 12)) * (this.datos().length - 1));
    this.hover.set(Math.min(this.datos().length - 1, Math.max(0, indice)));
  }
}
