import {
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  DOCUMENT,
  effect,
  inject,
  input,
  numberAttribute,
  Renderer2,
  signal,
} from '@angular/core';

import {
  MARCAS_LATTICE,
  PATRONES_LATTICE,
  type DefinicionPatronLattice,
  type EstadoLattice,
  type FormaLattice,
  type PatronLattice,
} from './lattice-loader.types';

function limitar(valor: unknown, respaldo: number, minimo: number, maximo: number): number {
  return typeof valor === 'number' && Number.isFinite(valor)
    ? Math.min(maximo, Math.max(minimo, valor))
    : respaldo;
}

function resolverPatron(patron: PatronLattice, cuadricula: 3 | 4): DefinicionPatronLattice {
  const respaldo = PATRONES_LATTICE[cuadricula === 4 ? 'sweep' : 'orbit'][
    cuadricula
  ] as DefinicionPatronLattice;

  if (typeof patron === 'string') {
    return PATRONES_LATTICE[patron]?.[cuadricula] ?? respaldo;
  }

  if (!patron || !Array.isArray(patron.cells)) return respaldo;

  const celdas = Array.from({ length: cuadricula * cuadricula }, (_, indice) => {
    const valor = patron.cells[indice];
    return typeof valor === 'number' && Number.isFinite(valor) && valor >= 0
      ? Math.min(1000, valor)
      : null;
  });

  const maximo = Math.max(0, ...celdas.filter((valor): valor is number => valor !== null));

  return {
    cells: celdas,
    loop: limitar(patron.loop, maximo + 4.2, Math.max(1, maximo + 1), 10000),
    scale: limitar(patron.scale, 1, 0.1, 10),
    lit: limitar(patron.lit, 0.62, 0.1, 0.9),
  };
}

function formatearTics(tics: number): string {
  if (tics < 600) return `${(tics / 10).toFixed(1)} s`;
  const minutos = Math.floor(tics / 600);
  return `${minutos} min ${((tics % 600) / 10).toFixed(1)} s`;
}

function hablarTics(tics: number): string {
  const segundos = tics < 600 ? tics / 10 : (tics % 600) / 10;
  const textoSegundos = `${segundos.toFixed(1).replace('.', ',')} ${
    segundos === 1 ? 'segundo' : 'segundos'
  }`;
  if (tics < 600) return textoSegundos;
  const minutos = Math.floor(tics / 600);
  return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'} y ${textoSegundos}`;
}

function convertirSegundosATics(segundos: number): number {
  return Math.round(Math.max(0, segundos) * 10);
}

