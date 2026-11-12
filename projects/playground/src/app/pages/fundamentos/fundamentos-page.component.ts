import { Component } from '@angular/core';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface TonoColor {
  variable: string;
  nombre: string;
}

@Component({
  selector: 'pg-fundamentos-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Fundamentos"
        titulo="Tokens"
        descripcion="Colores, tipografía, espaciado, radios y elevación del sistema de diseño. Todos los componentes consumen estas variables."
      />

      <pg-demo-card
        titulo="Paleta primaria"
        descripcion="Azul institucional. El tono 500 es la acción principal del sistema."
      >
        <div class="pg-paleta">
          @for (tono of primario; track tono.variable) {
            <div class="pg-paleta__item">
              <span
                class="pg-paleta__muestra"
                [style.background]="'var(' + tono.variable + ')'"
              ></span>
              <span class="pg-paleta__nombre">{{ tono.nombre }}</span>
            </div>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Neutros"
        descripcion="Texto, fondos, superficies y bordes de la interfaz."
      >
        <div class="pg-paleta">
          @for (tono of neutros; track tono.variable) {
            <div class="pg-paleta__item">
              <span
                class="pg-paleta__muestra"
                [style.background]="'var(' + tono.variable + ')'"
              ></span>
              <span class="pg-paleta__nombre">{{ tono.nombre }}</span>
            </div>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Colores semánticos"
        descripcion="Estados de éxito, advertencia, error e información."
      >
        <div class="pg-paleta">
          @for (tono of semanticos; track tono.variable) {
            <div class="pg-paleta__item">
              <span
                class="pg-paleta__muestra"
                [style.background]="'var(' + tono.variable + ')'"
              ></span>
              <span class="pg-paleta__nombre">{{ tono.nombre }}</span>
            </div>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tipografía"
        descripcion="Montserrat es la única familia de interfaz. La jerarquía se construye con tamaño y peso."
      >
        <div class="pg-columna pg-ancho">
          <span class="ds-display">Display · 44 px</span>
          <span class="ds-h1">Título H1 · 32 px</span>
          <span class="ds-h2">Título H2 · 26 px</span>
          <span class="ds-h3">Título H3 · 21 px</span>
          <span class="ds-title">Título de sección · 18 px</span>
          <span class="ds-body-lg">Cuerpo grande para introducciones y textos destacados.</span>
          <span class="ds-body">Cuerpo base para el contenido general de la interfaz.</span>
          <span class="ds-body-sm">Cuerpo pequeño para ayudas y metadatos.</span>
          <span class="ds-label">Etiqueta de control</span>
          <span class="ds-caption">Caption · 12 px</span>
          <span class="ds-overline">Overline · mayúsculas</span>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/fundamentos/tokens.md" />
      </section>
    </div>
  `,
})
export class FundamentosPageComponent {
  protected readonly primario = this.crearTonos(
    'primary',
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  );

  protected readonly neutros = this.crearTonos(
    'neutral',
    [0, 50, 100, 200, 300, 400, 500, 600, 900],
  );

  protected readonly semanticos: readonly TonoColor[] = [
    { variable: '--color-success-500', nombre: 'success-500' },
    { variable: '--color-warning-500', nombre: 'warning-500' },
    { variable: '--color-error-500', nombre: 'error-500' },
    { variable: '--color-info-500', nombre: 'info-500' },
    { variable: '--color-cyan-300', nombre: 'cyan-300' },
    { variable: '--color-purple-300', nombre: 'purple-300' },
    { variable: '--color-lime-300', nombre: 'lime-300' },
    { variable: '--color-coral-300', nombre: 'coral-300' },
  ];

  private crearTonos(nombre: string, pasos: readonly number[]): readonly TonoColor[] {
    return pasos.map((paso) => ({
      variable: `--color-${nombre}-${paso}`,
      nombre: `${nombre}-${paso}`,
    }));
  }
}
