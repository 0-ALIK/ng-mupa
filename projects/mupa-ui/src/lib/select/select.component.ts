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
  model,
  signal,
  viewChild,
} from '@angular/core';

import { MupaFormControlBase } from '../forms/form-control-base';
import { MupaIcon } from '../icon/icon.component';
import type { GrupoSelect, OpcionSelect } from './select.types';

let secuenciaSelect = 0;

interface OpcionIndexada {
  opcion: OpcionSelect;
  indice: number;
}

interface GrupoIndexado {
  etiqueta?: string;
  opciones: OpcionIndexada[];
}

interface PosicionLista {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
}

/**
 * Selector simple del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: disparador con el mismo trazo que
 * los campos de texto, lista flotante con grupos, marca de selección y soporte
 * completo de teclado (↑↓, Inicio, Fin, Enter, Escape y búsqueda por teclado).
 */
@Component({
  selector: 'mupa-select',
  imports: [MupaIcon],
  template: `
    <div class="mupa-select" #raiz [style.width]="ancho()">
      @if (etiqueta()) {
        <label class="mupa-select__etiqueta" [id]="baseId() + '-label'" [attr.for]="baseId()">
          {{ etiqueta() }}
        </label>
      }

      <button
        #disparador
        type="button"
        role="combobox"
        class="mupa-select__disparador"
        [id]="baseId()"
        [class.mupa-select__disparador--abierto]="abierto()"
        [class.mupa-select__disparador--enfocado]="enfocado()"
        [class.mupa-select__disparador--error]="mostrarError()"
        [class.mupa-select__disparador--deshabilitado]="estaDeshabilitado()"
        aria-haspopup="listbox"
        [attr.aria-expanded]="abierto()"
        [attr.aria-controls]="baseId() + '-lista'"
        [attr.aria-labelledby]="etiqueta() ? baseId() + '-label ' + baseId() : null"
        [attr.aria-activedescendant]="
          abierto() && activo() >= 0 ? baseId() + '-op-' + activo() : null
        "
        [attr.aria-invalid]="invalido() ? true : null"
        [attr.aria-required]="requerido() || requeridoFormulario() ? 'true' : null"
        [attr.aria-describedby]="error() || ayuda() ? baseId() + '-ayuda' : null"
        [disabled]="estaDeshabilitado()"
        (click)="alternar()"
        (keydown)="alPresionarTecla($event)"
        (focus)="enfocado.set(true)"
        (blur)="alPerderFoco()"
      >
        <span class="mupa-select__valor" [class.mupa-select__valor--marcador]="!seleccionada()">
          {{ seleccionada()?.etiqueta ?? textoMarcador() }}
        </span>

        <mupa-icon
          class="mupa-select__chevron"
          nombre="chevron-down"
          [tamano]="18"
          [color]="colorChevron()"
          [style.transform]="abierto() ? 'rotate(180deg)' : 'none'"
        />
      </button>

      @if (nombre()) {
        <input
          type="hidden"
          [attr.name]="nombre()"
          [value]="valor() ?? ''"
          [disabled]="estaDeshabilitado()"
        />
      }

      @if (error() || ayuda()) {
        <div
          class="mupa-select__ayuda"
          [class.mupa-select__ayuda--error]="error()"
          [id]="baseId() + '-ayuda'"
        >
          {{ error() || ayuda() }}
        </div>
      }

      @if (abierto()) {
        <div
          #lista
          class="mupa-select__lista"
          role="listbox"
          [id]="baseId() + '-lista'"
          [attr.aria-labelledby]="etiqueta() ? baseId() + '-label' : null"
          [style.left.px]="posicion().left"
          [style.top.px]="posicion().top"
          [style.width.px]="posicion().width"
          [style.max-height.px]="posicion().maxHeight"
          (mousedown)="$event.preventDefault()"
        >
          @for (grupo of gruposIndexados(); track $index; let indiceGrupo = $index) {
            <div class="mupa-select__grupo" role="group" [attr.aria-label]="grupo.etiqueta ?? null">
              @if (indiceGrupo > 0) {
                <div class="mupa-select__separador"></div>
              }

              @if (grupo.etiqueta) {
                <div class="mupa-select__grupo-etiqueta">{{ grupo.etiqueta }}</div>
              }

              @for (item of grupo.opciones; track item.opcion.valor) {
                <div
                  class="mupa-select__opcion"
                  [id]="baseId() + '-op-' + item.indice"
                  [attr.data-idx]="item.indice"
                  role="option"
                  [attr.aria-selected]="item.opcion.valor === valor()"
                  [attr.aria-disabled]="item.opcion.deshabilitada ? true : null"
                  [class.mupa-select__opcion--activa]="item.indice === activo()"
                  [class.mupa-select__opcion--seleccionada]="item.opcion.valor === valor()"
                  [class.mupa-select__opcion--deshabilitada]="item.opcion.deshabilitada"
                  (mouseenter)="alEntrarOpcion(item)"
                  (click)="elegir(item)"
                >
                  <span class="mupa-select__opcion-texto">{{ item.opcion.etiqueta }}</span>

                  @if (item.opcion.valor === valor()) {
                    <mupa-icon
                      nombre="check"
                      [tamano]="16"
                      [trazo]="2.4"
                      color="var(--color-primary-700)"
                    />
                  }
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './select.component.css',
})
export class MupaSelect extends MupaFormControlBase<string | null> {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destruir = inject(DestroyRef);
  private readonly uid = `mupa-select-${++secuenciaSelect}`;

  private readonly disparador = viewChild<ElementRef<HTMLButtonElement>>('disparador');
  private readonly lista = viewChild<ElementRef<HTMLDivElement>>('lista');

  private readonly escrito = { texto: '', momento: 0 };

  /** Opciones planas. */
  readonly opciones = input<readonly OpcionSelect[]>([]);

  /** Opciones agrupadas con encabezados. Tiene prioridad sobre `opciones`. */
  readonly grupos = input<readonly GrupoSelect[]>();

  /** Título del grupo cuando se usan opciones planas. */
  readonly etiquetaGrupo = input<string>();

  /** Valor seleccionado. Admite enlace bidireccional con `[(valor)]`. */
  readonly valor = model<string | null>(null);

  /** Texto mostrado cuando no hay selección. */
  readonly marcador = input<string>();

  /** Etiqueta del campo. */
  readonly etiqueta = input<string>();

  /** Texto de ayuda bajo el campo. */
  readonly ayuda = input<string>();

  /** Mensaje de error; cambia el borde y el texto de ayuda. */
  readonly error = input<string>();

  /** Deshabilita el selector. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Marca el selector como requerido. */
  readonly requerido = input(false, { transform: booleanAttribute });

  /** Ancho del campo. */
  readonly ancho = input<number | string>('100%');

  /** Nombre del campo oculto para formularios nativos. */
  readonly nombre = input<string>();

  /** Identificador del disparador. */
  readonly id = input<string>();

  protected readonly abierto = signal(false);
  protected readonly activo = signal(-1);
  protected readonly enfocado = signal(false);
  protected readonly posicion = signal<PosicionLista>({
    left: 8,
    top: 8,
    width: 240,
    maxHeight: 280,
  });

  protected readonly baseId = computed(() => this.id() ?? this.uid);

  protected readonly estaDeshabilitado = computed(
    () => this.deshabilitado() || this.deshabilitadoEfectivo(),
  );

  protected readonly invalido = computed(() => Boolean(this.error()) || this.invalidoFormulario());

  protected readonly mostrarError = computed(
    () => Boolean(this.error()) || (this.invalidoFormulario() && this.tocadoFormulario()),
  );

  protected readonly gruposNormalizados = computed<readonly GrupoSelect[]>(
    () =>
      this.grupos() ?? [
        {
          etiqueta: this.etiquetaGrupo(),
          opciones: [...this.opciones()],
        },
      ],
  );

  protected readonly gruposIndexados = computed<readonly GrupoIndexado[]>(() => {
    let indice = 0;

    return this.gruposNormalizados().map((grupo) => ({
      etiqueta: grupo.etiqueta,
      opciones: grupo.opciones
        .filter((opcion) => opcion.valor !== null)
        .map((opcion) => ({ opcion, indice: indice++ })),
    }));
  });

  protected readonly planos = computed<readonly OpcionSelect[]>(() =>
    this.gruposIndexados().flatMap((grupo) => grupo.opciones.map((item) => item.opcion)),
  );

  protected readonly seleccionada = computed(() =>
    this.planos().find((opcion) => opcion.valor === this.valor()),
  );

  protected readonly indicesHabilitados = computed(() =>
    this.planos()
      .map((opcion, indice) => ({ opcion, indice }))
      .filter((item) => !item.opcion.deshabilitada)
      .map((item) => item.indice),
  );

  protected readonly textoMarcador = computed(() => {
    const opciones = this.gruposNormalizados().flatMap((grupo) => grupo.opciones);
    const sinValor = opciones.find((opcion) => opcion.valor === null);
    return this.marcador() ?? sinValor?.etiqueta ?? 'Selecciona una opción';
  });

  protected readonly colorChevron = computed(() => {
    if (this.estaDeshabilitado()) return 'var(--color-neutral-300)';
    if (this.enfocado() || this.abierto()) return 'var(--action)';
    return 'var(--fg-muted)';
  });

  constructor() {
    super();

    afterNextRender(() => {
      if (typeof window === 'undefined') return;

      const alPuntero = (evento: MouseEvent): void => {
        if (!this.abierto()) return;
        const objetivo = evento.target as Node | null;
        if (objetivo && !this.host.nativeElement.contains(objetivo)) {
          this.cerrarLista();
        }
      };

      const actualizar = (): void => {
        if (this.abierto()) this.actualizarPosicion();
      };

      document.addEventListener('mousedown', alPuntero);
      window.addEventListener('resize', actualizar);
      window.addEventListener('scroll', actualizar, true);

      this.destruir.onDestroy(() => {
        document.removeEventListener('mousedown', alPuntero);
        window.removeEventListener('resize', actualizar);
        window.removeEventListener('scroll', actualizar, true);
      });
    });

    effect(() => {
      const activo = this.activo();
      if (!this.abierto() || activo < 0) return;
      if (typeof requestAnimationFrame === 'undefined') return;

      requestAnimationFrame(() => {
        const lista = this.lista()?.nativeElement;
        const elemento = lista?.querySelector<HTMLElement>(`[data-idx="${activo}"]`);
        if (!lista || !elemento) return;

        if (elemento.offsetTop < lista.scrollTop) {
          lista.scrollTop = elemento.offsetTop - 4;
        } else if (
          elemento.offsetTop + elemento.offsetHeight >
          lista.scrollTop + lista.clientHeight
        ) {
          lista.scrollTop = elemento.offsetTop + elemento.offsetHeight - lista.clientHeight + 4;
        }
      });
    });
  }

  protected alternar(): void {
    if (this.estaDeshabilitado()) return;

    if (this.abierto()) {
      this.cerrarLista();
    } else {
      this.abrirLista();
    }
  }

  protected abrirLista(): void {
    if (this.estaDeshabilitado()) return;

    const planos = this.planos();
    const indiceSeleccionado = planos.findIndex((opcion) => opcion.valor === this.valor());
    const inicial =
      indiceSeleccionado >= 0 && !planos[indiceSeleccionado].deshabilitada
        ? indiceSeleccionado
        : (this.indicesHabilitados()[0] ?? -1);

    this.activo.set(inicial);
    this.actualizarPosicion();
    this.abierto.set(true);
  }

  protected cerrarLista(): void {
    this.abierto.set(false);
  }

  protected elegir(item: OpcionIndexada): void {
    if (item.opcion.deshabilitada) return;

    this.valor.set(item.opcion.valor);
    this.notificarCambio(item.opcion.valor);
    this.cerrarLista();
    this.disparador()?.nativeElement.focus();
  }

  protected alEntrarOpcion(item: OpcionIndexada): void {
    if (!item.opcion.deshabilitada) {
      this.activo.set(item.indice);
    }
  }

  protected alPresionarTecla(evento: KeyboardEvent): void {
    if (this.estaDeshabilitado()) return;

    const tecla = evento.key;

    if (!this.abierto()) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(tecla)) {
        evento.preventDefault();
        this.abrirLista();
      }
      return;
    }

    if (tecla === 'ArrowDown') {
      evento.preventDefault();
      this.mover(1);
    } else if (tecla === 'ArrowUp') {
      evento.preventDefault();
      this.mover(-1);
    } else if (tecla === 'Home') {
      evento.preventDefault();
      this.activo.set(this.indicesHabilitados()[0] ?? -1);
    } else if (tecla === 'End') {
      evento.preventDefault();
      const habilitados = this.indicesHabilitados();
      this.activo.set(habilitados[habilitados.length - 1] ?? -1);
    } else if (tecla === 'Enter' || tecla === ' ') {
      evento.preventDefault();
      const opcion = this.planos()[this.activo()];
      if (opcion) {
        this.elegir({ opcion, indice: this.activo() });
      }
    } else if (tecla === 'Escape') {
      evento.preventDefault();
      evento.stopPropagation();
      this.cerrarLista();
    } else if (tecla === 'Tab') {
      this.cerrarLista();
    } else if (tecla.length === 1) {
      const ahora = Date.now();
      const anterior = ahora - this.escrito.momento > 600 ? '' : this.escrito.texto;
      this.escrito.texto = anterior + tecla.toLowerCase();
      this.escrito.momento = ahora;

      const habilitados = this.indicesHabilitados();
      const encontrado = habilitados.find((indice) =>
        this.planos()[indice].etiqueta.toLowerCase().startsWith(this.escrito.texto),
      );

      if (encontrado !== undefined) {
        this.activo.set(encontrado);
      }
    }
  }

  protected mover(delta: number): void {
    const habilitados = this.indicesHabilitados();
    if (!habilitados.length) return;

    const posicion = habilitados.indexOf(this.activo());
    const siguiente =
      posicion < 0
        ? habilitados[0]
        : habilitados[Math.min(habilitados.length - 1, Math.max(0, posicion + delta))];

    this.activo.set(siguiente);
  }

  protected alPerderFoco(): void {
    this.enfocado.set(false);
    this.notificarTocado();
  }

  protected escribirValor(valor: string | null): void {
    this.valor.set(valor ?? null);
  }

  focus(): void {
    this.disparador()?.nativeElement.focus();
  }

  override setDisabledState(deshabilitado: boolean): void {
    super.setDisabledState(deshabilitado);
    if (deshabilitado) this.cerrarLista();
  }

  private actualizarPosicion(): void {
    const disparador = this.disparador()?.nativeElement;
    if (!disparador || typeof window === 'undefined') return;

    const rect = disparador.getBoundingClientRect();
    const debajo = window.innerHeight - rect.bottom - 12;
    const arriba = rect.top - 12;
    const altura = Math.max(44, Math.min(280, Math.max(debajo, arriba)));
    const haciaArriba = debajo < Math.min(180, arriba);

    this.posicion.set({
      left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)),
      top: haciaArriba ? Math.max(8, rect.top - altura - 4) : rect.bottom + 4,
      width: Math.min(rect.width, window.innerWidth - 16),
      maxHeight: altura,
    });
  }
}
