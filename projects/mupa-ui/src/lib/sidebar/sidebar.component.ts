import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { MupaAvatar } from '../avatar/avatar.component';
import { MupaIcon } from '../icon/icon.component';
import {
  esRamaSidebar,
  type EnlaceSidebar,
  type EventoNavegacionSidebar,
  type GrupoSidebar,
  type PosicionDisparadorSidebar,
  type RamaSidebar,
  type UsuarioSidebar,
} from './sidebar.types';

let secuenciaSidebar = 0;

/**
 * Navegación lateral del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: barra expandida o compacta en
 * escritorio, cajón modal nativo por debajo de 768 px, ramas desplegables,
 * panel de usuario y pie opcional.
 */
@Component({
  selector: 'mupa-sidebar',
  exportAs: 'mupaSidebar',
  imports: [NgTemplateOutlet, MupaIcon, MupaAvatar],
  template: `
    <ng-template #plantillaDisparador>
      <button
        type="button"
        class="mupa-sidebar__disparador-movil"
        [class.mupa-sidebar__disparador-movil--flotante]="posicionDisparador() === 'flotante'"
        aria-label="Abrir navegación"
        [attr.aria-expanded]="movilAbierto()"
        [attr.aria-controls]="idDialogo"
        (click)="abrir()"
      >
        <mupa-icon nombre="menu" [tamano]="20" />
        Menú
      </button>
    </ng-template>

    <aside
      class="mupa-sidebar"
      [class.mupa-sidebar--colapsada]="compacto()"
      [attr.aria-label]="nombreSistema()"
    >
      <ng-container *ngTemplateOutlet="contenido; context: { movil: false }" />
    </aside>

    <div class="mupa-sidebar__contenido">
      @if (posicionDisparador() === 'contenido') {
        <ng-container *ngTemplateOutlet="plantillaDisparador" />
      }

      <ng-content />
    </div>

    @if (posicionDisparador() === 'flotante') {
      <ng-container *ngTemplateOutlet="plantillaDisparador" />
    }

    <dialog
      #dialogo
      [id]="idDialogo"
      class="mupa-sidebar__dialogo"
      [attr.aria-label]="etiqueta()"
      (close)="alCerrarDialogo()"
      (click)="alClicDialogo($event)"
    >
      <div class="mupa-sidebar mupa-sidebar--drawer">
        <ng-container *ngTemplateOutlet="contenido; context: { movil: true }" />
      </div>
    </dialog>

    <ng-template #contenido let-movil="movil">
      <div class="mupa-sidebar__marca">
        @if (esPequeno(movil)) {
          <span class="mupa-sidebar__marca-compacta" role="img" [attr.aria-label]="marca()">
            <mupa-icon nombre="landmark" [tamano]="20" />
          </span>
        } @else if (logoSrc()) {
          <img class="mupa-sidebar__logo" [src]="logoSrc()" [alt]="marca()" />
        } @else {
          <strong class="mupa-sidebar__texto">{{ marca() }}</strong>
        }

        <span class="mupa-sidebar__texto mupa-sidebar__sistema">{{ nombreSistema() }}</span>
      </div>

      @if (movil || mostrarControlColapso()) {
        <div class="mupa-sidebar__controles">
          @if (movil) {
            <button
              type="button"
              class="mupa-sidebar__boton"
              aria-label="Cerrar navegación"
              (click)="cerrarDialogo()"
            >
              <mupa-icon nombre="x" [tamano]="20" />
            </button>
          } @else {
            <button
              type="button"
              class="mupa-sidebar__boton"
              [attr.aria-label]="compacto() ? 'Expandir barra lateral' : 'Contraer barra lateral'"
              [attr.aria-expanded]="!compacto()"
              [attr.aria-controls]="idNav(movil)"
              [attr.title]="compacto() ? 'Expandir barra lateral' : 'Contraer barra lateral'"
              (click)="alternarColapso()"
            >
              <mupa-icon
                [nombre]="compacto() ? 'panel-left-open' : 'panel-left-close'"
                [tamano]="20"
              />
            </button>
          }
        </div>
      }

      <nav [id]="idNav(movil)" [attr.aria-label]="etiqueta()" class="mupa-sidebar__nav">
        @for (grupo of grupos(); track grupo.id ?? $index) {
          <div class="mupa-sidebar__grupo">
            @if (grupo.etiqueta) {
              <p class="mupa-sidebar__grupo-etiqueta mupa-sidebar__texto">{{ grupo.etiqueta }}</p>
            }

            <ul>
              @for (item of grupo.items; track item.id) {
                <li>
                  @if (comoRama(item); as rama) {
                    <button
                      type="button"
                      class="mupa-sidebar__enlace"
                      [attr.aria-expanded]="estaExpandido(rama, movil)"
                      [attr.data-active]="ramaActiva(rama) ? true : null"
                      [attr.aria-controls]="idHijos(movil, rama.id)"
                      [attr.aria-label]="esPequeno(movil) ? rama.etiqueta : null"
                      [attr.title]="esPequeno(movil) ? rama.etiqueta : null"
                      (click)="alternarRama(rama, movil)"
                    >
                      <mupa-icon [nombre]="rama.icono ?? 'folder'" [tamano]="18" />
                      <span class="mupa-sidebar__texto">{{ rama.etiqueta }}</span>
                      @if (!esPequeno(movil)) {
                        <mupa-icon
                          [nombre]="estaExpandido(rama, movil) ? 'chevron-down' : 'chevron-right'"
                          [tamano]="16"
                        />
                      }
                    </button>

                    <ul
                      [id]="idHijos(movil, rama.id)"
                      [hidden]="!estaExpandido(rama, movil)"
                      class="mupa-sidebar__hijos"
                    >
                      @for (hijo of rama.hijos; track hijo.id) {
                        <li>
                          <a
                            class="mupa-sidebar__enlace mupa-sidebar__enlace--hijo"
                            [href]="hijo.href"
                            [attr.aria-current]="idActivo() === hijo.id ? 'page' : null"
                            [attr.aria-label]="esPequeno(movil) ? hijo.etiqueta : null"
                            [attr.title]="esPequeno(movil) ? hijo.etiqueta : null"
                            (click)="alNavegar(hijo, $event, movil)"
                          >
                            @if (hijo.icono) {
                              <mupa-icon [nombre]="hijo.icono" [tamano]="18" />
                            }
                            <span class="mupa-sidebar__texto">{{ hijo.etiqueta }}</span>
                            @if (hijo.badge !== undefined && hijo.badge !== null) {
                              <span
                                class="mupa-sidebar__badge"
                                [attr.aria-label]="hijo.badge + ' elementos'"
                                >{{ hijo.badge }}</span
                              >
                            }
                          </a>
                        </li>
                      }
                    </ul>
                  } @else if (comoEnlace(item); as enlace) {
                    <a
                      class="mupa-sidebar__enlace"
                      [href]="enlace.href"
                      [attr.aria-current]="idActivo() === enlace.id ? 'page' : null"
                      [attr.aria-label]="esPequeno(movil) ? enlace.etiqueta : null"
                      [attr.title]="esPequeno(movil) ? enlace.etiqueta : null"
                      (click)="alNavegar(enlace, $event, movil)"
                    >
                      <mupa-icon [nombre]="enlace.icono ?? 'circle'" [tamano]="18" />
                      <span class="mupa-sidebar__texto">{{ enlace.etiqueta }}</span>
                      @if (enlace.badge !== undefined && enlace.badge !== null) {
                        <span
                          class="mupa-sidebar__badge"
                          [attr.aria-label]="enlace.badge + ' elementos'"
                          >{{ enlace.badge }}</span
                        >
                      }
                    </a>
                  }
                </li>
              }
            </ul>
          </div>
        }
      </nav>

      @if (usuario() || pie()) {
        <div class="mupa-sidebar__pie">
          @if (usuario(); as usuarioActual) {
            <div class="mupa-sidebar__usuario">
              @if (accionesUsuario().length > 0) {
                <details
                  class="mupa-sidebar__usuario-detalle"
                  (keydown.escape)="alPresionarEscape($event)"
                >
                  <summary
                    class="mupa-sidebar__usuario-disparador"
                    [attr.aria-label]="'Opciones de ' + usuarioActual.nombre"
                    [attr.title]="esPequeno(movil) ? usuarioActual.nombre : null"
                  >
                    <ng-container
                      *ngTemplateOutlet="
                        identidad;
                        context: { usuario: usuarioActual, movil: movil }
                      "
                    />
                  </summary>

                  <div class="mupa-sidebar__usuario-panel">
                    @for (accion of accionesUsuario(); track accion.id) {
                      <a [href]="accion.href" (click)="alNavegar(accion, $event, movil)">
                        @if (accion.icono) {
                          <mupa-icon [nombre]="accion.icono" [tamano]="18" />
                        }
                        {{ accion.etiqueta }}
                      </a>
                    }
                  </div>
                </details>
              } @else {
                <div class="mupa-sidebar__usuario-disparador">
                  <ng-container
                    *ngTemplateOutlet="identidad; context: { usuario: usuarioActual, movil: movil }"
                  />
                </div>
              }
            </div>
          }

          @if (pie()) {
            <div class="mupa-sidebar__footer mupa-sidebar__texto">{{ pie() }}</div>
          }
        </div>
      }
    </ng-template>

    <ng-template #identidad let-usuario="usuario" let-movil="movil">
      <mupa-avatar [nombre]="usuario.nombre" [src]="usuario.avatarSrc ?? undefined" [tamano]="36" />
      <span class="mupa-sidebar__identidad mupa-sidebar__texto">
        <strong>{{ usuario.nombre }}</strong>
        @if (usuario.correo) {
          <span>{{ usuario.correo }}</span>
        }
      </span>
      @if (!esPequeno(movil) && accionesUsuario().length > 0) {
        <mupa-icon nombre="chevrons-up-down" [tamano]="16" />
      }
    </ng-template>
  `,
  styleUrl: './sidebar.component.css',
  host: {
    '[class.mupa-sidebar-host]': 'true',
  },
})
export class MupaSidebar {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destruir = inject(DestroyRef);

