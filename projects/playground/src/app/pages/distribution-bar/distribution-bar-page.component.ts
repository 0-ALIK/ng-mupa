import { Component, computed, signal } from '@angular/core';
import { MupaDistributionBar } from 'mupa-ui';

import {
  ESCENARIOS_DISTRIBUCION,
  ITEMS_DISTRIBUCION_PROPIO,
  type EscenarioDistribucion,
} from '../../shared/chart-demo-data';
import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

type ClaveEscenario = keyof typeof ESCENARIOS_DISTRIBUCION;

@Component({
  selector: 'pg-distribution-bar-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaDistributionBar],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Gráficos"
        titulo="Barra de distribución"
        descripcion="Barra apilada al 100 % con leyenda de cantidades y porcentajes, validación de total y estados vacío o inconsistente."
      />

      <pg-demo-card
        titulo="Estado de los expedientes"
        descripcion="Ejemplo interactivo original: cambia entre distribución válida, segmentos pequeños, sin registros y total inconsistente."
        [codigo]="ejemploOriginal"
      >
        <div class="pg-distribucion-demo">
          <label class="pg-distribucion-control" for="pg-distribucion-escenario">
            Ejemplo
            <select
              id="pg-distribucion-escenario"
              [value]="escenario()"
              (change)="cambiarEscenario($event)"
            >
              @for (opcion of opciones; track opcion.clave) {
                <option [value]="opcion.clave">{{ opcion.etiqueta }}</option>
              }
            </select>
          </label>

          <mupa-distribution-bar
            titulo="Estado de los expedientes"
            descripcion="Tres categorías excluyentes dentro del mismo periodo."
            etiquetaTotal="Expedientes en el periodo"
            [elementos]="elementosEscenario()"
            [total]="escenarioActual().total"
            [notaAlPie]="notaEscenario()"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Canales de atención"
        descripcion="Variante propia con cuatro categorías y tonos semánticos."
        [codigo]="ejemploPropio"
      >
        <div class="pg-ancho">
          <mupa-distribution-bar
            titulo="Canales de atención"
            descripcion="Reportes recibidos por canal durante el periodo."
            etiquetaTotal="Reportes"
            [elementos]="canales"
            [total]="2650"
            notaAlPie="Portal web y App Ciudadana concentran la mayoría de los reportes."
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/distribution-bar/distribution-bar.md" />
      </section>
    </div>
  `,
  styleUrl: './distribution-bar-page.component.css',
})
export class DistributionBarPageComponent {
  protected readonly escenario = signal<ClaveEscenario>('expedientes');

  protected readonly opciones = (
    Object.entries(ESCENARIOS_DISTRIBUCION) as [ClaveEscenario, EscenarioDistribucion][]
  ).map(([clave, escenario]) => ({
    clave,
    etiqueta: escenario.etiqueta,
  }));

  protected readonly escenarioActual = computed(() => ESCENARIOS_DISTRIBUCION[this.escenario()]);

  protected readonly elementosEscenario = computed(() => {
    const valores = this.escenarioActual().valores;
    return [
      {
        id: 'finalizados',
        etiqueta: 'Finalizados',
        valor: valores[0],
        tono: 'success' as const,
      },
      {
        id: 'vigentes',
        etiqueta: 'Vigentes',
        valor: valores[1],
        tono: 'primary' as const,
      },
      {
        id: 'vencidos',
        etiqueta: 'Vencidos',
        valor: valores[2],
        tono: 'error' as const,
      },
    ];
  });

  protected readonly notaEscenario = computed(() => {
    const actual = this.escenarioActual();
    if (this.escenario() === 'inconsistente') {
      return 'El total informado no coincide con la suma de las categorías. El componente evita mostrar una barra incorrecta.';
    }
    if (actual.total > 0) {
      const abiertos = (actual.valores[1] + actual.valores[2]).toLocaleString('es-PA');
      return `Vigentes y vencidos no se solapan: son los dos grupos de los ${abiertos} expedientes abiertos. Junto con los finalizados forman el total del periodo.`;
    }
    return 'Cuando el total es cero, no se calculan porcentajes ni se muestra una distribución ficticia.';
  });

  protected readonly canales = ITEMS_DISTRIBUCION_PROPIO;

  protected cambiarEscenario(evento: Event): void {
    this.escenario.set((evento.target as HTMLSelectElement).value as ClaveEscenario);
  }

  protected readonly ejemploOriginal = `<mupa-distribution-bar
  titulo="Estado de los expedientes"
  etiquetaTotal="Expedientes en el periodo"
  [elementos]="elementosEscenario()"
  [total]="escenarioActual().total"
  [notaAlPie]="notaEscenario()"
/>`;

  protected readonly ejemploPropio = `<mupa-distribution-bar
  titulo="Canales de atención"
  descripcion="Reportes recibidos por canal durante el periodo."
  etiquetaTotal="Reportes"
  [elementos]="canales"
  [total]="2650"
/>`;
}
