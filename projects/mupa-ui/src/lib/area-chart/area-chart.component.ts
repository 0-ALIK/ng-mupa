import { booleanAttribute, Component, computed, input, linkedSignal, signal } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaChartHeaderDirective } from '../chart-utils/chart-header.directive';
import { MupaChartLegend } from '../chart-utils/chart-legend.component';
import { MupaChartResizeDirective } from '../chart-utils/chart-resize.directive';
import { MupaChartTooltip } from '../chart-utils/chart-tooltip.component';
import { parsearFecha, rutaSuave } from '../chart-utils/chart-geometry';
import { PALETA_GRAFICOS, colorDePaleta } from '../chart-utils/chart-palette';
import type { PuntoGrafico } from '../chart-utils/chart.types';
import {
  RANGOS_AREA,
  type DatoAreaChart,
  type RangoAreaChart,
  type SerieAreaChart,
} from './area-chart.types';

interface SerieCalculada extends SerieAreaChart {
  color: string;
}

interface CapaArea extends SerieCalculada {
  linea: string;
  area: string;
}

/**
 * Gráfico de área interactivo con selector de periodo.
 *
 * Réplica de `AreaChart` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-area-chart',
  imports: [
    MupaChartCard,
    MupaChartHeaderDirective,
    MupaChartLegend,
    MupaChartResizeDirective,
    MupaChartTooltip,
  ],
  template: `
    <mupa-chart-card
      [titulo]="titulo()"
      [descripcion]="descripcion()"
      [datos]="filas()"
      [mostrarCabecera]="mostrarCabecera()"
      [mostrarTitulo]="mostrarTitulo()"
      [mostrarDescripcion]="mostrarDescripcion()"
      [mostrarDatos]="mostrarDatos()"
      [mostrarBorde]="mostrarBorde()"
      [cabeceraPersonalizada]="true"
      nombreContenedor="mupa-area"
    >
      @if (mostrarCabecera()) {
        <div mupaChartHeader class="mupa-area-chart__cabecera">
          @if (mostrarTitulo() || (mostrarDescripcion() && descripcion())) {
            <div class="mupa-area-chart__titulo-bloque">
              @if (mostrarTitulo()) {
                <div class="mupa-area-chart__titulo">{{ titulo() }}</div>
              }
              @if (mostrarDescripcion() && descripcion()) {
                <div class="mupa-area-chart__descripcion">
                  {{ descripcion() }}
                </div>
              }
            </div>
          }

          @if (rangos().length > 1) {
            <label class="mupa-area-chart__periodo" [attr.for]="idPeriodo">
              Periodo
              <span class="mupa-area-chart__select-wrap">
                <select
                  [id]="idPeriodo"
                  class="mupa-area-chart__select"
                  [value]="rango()"
                  (change)="elegirRangoDesdeEvento($event)"
                >
                  @for (opcion of rangos(); track opcion.value) {
                    <option [value]="opcion.value">
                      {{ opcion.etiqueta }}
                    </option>
                  }
                </select>
                <svg
                  class="mupa-area-chart__chevron"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </label>

            <div class="mupa-area-chart__rangos" role="group" aria-label="Periodo">
              @for (opcion of rangos(); track opcion.value) {
                <button
                  type="button"
                  class="mupa-area-chart__rango"
                  [class.mupa-area-chart__rango--activo]="opcion.value === rango()"
                  [attr.aria-pressed]="opcion.value === rango()"
                  (click)="elegirRango(opcion.value)"
                >
                  {{ opcion.etiqueta }}
                </button>
              }
            </div>
          }
        </div>
      }

      <div class="mupa-area-chart__cuerpo">
        <div class="mupa-area-chart__plot" mupaChartResize (anchoCambio)="ancho.set($event)">
          <svg
            class="mupa-area-chart__svg"
            [attr.width]="ancho()"
            [attr.height]="altura()"
            role="img"
            [attr.aria-label]="titulo()"
            (mousemove)="alMover($event)"
            (mouseleave)="hover.set(null)"
          >
            <defs>
              @for (capa of capas(); track capa.clave) {
                <linearGradient [attr.id]="gradienteId(capa.clave)" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" [attr.stop-color]="capa.color" stop-opacity="0.55"></stop>
                  <stop offset="95%" [attr.stop-color]="capa.color" stop-opacity="0.06"></stop>
                </linearGradient>
              }
            </defs>

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

            @for (capa of capas(); track capa.clave) {
              <path
                [attr.d]="capa.area"
                [attr.fill]="'url(#' + gradienteId(capa.clave) + ')'"
              ></path>
            }

            @for (capa of capas(); track capa.clave) {
              <path
                [attr.d]="capa.linea"
                fill="none"
                [attr.stroke]="capa.color"
                stroke-width="2"
              ></path>
            }

            @for (indice of ticks(); track indice) {
              <text
                [attr.x]="x(indice)"
                [attr.y]="altura() - 8"
                [attr.text-anchor]="indice === 0 ? 'start' : 'middle'"
                fill="var(--fg-muted)"
                class="mupa-area-chart__etiqueta-eje"
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

                @for (capa of capas(); track capa.clave; let ci = $index) {
                  <circle
                    [attr.cx]="x(hover()!)"
                    [attr.cy]="y(tops()[hover()!][ci])"
                    r="4.5"
                    fill="#FFFFFF"
                    [attr.stroke]="capa.color"
                    stroke-width="2"
                  ></circle>
                }
              </g>
            }
          </svg>

          @if (hover() !== null) {
            <mupa-chart-tooltip
              [titulo]="tituloTooltip()"
              [filas]="filasTooltip()"
              [izquierda]="izquierdaTooltip()"
              arriba="12px"
              ancho="180px"
            />
          }
        </div>

        <mupa-chart-legend class="mupa-area-chart__leyenda" [elementos]="elementosLeyenda()" />
      </div>
    </mupa-chart-card>
  `,
  styleUrl: './area-chart.component.css',
})
export class MupaAreaChart {
  private static secuencia = 0;
  private readonly id = ++MupaAreaChart.secuencia;

  readonly titulo = input('Gráfico de área');
  readonly descripcion = input<string>();
  readonly datos = input<readonly DatoAreaChart[]>([]);
  readonly series = input<readonly SerieAreaChart[]>([]);
  readonly rangos = input<readonly RangoAreaChart[]>(RANGOS_AREA);
  readonly rangoPorDefecto = input<string>();
  readonly apilado = input(true, { transform: booleanAttribute });
  readonly mostrarCabecera = input(true, { transform: booleanAttribute });
  readonly mostrarTitulo = input(true, { transform: booleanAttribute });
  readonly mostrarDescripcion = input(true, { transform: booleanAttribute });
  readonly mostrarDatos = input(true, { transform: booleanAttribute });
  readonly mostrarBorde = input(true, { transform: booleanAttribute });
  readonly altura = input(250);
  readonly locale = input('es-PA');

  protected readonly hover = signal<number | null>(null);
  protected readonly ancho = signal(600);

  protected readonly idPeriodo = `mupa-area-chart-${this.id}-periodo`;

  protected readonly rango = linkedSignal(
    () => this.rangoPorDefecto() ?? this.rangos()[0]?.value ?? '',
  );

  protected readonly columnas = computed<SerieCalculada[]>(() =>
    this.series().map((serie, indice) => ({
      ...serie,
      color: serie.color ?? colorDePaleta(indice, PALETA_GRAFICOS),
    })),
  );

  protected readonly rangoActual = computed(() =>
    this.rangos().find((rango) => rango.value === this.rango()),
  );

  protected readonly filas = computed(() => {
    const datos = this.datos();
    const rango = this.rangoActual();
    if (!datos.length || !rango) return datos;

    const referencia = parsearFecha(datos[datos.length - 1].date);
    const inicio = new Date(referencia);
    inicio.setDate(inicio.getDate() - (rango.days - 1));
    return datos.filter((fila) => parsearFecha(fila.date) >= inicio);
  });

  protected readonly tops = computed<number[][]>(() =>
    this.filas().map((fila) => {
      let acumulado = 0;
      return this.columnas().map((columna) => {
        const valor = Number(fila[columna.clave]) || 0;
        acumulado = this.apilado() ? acumulado + valor : valor;
        return acumulado;
      });
    }),
  );

  protected readonly maximo = computed(() => Math.max(1, ...this.tops().flat()) * 1.08);

  protected readonly gridVals = computed(() =>
    [0.25, 0.5, 0.75, 1].map((factor) => factor * this.maximo()),
  );

  protected readonly capas = computed<CapaArea[]>(() =>
    this.columnas().map((columna, indice) => {
      const superior = this.filas().map(
        (_, fila) => [this.x(fila), this.y(this.tops()[fila][indice])] as PuntoGrafico,
      );
      const base = this.filas().map(
        (_, fila) =>
          [
            this.x(fila),
            this.y(this.apilado() && indice > 0 ? this.tops()[fila][indice - 1] : 0),
          ] as PuntoGrafico,
      );
      const linea = rutaSuave(superior);
      const atras = rutaSuave([...base].reverse()).replace(/^M/, 'L');

      return {
        ...columna,
        linea,
        area: linea + atras + 'Z',
      };
    }),
  );

  protected readonly ticks = computed(() => {
    const cantidad = Math.max(2, Math.floor(this.ancho() / 90));
    const paso = Math.max(1, Math.ceil(this.filas().length / cantidad));
    return this.filas()
      .map((_, indice) => indice)
      .filter((indice) => indice % paso === 0);
  });

  protected readonly elementosLeyenda = computed(() =>
    this.columnas().map((columna) => ({
      color: columna.color,
      etiqueta: columna.etiqueta,
    })),
  );

  protected readonly tituloTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '';
    const fila = this.filas()[indice];
    return fila
      ? parsearFecha(fila.date).toLocaleDateString(this.locale(), {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      : '';
  });

  protected readonly filasTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return [];
    const fila = this.filas()[indice];
    if (!fila) return [];

    return [...this.columnas()].reverse().map((columna) => ({
      color: columna.color,
      etiqueta: columna.etiqueta,
      valor: (Number(fila[columna.clave]) || 0).toLocaleString(this.locale()),
      marcador: 'punto' as const,
    }));
  });

  protected readonly izquierdaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0px';
    const x = this.x(indice);
    const izquierda = Math.min(Math.max(x + 12, 0), this.ancho() - 180);
    return `${x + 192 > this.ancho() ? x - 192 : izquierda}px`;
  });

  protected x(indice: number): number {
    return (
      4 + (this.filas().length < 2 ? 0 : (indice / (this.filas().length - 1)) * (this.ancho() - 8))
    );
  }

  protected y(valor: number): number {
    const altoPlot = this.altura() - 12 - 30;
    return 12 + altoPlot - (valor / this.maximo()) * altoPlot;
  }

  protected gradienteId(clave: string): string {
    return `mupa-area-${this.id}-${clave}`;
  }

  protected etiquetaFecha(indice: number): string {
    const fila = this.filas()[indice];
    return fila
      ? parsearFecha(fila.date).toLocaleDateString(this.locale(), {
          month: 'short',
          day: 'numeric',
        })
      : '';
  }

  protected elegirRango(valor: string): void {
    this.rango.set(valor);
    this.hover.set(null);
  }

  protected elegirRangoDesdeEvento(evento: Event): void {
    this.elegirRango((evento.target as HTMLSelectElement).value);
  }

  protected alMover(evento: MouseEvent): void {
    if (this.filas().length < 2) {
      this.hover.set(0);
      return;
    }

    const rect = (evento.currentTarget as SVGSVGElement).getBoundingClientRect();
    const px = evento.clientX - rect.left;
    const indice = Math.round(((px - 4) / (this.ancho() - 8)) * (this.filas().length - 1));
    this.hover.set(Math.min(this.filas().length - 1, Math.max(0, indice)));
  }
}
