import { Component } from '@angular/core';
import { MupaLineChart, MupaLineChartLabel } from 'mupa-ui';

import {
  DATOS_LINEA_CUSTOM,
  DATOS_LINEA_LABEL,
  DATOS_LINEA_PROPIO,
  generarDatosLinea,
} from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-line-chart-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaLineChart,
    MupaLineChartLabel,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Líneas"
        descripcion="Línea interactiva con selector de series, valores sobre cada punto y etiquetas personalizadas."
      />

      <pg-demo-card
        titulo="Líneas — interactivo"
        descripcion="Ejemplo original con dos series, pestañas de totales y selector móvil."
        [codigo]="ejemploInteractivo"
      >
        <div class="pg-ancho">
          <mupa-line-chart
            titulo="Visitas a trámites en línea"
            descripcion="Total de visitas en los últimos 3 meses"
            [datos]="datosLinea"
            [series]="seriesLinea"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Líneas — con valores"
        descripcion="Ejemplo original de LineChartLabel con el valor encima de cada punto."
        [codigo]="ejemploValores"
      >
        <div class="pg-ancho">
          <mupa-line-chart-label
            titulo="Solicitudes de empleo"
            descripcion="Enero – Junio 2026"
            [datos]="datosSolicitudes"
            claveValor="solicitudes"
            etiquetaSerie="Solicitudes"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Postulaciones en la Bolsa de empleo de los últimos 6 meses"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Líneas — etiqueta personalizada"
        descripcion="Ejemplo original con etiquetas de canal sobre cada punto y sin eje X."
        [codigo]="ejemploEtiqueta"
      >
        <div class="pg-ancho">
          <mupa-line-chart-label
            titulo="Reportes por canal de atención"
            descripcion="Enero – Junio 2026"
            [datos]="datosCanal"
            claveCategoria="canal"
            claveValor="reportes"
            etiquetaSerie="Reportes"
            claveEtiquetaPunto="canal"
            [etiquetasPunto]="etiquetasCanal"
            [mostrarEjeX]="false"
            color="#48A9FF"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Total de reportes ciudadanos de los últimos 6 meses"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Solo el gráfico"
        descripcion="Sin cabecera, sin tabla de datos y sin borde: únicamente la línea y sus ejes."
        [codigo]="ejemploSoloGrafico"
      >
        <div class="pg-ancho">
          <mupa-line-chart
            titulo="Visitas a trámites en línea"
            [datos]="datosLinea"
            [series]="seriesLinea"
            [mostrarCabecera]="false"
            [mostrarDatos]="false"
            [mostrarBorde]="false"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Sin título, con selector de series"
        descripcion="Oculta título y descripción, conserva las pestañas de series y quita tabla y borde."
        [codigo]="ejemploConSelector"
      >
        <div class="pg-ancho">
          <mupa-line-chart
            titulo="Visitas a trámites en línea"
            descripcion="Total de visitas en los últimos 3 meses"
            [datos]="datosLinea"
            [series]="seriesLinea"
            [mostrarTitulo]="false"
            [mostrarDescripcion]="false"
            [mostrarDatos]="false"
            [mostrarBorde]="false"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variante propia"
        descripcion="Una sola serie durante siete días, sin selector de series."
        [codigo]="ejemploPropio"
      >
        <div class="pg-ancho">
          <mupa-line-chart
            titulo="Visitas diarias"
            descripcion="Última semana de octubre"
            [datos]="datosPropios"
            [series]="seriesPropia"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/line-chart/line-chart.md" />
        <pg-markdown-view ruta="docs/line-chart/line-chart-label.md" />
      </section>
    </div>
  `,
})
export class LineChartPageComponent {
  protected readonly datosLinea = generarDatosLinea();
  protected readonly datosSolicitudes = DATOS_LINEA_LABEL;
  protected readonly datosCanal = DATOS_LINEA_CUSTOM;
  protected readonly datosPropios = DATOS_LINEA_PROPIO;

  protected readonly seriesLinea = [
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' },
  ];

  protected readonly seriesPropia = [{ clave: 'web', etiqueta: 'Visitas', color: '#7C6AE6' }];

  protected readonly etiquetasCanal: Record<string, string> = {
    app: 'App Ciudadana',
    web: 'Portal web',
    linea: 'Línea 311',
    presencial: 'Presencial',
    otros: 'Otros',
  };

  protected readonly ejemploInteractivo = `<mupa-line-chart
  titulo="Visitas a trámites en línea"
  descripcion="Total de visitas en los últimos 3 meses"
  [datos]="datosLinea"
  [series]="seriesLinea"
/>`;

  protected readonly ejemploValores = `<mupa-line-chart-label
  titulo="Solicitudes de empleo"
  [datos]="datosSolicitudes"
  claveValor="solicitudes"
  etiquetaSerie="Solicitudes"
  tendencia="Subió 5,2% este mes"
/>`;

  protected readonly ejemploEtiqueta = `<mupa-line-chart-label
  titulo="Reportes por canal de atención"
  [datos]="datosCanal"
  claveCategoria="canal"
  claveValor="reportes"
  claveEtiquetaPunto="canal"
  [etiquetasPunto]="etiquetasCanal"
  [mostrarEjeX]="false"
  color="#48A9FF"
/>`;

  protected readonly ejemploSoloGrafico = `<mupa-line-chart
  titulo="Visitas a trámites en línea"
  [datos]="datosLinea"
  [series]="seriesLinea"
  [mostrarCabecera]="false"
  [mostrarDatos]="false"
  [mostrarBorde]="false"
/>`;

  protected readonly ejemploConSelector = `<mupa-line-chart
  titulo="Visitas a trámites en línea"
  descripcion="Total de visitas en los últimos 3 meses"
  [datos]="datosLinea"
  [series]="seriesLinea"
  [mostrarTitulo]="false"
  [mostrarDescripcion]="false"
  [mostrarDatos]="false"
  [mostrarBorde]="false"
/>`;

  protected readonly ejemploPropio = `<mupa-line-chart
  titulo="Visitas diarias"
  [datos]="datosPropios"
  [series]="seriesPropia"
/>`;
}
