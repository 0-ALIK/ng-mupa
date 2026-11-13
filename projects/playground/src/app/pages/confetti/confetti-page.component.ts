import { Component, signal } from '@angular/core';
import {
  MupaBotonConfeti,
  MupaButton,
  MupaConfetti,
  MupaDisparadorConfeti,
  type OpcionesConfeti,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-confetti-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaBotonConfeti,
    MupaButton,
    MupaConfetti,
    MupaDisparadorConfeti,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Recursos visuales"
        titulo="Confetti"
        descripcion="Explosión de confeti a pantalla completa. Incluye botón prearmado, trigger headless y directiva para cualquier elemento."
      />

      <pg-demo-card
        titulo="Botón prearmado"
        descripcion="Variante primaria y secundaria. El confeti sale del centro del botón."
        [codigo]="ejemploBoton"
      >
        <div class="pg-columna">
          <div class="pg-fila">
            <mupa-boton-confeti [opciones]="opciones" (clic)="registrar('primario')">
              Celebrar
            </mupa-boton-confeti>
            <mupa-boton-confeti
              variante="secundario"
              [opciones]="opciones"
              (clic)="registrar('secundario')"
            >
              Celebrar
            </mupa-boton-confeti>
          </div>
          @if (ultimo()) {
            <span class="pg-ayuda">Último disparo: {{ ultimo() }}</span>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Trigger totalmente custom"
        descripcion="La directiva mupaDisparadorConfeti se aplica a cualquier elemento y calcula el origen desde su centro."
        [codigo]="ejemploDirectiva"
      >
        <button
          type="button"
          class="pg-confetti-custom"
          mupaDisparadorConfeti
          [opcionesConfeti]="opciones"
          (click)="registrar('custom')"
        >
          Mi trigger personalizado
        </button>
      </pg-demo-card>

      <pg-demo-card
        titulo="Trigger headless"
        descripcion="mupa-confetti no renderiza interfaz. Cambia el disparador para lanzar la explosión desde cualquier lógica."
        [codigo]="ejemploHeadless"
      >
        <div class="pg-fila">
          <mupa-button variante="secondary" (clic)="disparar()">Disparar confeti</mupa-button>
          <span class="pg-ayuda">Disparos: {{ disparos() }}</span>
        </div>
        <mupa-confetti [disparador]="disparos()" [opciones]="opciones" />
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/confetti/confetti.md" />
      </section>
    </div>
  `,
  styleUrl: './confetti-page.component.css',
})
export class ConfettiPageComponent {
  protected readonly opciones: OpcionesConfeti = { cantidadParticulas: 120 };
  protected readonly disparos = signal(0);
  protected readonly ultimo = signal<string | null>(null);

  protected registrar(origen: string): void {
    this.ultimo.set(origen);
  }

  protected disparar(): void {
    this.disparos.update((valor) => valor + 1);
  }

  protected readonly ejemploBoton = `<mupa-boton-confeti [opciones]="opciones" (clic)="alCelebrar($event)">
  Celebrar
</mupa-boton-confeti>

<mupa-boton-confeti
  variante="secundario"
  [opciones]="opciones"
  (clic)="alCelebrar($event)"
>
  Celebrar
</mupa-boton-confeti>`;

  protected readonly ejemploDirectiva = `<button
  type="button"
  mupaDisparadorConfeti
  [opcionesConfeti]="opciones"
>
  Mi trigger personalizado
</button>`;

  protected readonly ejemploHeadless = `<mupa-confetti [disparador]="disparos()" [opciones]="opciones" />

<mupa-button (clic)="disparar()">Disparar confeti</mupa-button>`;
}
