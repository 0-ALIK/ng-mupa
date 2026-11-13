import { booleanAttribute, Component, computed, input } from '@angular/core';

import { MupaChartDataTable } from './chart-data-table.component';
import { MupaTrendIcon } from './trend-icon.component';
import type {
  AlineacionGrafico,
  ColumnaDatosGrafico,
  DireccionTendencia,
  RegistroGrafico,
} from './chart.types';

/**
 * Superficie común de los gráficos: tarjeta, cabecera, pie y tabla de datos.
 *
 * Es infraestructura interna del sistema. Los gráficos públicos deciden su
 * cuerpo y, si lo necesitan, su cabecera personalizada.
 */
@Component({
  selector: 'mupa-chart-card',
  imports: [MupaChartDataTable, MupaTrendIcon],
  template: `
    <section class="mupa-chart-card" [style.container-name]="nombreContenedor() || null">
      @if (mostrarCabecera()) {
        <header
          class="mupa-chart-card__cabecera"
          [class.mupa-chart-card__cabecera--centrada]="alineacion() === 'centro'"
          [class.mupa-chart-card__cabecera--personalizada]="cabeceraPersonalizada()"
        >
          @if (!cabeceraPersonalizada()) {
            <div class="mupa-chart-card__titulo-bloque">
              <div class="mupa-chart-card__titulo">{{ titulo() }}</div>
              @if (descripcion()) {
                <div class="mupa-chart-card__descripcion">
                  {{ descripcion() }}
                </div>
              }
            </div>
          }

          <div
            class="mupa-chart-card__extra"
            [class.mupa-chart-card__extra--personalizada]="cabeceraPersonalizada()"
          >
            <ng-content select="[mupaChartHeader]" />
          </div>
        </header>
      }

      <div class="mupa-chart-card__cuerpo">
        <ng-content />
      </div>

      @if (tendencia() || notaAlPie()) {
        <footer
          class="mupa-chart-card__pie"
          [class.mupa-chart-card__pie--centrado]="alineacion() === 'centro'"
        >
          @if (tendencia()) {
            <div class="mupa-chart-card__tendencia">
              {{ tendencia() }}
              <span
                class="mupa-chart-card__tendencia-icono"
                [style.border-color]="colorTendencia()"
              >
                <mupa-trend-icon [direccion]="direccionTendencia()" [color]="colorTendencia()" />
              </span>
            </div>
          }

          @if (notaAlPie()) {
            <div class="mupa-chart-card__nota">{{ notaAlPie() }}</div>
          }
        </footer>
      }

      @if (mostrarDatos()) {
        <mupa-chart-data-table
          [datos]="datos()"
          [columnas]="columnas()"
          [titulo]="tituloDatosEfectivo()"
        />
      }
    </section>
  `,
  styleUrl: './chart-card.component.css',
})
export class MupaChartCard {
  readonly titulo = input.required<string>();
  readonly descripcion = input<string>();
  readonly alineacion = input<AlineacionGrafico>('inicio');
  readonly mostrarCabecera = input(true, { transform: booleanAttribute });
  readonly cabeceraPersonalizada = input(false, {
    transform: booleanAttribute,
  });
  readonly nombreContenedor = input<string>();

  readonly tendencia = input<string>();
  readonly direccionTendencia = input<DireccionTendencia>('up');
  readonly notaAlPie = input<string>();

  readonly datos = input<readonly RegistroGrafico[]>([]);
  readonly columnas = input<readonly ColumnaDatosGrafico[]>([]);
  readonly mostrarDatos = input(true, { transform: booleanAttribute });
  readonly tituloDatos = input<string>();

  protected readonly tituloDatosEfectivo = computed(() => this.tituloDatos() ?? this.titulo());

  protected readonly colorTendencia = computed(() =>
    this.direccionTendencia() === 'down' ? 'var(--color-error-700)' : 'var(--color-success-700)',
  );
}
