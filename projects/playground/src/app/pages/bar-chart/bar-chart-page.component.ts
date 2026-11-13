import { Component } from '@angular/core';
import { MupaBarChart } from 'mupa-ui';

import {
  DATOS_BARRAS,
  DATOS_BARRAS_MULTIPLE,
  DATOS_BARRAS_PROPIO,
} from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-bar-chart-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaBarChart],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Barras"
        descripcion="Gráfico de barras simple o agrupado, con tooltip, leyenda, tendencia y tabla de datos."
      />

      <pg-demo-card
        titulo="Pagos de impuestos"
        descripcion="Ejemplo original de barras simples con tendencia y nota al pie."
        [codigo]="ejemploSimple"
      >
        <div class="pg-ancho">
          <mupa-bar-chart
            titulo="Pagos de impuestos"
            descripcion="Enero – Junio 2026"
            [datos]="datosPagos"
            [series]="seriesPagos"
            tendencia="Subió 5,2% este mes"
            direccionTendencia="up"
            notaAlPie="Total de pagos en línea de los últimos 6 meses"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Barras agrupadas"
        descripcion="Ejemplo original de dos series comparadas por mes."
        [codigo]="ejemploMultiple"
      >
        <div class="pg-ancho">
          <mupa-bar-chart
            titulo="Reportes por canal"
            descripcion="Enero – Junio 2026"
            [datos]="datosCanales"
            [series]="seriesCanales"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Total de reportes ciudadanos de los últimos 6 meses"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variante propia"
        descripcion="Barras agrupadas por tipo de trámite, con radio personalizado y tendencia negativa."
        [codigo]="ejemploPropio"
      >
        <div class="pg-ancho">
          <mupa-bar-chart
            titulo="Pagos por trámite"
            descripcion="Comparación entre portal y aplicación"
            [datos]="datosPropios"
            claveCategoria="mes"
            [series]="seriesCanales"
            [radio]="10"
            tendencia="Bajó 2,1% este mes"
            direccionTendencia="down"
            notaAlPie="Datos de demostración para probar la API"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/bar-chart/bar-chart.md" />
      </section>
    </div>
  `,
})
export class BarChartPageComponent {
  protected readonly datosPagos = DATOS_BARRAS;
  protected readonly datosCanales = DATOS_BARRAS_MULTIPLE;
  protected readonly datosPropios = DATOS_BARRAS_PROPIO;

  protected readonly seriesPagos = [{ clave: 'pagos', etiqueta: 'Pagos en línea' }];

  protected readonly seriesCanales = [
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' },
  ];

  protected readonly ejemploSimple = `<mupa-bar-chart
  titulo="Pagos de impuestos"
  descripcion="Enero – Junio 2026"
  [datos]="datosPagos"
  [series]="seriesPagos"
  tendencia="Subió 5,2% este mes"
  notaAlPie="Total de pagos en línea de los últimos 6 meses"
/>`;

  protected readonly ejemploMultiple = `<mupa-bar-chart
  titulo="Reportes por canal"
  [datos]="datosCanales"
  [series]="seriesCanales"
  tendencia="Subió 5,2% este mes"
/>`;

  protected readonly ejemploPropio = `<mupa-bar-chart
  titulo="Pagos por trámite"
  [datos]="datosPropios"
  claveCategoria="mes"
  [series]="seriesCanales"
  [radio]="10"
  tendencia="Bajó 2,1% este mes"
  direccionTendencia="down"
/>`;
}
