import { Component, signal } from '@angular/core';
import { MupaLandingNav, MupaNavLink, type ElementoLandingNav, type EstadoNavLink } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface EstadoNavLinkDemo {
  estado: EstadoNavLink;
  etiqueta: string;
}

@Component({
  selector: 'pg-landing-nav-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaLandingNav,
    MupaNavLink,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Menú de landing"
        descripcion="Barra blanca con logo institucional, enlaces principales e indicador azul en el enlace activo. Bajo el punto de corte se transforma en menú hamburguesa."
      />

      <pg-demo-card
        titulo="Escritorio"
        descripcion="El enlace activo usa aria-current y un indicador de 24 × 3 px. El resto cambia de color y muestra el indicador al interactuar."
        [codigo]="ejemploEscritorio"
      >
        <div class="pg-ancho pg-marco-nav">
          <mupa-landing-nav
            [elementos]="elementos"
            [activo]="activo()"
            (navegar)="activo.set($event)"
          />
        </div>
        <span class="pg-ayuda">Enlace activo: {{ activo() }}</span>
      </pg-demo-card>

      <pg-demo-card
        titulo="Móvil"
        descripcion="Con diseno='mobile' se fuerza el botón hamburguesa. El panel se abre debajo de la barra y cierra con Escape."
        [codigo]="ejemploMovil"
      >
        <div class="pg-grid pg-grid--auto pg-ancho">
          <div class="pg-marco-nav pg-marco-nav--telefono">
            <mupa-landing-nav
              [elementos]="elementos"
              diseno="mobile"
              [activo]="activo()"
              (navegar)="activo.set($event)"
            />
            <div class="pg-marco-nav__cuerpo">
              <span class="pg-bloque-titulo">Menú cerrado</span>
              <span class="pg-ayuda">Pulsa el botón hamburguesa para abrir.</span>
            </div>
          </div>

          <div class="pg-marco-nav pg-marco-nav--telefono">
            <mupa-landing-nav
              [elementos]="elementos"
              diseno="mobile"
              [activo]="'vacantes'"
              [abiertoPorDefecto]="true"
              (navegar)="activo.set($event)"
            />
            <div class="pg-marco-nav__cuerpo">
              <span class="pg-bloque-titulo">Menú abierto</span>
              <span class="pg-ayuda">El enlace activo muestra el check y el fondo azul.</span>
            </div>
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Estados de NavLink"
        descripcion="Espécimen estático para documentar los estados visuales del enlace de landing."
        [codigo]="ejemploEstados"
      >
        <div class="pg-fila pg-fila--separada">
          @for (estado of estados; track estado.estado) {
            <div class="pg-columna" style="align-items: center; gap: 8px">
              <mupa-nav-link [etiqueta]="'Vacantes'" [estado]="estado.estado" />
              <span class="pg-ayuda">{{ estado.etiqueta }}</span>
            </div>
          }
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <h2 class="pg-seccion__titulo">LandingNav</h2>
        <pg-markdown-view ruta="docs/landing-nav/landing-nav.md" />
        <h2 class="pg-seccion__titulo">NavLink</h2>
        <pg-markdown-view ruta="docs/nav-link/nav-link.md" />
      </section>
    </div>
  `,
})
export class LandingNavPageComponent {
  protected readonly elementos: readonly ElementoLandingNav[] = [
    { clave: 'inicio', etiqueta: 'Inicio', href: '#inicio' },
    { clave: 'vacantes', etiqueta: 'Vacantes', href: '#vacantes' },
    { clave: 'empresas', etiqueta: 'Empresas', href: '#empresas' },
    { clave: 'perfil', etiqueta: 'Perfil', href: '#perfil' },
  ];

  protected readonly activo = signal('inicio');

  protected readonly estados: readonly EstadoNavLinkDemo[] = [
    { estado: 'default', etiqueta: 'Default' },
    { estado: 'hover', etiqueta: 'Hover' },
    { estado: 'pressed', etiqueta: 'Pressed' },
    { estado: 'selected', etiqueta: 'Selected' },
    { estado: 'focus', etiqueta: 'Foco' },
  ];

  protected readonly ejemploEscritorio = `<mupa-landing-nav
  [elementos]="elementos"
  [activo]="activo()"
  (navegar)="activo.set($event)"
/>`;

  protected readonly ejemploMovil = `<mupa-landing-nav
  [elementos]="elementos"
  diseno="mobile"
  [abiertoPorDefecto]="true"
  (navegar)="alNavegar($event)"
/>`;

  protected readonly ejemploEstados = `<mupa-nav-link etiqueta="Vacantes" estado="default" />
<mupa-nav-link etiqueta="Vacantes" estado="hover" />
<mupa-nav-link etiqueta="Vacantes" estado="pressed" />
<mupa-nav-link etiqueta="Vacantes" estado="selected" />
<mupa-nav-link etiqueta="Vacantes" estado="focus" />`;
}
