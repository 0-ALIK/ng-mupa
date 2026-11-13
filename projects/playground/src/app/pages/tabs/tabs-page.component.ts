import { Component, signal } from '@angular/core';
import { MupaTabs } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-tabs-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaTabs],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Tabs"
        descripcion="Pestañas tipo píldora para alternar contenido con estado activo y navegación por teclado."
      />

      <pg-demo-card
        titulo="Pestañas de contenido"
        descripcion="Ejemplo original de la galería: General, Facturación y Metas."
        [codigo]="ejemploBasico"
      >
        <div class="pg-ancho pg-tabs-demo">
          <mupa-tabs [pestanas]="pestanas" [(activa)]="pestanaActiva" panelId="pg-panel-cuenta" />

          <section
            id="pg-panel-cuenta"
            class="pg-tabs-panel"
            role="tabpanel"
            [attr.aria-labelledby]="pestanaActiva()"
          >
            @switch (pestanaActiva()) {
              @case ('general') {
                <strong>General</strong>
                <p>Resumen de la cuenta, actividad reciente y accesos rápidos.</p>
              }
              @case ('facturacion') {
                <strong>Facturación</strong>
                <p>Métodos de pago, facturas emitidas y próximo cobro.</p>
              }
              @case ('metas') {
                <strong>Metas</strong>
                <p>Objetivos activos, avance y aportes programados.</p>
              }
            }
          </section>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Con iconos"
        descripcion="Variante propia con iconos Lucide y una pestaña deshabilitada."
        [codigo]="ejemploIconos"
      >
        <div class="pg-ancho pg-tabs-demo">
          <mupa-tabs
            [pestanas]="pestanasConIconos"
            [(activa)]="pestanaSecundaria"
            ariaLabel="Secciones de la cuenta"
          />
          <p class="pg-tabs-estado">
            Sección activa: <strong>{{ pestanaSecundaria() }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/tabs/tabs.md" />
      </section>
    </div>
  `,
  styleUrl: './tabs-page.component.css',
})
export class TabsPageComponent {
  protected readonly pestanaActiva = signal('general');
  protected readonly pestanaSecundaria = signal('perfil');

  protected readonly pestanas = [
    { id: 'general', etiqueta: 'General' },
    { id: 'facturacion', etiqueta: 'Facturación' },
    { id: 'metas', etiqueta: 'Metas' },
  ];

  protected readonly pestanasConIconos = [
    { id: 'perfil', etiqueta: 'Perfil', icono: 'user' },
    { id: 'pagos', etiqueta: 'Pagos', icono: 'credit-card' },
    { id: 'actividad', etiqueta: 'Actividad', icono: 'chart-line' },
    { id: 'archivo', etiqueta: 'Archivados', icono: 'file-text', deshabilitada: true },
  ];

  protected readonly ejemploBasico = `<mupa-tabs
  [pestanas]="[
    { id: 'general', etiqueta: 'General' },
    { id: 'facturacion', etiqueta: 'Facturación' },
    { id: 'metas', etiqueta: 'Metas' }
  ]"
  [(activa)]="pestanaActiva"
  panelId="panel-cuenta"
/>`;

  protected readonly ejemploIconos = `<mupa-tabs
  [pestanas]="[
    { id: 'perfil', etiqueta: 'Perfil', icono: 'user' },
    { id: 'pagos', etiqueta: 'Pagos', icono: 'credit-card' },
    { id: 'archivo', etiqueta: 'Archivados', icono: 'file-text', deshabilitada: true }
  ]"
  [(activa)]="pestanaSecundaria"
  ariaLabel="Secciones de la cuenta"
/>`;
}
