import { Component } from '@angular/core';
import { MupaAreaChart } from 'mupa-ui';

import { generarDatosArea } from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-area-chart-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaAreaChart],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Área — interactivo"
        descripcion="Gráfico de área con selector de periodo, series apiladas, tooltip y tabla de datos accesible."
      />

      <pg-demo-card
        titulo="Reportes ciudadanos"
        descripcion="Ejemplo original: 92 días de reportes del portal web y la App Ciudadana, apilados por defecto."
        [codigo]="ejemploOriginal"
      >
        <div class="pg-ancho">
          <mupa-area-chart
            titulo="Reportes ciudadanos"
            descripcion="Reportes recibidos según el periodo seleccionado"
            [datos]="datos"
            [series]="series"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Series no apiladas"
        descripcion="Variante propia: compara las series por separado y arranca en los últimos 30 días."
        [codigo]="ejemploPropio"
      >
        <div class="pg-ancho">
          <mupa-area-chart
            titulo="Reportes por canal"
            descripcion="Comparación directa entre portal web y App Ciudadana"
            [datos]="datos"
            [series]="seriesComparadas"
            [apilado]="false"
            rangoPorDefecto="30d"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/area-chart/area-chart.md" />
      </section>
    </div>
  `,
})
export class AreaChartPageComponent {
  protected readonly datos = generarDatosArea();

  protected readonly series = [
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' },
  ];

  protected readonly seriesComparadas = [
    { clave: 'web', etiqueta: 'Portal web', color: '#48A9FF' },
    { clave: 'app', etiqueta: 'App Ciudadana', color: '#0660FF' },
  ];

  protected readonly ejemploOriginal = `<mupa-area-chart
  titulo="Reportes ciudadanos"
  descripcion="Reportes recibidos según el periodo seleccionado"
  [datos]="datos"
  [series]="[
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' }
  ]"
/>`;

  protected readonly ejemploPropio = `<mupa-area-chart
  titulo="Reportes por canal"
  [datos]="datos"
  [series]="seriesComparadas"
  [apilado]="false"
  rangoPorDefecto="30d"
/>`;
}
