import { Component, computed, signal } from '@angular/core';
import { MupaIcon, NOMBRES_ICONOS } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-icono-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaIcon],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Icono"
        descripcion="Iconos de línea Lucide incluidos en la librería, con el trazo y la semántica accesible del sistema original."
      />

      <pg-demo-card
        titulo="Catálogo"
        descripcion="Escribe para filtrar por nombre. Los iconos decorativos se ocultan a lectores de pantalla."
        [codigo]="ejemploBasico"
      >
        <div class="pg-ancho pg-columna">
          <input
            class="pg-campo"
            type="search"
            placeholder="Buscar icono por nombre…"
            aria-label="Buscar icono"
            [value]="busqueda()"
            (input)="busqueda.set($any($event.target).value)"
          />

          <div class="pg-icono-grid">
            @for (nombre of filtrados(); track nombre) {
              <div class="pg-icono-item" [attr.title]="nombre">
                <mupa-icon [nombre]="nombre" [tamano]="24" />
                <span>{{ nombre }}</span>
              </div>
            }
          </div>

          @if (filtrados().length === 0) {
            <p class="pg-ayuda">No hay iconos que coincidan con “{{ busqueda() }}”.</p>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tamaños"
        descripcion="El tamaño se controla con el input tamano y el trazo con trazo."
      >
        <div class="pg-fila pg-fila--separada">
          @for (tamano of tamanos; track tamano) {
            <div class="pg-columna" style="align-items: center">
              <mupa-icon nombre="landmark" [tamano]="tamano" />
              <span class="pg-ayuda">{{ tamano }} px</span>
            </div>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Color y nombre accesible"
        descripcion="El color hereda del contexto o se indica explícitamente. Con titulo, el icono se anuncia como imagen."
        [codigo]="ejemploAccesible"
      >
        <div class="pg-fila pg-fila--separada">
          <mupa-icon
            nombre="circle-check"
            [tamano]="24"
            color="var(--color-success-500)"
            titulo="Confirmado"
          />
          <mupa-icon
            nombre="triangle-alert"
            [tamano]="24"
            color="var(--color-warning-500)"
            titulo="Advertencia"
          />
          <mupa-icon
            nombre="circle-x"
            [tamano]="24"
            color="var(--color-error-500)"
            titulo="Error"
          />
          <mupa-icon
            nombre="info"
            [tamano]="24"
            color="var(--color-primary-500)"
            titulo="Información"
          />
          <mupa-icon nombre="bell" [tamano]="24" color="var(--fg-muted)" />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/icon/icon.md" />
      </section>
    </div>
  `,
})
export class IconoPageComponent {
  protected readonly tamanos = [16, 20, 24, 32, 40];

  protected readonly busqueda = signal('');

  protected readonly filtrados = computed(() => {
    const termino = this.busqueda().trim().toLowerCase();
    if (!termino) return NOMBRES_ICONOS;
    return NOMBRES_ICONOS.filter((nombre) => nombre.includes(termino));
  });

  protected readonly ejemploBasico = `<mupa-icon nombre="search" [tamano]="20" />`;

  protected readonly ejemploAccesible = `<mupa-icon
  nombre="circle-check"
  [tamano]="24"
  color="var(--color-success-500)"
  titulo="Confirmado"
/>`;
}
