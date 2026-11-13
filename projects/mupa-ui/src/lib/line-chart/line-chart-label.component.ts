import { booleanAttribute, Component, computed, input, signal } from '@angular/core';

import { MupaChartCard } from '../chart-utils/chart-card.component';
import { MupaChartResizeDirective } from '../chart-utils/chart-resize.directive';
import { MupaChartTooltip } from '../chart-utils/chart-tooltip.component';
import { rutaNatural } from '../chart-utils/chart-geometry';
import type { DireccionTendencia, PuntoGrafico } from '../chart-utils/chart.types';
import type { DatoLineChartLabel } from './line-chart-label.types';

/**
 * Gráfico de líneas con valores o etiquetas personalizadas sobre cada punto.
 *
 * Réplica de `LineChartLabel` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-line-chart-label',
  imports: [MupaChartCard, MupaChartResizeDirective, MupaChartTooltip],
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
      <div class="mupa-line-chart-label__cuerpo">
        <div class="mupa-line-chart-label__plot" mupaChartResize (anchoCambio)="ancho.set($event)">
          <svg
            class="mupa-line-chart-label__svg"
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

            <path [attr.d]="ruta()" fill="none" [attr.stroke]="color()" stroke-width="2"></path>

            @for (fila of datos(); track $index; let indice = $index) {
              <g class="mupa-line-chart-label__punto-grupo" (mouseenter)="hover.set(indice)">
                <rect
                  [attr.x]="x(indice) - slot() / 2"
                  y="0"
                  [attr.width]="slot()"
                  [attr.height]="altura()"
                  fill="transparent"
                ></rect>

                <circle
                  [attr.cx]="x(indice)"
                  [attr.cy]="y(valores()[indice])"
                  [attr.r]="hover() === indice ? 6 : 4"
                  [attr.fill]="hover() === indice ? '#FFFFFF' : color()"
                  [attr.stroke]="color()"
                  stroke-width="2"
                  class="mupa-line-chart-label__punto"
                ></circle>

                <text
                  [attr.x]="x(indice)"
                  [attr.y]="y(valores()[indice]) - 12"
                  text-anchor="middle"
                  fill="var(--fg-strong)"
                  class="mupa-line-chart-label__valor-punto"
                >
                  {{ textoPunto(fila, indice) }}
                </text>

                @if (mostrarEjeX()) {
                  <text
                    [attr.x]="x(indice)"
                    [attr.y]="altura() - 8"
                    text-anchor="middle"
                    fill="var(--fg-muted)"
                    class="mupa-line-chart-label__etiqueta-eje"
                  >
                    {{ etiquetaCategoria(fila[claveCategoria()]) }}
                  </text>
                }
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
              ancho="160px"
            />
          }
        </div>
      </div>
    </mupa-chart-card>
  `,
  styleUrl: './line-chart-label.component.css',
})
export class MupaLineChartLabel {
  readonly titulo = input('Gráfico de líneas');
  readonly descripcion = input<string>();
  readonly datos = input<readonly DatoLineChartLabel[]>([]);
  readonly claveCategoria = input('month');
  readonly claveValor = input.required<string>();
  readonly etiquetaSerie = input<string>();
  readonly color = input('#0660FF');
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
  readonly claveEtiquetaPunto = input<string>();
  readonly etiquetasPunto = input<Readonly<Record<string, string>>>({});
  readonly mostrarEjeX = input(true, { transform: booleanAttribute });

  protected readonly hover = signal<number | null>(null);
  protected readonly ancho = signal(600);

  protected readonly valores = computed(() =>
    this.datos().map((fila) => Number(fila[this.claveValor()]) || 0),
  );

  protected readonly maximo = computed(() => Math.max(1, ...this.valores()) * 1.05);

  protected readonly padX = computed(() => (this.claveEtiquetaPunto() ? 40 : 24));

  protected readonly padB = computed(() => (this.mostrarEjeX() ? 30 : 12));

  protected readonly altoPlot = computed(() => this.altura() - 32 - this.padB());

  protected readonly puntos = computed<readonly PuntoGrafico[]>(() =>
    this.valores().map((valor, indice) => [this.x(indice), this.y(valor)]),
  );

  protected readonly ruta = computed(() => rutaNatural(this.puntos()));

  protected readonly gridVals = computed(() =>
    [0.25, 0.5, 0.75, 1].map((factor) => factor * this.maximo()),
  );

  protected readonly slot = computed(() =>
    this.datos().length > 1
      ? (this.ancho() - this.padX() * 2) / (this.datos().length - 1)
      : this.ancho(),
  );

  protected readonly tituloTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '';
    const fila = this.datos()[indice];
    if (!fila) return '';
    return this.claveEtiquetaPunto()
      ? this.textoPunto(fila, indice)
      : String(fila[this.claveCategoria()] ?? '');
  });

  protected readonly filasTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return [];
    return [
      {
        color: this.color(),
        etiqueta: this.etiquetaSerie() ?? this.claveValor(),
        valor: (this.valores()[indice] ?? 0).toLocaleString(this.locale()),
        marcador: 'barra' as const,
      },
    ];
  });

  protected readonly izquierdaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0px';
    return `${Math.min(Math.max(this.x(indice) - 80, 0), this.ancho() - 160)}px`;
  });

  protected readonly arribaTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '0px';
    const y = this.y(this.valores()[indice] ?? 0);
    return `${y < 90 ? y + 14 : y - 32}px`;
  });

  protected readonly transformacionTooltip = computed(() => {
    const indice = this.hover();
    if (indice === null) return '';
    return this.y(this.valores()[indice] ?? 0) < 90 ? 'none' : 'translateY(-100%)';
  });

  protected x(indice: number): number {
    return (
      this.padX() +
      (this.datos().length < 2
        ? 0
        : (indice / (this.datos().length - 1)) * (this.ancho() - this.padX() * 2))
    );
  }

  protected y(valor: number): number {
    return 32 + this.altoPlot() - (valor / this.maximo()) * this.altoPlot();
  }

  protected textoPunto(fila: DatoLineChartLabel, indice: number): string {
    const clave = this.claveEtiquetaPunto();
    if (!clave) {
      return (this.valores()[indice] ?? 0).toLocaleString(this.locale());
    }

    const valor = String(fila[clave] ?? '');
    return this.etiquetasPunto()[valor] ?? valor;
  }

  protected etiquetaCategoria(valor: number | string | undefined): string {
    const texto = String(valor ?? '');
    return this.longitudEtiqueta() ? texto.slice(0, this.longitudEtiqueta()) : texto;
  }
}
