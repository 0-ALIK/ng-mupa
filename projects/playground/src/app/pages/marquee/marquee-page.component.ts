import { Component } from '@angular/core';
import { MupaMarquee, MupaTestimonio } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface TestimonioDemo {
  nombre: string;
  meta: string;
  cuerpo: string;
  calificacion: number;
}

@Component({
  selector: 'pg-marquee-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaMarquee,
    MupaTestimonio,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Recursos visuales"
        titulo="Marquee"
        descripcion="Cinta infinita horizontal o vertical para testimonios y contenido repetido. Pausa al pasar o enfocar y respeta prefers-reduced-motion."
      />

      <pg-demo-card
        titulo="Horizontal"
        descripcion="Desplazamiento de derecha a izquierda con degradados en los bordes."
        [codigo]="ejemploHorizontal"
      >
        <div class="pg-marco-marquee">
          <mupa-marquee
            [duracion]="35"
            [separacion]="16"
            desvanecido="var(--bg-surface)"
            etiqueta="Testimonios de la ciudadanía"
          >
            <ng-template>
              @for (testimonio of testimonios; track testimonio.nombre) {
                <mupa-testimonio
                  [nombre]="testimonio.nombre"
                  [meta]="testimonio.meta"
                  [calificacion]="testimonio.calificacion"
                >
                  {{ testimonio.cuerpo }}
                </mupa-testimonio>
              }
            </ng-template>
          </mupa-marquee>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Reverso"
        descripcion="El sentido se invierte con reverso. El contenido sigue siendo el mismo."
        [codigo]="ejemploReverso"
      >
        <div class="pg-marco-marquee">
          <mupa-marquee
            [reverso]="true"
            [duracion]="28"
            desvanecido="var(--bg-surface)"
            etiqueta="Testimonios en sentido inverso"
          >
            <ng-template>
              @for (testimonio of testimonios; track testimonio.nombre) {
                <mupa-testimonio
                  [nombre]="testimonio.nombre"
                  [meta]="testimonio.meta"
                  [calificacion]="testimonio.calificacion"
                >
                  {{ testimonio.cuerpo }}
                </mupa-testimonio>
              }
            </ng-template>
          </mupa-marquee>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Vertical"
        descripcion="Para columnas angostas o barras laterales. El contenedor define la altura visible."
        [codigo]="ejemploVertical"
      >
        <div class="pg-marco-marquee pg-marco-marquee--vertical">
          <mupa-marquee
            [vertical]="true"
            [duracion]="24"
            [separacion]="12"
            desvanecido="var(--bg-surface)"
            etiqueta="Testimonios en columna"
          >
            <ng-template>
              @for (testimonio of testimonios; track testimonio.nombre) {
                <mupa-testimonio
                  [nombre]="testimonio.nombre"
                  [meta]="testimonio.meta"
                  [calificacion]="testimonio.calificacion"
                >
                  {{ testimonio.cuerpo }}
                </mupa-testimonio>
              }
            </ng-template>
          </mupa-marquee>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Sin degradados"
        descripcion="Con desvanecido en null se ocultan los bordes y la cinta se ve completa."
        [codigo]="ejemploSinFade"
      >
        <div class="pg-marco-marquee">
          <mupa-marquee [duracion]="30" [desvanecido]="null" etiqueta="Testimonios sin degradado">
            <ng-template>
              @for (testimonio of testimonios; track testimonio.nombre) {
                <mupa-testimonio [nombre]="testimonio.nombre" [meta]="testimonio.meta">
                  {{ testimonio.cuerpo }}
                </mupa-testimonio>
              }
            </ng-template>
          </mupa-marquee>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/marquee/marquee.md" />
      </section>
    </div>
  `,
  styleUrl: './marquee-page.component.css',
})
export class MarqueePageComponent {
  protected readonly testimonios: TestimonioDemo[] = [
    {
      nombre: 'Ana Castillo',
      meta: 'Ciudad de Panamá',
      cuerpo: 'El trámite fue claro y rápido. La información estaba completa desde el inicio.',
      calificacion: 5,
    },
    {
      nombre: 'Luis Chen',
      meta: 'Betania',
      cuerpo: 'Pude dar seguimiento a mi solicitud sin repetir datos ni llamar por teléfono.',
      calificacion: 4,
    },
    {
      nombre: 'María González',
      meta: 'San Francisco',
      cuerpo: 'La atención fue amable y el resultado llegó antes de lo esperado.',
      calificacion: 5,
    },
    {
      nombre: 'Jorge Rivera',
      meta: 'Tocumen',
      cuerpo: 'La plataforma funciona bien desde el teléfono y los pasos son comprensibles.',
      calificacion: 4,
    },
  ];

  protected readonly ejemploHorizontal = `<mupa-marquee [duracion]="35" desvanecido="var(--bg-surface)">
  <ng-template>
    <mupa-testimonio nombre="Ana Castillo" meta="Ciudad de Panamá" [calificacion]="5">
      El trámite fue claro y rápido.
    </mupa-testimonio>
  </ng-template>
</mupa-marquee>`;

  protected readonly ejemploReverso = `<mupa-marquee [reverso]="true" [duracion]="28">
  <ng-template>
    <!-- testimonios -->
  </ng-template>
</mupa-marquee>`;

  protected readonly ejemploVertical = `<div class="marco-vertical">
  <mupa-marquee [vertical]="true" [duracion]="24">
    <ng-template>
      <!-- testimonios -->
    </ng-template>
  </mupa-marquee>
</div>`;

  protected readonly ejemploSinFade = `<mupa-marquee [desvanecido]="null">
  <ng-template>
    <!-- testimonios -->
  </ng-template>
</mupa-marquee>`;
}
