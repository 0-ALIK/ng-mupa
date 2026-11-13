import { Component, signal } from '@angular/core';
import { MupaRange } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-range-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaRange],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Range"
        descripcion="Control deslizante nativo estilizado con el sistema, para ajustar valores numéricos."
      />

      <pg-demo-card
        titulo="Brillo"
        descripcion="Ejemplo original del patrón input[type=range] con el valor a la derecha."
        [codigo]="ejemploBasico"
      >
        <div class="pg-ancho pg-range-demo">
          <mupa-range
            etiqueta="Brillo"
            [minimo]="0"
            [maximo]="100"
            [(valor)]="brillo"
            [mostrarValor]="true"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Controles de la vivienda"
        descripcion="Variante propia con varios sliders, como en el bloque original de iluminación."
        [codigo]="ejemploMultiple"
      >
        <div class="pg-ancho pg-range-demo">
          <mupa-range etiqueta="Brillo" [(valor)]="brillo" [mostrarValor]="true" />
          <mupa-range
            etiqueta="Temperatura de color"
            [(valor)]="temperatura"
            [mostrarValor]="true"
          />
          <mupa-range etiqueta="Volumen" [(valor)]="volumen" [mostrarValor]="true" />
          <mupa-range
            etiqueta="Transición"
            [minimo]="0"
            [maximo]="10"
            [(valor)]="transicion"
            [mostrarValor]="true"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/range/range.md" />
      </section>
    </div>
  `,
  styleUrl: './range-page.component.css',
})
export class RangePageComponent {
  protected readonly brillo = signal(88);
  protected readonly temperatura = signal(65);
  protected readonly volumen = signal(30);
  protected readonly transicion = signal(5);

  protected readonly ejemploBasico = `<mupa-range
  etiqueta="Brillo"
  [minimo]="0"
  [maximo]="100"
  [(valor)]="brillo"
  [mostrarValor]="true"
/>`;

  protected readonly ejemploMultiple = `<mupa-range etiqueta="Brillo" [(valor)]="brillo" [mostrarValor]="true" />
<mupa-range etiqueta="Temperatura de color" [(valor)]="temperatura" [mostrarValor]="true" />
<mupa-range etiqueta="Volumen" [(valor)]="volumen" [mostrarValor]="true" />
<mupa-range
  etiqueta="Transición"
  [minimo]="0"
  [maximo]="10"
  [(valor)]="transicion"
  [mostrarValor]="true"
/>`;
}
