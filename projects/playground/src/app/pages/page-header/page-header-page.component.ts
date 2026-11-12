import { Component, signal } from '@angular/core';
import {
  MupaPageHeader,
  type AccionPageHeader,
  type ElementoBreadcrumb,
  type FiltroPageHeader,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-page-header-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaPageHeader],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Contenido"
        titulo="Page header"
        descripcion="Cabecera de página con migas, título, descripción, acciones, búsqueda y filtros. Los chips se convierten en select bajo 560 px."
      />

      <pg-demo-card
        titulo="Solo título"
        descripcion="El caso mínimo: título, descripción y sin divisor inferior."
        [codigo]="ejemploTitulo"
      >
        <div class="pg-ancho">
          <mupa-page-header
            titulo="Inventario"
            descripcion="Consulta y administra los bienes registrados de la Alcaldía."
            [divisor]="false"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Migas y acciones"
        descripcion="Ruta de navegación con mupa-breadcrumb y acciones primaria/secundaria."
        [codigo]="ejemploAcciones"
      >
        <div class="pg-columna pg-ancho">
          <mupa-page-header
            [migas]="migas"
            titulo="Pistola Glock 17 · Serie AB-20481"
            descripcion="Asignada a Policía municipal · Corregimiento de Calidonia"
            [acciones]="acciones"
            [divisor]="false"
          />
          <span class="pg-ayuda" role="status">{{ ultimaAccion() }}</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Búsqueda y filtros"
        descripcion="Búsqueda con limpiar y filtros con conteo. El filtro activo por defecto es el primero."
        [codigo]="ejemploBusqueda"
      >
        <div class="pg-columna pg-ancho">
          <mupa-page-header
            [migas]="migasCortas"
            titulo="Armas"
            [acciones]="accionesFiltros"
            [mostrarBusqueda]="true"
            marcadorBusqueda="Buscar por serie, modelo o responsable"
            [(textoBusqueda)]="busqueda"
            etiquetaFiltro="Disponibilidad"
            [filtros]="filtros"
            [(filtroActivo)]="filtro"
            [divisor]="false"
          />
          <span class="pg-ayuda">
            Búsqueda: {{ busqueda() || '(vacía)' }} · Filtro: {{ filtro() }}
          </span>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/page-header/page-header.md" />
      </section>
    </div>
  `,
})
export class PageHeaderPageComponent {
  protected readonly ultimaAccion = signal('Ninguna acción ejecutada.');
  protected readonly busqueda = signal('');
  protected readonly filtro = signal('all');

  protected readonly migas: readonly ElementoBreadcrumb[] = [
    { etiqueta: 'Inicio', href: '#', icono: 'house' },
    { etiqueta: 'Inventario', href: '#' },
    { etiqueta: 'Armas', href: '#' },
    { etiqueta: 'Detalle' },
  ];

  protected readonly migasCortas: readonly ElementoBreadcrumb[] = [
    { etiqueta: 'Inicio', href: '#', icono: 'house' },
    { etiqueta: 'Inventario', href: '#' },
    { etiqueta: 'Armas' },
  ];

  protected readonly acciones: readonly AccionPageHeader[] = [
    {
      etiqueta: 'Exportar',
      icono: 'download',
      alHacerClic: () => this.ultimaAccion.set('Acción: Exportar'),
    },
    {
      etiqueta: 'Editar',
      icono: 'pencil',
      variante: 'primary',
      alHacerClic: () => this.ultimaAccion.set('Acción: Editar'),
    },
  ];

  protected readonly accionesFiltros: readonly AccionPageHeader[] = [
    {
      etiqueta: 'Registrar arma',
      icono: 'plus',
      variante: 'primary',
      alHacerClic: () => this.ultimaAccion.set('Acción: Registrar arma'),
    },
  ];

  protected readonly filtros: readonly FiltroPageHeader[] = [
    { clave: 'all', etiqueta: 'Todas', conteo: 128 },
    { clave: 'asig', etiqueta: 'Asignadas', conteo: 96 },
    { clave: 'disp', etiqueta: 'Disponibles', conteo: 24 },
    { clave: 'mant', etiqueta: 'En mantenimiento', conteo: 8 },
  ];

  protected readonly ejemploTitulo = `<mupa-page-header
  titulo="Inventario"
  descripcion="Consulta y administra los bienes registrados de la Alcaldía."
  [divisor]="false"
/>`;

  protected readonly ejemploAcciones = `<mupa-page-header
  [migas]="migas"
  titulo="Pistola Glock 17 · Serie AB-20481"
  descripcion="Asignada a Policía municipal · Corregimiento de Calidonia"
  [acciones]="acciones"
  [divisor]="false"
/>`;

  protected readonly ejemploBusqueda = `<mupa-page-header
  [migas]="migas"
  titulo="Armas"
  [acciones]="acciones"
  [mostrarBusqueda]="true"
  marcadorBusqueda="Buscar por serie, modelo o responsable"
  [(textoBusqueda)]="busqueda"
  etiquetaFiltro="Disponibilidad"
  [filtros]="filtros"
  [(filtroActivo)]="filtro"
/>`;
}