  private readonly uid = `mupa-sidebar-${++secuenciaSidebar}`;

  protected readonly idDialogo = `${this.uid}-dialogo`;

  private readonly dialogo = viewChild<ElementRef<HTMLDialogElement>>('dialogo');

  /** Grupos de navegación. */
  readonly grupos = input<readonly GrupoSidebar[]>([]);

  /** Id del enlace activo; normalmente lo aporta el router. */
  readonly idActivo = input<string>();

  /** URL del logo institucional. */
  readonly logoSrc = input<string>();

  /** Nombre de la marca. */
  readonly marca = input('Alcaldía de Panamá');

  /** Nombre del sistema mostrado bajo la marca. */
  readonly nombreSistema = input('Sistema interno');

  /** Estado controlado de la barra. Si se omite, se gestiona internamente. */
  readonly colapsado = input<boolean | undefined>(undefined);

  /** Estado inicial cuando la barra no es controlada. */
  readonly colapsadoPorDefecto = input(false, { transform: booleanAttribute });

  /** Ramas abiertas en el primer render. */
  readonly idsExpandidosPorDefecto = input<readonly string[]>([]);

  /** Muestra el botón de contraer en escritorio. */
  readonly mostrarControlColapso = input(true, { transform: booleanAttribute });

  /** Usuario mostrado al pie. */
  readonly usuario = input<UsuarioSidebar>();

