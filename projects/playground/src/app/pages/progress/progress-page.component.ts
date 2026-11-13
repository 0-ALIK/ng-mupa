import { Component, signal } from '@angular/core';
import { MupaProgress, MupaRange } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-progress-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaProgress, MupaRange],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Progreso"
        descripcion="Barra de progreso simple con etiqueta y porcentaje opcionales."
      />

      <pg-demo-card
        titulo="Avance de una meta"
        descripcion="Ejemplo original del patrón .prog con una barra al 65 %."
        [codigo]="ejemploBasico"
      >
        <div class="pg-ancho pg-progress-demo">
          <mupa-progress etiqueta="Meta de ahorro" [valor]="65" [mostrarValor]="true" />
          <mupa-progress etiqueta="Vivienda" [valor]="32" [mostrarValor]="true" />
          <mupa-progress etiqueta="Emergencias" [valor]="85" [mostrarValor]="true" />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Progreso interactivo"
        descripcion="Variante propia: un slider controla la barra en tiempo real."
        [codigo]="ejemploInteractivo"
      >
        <div class="pg-ancho pg-progress-demo">
          <mupa-range
            etiqueta="Avance"
            [minimo]="0"
            [maximo]="100"
            [(valor)]="avance"
            [mostrarValor]="true"
          />
          <mupa-progress etiqueta="Progreso actual" [valor]="avance()" [mostrarValor]="true" />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/progress/progress.md" />
      </section>
    </div>
  `,
  styleUrl: './progress-page.component.css',
})
export class ProgressPageComponent {
  protected readonly avance = signal(65);

  protected readonly ejemploBasico = `<mupa-progress
  etiqueta="Meta de ahorro"
  [valor]="65"
  [mostrarValor]="true"
/>`;

  protected readonly ejemploInteractivo = `<mupa-range
  etiqueta="Avance"
  [minimo]="0"
  [maximo]="100"
  [(valor)]="avance"
  [mostrarValor]="true"
/>

<mupa-progress
  etiqueta="Progreso actual"
  [valor]="avance()"
  [mostrarValor]="true"
/>`;
}
