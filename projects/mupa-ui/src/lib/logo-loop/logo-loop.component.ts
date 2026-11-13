import {
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';

import { MupaLogoLoopItem } from './logo-loop-item.component';
import type { DireccionLogoLoop, ItemLogoLoop, LadoLogoLoop } from './logo-loop.types';

const TAU = 0.25;
const MIN_COPIAS = 2;
const MARGEN_COPIAS = 2;
const MAX_COPIAS = 100;

/**
 * Cinta continua de logos o de elementos con plantilla.
 *
 * Réplica de `LogoLoop` de `DESARROLLO/logo-loop/LogoLoop.jsx`: mide el
 * contenido, calcula las copias necesarias, suaviza la velocidad y permite
 * pausar o reducir la marcha al pasar el cursor.
 */
@Component({
  selector: 'mupa-logo-loop',
  imports: [MupaLogoLoopItem],
  template: `
    <div
      #caja
      class="mupa-logo-loop"
      role="region"
      [attr.aria-label]="etiquetaAria()"
      [style.height.px]="vertical() ? altura() : null"
      [style.padding]="relleno()"
      [style.overflow]="reducido() ? 'auto' : 'hidden'"
    >
      <div
        #pista
        class="mupa-logo-loop__pista"
        [class.mupa-logo-loop__pista--vertical]="vertical()"
        (mouseenter)="alEntrar()"
        (mouseleave)="alSalir()"
      >
        <ul
          #secuencia
          class="mupa-logo-loop__lista"
          [class.mupa-logo-loop__lista--vertical]="vertical()"
          role="list"
          [style.gap.px]="separacion()"
          [style.padding]="rellenoLista()"
        >
          @for (item of logos(); track $index) {
            <li class="mupa-logo-loop__item" role="listitem">
              <mupa-logo-loop-item
                [item]="item"
                [alturaLogo]="alturaLogo()"
                [escalarAlPasar]="escalarAlPasar()"
                [escalaDeGrises]="escalaDeGrises()"
              />
            </li>
          }
        </ul>

        @for (copia of copiasRestantes(); track $index) {
          <ul
            class="mupa-logo-loop__lista"
            [class.mupa-logo-loop__lista--vertical]="vertical()"
            role="list"
            aria-hidden="true"
            inert
            [style.gap.px]="separacion()"
            [style.padding]="rellenoLista()"
          >
            @for (item of logos(); track $index) {
              <li class="mupa-logo-loop__item" role="listitem">
                <mupa-logo-loop-item
                  [item]="item"
                  [alturaLogo]="alturaLogo()"
                  [escalarAlPasar]="escalarAlPasar()"
                  [escalaDeGrises]="escalaDeGrises()"
                />
              </li>
            }
          </ul>
        }
      </div>

      @if (colorDesvanecido()) {
        @if (vertical()) {
          <div
            class="mupa-logo-loop__borde mupa-logo-loop__borde--arriba"
            aria-hidden="true"
            [style.background]="degradado('arriba')"
          ></div>
          <div
            class="mupa-logo-loop__borde mupa-logo-loop__borde--abajo"
            aria-hidden="true"
            [style.background]="degradado('abajo')"
          ></div>
        } @else {
          <div
            class="mupa-logo-loop__borde mupa-logo-loop__borde--izquierda"
            aria-hidden="true"
            [style.background]="degradado('izquierda')"
          ></div>
          <div
            class="mupa-logo-loop__borde mupa-logo-loop__borde--derecha"
            aria-hidden="true"
            [style.background]="degradado('derecha')"
          ></div>
        }
      }
    </div>
  `,
  styleUrl: './logo-loop.component.css',
})
export class MupaLogoLoop {
  private readonly destruir = inject(DestroyRef);
  private readonly caja = viewChild<ElementRef<HTMLElement>>('caja');
  private readonly pista = viewChild<ElementRef<HTMLElement>>('pista');
  private readonly secuencia = viewChild<ElementRef<HTMLUListElement>>('secuencia');

  private destruido = false;
  private off = 0;
  private vel = 0;

  /** Logos o elementos con plantilla. */
  readonly logos = input<readonly ItemLogoLoop[]>([]);

  /** Velocidad en px/segundo. Un valor negativo invierte el sentido. */
  readonly velocidad = input(80, { transform: numberAttribute });

  /** Sentido del desplazamiento. */
  readonly direccion = input<DireccionLogoLoop>('izquierda');

  /** Altura del logo o tamaño de fuente de la plantilla. */
  readonly alturaLogo = input(32, { transform: numberAttribute });

  /** Separación entre elementos en píxeles. */
  readonly separacion = input(48, { transform: numberAttribute });

  /** Reduce la velocidad hasta detenerse al pasar el cursor. */
  readonly pausaAlPasar = input(true, { transform: booleanAttribute });

  /** Velocidad personalizada al pasar el cursor. */
  readonly velocidadAlPasar = input<number | undefined, unknown>(undefined, {
    transform: (valor) =>
      valor === undefined || valor === null || valor === '' ? undefined : numberAttribute(valor),
  });

  /** Color de los degradados laterales. `null` los oculta. */
  readonly colorDesvanecido = input<string | null>('#FFFFFF');

  /** Escala 1.15× al pasar el cursor. */
  readonly escalarAlPasar = input(false, { transform: booleanAttribute });

  /** Escala de grises en reposo, color al pasar. */
  readonly escalaDeGrises = input(false, { transform: booleanAttribute });

  /** Altura de la región en modo vertical. */
  readonly altura = input(320, { transform: numberAttribute });

  /** Etiqueta accesible de la región. */
  readonly etiquetaAria = input('Logos de aliados');

  protected readonly tamano = signal(0);
  protected readonly copias = signal(MIN_COPIAS);
  protected readonly hovered = signal(false);
  protected readonly reducido = signal(false);

  protected readonly vertical = computed(() => {
    const direccion = this.direccion();
    return direccion === 'arriba' || direccion === 'abajo';
  });

  protected readonly target = computed(() => {
    const vertical = this.vertical();
    const direccion = this.direccion();
    const multiplicador = vertical
      ? direccion === 'arriba'
        ? 1
        : -1
      : direccion === 'izquierda'
        ? 1
        : -1;

    return Math.abs(this.velocidad()) * multiplicador * (this.velocidad() < 0 ? -1 : 1);
  });

  protected readonly velocidadAlPasarEfectiva = computed(
    () => this.velocidadAlPasar() ?? (this.pausaAlPasar() ? 0 : undefined),
  );

  protected readonly objetivo = computed(() => {
    const velocidad = this.velocidadAlPasarEfectiva();
    return this.hovered() && velocidad !== undefined ? velocidad : this.target();
  });

  protected readonly copiasRestantes = computed(() =>
    Array.from({ length: Math.max(0, this.copias() - 1) }),
  );

  protected readonly relleno = computed(() => {
    const relleno = this.escalarAlPasar() ? Math.ceil(this.alturaLogo() * 0.12) : 0;
    return this.vertical() ? `0 ${relleno}px` : `${relleno}px 0`;
  });

  protected readonly rellenoLista = computed(() =>
    this.vertical() ? `0 0 ${this.separacion()}px` : `0 ${this.separacion()}px 0 0`,
  );

  constructor() {
    this.destruir.onDestroy(() => {
      this.destruido = true;
    });

    effect((onCleanup) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducido.set(media.matches);

      const alCambiar = (evento: MediaQueryListEvent): void => this.reducido.set(evento.matches);
      media.addEventListener('change', alCambiar);
      onCleanup(() => media.removeEventListener('change', alCambiar));
    });

    effect(() => {
      this.logos();
      this.separacion();
      this.alturaLogo();
      this.vertical();
      this.reducido();
      this.caja();
      this.secuencia();

      queueMicrotask(() => this.medir());
    });

    effect((onCleanup) => {
      if (typeof window === 'undefined') return;

      const caja = this.caja()?.nativeElement;
      const secuencia = this.secuencia()?.nativeElement;
      if (!caja || !secuencia) return;

      if (typeof ResizeObserver !== 'undefined') {
        const observador = new ResizeObserver(() => this.medir());
        observador.observe(caja);
        observador.observe(secuencia);
        onCleanup(() => observador.disconnect());
        return;
      }

      const alRedimensionar = (): void => this.medir();
      window.addEventListener('resize', alRedimensionar);
      onCleanup(() => window.removeEventListener('resize', alRedimensionar));
    });

    effect((onCleanup) => {
      if (typeof window === 'undefined') return;

      const secuencia = this.secuencia()?.nativeElement;
      if (!secuencia) return;

      this.logos();
      this.separacion();
      this.alturaLogo();

      const limpiezas: (() => void)[] = [];
      const imagenes = Array.from(secuencia.querySelectorAll('img'));

      for (const imagen of imagenes) {
        if (imagen.complete) continue;

        const alCargar = (): void => this.medir();
        imagen.addEventListener('load', alCargar, { once: true });
        imagen.addEventListener('error', alCargar, { once: true });
        limpiezas.push(() => {
          imagen.removeEventListener('load', alCargar);
          imagen.removeEventListener('error', alCargar);
        });
      }

      onCleanup(() => limpiezas.forEach((limpiar) => limpiar()));
    });

    effect((onCleanup) => {
      if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
        return;
      }

      const pista = this.pista()?.nativeElement;
      if (!pista) return;

      if (this.reducido()) {
        pista.style.transform = 'none';
        return;
      }

      let raf = 0;
      let ultimo: number | null = null;

      const paso = (marca: number): void => {
        if (ultimo === null) ultimo = marca;

        const delta = Math.max(0, marca - ultimo) / 1000;
        ultimo = marca;

        const objetivo = this.objetivo();
        this.vel += (objetivo - this.vel) * (1 - Math.exp(-delta / TAU));

        const tamano = this.tamano();
        if (tamano > 0) {
          this.off = (((this.off + this.vel * delta) % tamano) + tamano) % tamano;
          pista.style.transform = this.vertical()
            ? `translate3d(0,${-this.off}px,0)`
            : `translate3d(${-this.off}px,0,0)`;
        }

        raf = window.requestAnimationFrame(paso);
      };

      raf = window.requestAnimationFrame(paso);
      onCleanup(() => window.cancelAnimationFrame(raf));
    });
  }

  protected alEntrar(): void {
    this.hovered.set(true);
  }

  protected alSalir(): void {
    this.hovered.set(false);
  }

  protected degradado(lado: LadoLogoLoop): string | null {
    const color = this.colorDesvanecido();
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

  private medir(): void {
    if (this.destruido) return;

    const secuencia = this.secuencia()?.nativeElement;
    const caja = this.caja()?.nativeElement;
    if (!secuencia || !caja) return;

    const rect = secuencia.getBoundingClientRect();
    const tamano = Math.ceil(this.vertical() ? rect.height : rect.width);
    const viewport = this.vertical() ? caja.clientHeight : caja.clientWidth;

    if (tamano > 0) {
      this.tamano.set(tamano);
      this.copias.set(
        this.reducido()
          ? 1
          : Math.min(
              MAX_COPIAS,
              Math.max(MIN_COPIAS, Math.ceil(viewport / tamano) + MARGEN_COPIAS),
            ),
      );
    }
  }
}
