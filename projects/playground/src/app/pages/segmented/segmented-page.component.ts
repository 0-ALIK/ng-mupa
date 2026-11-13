import { Component, signal } from '@angular/core';
import { MupaSegmented } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-segmented-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaSegmented],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Segmented"
        descripcion="Control segmentado compacto para elegir un valor entre pocas opciones."
      />

      <pg-demo-card
        titulo="Apertura de la persiana"
        descripcion="Ejemplo original del patrón .seg con tres posiciones."
        [codigo]="ejemploBasico"
      >
        <div class="pg-ancho pg-segmented-demo">
          <mupa-segmented
            ariaLabel="Apertura de la persiana"
            [opciones]="opcionesPersiana"
            [(valor)]="apertura"
          />
          <p class="pg-segmented-estado">
            Posición: <strong>{{ apertura() }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Vista de la lista"
        descripcion="Variante propia con iconos y dos opciones."
        [codigo]="ejemploIconos"
      >
        <div class="pg-ancho pg-segmented-demo">
          <mupa-segmented
            ariaLabel="Vista de la lista"
            [opciones]="opcionesVista"
            [(valor)]="vista"
          />
          <p class="pg-segmented-estado">
            Vista activa: <strong>{{ vista() }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/segmented/segmented.md" />
      </section>
    </div>
  `,
  styleUrl: './segmented-page.component.css',
})
export class SegmentedPageComponent {
  protected readonly apertura = signal('mitad');
  protected readonly vista = signal('lista');

  protected readonly opcionesPersiana = [
    { valor: 'abrir', etiqueta: 'Abrir' },
    { valor: 'mitad', etiqueta: 'A la mitad' },
    { valor: 'cerrar', etiqueta: 'Cerrada' },
  ];

  protected readonly opcionesVista = [
    { valor: 'lista', etiqueta: 'Lista', icono: 'list' },
    { valor: 'cuadricula', etiqueta: 'Cuadrícula', icono: 'chart-column' },
  ];

  protected readonly ejemploBasico = `<mupa-segmented
  ariaLabel="Apertura de la persiana"
  [opciones]="[
    { valor: 'abrir', etiqueta: 'Abrir' },
    { valor: 'mitad', etiqueta: 'A la mitad' },
    { valor: 'cerrar', etiqueta: 'Cerrada' }
  ]"
  [(valor)]="apertura"
/>`;

  protected readonly ejemploIconos = `<mupa-segmented
  ariaLabel="Vista de la lista"
  [opciones]="[
    { valor: 'lista', etiqueta: 'Lista', icono: 'list' },
    { valor: 'cuadricula', etiqueta: 'Cuadrícula', icono: 'chart-column' }
  ]"
  [(valor)]="vista"
/>`;
}
