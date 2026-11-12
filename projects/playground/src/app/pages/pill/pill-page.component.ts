import { Component, signal } from '@angular/core';
import { MupaPill } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-pill-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaPill],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Acciones"
        titulo="Chip / etiqueta"
        descripcion="Etiquetas de categoría y estado con icono opcional, variantes sólida y de contorno, y eliminación accesible."
      />

      <pg-demo-card
        titulo="Categorías"
        descripcion="Los colores de categoría codifican servicios del sistema: cyan digital, purple cultura, lime deportes, brown ferias y coral inclusión."
        [codigo]="ejemploCategorias"
      >
        <div class="pg-fila">
          <mupa-pill etiqueta="Servicios digitales" color="cyan" icono="map" />
          <mupa-pill etiqueta="Cultura" color="purple" icono="drama" />
          <mupa-pill etiqueta="Deportes" color="lime" icono="volleyball" />
          <mupa-pill etiqueta="Ferias" color="brown" icono="store" />
          <mupa-pill etiqueta="Inclusión" color="coral" icono="heart-handshake" />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Estados"
        descripcion="Los tonos semánticos reutilizan los colores de éxito, advertencia, error e información."
        [codigo]="ejemploEstados"
      >
        <div class="pg-fila">
          <mupa-pill etiqueta="Resuelto" color="success" icono="check" />
          <mupa-pill etiqueta="Pendiente" color="warning" />
          <mupa-pill etiqueta="Rechazado" color="error" />
          <mupa-pill etiqueta="En proceso" color="info" icono="info" />
          <mupa-pill etiqueta="Sin asignar" color="slate" />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Sólido, contorno y eliminación"
        descripcion="El chip sólido usa el azul institucional. El de contorno se apoya en la superficie. Ambos pueden quitarse con el botón de cierre."
        [codigo]="ejemploRemovibles"
      >
        <div class="pg-columna">
          <div class="pg-fila">
            @for (filtro of filtros(); track filtro; let i = $index) {
              <mupa-pill
                [etiqueta]="filtro"
                [diseno]="i === 0 ? 'solido' : 'contorno'"
                [removible]="true"
                (quitar)="quitarFiltro(filtro)"
              />
            }

            @if (filtros().length === 0) {
              <span class="pg-ayuda">No quedan filtros.</span>
            }
          </div>

          <span class="pg-ayuda">
            Pulsa la x para quitar un filtro. El botón tiene nombre accesible.
          </span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tamaños y contenido proyectado"
        descripcion="El tamaño pequeño corresponde a Pill/Chip y el mediano al preview. También se puede proyectar contenido."
        [codigo]="ejemploTamanos"
      >
        <div class="pg-columna">
          <div class="pg-fila">
            <mupa-pill etiqueta="Pequeño" color="blue" icono="star" />
            <mupa-pill etiqueta="Mediano" color="blue" icono="star" tamano="md" />
          </div>
          <div class="pg-fila">
            <mupa-pill color="purple" icono="heart">Contenido proyectado</mupa-pill>
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/pill/pill.md" />
      </section>
    </div>
  `,
})
export class PillPageComponent {
  protected readonly filtros = signal(['Calidonia', 'Esta semana']);

  protected quitarFiltro(filtro: string): void {
    this.filtros.update((filtros) => filtros.filter((actual) => actual !== filtro));
  }

  protected readonly ejemploCategorias = `<mupa-pill etiqueta="Servicios digitales" color="cyan" icono="map" />
<mupa-pill etiqueta="Cultura" color="purple" icono="drama" />
<mupa-pill etiqueta="Deportes" color="lime" icono="volleyball" />
<mupa-pill etiqueta="Ferias" color="brown" icono="store" />
<mupa-pill etiqueta="Inclusión" color="coral" icono="heart-handshake" />`;

  protected readonly ejemploEstados = `<mupa-pill etiqueta="Resuelto" color="success" icono="check" />
<mupa-pill etiqueta="Pendiente" color="warning" />
<mupa-pill etiqueta="Rechazado" color="error" />
<mupa-pill etiqueta="En proceso" color="info" icono="info" />`;

  protected readonly ejemploRemovibles = `<mupa-pill
  etiqueta="Calidonia"
  diseno="solido"
  [removible]="true"
  (quitar)="quitarFiltro('Calidonia')"
/>

<mupa-pill
  etiqueta="Esta semana"
  diseno="contorno"
  [removible]="true"
  (quitar)="quitarFiltro('Esta semana')"
/>`;

  protected readonly ejemploTamanos = `<mupa-pill etiqueta="Pequeño" color="blue" icono="star" />
<mupa-pill etiqueta="Mediano" color="blue" icono="star" tamano="md" />

<mupa-pill color="purple" icono="heart">Contenido proyectado</mupa-pill>`;
}
