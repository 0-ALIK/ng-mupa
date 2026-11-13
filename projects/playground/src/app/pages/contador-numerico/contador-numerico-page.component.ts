import { Component, signal } from '@angular/core';
import { MupaButton, MupaContadorNumerico } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-contador-numerico-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaContadorNumerico,
    MupaButton,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Recursos visuales"
        titulo="Contador numérico"
        descripcion="Cifra que cuenta hasta su valor final al entrar en el viewport. Formato regional, prefijo, sufijo, decimales y reintento."
      />

      <pg-demo-card
        titulo="Conteo básico"
        descripcion="Inicia cuando el componente entra en el viewport."
        [codigo]="ejemploBasico"
      >
        <div class="pg-contador-muestra">
          <mupa-contador-numerico [valor]="1842" [tamano]="56" />
          <span class="pg-ayuda">Solicitudes atendidas este mes</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Moneda y decimales"
        descripcion="Prefijo, sufijo y decimales fijos con locale es-PA."
        [codigo]="ejemploMoneda"
      >
        <div class="pg-contador-muestra">
          <mupa-contador-numerico [valor]="1250.5" prefijo="B/. " [decimales]="2" [tamano]="48" />
          <span class="pg-ayuda">Recaudación acumulada</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Porcentaje y dirección descendente"
        descripcion="Con direccion='abajo' cuenta desde el valor inicial hasta el valor final."
        [codigo]="ejemploPorcentaje"
      >
        <div class="pg-contador-muestra">
          <mupa-contador-numerico
            [valor]="92"
            [valorInicial]="100"
            sufijo="%"
            direccion="abajo"
            [tamano]="52"
          />
          <span class="pg-ayuda">Cumplimiento del trámite</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Repetir animación"
        descripcion="Cambiar claveReproduccion reinicia el conteo sin recargar la página."
        [codigo]="ejemploRepetir"
      >
        <div class="pg-columna">
          <div class="pg-contador-muestra">
            <mupa-contador-numerico
              [valor]="2480"
              [claveReproduccion]="repeticion()"
              [tamano]="56"
            />
            <span class="pg-ayuda">Trámites finalizados</span>
          </div>
          <div class="pg-fila">
            <mupa-button variante="secondary" (clic)="repetir()">Repetir conteo</mupa-button>
            <span class="pg-ayuda">Repeticiones: {{ repeticion() }}</span>
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/contador-numerico/contador-numerico.md" />
      </section>
    </div>
  `,
  styleUrl: './contador-numerico-page.component.css',
})
export class ContadorNumericoPageComponent {
  protected readonly repeticion = signal(0);

  protected repetir(): void {
    this.repeticion.update((valor) => valor + 1);
  }

  protected readonly ejemploBasico = `<mupa-contador-numerico [valor]="1842" [tamano]="56" />`;

  protected readonly ejemploMoneda = `<mupa-contador-numerico
  [valor]="1250.5"
  prefijo="B/. "
  [decimales]="2"
/>`;

  protected readonly ejemploPorcentaje = `<mupa-contador-numerico
  [valor]="92"
  [valorInicial]="100"
  sufijo="%"
  direccion="abajo"
/>`;

  protected readonly ejemploRepetir = `<mupa-contador-numerico
  [valor]="2480"
  [claveReproduccion]="repeticion()"
/>

<mupa-button (clic)="repetir()">Repetir conteo</mupa-button>`;
}
