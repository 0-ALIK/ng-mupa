import { Component } from '@angular/core';
import { MupaAccordion } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-accordion-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaAccordion],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Acordeón"
        descripcion="Paneles expandibles para preguntas frecuentes, ayuda y configuración."
      />

      <pg-demo-card
        titulo="Preguntas frecuentes"
        descripcion="Ejemplo original del patrón .acc con un panel abierto."
        [codigo]="ejemploBasico"
      >
        <div class="pg-ancho">
          <mupa-accordion [items]="preguntas" />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Varios paneles abiertos"
        descripcion="Variante propia con apertura múltiple."
        [codigo]="ejemploMultiple"
      >
        <div class="pg-ancho">
          <mupa-accordion [items]="preguntas" [permitirMultiple]="true" />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/accordion/accordion.md" />
      </section>
    </div>
  `,
})
export class AccordionPageComponent {
  protected readonly preguntas = [
    {
      id: 'proteccion',
      titulo: '¿Cómo se protege la información de mi cuenta?',
      contenido:
        'Usa esta respuesta de ejemplo para explicar las medidas de protección que tu sistema haya implementado y verificado. Consulta sus políticas de seguridad y privacidad.',
      abierto: true,
    },
    {
      id: 'vincular',
      titulo: '¿Cómo vinculo otra cuenta?',
      contenido: 'Ve a Cuentas y elige la institución que deseas vincular.',
    },
    {
      id: 'exportar',
      titulo: '¿Puedo exportar mis datos?',
      contenido: 'Consulta los formatos de exportación disponibles en Informes.',
    },
  ];

  protected readonly ejemploBasico = `<mupa-accordion [items]="preguntas" />`;

  protected readonly ejemploMultiple = `<mupa-accordion
  [items]="preguntas"
  [permitirMultiple]="true"
/>`;
}