function ahora(): number {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

/**
 * Lattice Loader del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: retícula animada,
 * patrones, temporizador, estados de éxito/error, pausa y resplandor.
 */
@Component({
  selector: 'mupa-lattice-loader',
  host: {
    class: 'mupa-lattice-loader',
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[attr.data-status]': 'fase()',
    '[attr.data-shape]': 'formaEfectiva()',
    '[attr.data-glow]': 'resplandor() ? "" : null',
    '[attr.data-paused]': 'pausado() ? "" : null',
    '[style.--ll-n]': 'n()',
    '[style.--ll-cell]': 'tamanoCeldaPx()',
    '[style.--ll-gap]': 'espacioPx()',
    '[style.--ll-font]': 'tamanoFuentePx()',
    '[style.--ll-color]': 'color()',
    '[style.--ll-mark]': 'colorMarca()',
    '[style.--ll-idle]': 'opacidadInactivaEfectiva()',
    '[style.--ll-glow]': 'colorResplandorEfectivo()',
    '[style.--ll-mark-glow]': 'colorMarcaResplandor()',
    '[style.--ll-cycle]': 'cicloMs()',
  },
  template: `
    <span class="mupa-lattice-loader__grid" aria-hidden="true">
      <span class="mupa-lattice-loader__layer mupa-lattice-loader__run">
        @for (unidad of patronResuelto().cells; track $index; let indice = $index) {
          <span
            class="mupa-lattice-loader__cell"
            [attr.data-hole]="unidad === null ? '' : null"
            [style.animationName]="unidad === null ? null : nombreAnimacion()"
            [style.animationDelay]="retraso(unidad)"
          ></span>
        }
      </span>

      <span class="mupa-lattice-loader__layer mupa-lattice-loader__mark">
        @for (celda of patronResuelto().cells; track $index; let indice = $index) {
          <span
            class="mupa-lattice-loader__cell"
            [attr.data-on]="marcas().includes(indice) ? '' : null"
          ></span>
        }
      </span>
    </span>

    <span class="mupa-lattice-loader__label" aria-hidden="true">
      {{ etiquetaVisible() }}
    </span>

    @if (mostrarTiempo()) {
      <span class="mupa-lattice-loader__timer" aria-hidden="true">
        {{ tiempoFormateado() }}
      </span>
    }

    <span class="mupa-lattice-loader__sr">{{ anuncio() }}</span>
  `,
  styleUrl: './lattice-loader.component.css',
})
export class MupaLatticeLoader {
  private static secuencia = 0;
  private readonly id = ++MupaLatticeLoader.secuencia;
  private readonly documento = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly destruir = inject(DestroyRef);
  private estiloKeyframes: HTMLStyleElement | null = null;
  private inicioEjecucion: number | null = null;

  /** Etiqueta de la operación en curso. */
  readonly etiqueta = input('Procesando');

  /** Etiqueta visible y anunciada al completar. */
  readonly etiquetaExito = input<string>();

  /** Etiqueta visible y anunciada al fallar. */
  readonly etiquetaError = input<string>();

  /** Fase del indicador. */
  readonly estado = input<EstadoLattice>('working');

  /** Nombre del patrón o definición personalizada. */
  readonly patron = input<PatronLattice>('orbit');

  /** Retícula 3 × 3 o 4 × 4. */
  readonly cuadricula = input(3, { transform: numberAttribute });

  /** Forma de las celdas. */
  readonly forma = input<FormaLattice>('round');

  /** Color de la retícula en movimiento. */
  readonly color = input('var(--action)');

  /** Color de la marca de éxito. */
  readonly colorExito = input('var(--color-success-700)');

  /** Color de la marca de error. */
  readonly colorError = input('var(--color-error-700)');

  /** Tamaño de celda en píxeles. */
  readonly tamanoCelda = input(6, { transform: numberAttribute });

  /** Separación entre celdas en píxeles. */
  readonly espacio = input(2, { transform: numberAttribute });

  /** Tamaño de la etiqueta en píxeles. */
  readonly tamanoFuente = input(14, { transform: numberAttribute });

  /** Paso base de la animación en milisegundos. */
  readonly paso = input(90, { transform: numberAttribute });

  /** Opacidad de las celdas inactivas. */
  readonly opacidadInactiva = input(0.15, {
    transform: numberAttribute,
  });

  /** Añade un resplandor alrededor de la retícula. */
  readonly resplandor = input(false, { transform: booleanAttribute });

  /** Color del resplandor. Si se omite, usa el color del estado. */
  readonly colorResplandor = input('');

  /** Muestra el temporizador. */
  readonly mostrarTiempo = input(true, { transform: booleanAttribute });

  /** Tiempo externo en segundos. Si se omite, se mide internamente. */
  readonly transcurrido = input<number>();

  /** Pausa únicamente la animación; el reloj continúa. */
  readonly pausado = input(false, { transform: booleanAttribute });

  protected readonly tics = signal(0);

  protected readonly fase = computed<EstadoLattice>(() =>
    ['working', 'done', 'error'].includes(this.estado()) ? this.estado() : 'working',
  );

  protected readonly n = computed<3 | 4>(() => (this.cuadricula() === 4 ? 4 : 3));

  protected readonly formaEfectiva = computed<FormaLattice>(() =>
    this.forma() === 'square' ? 'square' : 'round',
  );

  protected readonly patronResuelto = computed(() => resolverPatron(this.patron(), this.n()));

  protected readonly pasoEfectivo = computed(() => limitar(this.paso(), 90, 60, 1000));

  protected readonly duracionUnidad = computed(
    () => this.pasoEfectivo() * (this.patronResuelto().scale ?? 1),
  );

  protected readonly ciclo = computed(() =>
    Math.max(1000, Math.round(this.patronResuelto().loop * this.duracionUnidad())),
  );

  protected readonly cicloMs = computed(() => `${this.ciclo()}ms`);

  protected readonly lit = computed(() => Math.round((this.patronResuelto().lit || 0.62) * 100));

  protected readonly nombreAnimacion = computed(() => `mupa-lattice-cell-${this.id}-${this.lit()}`);

  protected readonly marcas = computed<readonly number[]>(() =>
    this.fase() === 'error' ? MARCAS_LATTICE[this.n()].error : MARCAS_LATTICE[this.n()].done,
  );

  protected readonly colorMarca = computed(() =>
    this.fase() === 'error' ? this.colorError() : this.colorExito(),
  );

  protected readonly colorResplandorEfectivo = computed(
    () => this.colorResplandor() || this.color(),
  );

  protected readonly colorMarcaResplandor = computed(
    () => this.colorResplandor() || this.colorMarca(),
  );

  protected readonly tamanoCeldaPx = computed(() => `${limitar(this.tamanoCelda(), 6, 2, 24)}px`);

  protected readonly espacioPx = computed(() => `${limitar(this.espacio(), 2, 0, 16)}px`);

  protected readonly tamanoFuentePx = computed(
    () => `${limitar(this.tamanoFuente(), 14, 12, 32)}px`,
  );

  protected readonly opacidadInactivaEfectiva = computed(() =>
    limitar(this.opacidadInactiva(), 0.15, 0.05, 0.8),
  );

  protected readonly etiquetaExitoEfectiva = computed(
    () => this.etiquetaExito() ?? (this.mostrarTiempo() ? 'Completado en' : 'Completado'),
  );

  protected readonly etiquetaErrorEfectiva = computed(
    () => this.etiquetaError() ?? (this.mostrarTiempo() ? 'Falló tras' : 'No se pudo completar'),
  );

  protected readonly etiquetaVisible = computed(() => {
    if (this.fase() === 'working') return this.etiqueta();
    return this.fase() === 'done' ? this.etiquetaExitoEfectiva() : this.etiquetaErrorEfectiva();
  });

  protected readonly tiempoFormateado = computed(() => formatearTics(this.tics()));

  protected readonly tiempoHablado = computed(() => hablarTics(this.tics()));

  protected readonly anuncio = computed(() => {
    if (this.fase() === 'working') return `${this.etiqueta()}, en curso`;
    const base =
      this.fase() === 'done' ? this.etiquetaExitoEfectiva() : this.etiquetaErrorEfectiva();
    return `${base}${this.mostrarTiempo() ? ` ${this.tiempoHablado()}` : ''}`;
  });

  constructor() {
    effect(() => {
      const nombre = this.nombreAnimacion();
      const lit = this.lit();
      const texto = `@keyframes ${nombre}{0%,100%{opacity:var(--ll-idle);transform:scale(.9)}${Math.min(10, lit / 2)}%{opacity:1;transform:scale(1)}${lit}%{opacity:var(--ll-idle);transform:scale(.9)}}`;

      if (!this.estiloKeyframes) {
        this.estiloKeyframes = this.renderer.createElement('style');
        this.renderer.setAttribute(this.estiloKeyframes, 'data-mupa-lattice', String(this.id));
        this.renderer.appendChild(this.documento.head, this.estiloKeyframes);
      }

      this.renderer.setProperty(this.estiloKeyframes, 'textContent', texto);
    });

    effect((onCleanup) => {
      const fase = this.fase();
      const externo = this.transcurrido();
      const mostrarTiempo = this.mostrarTiempo();

      if (typeof externo === 'number' && Number.isFinite(externo)) {
        this.inicioEjecucion = null;
        this.tics.set(convertirSegundosATics(externo));
        return;
      }

      if (fase !== 'working') {
        if (this.inicioEjecucion !== null) {
          this.tics.set(Math.max(0, Math.floor((ahora() - this.inicioEjecucion) / 100)));
          this.inicioEjecucion = null;
        }
        return;
      }

      if (this.inicioEjecucion === null) {
        this.inicioEjecucion = ahora();
        this.tics.set(0);
      }

      if (!mostrarTiempo) return;

      const intervalo = setInterval(() => {
        if (this.inicioEjecucion !== null) {
          this.tics.set(Math.max(0, Math.floor((ahora() - this.inicioEjecucion) / 100)));
        }
      }, 100);

      onCleanup(() => clearInterval(intervalo));
    });

    this.destruir.onDestroy(() => {
      if (this.estiloKeyframes?.parentNode) {
        this.renderer.removeChild(this.documento.head, this.estiloKeyframes);
      }
      this.estiloKeyframes = null;
    });
  }

  protected retraso(unidad: number | null): string | null {
    if (unidad === null) return null;
    return `${Math.round(unidad * this.duracionUnidad())}ms`;
  }
}
