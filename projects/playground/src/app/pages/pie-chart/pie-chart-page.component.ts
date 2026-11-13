import { Component } from '@angular/core';
import { MupaPieChart } from 'mupa-ui';

import { DATOS_PIE, DATOS_PIE_PAGOS } from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-pie-chart-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaPieChart],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Circular"
        descripcion="Gráfico circular o de dona con leyenda, etiquetas internas y tooltip."
      />

      <pg-demo-card
        titulo="Reportes por categoría"
        descripcion="Ejemplo original de gráfico circular con leyenda y tendencia."
        [codigo]="ejemploCircular"
      >
        <div class="pg-ancho">
          <mupa-pie-chart
            titulo="Reportes por categoría"
            descripcion="Enero – Junio 2026"
            etiquetaValor="Reportes"
            [datos]="datosReportes"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Total de reportes ciudadanos de los últimos 6 meses"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Circular — etiquetas"
        descripcion="Ejemplo original con etiquetas dentro de cada porción y sin leyenda."
        [codigo]="ejemploEtiquetas"
      >
        <div class="pg-ancho">
          <mupa-pie-chart
            titulo="Pagos por trámite"
            descripcion="Enero – Junio 2026"
            etiquetaValor="Pagos"
            [datos]="datosPagos"
            [listaEtiquetas]="'etiqueta'"
            [mostrarLeyenda]="false"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Total de pagos en línea de los últimos 6 meses"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variante propia"
        descripcion="Dona con porcentajes internos y leyenda para comparar la distribución."
        [codigo]="ejemploDona"
      >
        <div class="pg-ancho">
          <mupa-pie-chart
            titulo="Distribución de reportes"
            descripcion="Porcentaje por categoría"
            etiquetaValor="Reportes"
            [datos]="datosReportes"
            [radioInterior]="0.62"
            [listaEtiquetas]="'porcentaje'"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/pie-chart/pie-chart.md" />
      </section>
    </div>
  `,
})
export class PieChartPageComponent {
  protected readonly datosReportes = DATOS_PIE;
  protected readonly datosPagos = DATOS_PIE_PAGOS;

  protected readonly ejemploCircular = `<mupa-pie-chart
  titulo="Reportes por categoría"
  etiquetaValor="Reportes"
  [datos]="datosReportes"
  tendencia="Subió 5,2% este mes"
/>`;

  protected readonly ejemploEtiquetas = `<mupa-pie-chart
  titulo="Pagos por trámite"
  etiquetaValor="Pagos"
  [datos]="datosPagos"
  [listaEtiquetas]="'etiqueta'"
  [mostrarLeyenda]="false"
/>`;

  protected readonly ejemploDona = `<mupa-pie-chart
  titulo="Distribución de reportes"
  [datos]="datosReportes"
  [radioInterior]="0.62"
  [listaEtiquetas]="'porcentaje'"
/>`;
}