  /** Acciones del menú de usuario. */
  readonly accionesUsuario = input<readonly EnlaceSidebar[]>([]);

  /** Texto opcional del pie. */
  readonly pie = input<string>();

  /** Etiqueta accesible de la navegación. */
  readonly etiqueta = input('Navegación principal');

  /** Posición del disparador móvil: dentro del contenido, flotante u oculto. */
  readonly posicionDisparador = input<PosicionDisparadorSidebar>('contenido');

  /** Emitido al activar un enlace. */
  readonly navegar = output<EventoNavegacionSidebar>();

  /** Emitido al cambiar el estado de la barra. */
  readonly colapsadoCambio = output<boolean>();

  /** Emitido al abrir o cerrar el cajón móvil. */
  readonly movilAbiertoCambio = output<boolean>();

  protected readonly colapsadoLocal = signal<boolean | null>(null);
  protected readonly abiertos = signal<Record<string, boolean>>({});
  protected readonly movilAbierto = signal(false);

  protected readonly compacto = computed(
    () => this.colapsado() ?? this.colapsadoLocal() ?? this.colapsadoPorDefecto(),
  );

  constructor() {
    afterNextRender(() => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

      const escucharPuntero = (evento: PointerEvent): void =>
        this.cerrarDesplegables(evento.target);
      document.addEventListener('pointerdown', escucharPuntero);
      this.destruir.onDestroy(() => document.removeEventListener('pointerdown', escucharPuntero));

      const media = window.matchMedia('(min-width: 768px)');
      const alCambiarVista = (): void => {
        if (media.matches) this.cerrarDialogo();
      };
      media.addEventListener('change', alCambiarVista);
      this.destruir.onDestroy(() => media.removeEventListener('change', alCambiarVista));

      this.destruir.onDestroy(() => this.bloquearScroll(false));
    });
  }

  /**
   * Abre el cajón de navegación móvil.
   *
   * Útil cuando `posicionDisparador` es `'oculto'` y el consumidor controla la
   * apertura desde su propia interfaz.
   */
  abrir(): void {
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      !window.matchMedia('(max-width: 767px)').matches
    ) {
      return;
    }

    this.abrirDialogo();
  }

  /** Cierra el cajón de navegación móvil. */
  cerrar(): void {
    this.cerrarDialogo();
  }

  /** Abre o cierra el cajón de navegación móvil. */
  alternar(): void {
    if (this.movilAbierto()) {
      this.cerrar();
    } else {
      this.abrir();
    }
  }

  protected esPequeno(movil: boolean): boolean {
    return this.compacto() && !movil;
  }

  protected comoRama(item: EnlaceSidebar | RamaSidebar): RamaSidebar | null {
    return esRamaSidebar(item) ? item : null;
  }

  protected comoEnlace(item: EnlaceSidebar | RamaSidebar): EnlaceSidebar | null {
    return esRamaSidebar(item) ? null : item;
  }

  protected idNav(movil: boolean): string {
    return `${this.uid}-${movil ? 'movil' : 'escritorio'}-nav`;
  }

  protected idHijos(movil: boolean, id: string): string {
    return `${this.uid}-${movil ? 'movil' : 'escritorio'}-${id}`;
  }

  protected estaExpandido(rama: RamaSidebar, movil: boolean): boolean {
    if (this.esPequeno(movil)) return false;

    const estado = this.abiertos()[rama.id];
    if (estado !== undefined) return estado;

    return (
      this.idsExpandidosPorDefecto().includes(rama.id) ||
      rama.hijos.some((hijo) => hijo.id === this.idActivo())
    );
  }

  protected ramaActiva(rama: RamaSidebar): boolean {
    return rama.hijos.some((hijo) => hijo.id === this.idActivo());
  }

  protected alternarRama(rama: RamaSidebar, movil: boolean): void {
    const expandido = this.estaExpandido(rama, movil);

    if (this.esPequeno(movil)) {
      this.alternarColapso();
    }

    this.abiertos.update((actual) => ({ ...actual, [rama.id]: !expandido }));
  }

  protected alternarColapso(): void {
    this.cerrarDesplegables();
    const nuevoEstado = !this.compacto();

    if (this.colapsado() === undefined) {
      this.colapsadoLocal.set(nuevoEstado);
    }

    this.colapsadoCambio.emit(nuevoEstado);
  }

  protected alNavegar(enlace: EnlaceSidebar, evento: MouseEvent, movil: boolean): void {
    this.navegar.emit({ enlace, evento });
    this.cerrarDesplegables();

    if (!evento.defaultPrevented && movil) {
      this.cerrarDialogo();
    }
  }

  protected abrirDialogo(): void {
    const dialogo = this.dialogo()?.nativeElement;
    if (!dialogo || dialogo.open) return;

    dialogo.showModal();
    this.movilAbierto.set(true);
    this.movilAbiertoCambio.emit(true);
    this.bloquearScroll(true);
  }

  protected cerrarDialogo(): void {
    const dialogo = this.dialogo()?.nativeElement;
    if (dialogo?.open) {
      dialogo.close();
    }
  }

  protected alCerrarDialogo(): void {
    this.movilAbierto.set(false);
    this.movilAbiertoCambio.emit(false);
    this.bloquearScroll(false);

    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(max-width: 767px)').matches
    ) {
      this.host.nativeElement
        .querySelector<HTMLButtonElement>('.mupa-sidebar__disparador-movil')
        ?.focus();
    }
  }

  protected alClicDialogo(evento: MouseEvent): void {
    const dialogo = evento.currentTarget as HTMLDialogElement;
    if (evento.target !== dialogo) return;

    const limites = dialogo.getBoundingClientRect();
    const fuera =
      evento.clientX < limites.left ||
      evento.clientX > limites.right ||
      evento.clientY < limites.top ||
      evento.clientY > limites.bottom;

    if (fuera) {
      dialogo.close();
    }
  }

  protected alPresionarEscape(evento: Event): void {
    const detalle = evento.currentTarget as HTMLDetailsElement;
    if (!detalle.open) return;

    evento.preventDefault();
    evento.stopPropagation();
    detalle.open = false;

    const resumen = detalle.querySelector('summary');
    if (resumen instanceof HTMLElement) {
      resumen.focus();
    }
  }

  private cerrarDesplegables(objetivo?: EventTarget | null): void {
    const detalles = this.host.nativeElement.querySelectorAll('details[open]');

    detalles.forEach((detalle) => {
      if (!objetivo || !detalle.contains(objetivo as Node)) {
        (detalle as HTMLDetailsElement).open = false;
      }
    });
  }

  private bloquearScroll(bloquear: boolean): void {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = bloquear ? 'hidden' : '';
  }
}
