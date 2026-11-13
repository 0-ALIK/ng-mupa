import { Component, computed, signal } from '@angular/core';
import { MupaMenu } from 'mupa-ui';
import type { GrupoMenu, ItemMenu } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-menu-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaMenu],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Menú"
        descripcion="Menú con grupos e ítems que disparan acciones; el enlace es opcional."
      />

      <pg-demo-card
        titulo="Menú con grupos"
        descripcion="Ejemplo original del patrón .nav con Resumen y Planificación; cada ítem emite una acción."
        [codigo]="ejemploHandler"
      >
        <div class="pg-ancho pg-menu-demo">
          <mupa-menu
            ariaLabel="Navegación de la cuenta"
            [grupos]="grupos()"
            (seleccion)="alSeleccionar($event)"
          />
          <p class="pg-menu-estado">
            Acción seleccionada: <strong>{{ seleccionado() }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Ítems con enlace opcional"
        descripcion="Variante propia: algunos ítems se renderizan como enlaces y también emiten la selección."
        [codigo]="ejemploEnlaces"
      >
        <div class="pg-ancho pg-menu-demo">
          <mupa-menu
            ariaLabel="Navegación de soporte"
            [grupos]="gruposEnlaces"
            (seleccion)="alSeleccionarEnlace($event)"
          />
          <p class="pg-menu-estado">
            Último enlace: <strong>{{ enlaceSeleccionado() }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/menu/menu.md" />
      </section>
    </div>
  `,
  styleUrl: './menu-page.component.css',
})
export class MenuPageComponent {
  protected readonly seleccionado = signal('Panel de control');
  protected readonly enlaceSeleccionado = signal('Ninguno');

  private readonly gruposBase: readonly GrupoMenu[] = [
    {
      etiqueta: 'Resumen',
      items: [
        { id: 'panel', etiqueta: 'Panel de control', icono: 'house' },
        { id: 'transacciones', etiqueta: 'Transacciones', icono: 'credit-card' },
        { id: 'inversiones', etiqueta: 'Inversiones', icono: 'chart-line' },
        { id: 'cuentas', etiqueta: 'Cuentas', icono: 'wallet' },
        { id: 'gastos', etiqueta: 'Gastos', icono: 'chart-pie' },
      ],
    },
    {
      etiqueta: 'Planificación',
      items: [
        { id: 'metas', etiqueta: 'Metas', icono: 'star' },
        { id: 'presupuesto', etiqueta: 'Presupuesto', icono: 'wallet' },
        { id: 'informes', etiqueta: 'Informes', icono: 'file-text' },
      ],
    },
  ];

  protected readonly grupos = computed<readonly GrupoMenu[]>(() =>
    this.gruposBase.map((grupo) => ({
      ...grupo,
      items: grupo.items.map((item) => ({
        ...item,
        activo: item.etiqueta === this.seleccionado(),
      })),
    })),
  );

  protected readonly gruposEnlaces: readonly GrupoMenu[] = [
    {
      etiqueta: 'Cuenta',
      items: [
        { id: 'perfil', etiqueta: 'Perfil', icono: 'user', href: '#perfil' },
        {
          id: 'facturacion',
          etiqueta: 'Facturación',
          icono: 'credit-card',
          href: '#facturacion',
        },
        {
          id: 'notificaciones',
          etiqueta: 'Notificaciones',
          icono: 'bell',
          href: '#notificaciones',
        },
      ],
    },
    {
      etiqueta: 'Soporte',
      items: [
        { id: 'ayuda', etiqueta: 'Centro de ayuda', icono: 'info', href: '#ayuda' },
        {
          id: 'contacto',
          etiqueta: 'Contáctanos',
          icono: 'file-text',
          href: '#contacto',
        },
        { id: 'estado', etiqueta: 'Estado', icono: 'chart-line', href: '#estado' },
      ],
    },
  ];

  protected alSeleccionar(item: ItemMenu): void {
    this.seleccionado.set(item.etiqueta);
  }

  protected alSeleccionarEnlace(item: ItemMenu): void {
    this.enlaceSeleccionado.set(item.etiqueta);
  }

  protected readonly ejemploHandler = `<mupa-menu
  ariaLabel="Navegación de la cuenta"
  [grupos]="grupos"
  (seleccion)="alSeleccionar($event)"
/>

<!-- En el componente padre -->
alSeleccionar(item: ItemMenu) {
  this.seleccionado.set(item.etiqueta);
}`;

  protected readonly ejemploEnlaces = `<mupa-menu
  ariaLabel="Navegación de soporte"
  [grupos]="[
    {
      etiqueta: 'Soporte',
      items: [
        { id: 'ayuda', etiqueta: 'Centro de ayuda', icono: 'info', href: '#ayuda' },
        { id: 'estado', etiqueta: 'Estado', icono: 'chart-line', href: '#estado' }
      ]
    }
  ]"
  (seleccion)="alSeleccionarEnlace($event)"
/>`;
}
