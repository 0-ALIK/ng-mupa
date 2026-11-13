import { Component, computed, TemplateRef, viewChild } from '@angular/core';
import { MupaIcon, MupaLogoLoop, type ItemLogoLoop } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface InstitucionDemo {
  icono: string;
  nombre: string;
}

const INSTITUCIONES: readonly InstitucionDemo[] = [
  { icono: 'landmark', nombre: 'Tesorería Municipal' },
  { icono: 'trash-2', nombre: 'Aseo Capital' },
  { icono: 'bus', nombre: 'Movilidad Urbana' },
  { icono: 'trees', nombre: 'Parques y Áreas Verdes' },
  { icono: 'construction', nombre: 'Obras Públicas' },
  { icono: 'shield-check', nombre: 'Policía Municipal' },
  { icono: 'heart-handshake', nombre: 'Desarrollo Social' },
];

@Component({
  selector: 'pg-logo-loop-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaLogoLoop, MupaIcon],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Recursos visuales"
        titulo="Logo loop"
        descripcion="Cinta continua de logos o elementos con plantilla. Mide el contenido, calcula copias y suaviza la velocidad. Cubre el patrón Direcciones e Instituciones en Loop."
      />

      <pg-demo-card
        titulo="Logos institucionales"
        descripcion="Logos de imagen con altura uniforme, separación y degradados laterales."
        [codigo]="ejemploLogos"
      >
        <div class="pg-marco-logo-loop pg-marco-logo-loop--logos">
          <mupa-logo-loop
            [logos]="aliados"
            [alturaLogo]="40"
            [separacion]="56"
            [velocidad]="70"
            colorDesvanecido="var(--bg-surface)"
            etiquetaAria="Logos institucionales"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Direcciones e Instituciones en Loop"
        descripcion="El mismo componente con items de plantilla: ícono en contenedor + nombre de la institución."
        [codigo]="ejemploInstituciones"
      >
        <div class="pg-marco-logo-loop">
          <mupa-logo-loop
            [logos]="institucionesClaras()"
            [alturaLogo]="40"
            [separacion]="56"
            [velocidad]="70"
            colorDesvanecido="var(--bg-surface)"
            etiquetaAria="Direcciones e instituciones aliadas"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Sobre azul marino"
        descripcion="Variante oscura de las instituciones con degradado del mismo azul. El texto y los íconos cambian a blanco."
        [codigo]="ejemploOscuro"
      >
        <div class="pg-logo-loop-navy">
          <mupa-logo-loop
            [logos]="institucionesOscuras()"
            [alturaLogo]="40"
            [separacion]="56"
            [velocidad]="60"
            direccion="derecha"
            [velocidadAlPasar]="18"
            colorDesvanecido="#0E225D"
            etiquetaAria="Instituciones aliadas sobre azul marino"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Vertical y escala de grises"
        descripcion="Dirección vertical con altura fija y hover con escala. La segunda cinta muestra el modo de escala de grises."
        [codigo]="ejemploVariantes"
      >
        <div class="pg-logo-loop-grid">
          <div class="pg-marco-logo-loop pg-marco-logo-loop--vertical">
            <mupa-logo-loop
              [logos]="institucionesClaras()"
              [direccion]="'arriba'"
              [alturaLogo]="36"
              [separacion]="22"
              [velocidad]="40"
              [altura]="320"
              [escalarAlPasar]="true"
              colorDesvanecido="var(--bg-surface)"
              etiquetaAria="Instituciones en columna"
            />
          </div>

          <div class="pg-marco-logo-loop">
            <mupa-logo-loop
              [logos]="aliados"
              [alturaLogo]="40"
              [separacion]="48"
              [velocidad]="50"
              [escalaDeGrises]="true"
              [escalarAlPasar]="true"
              colorDesvanecido="var(--bg-surface)"
              etiquetaAria="Logos en escala de grises"
            />
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/logo-loop/logo-loop.md" />
      </section>
    </div>

    <ng-template #institucion let-datos>
      <span class="pg-logo-institucion" [class.pg-logo-institucion--oscura]="datos.oscuro">
        <span class="pg-logo-institucion__marca">
          <mupa-icon [nombre]="datos.icono" [tamano]="20" />
        </span>
        {{ datos.nombre }}
      </span>
    </ng-template>
  `,
  styleUrl: './logo-loop-page.component.css',
})
export class LogoLoopPageComponent {
  private readonly institucion = viewChild<TemplateRef<unknown>>('institucion');

  protected readonly aliados: ItemLogoLoop[] = [
    { src: '/assets/logo-alcaldia-navy.svg', alt: 'Alcaldía de Panamá' },
    { src: '/logo-mupa.png', alt: 'Mupa' },
    { src: '/hatillo-isotipo.svg', alt: 'Hatillo' },
  ];

  protected readonly institucionesClaras = computed<ItemLogoLoop[]>(() =>
    this.crearInstituciones(false),
  );

  protected readonly institucionesOscuras = computed<ItemLogoLoop[]>(() =>
    this.crearInstituciones(true),
  );

  private crearInstituciones(oscuro: boolean): ItemLogoLoop[] {
    const plantilla = this.institucion();
    if (!plantilla) return [];

    return INSTITUCIONES.map((institucion) => ({
      plantilla,
      contexto: { $implicit: { ...institucion, oscuro } },
      titulo: institucion.nombre,
      etiquetaAria: institucion.nombre,
    }));
  }

  protected readonly ejemploLogos = `<mupa-logo-loop
  [logos]="aliados"
  [alturaLogo]="40"
  [separacion]="56"
  [velocidad]="70"
  colorDesvanecido="var(--bg-surface)"
  etiquetaAria="Logos institucionales"
/>`;

  protected readonly ejemploInstituciones = `<ng-template #institucion let-datos>
  <span class="institucion-loop" [class.institucion-loop--oscura]="datos.oscuro">
    <span class="institucion-loop__marca">
      <mupa-icon [nombre]="datos.icono" [tamano]="20" />
    </span>
    {{ datos.nombre }}
  </span>
</ng-template>

<mupa-logo-loop
  [logos]="instituciones"
  [alturaLogo]="40"
  [separacion]="56"
  colorDesvanecido="var(--bg-surface)"
/>`;

  protected readonly ejemploOscuro = `<div class="fondo-azul-marino">
  <mupa-logo-loop
    [logos]="institucionesOscuras()"
    direccion="derecha"
    [velocidadAlPasar]="18"
    colorDesvanecido="#0E225D"
  />
</div>`;

  protected readonly ejemploVariantes = `<mupa-logo-loop
  [logos]="instituciones"
  [direccion]="'arriba'"
  [altura]="320"
  [escalarAlPasar]="true"
/>

<mupa-logo-loop
  [logos]="aliados"
  [escalaDeGrises]="true"
  [escalarAlPasar]="true"
/>`;
}
