import { booleanAttribute, Component, computed, input, signal } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaChartTooltip } from '../chart-utils/chart-tooltip.component';
import { arcoRadial, tintaParaColor } from '../chart-utils/chart-geometry';
import { PALETA_CIRCULAR, colorDePaleta } from '../chart-utils/chart-palette';
import type { DireccionTendencia } from '../chart-utils/chart.types';
import type { ItemRadialChart } from './radial-chart.types';

interface ItemRadialCalculado extends ItemRadialChart {
  color: string;
  id: string;
  radio: number;
  angulo: number;
}

/**
 * Gráfico radial de anillos concéntricos, con etiquetas o cifra central.
 *
 * Réplica de `RadialChart` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-radial-chart',
  imports: [MupaChartCard, MupaChartTooltip],
  template: `
    <mupa-chart-card
      [titulo]="titulo()"
      [descripcion]="descripcion()"
      [datos]="datos()"
      [alineacion]="'centro'"
      [tendencia]="tendencia()"
      [direccionTendencia]="direccionTendencia()"
      [notaAlPie]="notaAlPie()"
    >
      <div class="mupa-radial-chart__cuerpo">
        <div
          class="mupa-radial-chart__plot"
          [style.max-width.px]="tamano()"
          (mousemove)="alMover($event)"
        >
          <svg
            class="mupa-radial-chart__svg"
            [attr.viewBox]="'0 0 ' + tamano() + ' ' + tamano()"
            width="100%"
            role="img"
            [attr.aria-label]="titulo()"
            (mouseleave)="hover.set(null)"
          >
            @for (item of itemsCalculados(); track item.clave; let indice = $index) {
              <g class="mupa-radial-chart__anillo" (mouseenter)="hover.set(indice)">
                <circle
                  class="mupa-radial-chart__pista"
                  [attr.cx]="centro()"
                  [attr.cy]="centro()"
                  [attr.r]="item.radio"
                  fill="none"
                  stroke="#EEF2F5"
                  [attr.stroke-width]="anchoBanda()"
                ></circle>

                <path
                  [attr.id]="item.id"
                  [attr.d]="arco(item.radio, item.angulo)"
                  fill="none"
                  [attr.stroke]="item.color"
                  [attr.stroke-width]="anchoBanda()"
                  stroke-linecap="round"
                  [attr.opacity]="hover() !== null && hover() !== indice ? 0.45 : 1"
                  class="mupa-radial-chart__arco"
                >
                  <title>
                    {{ item.etiqueta }}:
                    {{ item.valor.toLocaleString(locale()) }}
                  </title>
                </path>

                @if (mostrarEtiquetas() && !tieneCentro()) {
                  <text
                    dominant-baseline="central"
                    [attr.fill]="tinta(item.color)"
                    pointer-events="none"
                    [attr.opacity]="hover() !== null && hover() !== indice ? 0.6 : 1"
                    class="mupa-radial-chart__etiqueta-arco"
                    [style.font-size.px]="tamanoFuente()"
                  >
                    <textPath [attr.href]="'#' + item.id" startOffset="4">
                      {{ item.etiqueta }}
                    </textPath>
                  </text>
                }
              </g>
            }

            @if (tieneCentro()) {
              <g pointer-events="none">
                @if (valorCentral() !== undefined) {
                  <text
                    [attr.x]="centro()"
                    [attr.y]="etiquetaCentral() !== undefined ? centro() - 6 : centro()"
                    text-anchor="middle"
                    dominant-baseline="central"
                    fill="var(--fg-strong)"
                    [style.font-size.px]="tamanoCentral()"
                    class="mupa-radial-chart__valor-central"
                  >
                    {{ valorCentralFormateado() }}
                  </text>
                }

                @if (etiquetaCentral() !== undefined) {
                  <text
                    [attr.x]="centro()"
                    [attr.y]="valorCentral() !== undefined ? centro() + tamano() * 0.1 : centro()"
                    text-anchor="middle"
                    dominant-baseline="central"
                    fill="var(--fg-muted)"
                    class="mupa-radial-chart__etiqueta-central"
                  >
                    {{ etiquetaCentral() }}
                  </text>
                }
              </g>
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
      </div>
    </mupa-chart-card>
  `,
  styleUrl: './radial-chart.component.css',
})
export class MupaRadialChart {
  private static secuencia = 0;
  private readonly id = ++MupaRadialChart.secuencia;

  readonly titulo = input('Gráfico radial');
  readonly descripcion = input<string>();
  readonly datos = input<readonly ItemRadialChart[]>([]);
  readonly etiquetaValor = input<string>();
  readonly mostrarEtiquetas = input(true, { transform: booleanAttribute });
  readonly anguloMaximo = input(300);
  readonly tendencia = input<string>();
  readonly direccionTendencia = input<DireccionTendencia>('up');
  readonly notaAlPie = input<string>();
  readonly tamano = input(250);
  readonly locale = input('es-PA');
  readonly valorCentral = input<string | number>();
  readonly etiquetaCentral = input<string>();
  readonly maximo = input<number>();
  readonly grosor = input<number>();

  protected readonly hover = signal<number | null>(null);
  protected readonly posicion = signal<readonly [number, number]>([0, 0]);

  protected readonly centro = computed(() => this.tamano() / 2);

  protected readonly radioExterior = computed(() => this.tamano() * 0.44);

  protected readonly tieneCentro = computed(
    () => this.valorCentral() !== undefined || this.etiquetaCentral() !== undefined,
  );

  protected readonly radioInterior = computed(() => {
    const exterior = this.radioExterior();
    const cantidad = Math.max(1, this.datos().length);
    if (this.grosor()) {
      return Math.max(0, exterior - this.grosor()! * cantidad);
    }
    return this.tieneCentro() ? exterior - this.tamano() * 0.07 * cantidad : this.tamano() * 0.12;
  });

  protected readonly anchoBanda = computed(() => {
    const banda = (this.radioExterior() - this.radioInterior()) / Math.max(1, this.datos().length);
    return banda * (this.tieneCentro() ? 1 : 0.82);
  });

  protected readonly maximoCalculado = computed(
    () => this.maximo() || Math.max(1, ...this.datos().map((item) => Number(item.valor) || 0)),
  );

  protected readonly total = computed(
    () => this.datos().reduce((suma, item) => suma + (Number(item.valor) || 0), 0) || 1,
  );

  protected readonly tamanoFuente = computed(() =>
    Math.max(9, Math.min(12, this.anchoBanda() * 0.62)),
  );

  protected readonly tamanoCentral = computed(() => Math.round(this.tamano() * 0.15));

  protected readonly itemsCalculados = computed<ItemRadialCalculado[]>(() => {
    const interior = this.radioInterior();
    const banda = (this.radioExterior() - interior) / Math.max(1, this.datos().length);
    const maximo = this.maximoCalculado();

    return this.datos().map((item, indice) => ({
      ...item,
      color: item.color ?? colorDePaleta(indice, PALETA_CIRCULAR),
      id: `mupa-radial-${this.id}-${indice}`,
      radio: interior + banda * indice + banda / 2,
      angulo: Math.max(2, ((Number(item.valor) || 0) / maximo) * this.anguloMaximo()),
    }));
  });

  protected readonly valorCentralFormateado = computed(() => {
    const valor = this.valorCentral();
    return typeof valor === 'number' ? valor.toLocaleString(this.locale()) : (valor ?? '');
  });

  protected readonly filasTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return [];
    const item = this.itemsCalculados()[indice];
    if (!item) return [];

    return [
      {
        color: item.color,
        etiqueta: item.etiqueta,
        valor: item.valor.toLocaleString(this.locale()),
        marcador: 'punto' as const,
      },
    ];
  });

  protected readonly notaTooltip = computed(() => {
    if (this.tieneCentro()) return '';
    const indice = this.hover();
    if (indice === null) return '';
    const item = this.itemsCalculados()[indice];
    if (!item) return '';

    const porcentaje = ((item.valor / this.total()) * 100).toLocaleString(this.locale(), {
      maximumFractionDigits: 1,
    });
    const etiquetaValor = this.etiquetaValor();
    const etiqueta = etiquetaValor ? `de ${etiquetaValor.toLowerCase()}` : 'del total';

    return `${porcentaje}% ${etiqueta}`;
  });

  protected arco(radio: number, angulo: number): string {
    return arcoRadial(this.centro(), radio, angulo);
  }

  protected tinta(color: string): string {
    return tintaParaColor(color);
  }

  protected alMover(evento: MouseEvent): void {
    const rect = (evento.currentTarget as HTMLElement).getBoundingClientRect();
    this.posicion.set([evento.clientX - rect.left, evento.clientY - rect.top]);
  }
}
