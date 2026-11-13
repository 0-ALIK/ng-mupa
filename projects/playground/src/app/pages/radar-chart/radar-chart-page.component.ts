import { Component } from '@angular/core';
import { MupaRadarChart } from 'mupa-ui';

import { DATOS_RADAR, DATOS_RADAR_CANAL } from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-radar-chart-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaRadarChart],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Radar"
        descripcion="Gráfico de radar con cuadrícula poligonal o circular, leyenda y tooltip por eje."
      />

      <pg-demo-card
        titulo="Reportes atendidos"
        descripcion="Ejemplo original con una sola serie y cuadrícula poligonal."
        [codigo]="ejemploSimple"
      >
        <div class="pg-ancho">
          <mupa-radar-chart
            titulo="Reportes atendidos"
            descripcion="Total de reportes resueltos en los últimos 6 meses"
            [datos]="datosResueltos"
            [series]="seriesResueltos"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Enero – Junio 2026"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Radar — leyenda"
        descripcion="Ejemplo original con dos series superpuestas y leyenda."
        [codigo]="ejemploLeyenda"
      >
        <div class="pg-ancho">
          <mupa-radar-chart
            titulo="Reportes por canal"
            descripcion="Total de reportes recibidos en los últimos 6 meses"
            [datos]="datosCanal"
            [series]="seriesCanal"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Enero – Junio 2026"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variante propia"
        descripcion="Cuadrícula circular con menor opacidad de relleno."
        [codigo]="ejemploCircular"
      >
        <div class="pg-ancho">
          <mupa-radar-chart
            titulo="Comparación de canales"
            descripcion="Portal web y App Ciudadana"
            [datos]="datosCanal"
            [series]="seriesCanal"
            [cuadricula]="'circle'"
            [opacidadRelleno]="0.22"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/radar-chart/radar-chart.md" />
      </section>
    </div>
  `,
})
export class RadarChartPageComponent {
  protected readonly datosResueltos = DATOS_RADAR;
  protected readonly datosCanal = DATOS_RADAR_CANAL;

  protected readonly seriesResueltos = [{ clave: 'resueltos', etiqueta: 'Resueltos' }];

  protected readonly seriesCanal = [
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' },
  ];

  protected readonly ejemploSimple = `<mupa-radar-chart
  titulo="Reportes atendidos"
  [datos]="datosResueltos"
  [series]="seriesResueltos"
/>`;

  protected readonly ejemploLeyenda = `<mupa-radar-chart
  titulo="Reportes por canal"
  [datos]="datosCanal"
  [series]="seriesCanal"
/>`;

  protected readonly ejemploCircular = `<mupa-radar-chart
  titulo="Comparación de canales"
  [datos]="datosCanal"
  [series]="seriesCanal"
  [cuadricula]="'circle'"
  [opacidadRelleno]="0.22"
/>`;
}
