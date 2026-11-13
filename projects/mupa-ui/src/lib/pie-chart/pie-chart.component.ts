import { booleanAttribute, Component, computed, input, signal } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaChartLegend } from '../chart-utils/chart-legend.component';
import { MupaChartTooltip } from '../chart-utils/chart-tooltip.component';
import { arcoPorcion, tintaParaColor } from '../chart-utils/chart-geometry';
import { PALETA_CIRCULAR, colorDePaleta } from '../chart-utils/chart-palette';
import type { DireccionTendencia } from '../chart-utils/chart.types';
import type { ListaEtiquetasPie, PorcionPieChart } from './pie-chart.types';

interface PorcionCalculada extends PorcionPieChart {
  color: string;
  d: string;
  dx: number;
  dy: number;
  lx: number;
  ly: number;
  fraccion: number;
}

/**
 * Gráfico circular o de dona con etiquetas internas opcionales.
 *
 * Réplica de `PieChart` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-pie-chart',
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
      <div class="mupa-pie-chart__cuerpo">
        <div
          class="mupa-pie-chart__plot"
          [style.max-width.px]="tamano()"
          (mousemove)="alMover($event)"
        >
          <svg
            class="mupa-pie-chart__svg"
            [attr.viewBox]="'0 0 ' + tamano() + ' ' + tamano()"
            width="100%"
            role="img"
            [attr.aria-label]="titulo()"
            (mouseleave)="hover.set(null)"
          >
            @for (porcion of porciones(); track porcion.clave; let indice = $index) {
              <path
                [attr.d]="porcion.d"
                [attr.fill]="porcion.color"
                stroke="#FFFFFF"
                stroke-width="2"
                stroke-linejoin="round"
                [attr.transform]="
                  hover() === indice ? 'translate(' + porcion.dx + ',' + porcion.dy + ')' : null
                "
                [attr.opacity]="hover() !== null && hover() !== indice ? 0.55 : 1"
                class="mupa-pie-chart__porcion"
                (mouseenter)="hover.set(indice)"
              >
                <title>
                  {{ porcion.etiqueta }}:
                  {{ porcion.valor.toLocaleString(locale()) }}
                </title>
              </path>

              @if (listaEtiquetas() && porcion.fraccion >= 0.04) {
                <text
                  [attr.x]="porcion.lx"
                  [attr.y]="porcion.ly"
                  text-anchor="middle"
                  dominant-baseline="central"
                  [attr.fill]="tinta(porcion.color)"
                  pointer-events="none"
                  [attr.transform]="
                    hover() === indice ? 'translate(' + porcion.dx + ',' + porcion.dy + ')' : null
                  "
                  class="mupa-pie-chart__etiqueta-porcion"
                >
                  {{ textoEtiqueta(porcion) }}
                </text>
              }
            }
          </svg>

          @if (hover() !== null) {
            <mupa-chart-tooltip
              [filas]="filasTooltip()"
              [nota]="notaTooltip()"
              [izquierda]="posicion()[0] + 14 + 'px'"
              [arriba]="posicion()[1] + 14 + 'px'"
              minAncho="150px"
              [ahoraBlanco]="true"
              [elevado]="true"
            />
          }
        </div>

        @if (mostrarLeyenda()) {
          <mupa-chart-legend [elementos]="elementosLeyenda()" />
        }
      </div>
    </mupa-chart-card>
  `,
  styleUrl: './pie-chart.component.css',
})
export class MupaPieChart {
  readonly titulo = input('Gráfico circular');
  readonly descripcion = input<string>();
  readonly datos = input<readonly PorcionPieChart[]>([]);
  readonly etiquetaValor = input<string>();
  readonly radioInterior = input(0);
  readonly mostrarCabecera = input(true, { transform: booleanAttribute });
  readonly mostrarTitulo = input(true, { transform: booleanAttribute });
  readonly mostrarDescripcion = input(true, { transform: booleanAttribute });
  readonly mostrarDatos = input(true, { transform: booleanAttribute });
  readonly mostrarBorde = input(true, { transform: booleanAttribute });
  readonly mostrarLeyenda = input(true, { transform: booleanAttribute });
  readonly tendencia = input<string>();
  readonly direccionTendencia = input<DireccionTendencia>('up');
  readonly notaAlPie = input<string>();
  readonly tamano = input(250);
  readonly locale = input('es-PA');
  readonly listaEtiquetas = input<ListaEtiquetasPie>();

  protected readonly hover = signal<number | null>(null);
  protected readonly posicion = signal<readonly [number, number]>([0, 0]);

  protected readonly porciones = computed<PorcionCalculada[]>(() => {
    const porciones = this.datos().map((porcion, indice) => ({
      ...porcion,
      color: porcion.color ?? colorDePaleta(indice, PALETA_CIRCULAR),
    }));
    const total = porciones.reduce((suma, porcion) => suma + (Number(porcion.valor) || 0), 0) || 1;
    const centro = this.tamano() / 2;
    const radio = this.tamano() / 2 - 6;
    const radioInterior = radio * Math.min(0.9, Math.max(0, this.radioInterior()));

    let angulo = -Math.PI / 2;
    return porciones.map((porcion) => {
      const inicio = angulo;
      const fin = angulo + (porcion.valor / total) * Math.PI * 2;
      angulo = fin;
      const medio = (inicio + fin) / 2;
      const radioEtiqueta = radioInterior > 0 ? (radio + radioInterior) / 2 : radio * 0.64;

      return {
        ...porcion,
        d: arcoPorcion(centro, centro, radio, radioInterior, inicio, fin),
        dx: Math.cos(medio) * 6,
        dy: Math.sin(medio) * 6,
        lx: centro + Math.cos(medio) * radioEtiqueta,
        ly: centro + Math.sin(medio) * radioEtiqueta,
        fraccion: porcion.valor / total,
      };
    });
  });

  protected readonly total = computed(
    () => this.datos().reduce((suma, porcion) => suma + (Number(porcion.valor) || 0), 0) || 1,
  );

  protected readonly elementosLeyenda = computed(() =>
    this.porciones().map((porcion) => ({
      color: porcion.color,
      etiqueta: porcion.etiqueta,
    })),
  );

  protected readonly filasTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return [];
    const porcion = this.porciones()[indice];
    if (!porcion) return [];

    return [
      {
        color: porcion.color,
        etiqueta: porcion.etiqueta,
        valor: porcion.valor.toLocaleString(this.locale()),
        marcador: 'punto' as const,
      },
    ];
  });

  protected readonly notaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '';
    const porcion = this.porciones()[indice];
    if (!porcion) return '';

    const porcentaje = ((porcion.valor / this.total()) * 100).toLocaleString(this.locale(), {
      maximumFractionDigits: 1,
    });
    const etiquetaValor = this.etiquetaValor();
    const etiqueta = etiquetaValor ? `de ${etiquetaValor.toLowerCase()}` : 'del total';

    return `${porcentaje}% ${etiqueta}`;
  });

  protected alMover(evento: MouseEvent): void {
    const rect = (evento.currentTarget as HTMLElement).getBoundingClientRect();
    this.posicion.set([evento.clientX - rect.left, evento.clientY - rect.top]);
  }

  protected tinta(color: string): string {
    return tintaParaColor(color);
  }

  protected textoEtiqueta(porcion: PorcionCalculada): string {
    switch (this.listaEtiquetas()) {
      case 'valor':
        return porcion.valor.toLocaleString(this.locale());
      case 'porcentaje':
        return `${Math.round(porcion.fraccion * 100)}%`;
      default:
        return porcion.etiqueta;
    }
  }
}
