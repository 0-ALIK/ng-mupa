import { Component, signal } from '@angular/core';
import { MupaBreadcrumb, type ElementoBreadcrumb, type EventoNavegacionBreadcrumb } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-breadcrumb-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaBreadcrumb],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Breadcrumb"
        descripcion="Ruta de navegación con niveles anteriores, página actual y colapso de niveles intermedios en un menú de puntos suspensivos."
      />

      <pg-demo-card
        titulo="Ruta completa"
        descripcion="El último elemento es la página actual y no funciona como enlace. Los anteriores emiten el evento de navegación."
        [codigo]="ejemploCorto"
      >
        <div class="pg-columna pg-ancho">
          <mupa-breadcrumb [elementos]="rutaCorta" (navegar)="registrar($event)" />
          <span class="pg-ayuda">Último clic: {{ ultimoClic() }}</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Niveles ocultos"
        descripcion="Con más de cuatro niveles, los intermedios se colapsan en el botón de puntos suspensivos."
        [codigo]="ejemploLargo"
      >
        <mupa-breadcrumb [elementos]="rutaLarga" (navegar)="registrar($event)" />
      </pg-demo-card>

      <pg-demo-card
        titulo="Separador de barra"
        descripcion="El separador puede ser un chevron o una barra inclinada."
        [codigo]="ejemploSlash"
      >
        <mupa-breadcrumb [elementos]="rutaCorta" separador="slash" (navegar)="registrar($event)" />
      </pg-demo-card>

      <pg-demo-card
        titulo="Con iconos"
        descripcion="Cada elemento admite un icono Lucide opcional, como la casa del inicio."
        [codigo]="ejemploIconos"
      >
        <mupa-breadcrumb [elementos]="rutaConIconos" (navegar)="registrar($event)" />
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/breadcrumb/breadcrumb.md" />
      </section>
    </div>
  `,
})
export class BreadcrumbPageComponent {
  protected readonly rutaCorta: readonly ElementoBreadcrumb[] = [
    { etiqueta: 'Inicio', href: '#', icono: 'house' },
    { etiqueta: 'Inventario', href: '#' },
    { etiqueta: 'Armas', href: '#' },
    { etiqueta: 'Detalle' },
  ];

  protected readonly rutaLarga: readonly ElementoBreadcrumb[] = [
    { etiqueta: 'Inicio', href: '#', icono: 'house' },
    { etiqueta: 'Seguridad', href: '#' },
    { etiqueta: 'Policía municipal', href: '#' },
    { etiqueta: 'Inventario', href: '#' },
    { etiqueta: 'Armas', href: '#' },
    { etiqueta: 'Detalle' },
  ];

  protected readonly rutaConIconos: readonly ElementoBreadcrumb[] = [
    { etiqueta: 'Inicio', href: '#', icono: 'house' },
    { etiqueta: 'Trámites', href: '#', icono: 'file-text' },
    { etiqueta: 'Licencias', href: '#', icono: 'file-check' },
    { etiqueta: 'Detalle' },
  ];

  protected readonly ultimoClic = signal('ninguno');

  protected registrar({ elemento, indice, evento }: EventoNavegacionBreadcrumb): void {
    evento.preventDefault();
    this.ultimoClic.set(`${elemento.etiqueta} (índice ${indice})`);
  }

  protected readonly ejemploCorto = `<mupa-breadcrumb
  [elementos]="ruta"
  (navegar)="alNavegar($event)"
/>`;

  protected readonly ejemploLargo = `<mupa-breadcrumb
  [elementos]="rutaLarga"
  [maximo]="4"
  [antes]="1"
  [despues]="2"
  (navegar)="alNavegar($event)"
/>`;

  protected readonly ejemploSlash = `<mupa-breadcrumb
  [elementos]="ruta"
  separador="slash"
  (navegar)="alNavegar($event)"
/>`;

  protected readonly ejemploIconos = `<mupa-breadcrumb
  [elementos]="[
    { etiqueta: 'Inicio', href: '/', icono: 'house' },
    { etiqueta: 'Trámites', href: '/tramites', icono: 'file-text' },
    { etiqueta: 'Detalle' }
  ]"
/>`;
}
