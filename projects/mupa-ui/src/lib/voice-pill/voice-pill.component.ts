import {
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type {
  EventoDetencionVoz,
  EventoErrorVoz,
  EventoInicioVoz,
  FaseVoicePill,
  FormaVoicePill,
  FuenteVoz,
  ModoVoicePill,
  RazonDetencionVoz,
} from './voice-pill.types';

const LOOP = 4.8;
const SYLLABLES: readonly (readonly [number, number, number])[] = [
  [0.1, 0.16, 0.9],
  [0.3, 0.12, 0.7],
  [0.5, 0.2, 1],
  [0.95, 0.14, 0.8],
  [1.15, 0.1, 0.6],
  [1.3, 0.22, 0.95],
  [1.9, 0.16, 0.85],
  [2.12, 0.12, 0.7],
  [2.3, 0.18, 0.9],
  [2.55, 0.1, 0.5],
  [3.05, 0.24, 1],
  [3.4, 0.12, 0.75],
  [3.6, 0.16, 0.9],
];
const MIC_BINS: readonly (readonly [number, number])[] = [
  [1, 4],
  [4, 11],
  [11, 33],
];
const MIC_GAIN = 2.2;
const DT_MAX = 0.05;
const SLIDE_MIN = 4;
const WAVE_EVERY = 4;
const WAVE_MAX = 80;

interface AudioActivo {
  stream: MediaStream;
  ctx?: AudioContext;
  src?: MediaStreamAudioSourceNode;
  analyser?: AnalyserNode;
  buf?: Uint8Array<ArrayBuffer>;
}

interface EstadoVoz {
  mounted: boolean;
  active: boolean;
  ready: boolean;
  session: number;
  pointerId: number | null;
  ownPress: boolean;
  downX: number;
  downAt: number;
  sliding: boolean;
  startedAt: number;
  raf: number;
  timer: number;
  hist: number[];
  tick: number;
  acc: number;
  last: number;
  env: number;
  audio: AudioActivo | null;
  waveRect: { width: number; height: number } | null;
  waveColor: string;
  source: FuenteVoz;
}

function simulatedLevel(tiempo: number): number {
  const u = tiempo % LOOP;
  let amplitud = 0.06;

  for (const [inicio, duracion, potencia] of SYLLABLES) {
    const x = (u - inicio) / duracion;
    if (x >= 0 && x <= 1) {
      amplitud = Math.max(amplitud, potencia * 0.5 * (1 - Math.cos(2 * Math.PI * x)));
    }
  }

  return amplitud * (0.7 + 0.3 * Math.abs(Math.sin(2 * Math.PI * 7.1 * u)));
}

function micLevel(analyser: AnalyserNode, buf: Uint8Array<ArrayBuffer>): number {
  analyser.getByteFrequencyData(buf);
  let total = 0;

  for (const [desde, hasta] of MIC_BINS) {
    let suma = 0;
    for (let indice = desde; indice < hasta; indice++) suma += buf[indice];
    total += suma / ((hasta - desde) * 255);
  }

  return (total / MIC_BINS.length) * MIC_GAIN;
}

function drawWave(
  estado: EstadoVoz,
  canvas: HTMLCanvasElement,
  nivel: number,
  color: string,
  piso: number,
): void {
  if (typeof window === 'undefined') return;

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const rect = estado.waveRect ?? { width: 1, height: 1 };
  const ancho = Math.max(1, Math.round(rect.width * dpr));
  const alto = Math.max(1, Math.round(rect.height * dpr));

  if (canvas.width !== ancho || canvas.height !== alto) {
    canvas.width = ancho;
    canvas.height = alto;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  estado.acc = Math.max(estado.acc, nivel);
  estado.tick = (estado.tick + 1) % WAVE_EVERY;

  if (estado.tick === 0) {
    estado.hist.push(estado.acc);
    estado.acc = 0;
    if (estado.hist.length > WAVE_MAX) estado.hist.shift();
  }

  const anchoBarra = 2 * dpr;
  const paso = 3 * dpr;
  const desplazamiento = (estado.tick / WAVE_EVERY) * paso;

  ctx.clearRect(0, 0, ancho, alto);
  ctx.fillStyle = color;

  for (let indice = 0; indice < estado.hist.length; indice++) {
    const valor = estado.hist[estado.hist.length - 1 - indice];
    const x = ancho - (indice + 1) * paso - desplazamiento;
    if (x + anchoBarra < 0) break;

    const altura = Math.max(anchoBarra, (piso + (1 - piso) * valor) * alto);
    const t = Math.min(1, Math.max(0, (x + anchoBarra / 2) / (ancho * 0.55)));
    const desvanecido = t * t * (3 - 2 * t);
    ctx.globalAlpha = (0.35 + 0.65 * valor) * desvanecido;
    ctx.beginPath();

    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, (alto - altura) / 2, anchoBarra, altura, anchoBarra / 2);
    } else {
      ctx.rect(x, (alto - altura) / 2, anchoBarra, altura);
    }

    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

function reloj(ms: number): string {
  const segundos = Math.floor(ms / 1000);
  return `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`;
}

function acotar(
  valor: number | undefined,
  respaldo: number,
  minimo: number,
  maximo: number,
): number {
  return Number.isFinite(valor) ? Math.min(maximo, Math.max(minimo, valor as number)) : respaldo;
}

function cerrarAudio(audio: AudioActivo | null): void {
  if (!audio) return;

  audio.stream?.getTracks().forEach((pista) => pista.stop());
  try {
    audio.src?.disconnect();
  } catch {
    // El nodo ya puede estar desconectado.
  }
  if (audio.ctx && audio.ctx.state !== 'closed') {
    void Promise.resolve(audio.ctx.close()).catch(() => undefined);
  }
}

/**
 * Control de entrada de voz del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: simulación o micrófono
 * real, onda reactiva en canvas, tiempo, cancelación por deslizamiento,
 * modos auto/hold/toggle y anuncios para lectores de pantalla.
 *
 * No graba ni transcribe audio.
 */
@Component({
  selector: 'mupa-voice-pill',
  imports: [MupaIcon],
  template: `
    <span class="voice-pill-control">
      <button
        #boton
        type="button"
        class="voice-pill"
        [id]="id() ?? null"
        [disabled]="deshabilitado()"
        [attr.aria-label]="etiquetaAriaCalculada()"
        [attr.aria-describedby]="descritoPor() ?? null"
        [attr.aria-pressed]="activo()"
        [attr.data-state]="fase()"
        [attr.data-pressed]="presionado() ? '' : null"
        [attr.data-input]="entrada()"
        [attr.data-reduced]="reducido() ? '' : null"
        [attr.data-shape]="forma() === 'rounded' ? 'rounded' : 'pill'"
        [style.--vp-accent]="colorAcento()"
        [style.--vp-icon]="colorIcono()"
        [style.--vp-bg]="fondo()"
        [style.--vp-size]="visual() + 'px'"
        [style.--vp-pad]="padding() + 'px'"
        [style.--vp-radius]="radio() + 'px'"
        [style.--vp-reach]="alcanceAcotado() + 'px'"
        [style.--vp-extra]="relojAncho() + ondaAncho() + 'px'"
        [style.--vp-clock-w]="relojAncho() + 'px'"
        [style.--vp-wave-w]="ondaAncho() + 'px'"
        [style.--vp-stop]="paradaTamano() + 'px'"
        [style.--vp-icon-size]="iconoTamano() + 'px'"
        [style.--vp-time-size]="tiempoTamano() + 'px'"
        [style.--vp-open]="aperturaAcotada() + 'ms'"
        [style.--vp-press]="escalaPresionAcotada()"
        [style.--vp-slide]="desplazamiento()"
        [style.--vp-cancel]="cancelacion()"
        (pointerdown)="alPresionarPuntero($event)"
        (pointermove)="alMoverPuntero($event)"
        (pointerup)="alSoltarPuntero($event)"
        (pointercancel)="alCancelarPuntero($event)"
        (lostpointercapture)="alCancelarPuntero($event)"
        (click)="alHacerClic($event)"
        (keydown)="alPresionarTecla($event)"
        (blur)="alPerderFoco()"
        (contextmenu)="$event.preventDefault()"
      >
        <span class="voice-pill__capsule" aria-hidden="true"></span>

        @if (mostrarOnda()) {
          <canvas #onda class="voice-pill__wave" aria-hidden="true"></canvas>
          <span class="voice-pill__static-wave" aria-hidden="true">
            @for (altura of alturasOnda; track $index) {
              <i [style.height.%]="altura"></i>
            }
          </span>
        }

        @if (deslizarParaCancelar()) {
          <span class="voice-pill__cancel" aria-hidden="true">
            <mupa-icon nombre="arrow-left" [tamano]="12" />
            <span>Cancelar</span>
          </span>
        }

        @if (mostrarTiempo()) {
          <span #tiempo class="voice-pill__time" aria-hidden="true">0:00</span>
        }

        <span class="voice-pill__glyph" aria-hidden="true">
          <span class="voice-pill__mic">
            <mupa-icon nombre="mic" [tamano]="iconoTamano()" />
          </span>
          <span class="voice-pill__stop"></span>
        </span>
      </button>

      <span class="voice-pill__sr" role="status" aria-live="polite" aria-atomic="true">
        {{ mensaje() }}
      </span>
    </span>
  `,
  styleUrl: './voice-pill.component.css',
})
export class MupaVoicePill {
  private readonly destruir = inject(DestroyRef);

  private readonly boton = viewChild<ElementRef<HTMLButtonElement>>('boton');
  private readonly onda = viewChild<ElementRef<HTMLCanvasElement>>('onda');
  private readonly tiempo = viewChild<ElementRef<HTMLSpanElement>>('tiempo');

  private readonly estado: EstadoVoz = {
    mounted: true,
    active: false,
    ready: false,
    session: 0,
    pointerId: null,
    ownPress: false,
    downX: 0,
    downAt: 0,
    sliding: false,
    startedAt: 0,
    raf: 0,
    timer: 0,
    hist: [],
    tick: 0,
    acc: 0,
    last: 0,
    env: 0,
    audio: null,
    waveRect: null,
    waveColor: '#083AC5',
    source: 'simulated',
  };

  protected readonly alturasOnda = [35, 65, 95, 55, 80, 40, 65, 35];

  protected readonly fase = signal<FaseVoicePill>('idle');
  protected readonly presionado = signal(false);
  protected readonly entrada = signal<'pointer' | 'key'>('pointer');
  protected readonly mensaje = signal('');
  protected readonly reducido = signal(false);
  protected readonly desplazamiento = signal('0px');
  protected readonly cancelacion = signal(0);

  /** Color de acento de la cápsula y la onda. */
  readonly colorAcento = input('var(--color-primary-700)');

  /** Color del icono de micrófono. */
  readonly colorIcono = input('var(--fg-muted)');

  /** Fondo de la cápsula. */
  readonly fondo = input('var(--color-primary-50)');

  /** Tamaño visual entre 24 y 64 px. El área interactiva mide al menos 44 px. */
  readonly tamano = input(28);

  /** Forma de la cápsula. */
  readonly forma = input<FormaVoicePill>('pill');

  /** Separación de la onda y el tiempo respecto al glyph. */
  readonly alcance = input(8);

  /** Muestra el tiempo transcurrido. */
  readonly mostrarTiempo = input(true, { transform: booleanAttribute });

  /** Muestra la onda. */
  readonly mostrarOnda = input(true, { transform: booleanAttribute });

  /** Permite cancelar deslizando a la izquierda. */
  readonly deslizarParaCancelar = input(true, { transform: booleanAttribute });

  /** Distancia de deslizamiento para cancelar. */
  readonly distanciaCancelar = input(64);

  /** Ataque del envelope de la onda. */
  readonly ataque = input(40);

  /** Liberación del envelope de la onda. */
  readonly liberacion = input(240);

  /** Sensibilidad de la onda. */
  readonly sensibilidad = input(1);

  /** Piso mínimo de las barras de la onda. */
  readonly piso = input(0.1);

  /** Duración de la transición de apertura. */
  readonly duracionApertura = input(180);

  /** Escala al presionar. */
  readonly escalaPresion = input(0.95);

  /** Modo de interacción. */
  readonly modo = input<ModoVoicePill>('auto');

  /** Milisegundos para distinguir un toque de una pulsación mantenida. */
  readonly esperaMantener = input(300);

  /** Origen de la onda: simulación o micrófono real. */
  readonly reactivo = input<FuenteVoz>('simulated');

  /** Deshabilita el control. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Nombre accesible para iniciar. */
  readonly etiquetaAria = input('Iniciar entrada de voz');

  /** Nombre accesible para detener. */
  readonly etiquetaDetener = input('Detener entrada de voz');

  /** Identificador del botón. */
  readonly id = input<string>();

  /** ID del texto que describe el control. */
  readonly descritoPor = input<string>();

  /** Emitido al iniciar una sesión de voz. */
  readonly iniciar = output<EventoInicioVoz>();

  /** Emitido al detener o cancelar una sesión. */
  readonly detener = output<EventoDetencionVoz>();

  /** Emitido cuando el micrófono falla. */
  readonly errorMicrofono = output<EventoErrorVoz>();

  protected readonly visual = computed(() => acotar(this.tamano(), 28, 24, 64));

  protected readonly padding = computed(() => Math.max(0, (44 - this.visual()) / 2));

  protected readonly tiempoTamano = computed(() => Math.max(12, Math.round(this.visual() * 0.36)));

  protected readonly relojAncho = computed(() =>
    this.mostrarTiempo() ? Math.round(this.tiempoTamano() * 2.8) + 6 : 0,
  );

  protected readonly ondaAncho = computed(() =>
    this.mostrarOnda() ? Math.round(this.visual() * 1.9) : 0,
  );

  protected readonly activo = computed(
    () => this.fase() === 'requesting' || this.fase() === 'listening',
  );

  protected readonly radio = computed(() =>
    this.forma() === 'rounded' ? Math.round(this.visual() * 0.29) : this.visual() / 2,
  );

  protected readonly alcanceAcotado = computed(() => acotar(this.alcance(), 8, 4, 20));

  protected readonly paradaTamano = computed(() => Math.round(this.visual() * 0.32));

  protected readonly iconoTamano = computed(() => Math.round(this.visual() * 0.54));

  protected readonly aperturaAcotada = computed(() => acotar(this.duracionApertura(), 180, 0, 300));

  protected readonly escalaPresionAcotada = computed(() =>
    acotar(this.escalaPresion(), 0.95, 0.9, 1),
  );

  protected readonly etiquetaAriaCalculada = computed(() => {
    if (this.fase() === 'requesting') return 'Cancelar solicitud de micrófono';
    if (this.activo()) return this.etiquetaDetener();
    return this.etiquetaAria();
  });

  protected readonly configuracion = computed(() => {
    const modo = ['auto', 'hold', 'toggle'].includes(this.modo()) ? this.modo() : 'auto';

    return {
      modo: modo as ModoVoicePill,
      reactivo: this.reactivo() === 'mic' ? ('mic' as const) : ('simulated' as const),
      distanciaCancelar: acotar(this.distanciaCancelar(), 64, 32, 160),
      esperaMantener: acotar(this.esperaMantener(), 300, 150, 1000),
      ataque: acotar(this.ataque(), 40, 1, 1000),
      liberacion: acotar(this.liberacion(), 240, 1, 2000),
      sensibilidad: acotar(this.sensibilidad(), 1, 0.1, 5),
      piso: acotar(this.piso(), 0.1, 0, 0.8),
      mostrarTiempo: this.mostrarTiempo(),
      mostrarOnda: this.mostrarOnda(),
      deslizarParaCancelar: this.deslizarParaCancelar(),
    };
  });

  constructor() {
    afterNextRender(() => {
      if (typeof window === 'undefined') return;

      const consulta =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)')
          : null;

      if (consulta) {
        const actualizar = (): void => this.reducido.set(consulta.matches);
        actualizar();
        consulta.addEventListener?.('change', actualizar);
        this.destruir.onDestroy(() => consulta.removeEventListener?.('change', actualizar));
      }

      const alPerderFocoVentana = (): void => {
        if (this.estado.ready) this.end('blur');
      };
      const alCambiarVisibilidad = (): void => {
        if (document.hidden && this.estado.active) this.end('visibility');
      };

      window.addEventListener('blur', alPerderFocoVentana);
      document.addEventListener('visibilitychange', alCambiarVisibilidad);

      this.destruir.onDestroy(() => {
        window.removeEventListener('blur', alPerderFocoVentana);
        document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      });

      this.destruir.onDestroy(() => {
        this.estado.mounted = false;
        this.end('unmount');
      });
    });

    effect(() => {
      if (this.deshabilitado()) {
        this.end('disabled');
      }
    });

    effect(() => {
      const reactivo = this.reactivo() === 'mic' ? 'mic' : 'simulated';
      if (this.estado.active && this.estado.source !== reactivo) {
        this.end('source-change');
      }
    });

    effect((onCleanup) => {
      const fase = this.fase();
      const mostrarTiempo = this.mostrarTiempo();
      const mostrarOnda = this.mostrarOnda();
      const reducido = this.reducido();

      if (fase !== 'listening' || typeof window === 'undefined') return;

      const estado = this.estado;
      const pintarTiempo = (): void => {
        const tiempo = this.tiempo()?.nativeElement;
        if (estado.ready && tiempo) {
          tiempo.textContent = reloj(performance.now() - estado.startedAt);
        }
      };

      pintarTiempo();
      if (mostrarTiempo) {
        estado.timer = window.setInterval(pintarTiempo, 1000);
      }

      if (mostrarOnda && !reducido && typeof requestAnimationFrame !== 'undefined') {
        const boton = this.boton()?.nativeElement;
        if (boton && typeof window.getComputedStyle === 'function') {
          estado.waveColor = window.getComputedStyle(boton).color;
        }

        this.medirOnda();

        const frame = (ahora: number): void => {
          if (!estado.active || !estado.ready) return;

          const config = this.configuracion();
          const dt = Math.min(Math.max(0, (ahora - estado.last) / 1000), DT_MAX);
          estado.last = ahora;

          const base =
            estado.audio?.analyser && estado.audio.buf
              ? micLevel(estado.audio.analyser, estado.audio.buf)
              : simulatedLevel((ahora - estado.startedAt) / 1000);

          const objetivo = Math.min(1, base * config.sensibilidad);
          const tau = Math.max(1, objetivo > estado.env ? config.ataque : config.liberacion) / 1000;
          estado.env += (objetivo - estado.env) * (1 - Math.exp(-dt / tau));

          const canvas = this.onda()?.nativeElement;
          if (canvas) {
            drawWave(estado, canvas, estado.env, estado.waveColor, config.piso);
          }

          estado.raf = requestAnimationFrame(frame);
        };

        estado.raf = requestAnimationFrame(frame);
      }

      onCleanup(() => {
        cancelAnimationFrame(estado.raf);
        clearInterval(estado.timer);
        estado.raf = 0;
        estado.timer = 0;
      });
    });

    effect((onCleanup) => {
      this.fase();
      this.mostrarOnda();
      this.colorAcento();
      this.tamano();

      if (typeof window === 'undefined' || typeof ResizeObserver === 'undefined') return;

      const canvas = this.onda()?.nativeElement;
      if (!canvas) return;

      const boton = this.boton()?.nativeElement;
      if (boton && typeof window.getComputedStyle === 'function') {
        this.estado.waveColor = window.getComputedStyle(boton).color;
      }

      const medir = (): void => this.medirOnda();
      medir();
      const observador = new ResizeObserver(medir);
      observador.observe(canvas);
      onCleanup(() => observador.disconnect());
    });
  }

  protected alPresionarPuntero(evento: PointerEvent): void {
    const estado = this.estado;

    if (
      this.deshabilitado() ||
      evento.button !== 0 ||
      evento.isPrimary === false ||
      estado.pointerId !== null
    ) {
      return;
    }

    estado.pointerId = evento.pointerId;
    estado.downX = evento.clientX;
    estado.downAt = performance.now();
    estado.ownPress = !estado.active;

    try {
      evento.currentTarget instanceof HTMLElement &&
        evento.currentTarget.setPointerCapture(evento.pointerId);
    } catch {
      // La captura de puntero puede no estar disponible.
    }

    this.presionado.set(true);
    this.entrada.set('pointer');

    if (!estado.active) {
      this.begin('pointer');
    }
  }

  protected alMoverPuntero(evento: PointerEvent): void {
    const estado = this.estado;
    const config = this.configuracion();

    if (
      estado.pointerId !== evento.pointerId ||
      !config.deslizarParaCancelar ||
      !estado.active ||
      !estado.ownPress
    ) {
      return;
    }

    const dx = evento.clientX - estado.downX;
    if (!estado.sliding && dx > -SLIDE_MIN) return;

    estado.sliding = true;
    const pull = Math.min(config.distanciaCancelar + 24, Math.max(0, -dx));
    this.desplazamiento.set(`${-pull}px`);
    this.cancelacion.set(Math.min(1, pull / config.distanciaCancelar));

    if (pull >= config.distanciaCancelar) {
      this.end('cancel');
    }
  }

  protected alSoltarPuntero(evento: PointerEvent): void {
    const estado = this.estado;
    const config = this.configuracion();

    if (evento.pointerId !== estado.pointerId) return;

    this.liberarPuntero();
    this.presionado.set(false);
    this.settleSlide();

    if (!estado.active) return;

    const sostenido = performance.now() - estado.downAt;

    if (
      !estado.ownPress ||
      config.modo === 'hold' ||
      (config.modo === 'auto' && sostenido >= config.esperaMantener)
    ) {
      this.end(estado.ownPress ? 'release' : 'tap');
    }
  }

  protected alCancelarPuntero(evento: PointerEvent): void {
    if (evento.pointerId === this.estado.pointerId) {
      this.end('cancel');
    }
  }

  protected alHacerClic(evento: MouseEvent): void {
    if (this.deshabilitado() || evento.detail !== 0) return;

    this.entrada.set('key');

    if (this.estado.active) {
      this.end('key');
    } else {
      this.begin('key');
    }
  }

  protected alPresionarTecla(evento: KeyboardEvent): void {
    if ((evento.key === 'Enter' || evento.key === ' ') && evento.repeat) {
      evento.preventDefault();
      return;
    }

    if (evento.key === 'Escape' && this.estado.active) {
      evento.preventDefault();
      evento.stopPropagation();
      this.end('escape');
    }
  }

  protected alPerderFoco(): void {
    if (this.estado.active) {
      this.end('blur');
    }
  }

  private begin(tipo: 'pointer' | 'key'): void {
    const estado = this.estado;
    if (this.deshabilitado() || estado.active) return;

    estado.active = true;
    estado.ready = false;
    estado.source = this.configuracion().reactivo;
    const sesion = ++estado.session;

    this.entrada.set(tipo);
    this.mensaje.set('');

    if (estado.source === 'mic') {
      this.fase.set('requesting');
      this.mensaje.set('Solicitando acceso al micrófono.');
      void this.adquirirMicrofono(sesion);
    } else {
      this.activate(sesion);
    }
  }

  private activate(sesion: number): void {
    const estado = this.estado;
    if (!estado.active || !estado.mounted || estado.session !== sesion) return;

    estado.ready = true;
    estado.startedAt = performance.now();
    estado.last = estado.startedAt;
    estado.hist = [];
    estado.tick = 0;
    estado.acc = 0;
    estado.env = 0;

    const tiempo = this.tiempo()?.nativeElement;
    if (tiempo) tiempo.textContent = '0:00';

    this.fase.set('listening');
    this.mensaje.set(
      estado.source === 'mic'
        ? 'Micrófono activo. Pulsa para detener o Escape para cancelar.'
        : 'Simulación de voz activa. Pulsa para detener o Escape para cancelar.',
    );
    this.iniciar.emit({ fuente: estado.source });
  }

  private async adquirirMicrofono(sesion: number): Promise<void> {
    let audio: AudioActivo | null = null;

    try {
      const AudioCtor =
        typeof window !== 'undefined'
          ? (window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
          : undefined;

      if (!AudioCtor || !navigator.mediaDevices?.getUserMedia) {
        throw { name: 'NotSupportedError' };
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audio = { stream };

      const estado = this.estado;
      if (!estado.mounted || !estado.active || estado.session !== sesion) {
        cerrarAudio(audio);
        return;
      }

      audio.ctx = new AudioCtor();
      audio.src = audio.ctx.createMediaStreamSource(stream);
      audio.analyser = audio.ctx.createAnalyser();
      audio.analyser.fftSize = 256;
      audio.analyser.smoothingTimeConstant = 0;
      audio.buf = new Uint8Array(analyserBinCount(audio.analyser));
      audio.src.connect(audio.analyser);

      estado.audio = audio;

      if (audio.ctx.state === 'suspended') await audio.ctx.resume();

      if (!estado.mounted || !estado.active || estado.session !== sesion) {
        cerrarAudio(audio);
        return;
      }

      if (document.hidden) {
        this.end('visibility');
        return;
      }

      this.activate(sesion);
    } catch (error) {
      cerrarAudio(audio);

      const estado = this.estado;
      if (!estado.mounted || !estado.active || estado.session !== sesion) return;

      const nombre = (error as { name?: string })?.name ?? '';
      const denegado = ['NotAllowedError', 'SecurityError', 'PermissionDeniedError'].includes(
        nombre,
      );
      const codigo = denegado ? 'mic-denied' : 'mic-unavailable';
      const mensaje = denegado
        ? 'No se permitió el acceso al micrófono. Revisa los permisos del navegador.'
        : 'No hay un micrófono disponible. Comprueba el dispositivo y usa HTTPS o localhost.';

      this.end(codigo);
      this.fase.set('error');
      this.mensaje.set(mensaje);
      this.errorMicrofono.emit({ codigo, mensaje });
    }
  }

  private end(razon: RazonDetencionVoz): void {
    const estado = this.estado;
    const estabaActiva = estado.active;
    const iniciada = estado.ready;

    estado.active = false;
    estado.ready = false;
    estado.session++;

    cancelAnimationFrame(estado.raf);
    clearInterval(estado.timer);
    estado.raf = 0;
    estado.timer = 0;

    cerrarAudio(estado.audio);
    estado.audio = null;
    this.liberarPuntero();
    this.settleSlide();

    if (estado.mounted) {
      this.fase.set('idle');
      this.presionado.set(false);
      this.entrada.set(razon === 'key' || razon === 'escape' ? 'key' : 'pointer');
    }

    if (!estabaActiva) return;

    const duracion = iniciada ? Math.max(0, Math.round(performance.now() - estado.startedAt)) : 0;
    const cancelada =
      !iniciada ||
      [
        'cancel',
        'escape',
        'blur',
        'visibility',
        'disabled',
        'unmount',
        'source-change',
        'mic-denied',
        'mic-unavailable',
      ].includes(razon);

    if (estado.mounted) {
      this.mensaje.set(
        cancelada
          ? 'Entrada de voz cancelada.'
          : `Entrada de voz detenida. Duración: ${reloj(duracion)}.`,
      );
    }

    this.detener.emit({
      razon,
      duracion,
      fuente: estado.source,
      iniciada,
      cancelada,
    });
  }

  private liberarPuntero(): void {
    const estado = this.estado;
    const puntero = estado.pointerId;
    estado.pointerId = null;

    try {
      const boton = this.boton()?.nativeElement;
      if (puntero !== null && boton?.hasPointerCapture?.(puntero)) {
        boton.releasePointerCapture(puntero);
      }
    } catch {
      // La captura de puntero puede no estar disponible.
    }
  }

  private settleSlide(): void {
    this.estado.sliding = false;
    this.desplazamiento.set('0px');
    this.cancelacion.set(0);
  }

  private medirOnda(): void {
    const canvas = this.onda()?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    this.estado.waveRect = { width: rect.width, height: rect.height };
  }
}

function analyserBinCount(analyser: AnalyserNode): number {
  return analyser.frequencyBinCount;
}
