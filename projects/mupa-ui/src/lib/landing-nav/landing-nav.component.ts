import {
  afterNextRender,
  booleanAttribute,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { DisenoLandingNav, ElementoLandingNav } from './landing-nav.types';

let secuenciaLandingNav = 0;

/**
 * Menú de landing del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: barra blanca con logo a
 * la izquierda, enlaces a la derecha, indicador azul en el enlace activo y
 * menú hamburguesa por debajo del punto de corte.
 */
@Component({
  selector: 'mupa-landing-nav',
  imports: [MupaIcon],
  template: `
    <header #cabecera class="mupa-landing-nav" [class.mupa-landing-nav--pegajosa]="pegajoso()">
      <div class="mupa-landing-nav__barra" [class.mupa-landing-nav__barra--movil]="movil()">
        <a
          class="mupa-landing-nav__logo"
          href="#"
          [attr.aria-label]="textoLogo() + ' — inicio'"
          (click)="alClicLogo($event)"
        >
          <img
            [src]="logoSrc() || 'assets/logo-alcaldia-navy.svg'"
            [alt]="textoLogo()"
            [style.height.px]="altoLogoCalculado()"
          />
        </a>

        @if (!movil()) {
          <nav aria-label="Principal">
            <div class="mupa-landing-nav__enlaces">
              @for (item of elementos(); track item.clave) {
                <a
                  class="mupa-landing-nav__enlace"
                  [class.mupa-landing-nav__enlace--seleccionado]="item.clave === actual()"
                  [href]="item.href ?? '#'"
                  [attr.aria-current]="item.clave === actual() ? 'page' : null"
                  (click)="alClicEnlace(item, $event)"
                >
                  <span class="mupa-landing-nav__etiqueta">
                    <span class="mupa-landing-nav__etiqueta-fantasma" aria-hidden="true">
                      {{ item.etiqueta }}
                    </span>
                    <span>{{ item.etiqueta }}</span>
                  </span>
                  <span class="mupa-landing-nav__indicador" aria-hidden="true"></span>
                </a>
              }
            </div>
          </nav>
        }

        @if (movil()) {
          <button
            type="button"
            class="mupa-landing-nav__boton-menu"
            [class.mupa-landing-nav__boton-menu--abierto]="abierto()"
            [attr.aria-label]="abierto() ? 'Cerrar menú' : 'Abrir menú'"
            [attr.aria-expanded]="abierto()"
            [attr.aria-controls]="idMenu"
            (click)="alternarMenu()"
          >
            <mupa-icon [nombre]="abierto() ? 'x' : 'menu'" [tamano]="24" />
          </button>
        }
      </div>

      @if (movil() && abierto()) {
        <nav class="mupa-landing-nav__menu-movil" [id]="idMenu" aria-label="Principal">
          @for (item of elementos(); track item.clave) {
            <a
              class="mupa-landing-nav__fila-movil"
              [class.mupa-landing-nav__fila-movil--seleccionada]="item.clave === actual()"
              [href]="item.href ?? '#'"
              [attr.aria-current]="item.clave === actual() ? 'page' : null"
              (click)="alClicEnlace(item, $event)"
            >
              <span class="mupa-landing-nav__fila-texto">{{ item.etiqueta }}</span>

              @if (item.clave === actual()) {
                <mupa-icon nombre="check" [tamano]="18" color="var(--color-primary-700)" />
              } @else {
                <mupa-icon nombre="chevron-right" [tamano]="18" color="var(--fg-muted)" />
              }
            </a>
          }
        </nav>
      }
    </header>
  `,
  styleUrl: './landing-nav.component.css',
})
export class MupaLandingNav implements OnInit {
  private readonly destruir = inject(DestroyRef);
  private readonly uid = `mupa-landing-nav-${++secuenciaLandingNav}`;

  private readonly cabecera = viewChild<ElementRef<HTMLElement>>('cabecera');

  /** Enlaces principales. */
  readonly elementos = input<readonly ElementoLandingNav[]>([]);

  /** Clave del enlace activo. Si se omite, se gestiona internamente. */
  readonly activo = input<string>();

  /** URL del logo. Por defecto, el logo azul marino institucional. */
  readonly logoSrc = input<string>();

  /** Texto alternativo del logo. */
  readonly textoLogo = input('Alcaldía de Panamá');

  /** Altura del logo en píxeles. Por defecto 48 en escritorio y 40 en móvil. */
  readonly altoLogo = input<number>();

  /** Ancho por debajo del cual se usa el menú hamburguesa. */
  readonly puntoCorte = input(768);

  /** Fuerza el diseño independientemente del ancho (para previews). */
  readonly diseno = input<DisenoLandingNav>('auto');

  /** Abre el menú móvil al iniciar. */
  readonly abiertoPorDefecto = input(false, { transform: booleanAttribute });

  /** Mantiene la barra pegada al borde superior. */
  readonly pegajoso = input(false, { transform: booleanAttribute });

  /** Emitido con la clave del enlace seleccionado. */
  readonly navegar = output<string>();

  protected readonly idMenu = `${this.uid}-menu`;
  protected readonly ancho = signal(1200);
  protected readonly abierto = signal(false);
  private readonly interno = signal<string | undefined>(undefined);

  protected readonly actual = computed(
    () => this.activo() ?? this.interno() ?? this.elementos()[0]?.clave,
  );

  protected readonly movil = computed(
    () =>
      this.diseno() === 'mobile' || (this.diseno() === 'auto' && this.ancho() < this.puntoCorte()),
  );

  protected readonly altoLogoCalculado = computed(
    () => this.altoLogo() ?? (this.movil() ? 40 : 48),
  );

  constructor() {
    afterNextRender(() => {
      if (typeof window === 'undefined') return;

      const alPresionarTecla = (evento: KeyboardEvent): void => {
        if (evento.key === 'Escape' && this.abierto()) {
          this.abierto.set(false);
        }
      };
      document.addEventListener('keydown', alPresionarTecla);
      this.destruir.onDestroy(() => document.removeEventListener('keydown', alPresionarTecla));

      if (typeof ResizeObserver === 'undefined') return;

      const cabecera = this.cabecera()?.nativeElement;
      if (!cabecera) return;

      const observador = new ResizeObserver(([entrada]) => {
        this.ancho.set(entrada.contentRect.width);
      });
      observador.observe(cabecera);
      this.destruir.onDestroy(() => observador.disconnect());
    });
  }

  ngOnInit(): void {
    if (this.abiertoPorDefecto()) {
      this.abierto.set(true);
    }
  }

  protected alternarMenu(): void {
    this.abierto.update((abierto) => !abierto);
  }

  protected alClicLogo(evento: MouseEvent): void {
    evento.preventDefault();
    this.seleccionar(this.elementos()[0]?.clave);
  }

  protected alClicEnlace(item: ElementoLandingNav, evento: MouseEvent): void {
    evento.preventDefault();
    this.seleccionar(item.clave);
  }

  private seleccionar(clave: string | undefined): void {
    if (clave === undefined) return;

    if (this.activo() === undefined) {
      this.interno.set(clave);
    }

    this.navegar.emit(clave);
    this.abierto.set(false);
  }
}
