import { booleanAttribute, Component, computed, input, signal } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaChartLegend } from '../chart-utils/chart-legend.component';
import { MupaChartTooltip } from '../chart-utils/chart-tooltip.component';
import { PALETA_GRAFICOS, colorDePaleta } from '../chart-utils/chart-palette';
import type { DireccionTendencia, PuntoGrafico } from '../chart-utils/chart.types';
import type { CuadriculaRadar, DatoRadarChart, SerieRadarChart } from './radar-chart.types';

interface SerieCalculada extends SerieRadarChart {
  color: string;
}

/**
 * Gráfico de radar con cuadrícula poligonal o circular.
 *
 * Réplica de `RadarChart` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-radar-chart',
  imports: [MupaChartCard, MupaChartLegend, MupaChartTooltip],
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
      [alineacion]="'centro'"
      [tendencia]="tendencia()"
      [direccionTendencia]="direccionTendencia()"
      [notaAlPie]="notaAlPie()"
    >
      <div class="mupa-radar-chart__cuerpo">
        <div class="mupa-radar-chart__plot" [style.max-width.px]="dimension()">
          <svg
            class="mupa-radar-chart__svg"
            [attr.viewBox]="'0 0 ' + dimension() + ' ' + dimension()"
            width="100%"
            role="img"
            [attr.aria-label]="titulo()"
            (mouseleave)="hover.set(null)"
          >
            @for (factor of anillos; track factor) {
              @if (cuadricula() === 'circle') {
                <circle
                  [attr.cx]="centro()"
                  [attr.cy]="centro()"
                  [attr.r]="radio() * factor"
                  fill="none"
                  stroke="var(--border-default)"
                ></circle>
              } @else {
                <polygon
                  [attr.points]="puntosAnillo(factor)"
                  fill="none"
                  stroke="var(--border-default)"
                ></polygon>
              }
            }

            @for (fila of datos(); track $index; let indice = $index) {
              <line
                [attr.x1]="centro()"
                [attr.y1]="centro()"
                [attr.x2]="punto(indice, radio())[0]"
                [attr.y2]="punto(indice, radio())[1]"
                stroke="var(--border-default)"
              ></line>
            }

            @for (columna of columnas(); track columna.clave) {
              <polygon
                [attr.points]="puntosSerie(columna)"
                [attr.fill]="columna.color"
                [attr.fill-opacity]="opacidadRellenoEfectiva()"
                [attr.stroke]="columna.color"
                [attr.stroke-width]="columnas().length > 1 ? 2 : 0"
                stroke-linejoin="round"
              ></polygon>
            }

            @if (hover() !== null) {
              @for (columna of columnas(); track columna.clave) {
                <circle
                  [attr.cx]="punto(hover()!, valorRadio(columna))[0]"
                  [attr.cy]="punto(hover()!, valorRadio(columna))[1]"
                  r="4.5"
                  fill="#FFFFFF"
                  [attr.stroke]="columna.color"
                  stroke-width="2"
                ></circle>
              }
            }

            @for (fila of datos(); track $index; let indice = $index) {
              <g class="mupa-radar-chart__eje" (mouseenter)="hover.set(indice)">
                <path [attr.d]="zonaEje(indice)" fill="transparent"></path>
                <text
                  [attr.x]="puntoEtiqueta(indice)[0]"
                  [attr.y]="puntoEtiqueta(indice)[1]"
                  [attr.text-anchor]="anclajeEtiqueta(indice)"
                  dominant-baseline="central"
                  [attr.fill]="hover() === indice ? 'var(--fg-strong)' : 'var(--fg-muted)'"
                  [attr.font-weight]="hover() === indice ? 700 : 500"
                  class="mupa-radar-chart__etiqueta-eje"
                >
                  {{ fila[claveCategoria()] }}
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
              [transformacion]="transformacionTooltip()"
              minAncho="150px"
              [ahoraBlanco]="true"
              [elevado]="true"
            />
          }
        </div>

        @if (columnas().length > 1) {
          <mupa-chart-legend [elementos]="elementosLeyenda()" />
        }
      </div>
    </mupa-chart-card>
  `,
  styleUrl: './radar-chart.component.css',
})
export class MupaRadarChart {
  protected readonly anillos = [0.2, 0.4, 0.6, 0.8, 1];

  readonly titulo = input('Gráfico de radar');
  readonly descripcion = input<string>();
  readonly datos = input<readonly DatoRadarChart[]>([]);
  readonly claveCategoria = input('month');
  readonly series = input<readonly SerieRadarChart[]>([]);
  readonly cuadricula = input<CuadriculaRadar>('polygon');
  readonly opacidadRelleno = input<number>();
  readonly mostrarCabecera = input(true, { transform: booleanAttribute });
  readonly mostrarTitulo = input(true, { transform: booleanAttribute });
  readonly mostrarDescripcion = input(true, { transform: booleanAttribute });
  readonly mostrarDatos = input(true, { transform: booleanAttribute });
  readonly mostrarBorde = input(true, { transform: booleanAttribute });
  readonly tendencia = input<string>();
  readonly direccionTendencia = input<DireccionTendencia>('up');
  readonly notaAlPie = input<string>();
  readonly tamano = input(250);
  readonly locale = input('es-PA');

  protected readonly hover = signal<number | null>(null);

  protected readonly columnas = computed<SerieCalculada[]>(() =>
    this.series().map((serie, indice) => ({
      ...serie,
      color: serie.color ?? colorDePaleta(indice, PALETA_GRAFICOS),
    })),
  );

  protected readonly opacidadRellenoEfectiva = computed(
    () => this.opacidadRelleno() ?? (this.columnas().length > 1 ? 0.35 : 0.6),
  );

  protected readonly centro = computed(() => this.dimension() / 2);

  protected readonly radio = computed(() => this.tamano() / 2 - 4);

  protected readonly dimension = computed(() => this.tamano() + 44 * 2);

  protected readonly maximo = computed(() =>
    Math.max(
      1,
      ...this.datos().flatMap((fila) =>
        this.columnas().map((columna) => Number(fila[columna.clave]) || 0),
      ),
    ),
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

    return this.columnas().map((columna) => ({
      color: columna.color,
      etiqueta: columna.etiqueta,
      valor: (Number(fila[columna.clave]) || 0).toLocaleString(this.locale()),
      marcador: 'punto' as const,
    }));
  });

  protected readonly izquierdaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0%';
    return `${(this.punto(indice, this.radio())[0] / this.dimension()) * 100}%`;
  });

  protected readonly arribaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0%';
    return `${(this.punto(indice, this.radio())[1] / this.dimension()) * 100}%`;
  });

  protected readonly transformacionTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '';
    const [x, y] = this.punto(indice, this.radio());
    return `translate(${
      x > this.centro() ? '12px' : 'calc(-100% - 12px)'
    }, ${y > this.centro() ? '-100%' : '0'})`;
  });

  protected angulo(indice: number): number {
    const cantidad = this.datos().length || 1;
    return -Math.PI / 2 + (indice / cantidad) * Math.PI * 2;
  }

  protected punto(indice: number, radio: number): PuntoGrafico {
    return [
      this.centro() + Math.cos(this.angulo(indice)) * radio,
      this.centro() + Math.sin(this.angulo(indice)) * radio,
    ];
  }

  protected puntosAnillo(factor: number): string {
    return this.datos()
      .map((_, indice) => this.punto(indice, this.radio() * factor).join(','))
      .join(' ');
  }

  protected puntosSerie(columna: SerieCalculada): string {
    return this.datos()
      .map((fila, indice) => {
        const valor = Number(fila[columna.clave]) || 0;
        return this.punto(indice, this.radio() * (valor / this.maximo())).join(',');
      })
      .join(' ');
  }

  protected valorRadio(columna: SerieCalculada): number {
    const indice = this.hover();
    if (indice === null) return this.radio();
    const fila = this.datos()[indice];
    const valor = Number(fila?.[columna.clave]) || 0;
    return this.radio() * (valor / this.maximo());
  }

  protected puntoEtiqueta(indice: number): PuntoGrafico {
    return this.punto(indice, this.radio() + 18);
  }

  protected anclajeEtiqueta(indice: number): string {
    const coseno = Math.cos(this.angulo(indice));
    if (Math.abs(coseno) < 0.2) return 'middle';
    return coseno > 0 ? 'start' : 'end';
  }

  protected zonaEje(indice: number): string {
    const anterior = this.punto(indice - 0.5, this.radio() + 30);
    const siguiente = this.punto(indice + 0.5, this.radio() + 30);
    return `M${this.centro()},${this.centro()}L${anterior[0]},${
      anterior[1]
    }L${siguiente[0]},${siguiente[1]}Z`;
  }
}
