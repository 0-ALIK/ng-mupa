import { Component, signal } from '@angular/core';
import { MupaPagination } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-pagination-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaPagination],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Paginación"
        descripcion="Tres variantes de paginación: completa con anterior/siguiente, compacta para tablas y simple para móvil."
      />

      <pg-demo-card
        titulo="Default"
        descripcion="Anterior a la izquierda, números al centro y Siguiente a la derecha, con separador superior."
        [codigo]="ejemploDefault"
      >
        <div class="pg-columna pg-ancho">
          <mupa-pagination [pagina]="pagina()" [total]="10" (paginaChange)="pagina.set($event)" />
          <span class="pg-ayuda">Página actual: {{ pagina() }} de 10</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Compacta"
        descripcion="Números y flechas agrupados, con botones de primera y última página. Pensada para tablas y tarjetas."
        [codigo]="ejemploCompacta"
      >
        <div class="pg-columna pg-ancho">
          <mupa-pagination
            variante="compact"
            [pagina]="paginaCompacta()"
            [total]="20"
            [hermanos]="2"
            (paginaChange)="paginaCompacta.set($event)"
          />
          <span class="pg-ayuda">Página actual: {{ paginaCompacta() }} de 20</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Simple"
        descripcion="Muestra Página X de Y con flechas. Se usa en móvil o en espacios estrechos."
        [codigo]="ejemploSimple"
      >
        <div class="pg-bloque pg-bloque--angosto">
          <mupa-pagination
            variante="simple"
            [pagina]="paginaSimple()"
            [total]="10"
            (paginaChange)="paginaSimple.set($event)"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Sin botones de extremos"
        descripcion="En la variante compacta se pueden ocultar los botones de primera y última página."
        [codigo]="ejemploExtremos"
      >
        <mupa-pagination
          variante="compact"
          [pagina]="paginaCompacta()"
          [total]="20"
          [mostrarExtremos]="false"
          (paginaChange)="paginaCompacta.set($event)"
        />
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/pagination/pagination.md" />
      </section>
    </div>
  `,
})
export class PaginationPageComponent {
  protected readonly pagina = signal(3);
  protected readonly paginaCompacta = signal(5);
  protected readonly paginaSimple = signal(3);

  protected readonly ejemploDefault = `<mupa-pagination
  [pagina]="pagina()"
  [total]="10"
  (paginaChange)="pagina.set($event)"
/>`;

  protected readonly ejemploCompacta = `<mupa-pagination
  variante="compact"
  [pagina]="pagina()"
  [total]="20"
  [hermanos]="2"
  (paginaChange)="pagina.set($event)"
/>`;

  protected readonly ejemploSimple = `<mupa-pagination
  variante="simple"
  [pagina]="pagina()"
  [total]="10"
  (paginaChange)="pagina.set($event)"
/>`;

  protected readonly ejemploExtremos = `<mupa-pagination
  variante="compact"
  [pagina]="pagina()"
  [total]="20"
  [mostrarExtremos]="false"
  (paginaChange)="pagina.set($event)"
/>`;
}
