import { Component, computed, input } from '@angular/core';

import type { ColumnaDatosGrafico, RegistroGrafico } from './chart.types';

/**
 * Alternativa tabular a los gráficos: accesible por teclado y sin depender
 * del hover o del color.
 *
 * Réplica de `ChartDataTable` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-chart-data-table',
  template: `
    <details class="mupa-chart-data-table">
      <summary>Ver datos del gráfico</summary>

      <div
        class="mupa-chart-data-table__region"
        tabindex="0"
        role="region"
        [attr.aria-label]="titulo()"
      >
        <table>
          <caption>
            {{
              titulo()
            }}
          </caption>
          <thead>
            <tr>
              @for (columna of columnasEfectivas(); track columna.clave) {
                <th scope="col">{{ columna.etiqueta }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (fila of datos(); track $index) {
              <tr>
                @for (columna of columnasEfectivas(); track columna.clave) {
                  <td>{{ valor(fila, columna.clave) }}</td>
                }
              </tr>
            }
          </tbody>
        </table>

        @if (!datos().length) {
          <p class="mupa-chart-data-table__vacio" role="status">No hay datos disponibles.</p>
        }
      </div>
    </details>
  `,
  styleUrl: './chart-data-table.component.css',
})
export class MupaChartDataTable {
  /** Filas que se muestran en la tabla. */
  readonly datos = input<readonly RegistroGrafico[]>([]);

  /** Columnas explícitas; si se omiten, se derivan de la primera fila. */
  readonly columnas = input<readonly ColumnaDatosGrafico[]>([]);

  /** Título y nombre accesible de la tabla. */
  readonly titulo = input('Datos del gráfico');

  protected readonly columnasEfectivas = computed<ColumnaDatosGrafico[]>(() => {
    if (this.columnas().length) return [...this.columnas()];

    const primera = this.datos()[0];
    if (!primera) return [];

    return Object.keys(primera)
      .filter((clave) => !['color', 'fill', 'stroke'].includes(clave))
      .map((clave) => ({ clave, etiqueta: clave }));
  });

  protected valor(fila: RegistroGrafico, clave: string): string {
    const valor = (fila as Record<string, unknown>)[clave];
    return valor === null || valor === undefined ? '—' : String(valor);
  }
}
