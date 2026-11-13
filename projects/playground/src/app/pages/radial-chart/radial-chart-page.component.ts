import { Component } from '@angular/core';
import { MupaRadialChart } from 'mupa-ui';

import { DATOS_RADIAL, DATOS_RADIAL_CENTRO } from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-radial-chart-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaRadialChart],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Radial"
        descripcion="Anillos concéntricos con etiquetas sobre el arco o una cifra central."
      />

      <pg-demo-card
        titulo="Radial — etiquetas"
        descripcion="Ejemplo original con etiquetas escritas sobre cada arco."
        [codigo]="ejemploEtiquetas"
      >
        <div class="pg-ancho">
          <mupa-radial-chart
            titulo="Reportes por categoría"
            descripcion="Enero – Junio 2026"
            etiquetaValor="Reportes"
            [datos]="datosCategorias"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Total de reportes ciudadanos de los últimos 6 meses"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Radial — cifra central"
        descripcion="Ejemplo original de un solo anillo con cifra y etiqueta central."
        [codigo]="ejemploCentro"
      >
        <div class="pg-ancho">
          <mupa-radial-chart
            titulo="Reportes resueltos"
            descripcion="Enero – Junio 2026"
            [datos]="datosCentro"
            [maximo]="288"
            [anguloMaximo]="360"
            [valorCentral]="200"
            etiquetaCentral="Resueltos"
            tendencia="Subió 5,2% este mes"
            notaAlPie="Meta semestral: 288 reportes resueltos"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variante propia"
        descripcion="Anillos más gruesos y un barrido de 240 grados."
        [codigo]="ejemploPropio"
      >
        <div class="pg-ancho">
          <mupa-radial-chart
            titulo="Categorías de reportes"
            descripcion="Vista compacta"
            etiquetaValor="Reportes"
            [datos]="datosCategorias"
            [grosor]="12"
            [anguloMaximo]="240"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/radial-chart/radial-chart.md" />
      </section>
    </div>
  `,
})
export class RadialChartPageComponent {
  protected readonly datosCategorias = DATOS_RADIAL;
  protected readonly datosCentro = DATOS_RADIAL_CENTRO;

  protected readonly ejemploEtiquetas = `<mupa-radial-chart
  titulo="Reportes por categoría"
  etiquetaValor="Reportes"
  [datos]="datosCategorias"
/>`;

  protected readonly ejemploCentro = `<mupa-radial-chart
  titulo="Reportes resueltos"
  [datos]="datosCentro"
  [maximo]="288"
  [anguloMaximo]="360"
  [valorCentral]="200"
  etiquetaCentral="Resueltos"
/>`;

  protected readonly ejemploPropio = `<mupa-radial-chart
  titulo="Categorías de reportes"
  [datos]="datosCategorias"
  [grosor]="12"
  [anguloMaximo]="240"
/>`;
}
