import {
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';

import { CONTEXTO_BURBUJA } from './bubble-context';
import type { VarianteBurbuja } from './bubble.types';

/**
 * Texto de una burbuja con recorte y expansión opcional.
 *
 * Réplica de `BubbleContent` en el Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-bubble-content',
  template: `
    <div [class]="'mupa-bubble-content mupa-bubble-content--' + variante()">
      <div
        #texto
        class="mupa-bubble-content__texto"
        [id]="idTexto"
        [class.mupa-bubble-content__texto--recortado]="recortado()"
        [style.--mupa-bubble-lineas]="maxLineas()"
      >
        <ng-content />
      </div>

      @if (mostrarToggle()) {
        <button
          type="button"
          class="mupa-bubble-content__toggle"
          [attr.aria-expanded]="abierto()"
          [attr.aria-controls]="idTexto"
          (click)="alternar()"
        >
          {{ abierto() ? 'Ver menos' : 'Ver más' }}
        </button>
      }
    </div>
  `,
  styleUrl: './bubble-content.component.css',
})
export class MupaBubbleContent {
  private static secuencia = 0;

  private readonly contexto = inject(CONTEXTO_BURBUJA, { optional: true });
  private readonly destruir = inject(DestroyRef);
  private readonly texto = viewChild<ElementRef<HTMLElement>>('texto');

  /** Permite recortar el texto y mostrar «Ver más». */
  readonly colapsable = input(false, { transform: booleanAttribute });

  /** Líneas visibles cuando está recortado. */
  readonly maxLineas = input(4, { transform: numberAttribute });

  /** Inicia el contenido expandido. */
  readonly expandidoPorDefecto = input(false, {
    transform: booleanAttribute,
  });

  protected readonly idTexto = `mupa-bubble-content-${++MupaBubbleContent.secuencia}`;

  protected readonly abierto = linkedSignal(() => this.expandidoPorDefecto());

  protected readonly desbordado = signal(false);

  protected readonly medido = signal(false);

  protected readonly variante = computed<VarianteBurbuja>(
    () => this.contexto?.varianteResuelta() ?? 'plain',
  );

  protected readonly recortado = computed(() => this.colapsable() && !this.abierto());

  protected readonly mostrarToggle = computed(
    () => this.colapsable() && (this.abierto() || this.desbordado() || !this.medido()),
  );

  constructor() {
    afterNextRender(() => {
      this.prepararMedicion();
    });

    effect(() => {
      this.colapsable();
      this.maxLineas();
      this.abierto();
      this.medido.set(false);
      queueMicrotask(() => this.medir());
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => this.medir());
      }
    });
  }

  protected alternar(): void {
    this.abierto.update((valor) => !valor);
  }

  private prepararMedicion(): void {
    const elemento = this.texto()?.nativeElement;
    if (!elemento) return;

    this.medir();

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.medir());
    }

    if (typeof document !== 'undefined' && document.fonts) {
      void document.fonts.ready.then(() => this.medir());
    }

    if (typeof ResizeObserver !== 'undefined') {
      const observador = new ResizeObserver(() => this.medir());
      observador.observe(elemento);
      this.destruir.onDestroy(() => observador.disconnect());
    }
  }

  private medir(): void {
    const elemento = this.texto()?.nativeElement;
    if (!elemento) return;

    if (!this.colapsable() || this.abierto()) {
      this.medido.set(true);
      return;
    }

    this.desbordado.set(elemento.scrollHeight > elemento.clientHeight + 1);
    this.medido.set(true);
  }
}
