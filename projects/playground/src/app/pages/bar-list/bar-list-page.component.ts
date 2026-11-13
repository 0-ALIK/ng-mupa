import { Component } from '@angular/core';
import { MupaBarList } from 'mupa-ui';

import {
  ITEMS_BAR_LIST_CANALES,
  ITEMS_BAR_LIST_DISPOSITIVOS,
  ITEMS_BAR_LIST_PROPIO,
} from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-bar-list-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaBarList],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Bar list"
        descripcion="Ranking de barras horizontales para canales, dispositivos o zonas."
      />

      <pg-demo-card
        titulo="Canales de llegada"
        descripcion="Ejemplo original con iconos y encabezado de valores."
        [codigo]="ejemploCanales"
      >
        <div class="pg-ancho">
          <mupa-bar-list
            titulo="Canales de llegada"
            descripcion="Desde dónde llegan los ciudadanos al portal"
            etiquetaValor="Visitas"
            [elementos]="canales"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Dispositivos"
        descripcion="Ejemplo original con porcentajes preformateados y una escala máxima de 100."
        [codigo]="ejemploDispositivos"
      >
        <div class="pg-ancho">
          <mupa-bar-list
            titulo="Dispositivos"
            descripcion="Cómo acceden los ciudadanos"
            [color]="'#48A9FF'"
            [maximo]="100"
            [elementos]="dispositivos"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variante propia"
        descripcion="Ranking por corregimiento con un color de categoría y sin iconos."
        [codigo]="ejemploPropio"
      >
        <div class="pg-ancho">
          <mupa-bar-list
            titulo="Reportes por corregimiento"
            descripcion="Volumen de reportes recibidos"
            etiquetaValor="Reportes"
            [color]="'#7C6AE6'"
            [elementos]="corregimientos"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Sin cabecera ni borde"
        descripcion="El ranking se muestra directamente sobre la página, sin título ni contenedor visible."
        [codigo]="ejemploSinCabecera"
      >
        <div class="pg-ancho">
          <mupa-bar-list
            titulo="Dispositivos"
            descripcion="Cómo acceden los ciudadanos"
            [color]="'#48A9FF'"
            [maximo]="100"
            [elementos]="dispositivos"
            [mostrarCabecera]="false"
            [mostrarBorde]="false"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/bar-list/bar-list.md" />
      </section>
    </div>
  `,
})
export class BarListPageComponent {
  protected readonly canales = ITEMS_BAR_LIST_CANALES;
  protected readonly dispositivos = ITEMS_BAR_LIST_DISPOSITIVOS;
  protected readonly corregimientos = ITEMS_BAR_LIST_PROPIO;

  protected readonly ejemploCanales = `<mupa-bar-list
  titulo="Canales de llegada"
  descripcion="Desde dónde llegan los ciudadanos al portal"
  etiquetaValor="Visitas"
  [elementos]="canales"
/>`;

  protected readonly ejemploDispositivos = `<mupa-bar-list
  titulo="Dispositivos"
  [color]="'#48A9FF'"
  [maximo]="100"
  [elementos]="dispositivos"
/>`;

  protected readonly ejemploPropio = `<mupa-bar-list
  titulo="Reportes por corregimiento"
  etiquetaValor="Reportes"
  [color]="'#7C6AE6'"
  [elementos]="corregimientos"
/>`;

  protected readonly ejemploSinCabecera = `<mupa-bar-list
  titulo="Dispositivos"
  descripcion="Cómo acceden los ciudadanos"
  [color]="'#48A9FF'"
  [maximo]="100"
  [elementos]="dispositivos"
  [mostrarCabecera]="false"
  [mostrarBorde]="false"
/>`;
}
