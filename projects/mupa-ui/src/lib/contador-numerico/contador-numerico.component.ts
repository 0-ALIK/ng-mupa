import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

import type { DireccionContador } from './contador-numerico.types';

function movimientoReducido(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function suavizar(progreso: number): number {
  return 1 - Math.pow(1 - progreso, 4);
}

/**
 * Contador numérico animado.
 *
 * Réplica de `DESARROLLO/number-ticker/NumberTicker.jsx`: cuenta hacia el valor
 * final al entrar en el viewport, con formato regional, prefijo/sufijo y
 * respeto por `prefers-reduced-motion`.
 */
@Component({
  selector: 'mupa-contador-numerico',
  template: `
    <span class="mupa-contador-numerico__visual" aria-hidden="true"
      >{{ prefijo() }}{{ valorFormateado() }}{{ sufijo() }}</span
    >
    <span class="mupa-contador-numerico__sr">{{ textoFinal() }}</span>
  `,
  styleUrl: './contador-numerico.component.css',
  host: {
    '[style.font-size.px]': 'tamano()',
    '[style.color]': 'color()',
  },
})
export class MupaContadorNumerico {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Valor final del conteo. */
  readonly valor = input.required<number, unknown>({ transform: numberAttribute });

  /** Valor desde el que inicia el conteo. */
  readonly valorInicial = input(0, { transform: numberAttribute });

  /** `arriba` cuenta desde `valorInicial`; `abajo` cuenta desde `valor`. */
  readonly direccion = input<DireccionContador>('arriba');

  /** Cantidad fija de decimales. */
  readonly decimales = input(0, { transform: numberAttribute });

  /** Duración de la animación en milisegundos. */
  readonly duracion = input(1600, { transform: numberAttribute });

  /** Retraso antes de iniciar la animación, en milisegundos. */
  readonly retraso = input(0, { transform: numberAttribute });

  /** Texto anterior al número. */
  readonly prefijo = input('');

  /** Texto posterior al número. */
  readonly sufijo = input('');

  /** Configuración regional para separadores y decimales. */
  readonly locale = input('es-PA');

  /** Inicia el conteo cuando el componente entra en el viewport. */
  readonly iniciarAlVer = input(true, { transform: booleanAttribute });

  /** Tamaño de fuente en píxeles. */
  readonly tamano = input(48, { transform: numberAttribute });

  /** Color del texto. */
  readonly color = input('var(--fg-strong)');

  /** Cambiar este valor reinicia la animación. */
  readonly claveReproduccion = input<unknown>();

  protected readonly valorMostrado = signal(0);
  protected readonly haIniciado = signal(false);
  protected readonly visto = signal(false);

  protected readonly destino = computed(() =>
    this.direccion() === 'abajo' ? this.valorInicial() : this.valor(),
  );

  protected readonly valorVisible = computed(() => {
    if (!this.haIniciado()) {
      return this.direccion() === 'abajo' ? this.valor() : this.valorInicial();
    }

    return this.valorMostrado();
  });

  protected readonly valorFormateado = computed(() => this.formatear(this.valorVisible()));

  protected readonly textoFinal = computed(
    () => `${this.prefijo()}${this.formatear(this.destino())}${this.sufijo()}`,
  );

  constructor() {
    effect((onCleanup) => {
      if (typeof window === 'undefined') return;

      if (!this.iniciarAlVer()) {
        this.visto.set(true);
        return;
      }

      if (this.visto()) return;

      if (typeof IntersectionObserver === 'undefined') {
        this.visto.set(true);
        return;
      }

      const observador = new IntersectionObserver(
        ([entrada]) => {
          if (entrada?.isIntersecting) {
            this.visto.set(true);
          }
        },
        { threshold: 0.3 },
      );

      observador.observe(this.host.nativeElement);
      onCleanup(() => observador.disconnect());
    });

    effect((onCleanup) => {
      if (!this.visto()) return;

      const valor = this.valor();
      const inicial = this.valorInicial();
      const direccion = this.direccion();
      const duracion = Math.max(0, this.duracion());
      const retraso = Math.max(0, this.retraso());
      this.claveReproduccion();

      const desde = direccion === 'abajo' ? valor : inicial;
      const hasta = direccion === 'abajo' ? inicial : valor;

      this.haIniciado.set(true);
      this.valorMostrado.set(desde);

      if (movimientoReducido()) {
        this.valorMostrado.set(hasta);
        return;
      }

      if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
        this.valorMostrado.set(hasta);
        return;
      }

      let raf = 0;
      let inicio: number | null = null;

      const temporizador = window.setTimeout(() => {
        const paso = (marca: number): void => {
          if (inicio === null) inicio = marca;

          const progreso = duracion <= 0 ? 1 : Math.min(1, (marca - inicio) / duracion);
          this.valorMostrado.set(desde + (hasta - desde) * suavizar(progreso));

          if (progreso < 1) {
            raf = window.requestAnimationFrame(paso);
          }
        };

        raf = window.requestAnimationFrame(paso);
      }, retraso);

      onCleanup(() => {
        window.clearTimeout(temporizador);
        if (raf) window.cancelAnimationFrame(raf);
      });
    });
  }

  private formatear(valor: number): string {
    const decimales = Math.min(20, Math.max(0, Math.floor(this.decimales())));

    return Number(valor).toLocaleString(this.locale(), {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    });
  }
}
