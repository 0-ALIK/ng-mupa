import {
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  contentChild,
  DestroyRef,
  DOCUMENT,
  inject,
  input,
  numberAttribute,
  Renderer2,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import type { LadoMarquee } from './marquee.types';

let keyframesInyectados = false;

function inyectarKeyframes(documento: Document, renderer: Renderer2): void {
  if (keyframesInyectados || typeof document === 'undefined') return;

  keyframesInyectados = true;
  const estilo = renderer.createElement('style');
  renderer.setAttribute(estilo, 'data-mupa-marquee', '');
  renderer.setProperty(
    estilo,
    'textContent',
    '@keyframes mupa-mq-x{from{transform:translateX(0)}to{transform:translateX(calc(-100% - var(--mq-gap)))}}@keyframes mupa-mq-y{from{transform:translateY(0)}to{transform:translateY(calc(-100% - var(--mq-gap)))}}',
  );
  renderer.appendChild(documento.head, estilo);
}

/**
 * Cinta infinita horizontal o vertical.
 *
 * Réplica de `Marquee` de `DESARROLLO/marquee/Marquee.jsx`: duplica el
 * contenido para un bucle sin saltos, pausa al pasar o enfocar y respeta
 * `prefers-reduced-motion`.
 */
@Component({
  selector: 'mupa-marquee',
  imports: [NgTemplateOutlet],
  template: `
    <div
      class="mupa-marquee"
      role="region"
      [attr.aria-label]="etiqueta()"
      [style.--mq-gap]="separacion() + 'px'"
      [style.overflow]="reducido() ? 'auto' : 'hidden'"
      (mouseenter)="alEntrar()"
      (mouseleave)="alSalir()"
      (focusin)="alEnfocar()"
      (focusout)="alDesenfocar()"
    >
      <div
        class="mupa-marquee__pista-contenedor"
        [class.mupa-marquee__pista-contenedor--vertical]="vertical()"
      >
        <div
          class="mupa-marquee__carril"
          [class.mupa-marquee__carril--vertical]="vertical()"
          [style.animation]="animacion()"
          [style.animation-direction]="reverso() ? 'reverse' : 'normal'"
          [style.animation-play-state]="pausado() ? 'paused' : 'running'"
        >
          @if (contenido(); as plantilla) {
            @for (grupo of grupos(); track $index) {
              <div
                class="mupa-marquee__grupo"
                [class.mupa-marquee__grupo--vertical]="vertical()"
                [attr.aria-hidden]="$index > 0 ? 'true' : null"
                [attr.inert]="$index > 0 ? '' : null"
              >
                <ng-container *ngTemplateOutlet="plantilla" />
              </div>
            }
          } @else {
            <div class="mupa-marquee__grupo" [class.mupa-marquee__grupo--vertical]="vertical()">
              <ng-content />
            </div>
          }
        </div>

        @if (contenido(); as plantilla) {
          @if (!reducido()) {
            <div
              class="mupa-marquee__carril mupa-marquee__carril--duplicado"
              [class.mupa-marquee__carril--vertical]="vertical()"
              aria-hidden="true"
              inert
              [style.animation]="animacion()"
              [style.animation-direction]="reverso() ? 'reverse' : 'normal'"
              [style.animation-play-state]="pausado() ? 'paused' : 'running'"
            >
              @for (grupo of grupos(); track $index) {
                <div class="mupa-marquee__grupo" [class.mupa-marquee__grupo--vertical]="vertical()">
                  <ng-container *ngTemplateOutlet="plantilla" />
                </div>
              }
            </div>
          }
        }
      </div>

      @if (desvanecido()) {
        @if (vertical()) {
          <div
            class="mupa-marquee__borde mupa-marquee__borde--arriba"
            aria-hidden="true"
            [style.background]="degradado('arriba')"
          ></div>
          <div
            class="mupa-marquee__borde mupa-marquee__borde--abajo"
            aria-hidden="true"
            [style.background]="degradado('abajo')"
          ></div>
        } @else {
          <div
            class="mupa-marquee__borde mupa-marquee__borde--izquierda"
            aria-hidden="true"
            [style.background]="degradado('izquierda')"
          ></div>
          <div
            class="mupa-marquee__borde mupa-marquee__borde--derecha"
            aria-hidden="true"
            [style.background]="degradado('derecha')"
          ></div>
        }
      }
    </div>
  `,
  styleUrl: './marquee.component.css',
})
export class MupaMarquee {
  private readonly documento = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly destruir = inject(DestroyRef);
  private readonly plantillaContenido = contentChild(TemplateRef);

  /** Invierte el sentido del desplazamiento. */
  readonly reverso = input(false, { transform: booleanAttribute });

  /** Pausa mientras el cursor está encima o hay foco dentro. */
  readonly pausaAlPasar = input(true, { transform: booleanAttribute });

  /** Desplazamiento vertical. */
  readonly vertical = input(false, { transform: booleanAttribute });

  /** Segundos que tarda un ciclo completo. */
  readonly duracion = input(30, { transform: numberAttribute });

  /** Separación entre elementos en píxeles. */
  readonly separacion = input(16, { transform: numberAttribute });

  /** Color de los degradados laterales. `null` los oculta. */
  readonly desvanecido = input<string | null>('#FFFFFF');

  /** Veces que se repite el contenido dentro de cada pista. */
  readonly repeticion = input(4, { transform: numberAttribute });

  /** Etiqueta accesible de la región. */
  readonly etiqueta = input('Contenido en movimiento');

  protected readonly pausado = signal(false);
  protected readonly reducido = signal(false);

  protected readonly contenido = computed(() => this.plantillaContenido() ?? null);

  protected readonly grupos = computed(() =>
    Array.from({ length: Math.max(1, Math.floor(this.repeticion())) }),
  );

  protected readonly animacion = computed(() => {
    if (this.reducido() || !this.contenido()) return 'none';

    return `${this.vertical() ? 'mupa-mq-y' : 'mupa-mq-x'} ${Math.max(0, this.duracion())}s linear infinite`;
  });

  constructor() {
    afterNextRender(() => {
      inyectarKeyframes(this.documento, this.renderer);

      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducido.set(media.matches);

      const alCambiar = (evento: MediaQueryListEvent): void => this.reducido.set(evento.matches);
      media.addEventListener('change', alCambiar);
      this.destruir.onDestroy(() => media.removeEventListener('change', alCambiar));
    });
  }

  protected alEntrar(): void {
    if (this.pausaAlPasar()) this.pausado.set(true);
  }

  protected alSalir(): void {
    this.pausado.set(false);
  }

  protected alEnfocar(): void {
    if (this.pausaAlPasar()) this.pausado.set(true);
  }

  protected alDesenfocar(): void {
    this.pausado.set(false);
  }

  protected degradado(lado: LadoMarquee): string | null {
    const color = this.desvanecido();
    if (!color) return null;

    const direccion =
      lado === 'izquierda'
        ? 'to right'
        : lado === 'derecha'
          ? 'to left'
          : lado === 'arriba'
            ? 'to bottom'
            : 'to top';

    return `linear-gradient(${direccion}, ${color}, transparent)`;
  }
}
