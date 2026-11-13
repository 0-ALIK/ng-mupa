import { Component } from '@angular/core';
import { MupaLogo } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-brand-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaLogo],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Recursos visuales"
        titulo="Marca"
        descripcion="Logos oficiales de la Alcaldía de Panamá en sus variantes horizontal, vertical, escudo e isotipo."
      />

      <pg-demo-card
        titulo="Logo horizontal"
        descripcion="Variante principal. Usa la versión blanca sobre fondos azul institucional o navy."
        [codigo]="ejemploHorizontal"
      >
        <div class="pg-ancho pg-marca-demo">
          <div class="pg-marca-fondo-claro">
            <div class="pg-marca-item">
              <mupa-logo variante="horizontal" tema="color" tamano="lg" />
              <span class="pg-marca-etiqueta">Color · fondo claro</span>
            </div>
          </div>
          <div class="pg-marca-fondo">
            <div class="pg-marca-item">
              <mupa-logo variante="horizontal" tema="blanco" tamano="lg" />
              <span class="pg-marca-etiqueta pg-marca-etiqueta--blanca"> Blanco · fondo azul </span>
            </div>
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variantes"
        descripcion="Horizontal, vertical, escudo e isotipo. El escudo y el isotipo solo tienen versión a color."
        [codigo]="ejemploVariantes"
      >
        <div class="pg-ancho">
          <div class="pg-marca-fondo-claro">
            <div class="pg-marca-grid">
              <div class="pg-marca-item">
                <mupa-logo variante="horizontal" tamano="md" />
                <span class="pg-marca-etiqueta">Horizontal</span>
              </div>
              <div class="pg-marca-item">
                <mupa-logo variante="vertical" tamano="md" />
                <span class="pg-marca-etiqueta">Vertical</span>
              </div>
              <div class="pg-marca-item">
                <mupa-logo variante="escudo" tamano="md" />
                <span class="pg-marca-etiqueta">Escudo</span>
              </div>
              <div class="pg-marca-item">
                <mupa-logo variante="isotipo" tamano="md" />
                <span class="pg-marca-etiqueta">Isotipo</span>
              </div>
            </div>
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tamaños"
        descripcion="El logo mantiene su proporción con alturas relativas sm, md y lg."
        [codigo]="ejemploTamanos"
      >
        <div class="pg-ancho">
          <div class="pg-marca-fondo-claro">
            <div class="pg-marca-tamanos">
              <div class="pg-marca-item">
                <mupa-logo tamano="sm" />
                <span class="pg-marca-etiqueta">sm · 24 px</span>
              </div>
              <div class="pg-marca-item">
                <mupa-logo tamano="md" />
                <span class="pg-marca-etiqueta">md · 32 px</span>
              </div>
              <div class="pg-marca-item">
                <mupa-logo tamano="lg" />
                <span class="pg-marca-etiqueta">lg · 48 px</span>
              </div>
            </div>
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Logo como enlace"
        descripcion="href convierte el logo en un enlace accesible sin perder el texto alternativo."
        [codigo]="ejemploEnlace"
      >
        <div class="pg-ancho pg-marca-demo">
          <div class="pg-marca-fondo-claro">
            <mupa-logo
              variante="horizontal"
              href="#inicio"
              alt="Alcaldía de Panamá, ir al inicio"
              tamano="lg"
            />
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/logo/logo.md" />
      </section>
    </div>
  `,
  styleUrl: './brand-page.component.css',
})
export class BrandPageComponent {
  protected readonly ejemploHorizontal = `<mupa-logo
  variante="horizontal"
  tema="color"
  tamano="lg"
/>

<div style="background: var(--color-primary-500); padding: 24px">
  <mupa-logo variante="horizontal" tema="blanco" tamano="lg" />
</div>`;

  protected readonly ejemploVariantes = `<mupa-logo variante="horizontal" />
<mupa-logo variante="vertical" />
<mupa-logo variante="escudo" />
<mupa-logo variante="isotipo" />`;

  protected readonly ejemploTamanos = `<mupa-logo tamano="sm" />
<mupa-logo tamano="md" />
<mupa-logo tamano="lg" />`;

  protected readonly ejemploEnlace = `<mupa-logo
  variante="horizontal"
  href="/inicio"
  alt="Alcaldía de Panamá, ir al inicio"
  tamano="lg"
/>`;
}
