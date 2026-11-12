import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type {
  ElementoBreadcrumb,
  EventoNavegacionBreadcrumb,
  SeparadorBreadcrumb,
} from './breadcrumb.types';

interface NodoSeparador {
  tipo: 'separador';
}

interface NodoElemento {
  tipo: 'elemento';
  elemento: ElementoBreadcrumb;
  indice: number;
  actual: boolean;
}

interface NodoElipsis {
  tipo: 'elipsis';
  ocultos: readonly ElementoBreadcrumb[];
  desplazamiento: number;
}

type NodoBreadcrumb = NodoSeparador | NodoElemento | NodoElipsis;

let secuenciaBreadcrumb = 0;

/**
 * Ruta de navegación del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: enlaces en primary-700,
 * página actual en fg-strong con `aria-current`, y niveles intermedios
 * colapsados en un menú de puntos suspensivos.
 */
@Component({
  selector: 'mupa-breadcrumb',
  imports: [MupaIcon],
  template: `
    <nav class="mupa-breadcrumb" [attr.aria-label]="etiqueta()">
      <ol class="mupa-breadcrumb__lista">
        @for (nodo of nodos(); track $index) {
          @if (nodo.tipo === 'separador') {
            <li class="mupa-breadcrumb__separador" role="presentation" aria-hidden="true">
              @if (separador() === 'slash') {
                <span class="mupa-breadcrumb__slash">/</span>
              } @else {
                <mupa-icon nombre="chevron-right" [tamano]="16" />
              }
            </li>
          } @else if (nodo.tipo === 'elemento') {
            <li class="mupa-breadcrumb__item">
              @if (nodo.actual) {
                <span class="mupa-breadcrumb__actual" aria-current="page">
                  @if (nodo.elemento.icono) {
                    <mupa-icon [nombre]="nodo.elemento.icono" [tamano]="16" />
                  }
                  {{ nodo.elemento.etiqueta }}
                </span>
              } @else {
                <a
                  class="mupa-breadcrumb__enlace"
                  [href]="nodo.elemento.href ?? '#'"
                  (click)="alNavegar(nodo.elemento, nodo.indice, $event)"
                >
                  @if (nodo.elemento.icono) {
                    <mupa-icon [nombre]="nodo.elemento.icono" [tamano]="16" />
                  }
                  {{ nodo.elemento.etiqueta }}
                </a>
              }
            </li>
          } @else {
            <li class="mupa-breadcrumb__elipsis">
              <button
                #botonElipsis
                type="button"
                class="mupa-breadcrumb__boton-elipsis"
                [class.mupa-breadcrumb__boton-elipsis--abierto]="desplegableAbierto()"
                aria-label="Mostrar niveles ocultos"
                aria-haspopup="menu"
                [attr.aria-expanded]="desplegableAbierto()"
                [attr.aria-controls]="idMenu"
                (click)="alternarMenu()"
                (keydown)="alPresionarTeclaElipsis($event)"
              >
                <mupa-icon nombre="ellipsis" [tamano]="18" />
              </button>

              @if (desplegableAbierto()) {
                <ul class="mupa-breadcrumb__menu" role="menu" [id]="idMenu">
                  @for (elemento of nodo.ocultos; track $index; let i = $index) {
                    <li role="none">
                      <a
                        #itemMenu
                        class="mupa-breadcrumb__menu-item"
                        [class.mupa-breadcrumb__menu-item--activo]="activo() === i"
                        role="menuitem"
                        tabindex="-1"
                        [href]="elemento.href ?? '#'"
                        (mouseenter)="activo.set(i)"
                        (mousedown)="$event.preventDefault()"
                        (click)="elegirOculto(nodo.ocultos, nodo.desplazamiento, i, $event)"
                      >
                        @if (elemento.icono) {
                          <mupa-icon [nombre]="elemento.icono" [tamano]="16" />
                        }
                        {{ elemento.etiqueta }}
                      </a>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        }
      </ol>
    </nav>
  `,
  styleUrl: './breadcrumb.component.css',
})
export class MupaBreadcrumb {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destruir = inject(DestroyRef);
  private readonly uid = `mupa-breadcrumb-${++secuenciaBreadcrumb}`;

  private readonly botonElipsis = viewChild<ElementRef<HTMLButtonElement>>('botonElipsis');
  private readonly itemsMenu = viewChildren<ElementRef<HTMLAnchorElement>>('itemMenu');

  /** Ruta completa desde la raíz hasta la página actual. */
  readonly elementos = input<readonly ElementoBreadcrumb[]>([]);

  /** Máximo de elementos antes de colapsar los intermedios. */
  readonly maximo = input(4);

  /** Elementos visibles antes de los puntos suspensivos. */
  readonly antes = input(1);

  /** Elementos visibles después de los puntos suspensivos, incluido el actual. */
  readonly despues = input(2);

  /** Separador entre niveles. */
  readonly separador = input<SeparadorBreadcrumb>('chevron-right');

  /** Nombre accesible de la navegación. */
  readonly etiqueta = input('Ruta de navegación');

  /** Emitido al activar un nivel anterior. */
  readonly navegar = output<EventoNavegacionBreadcrumb>();

  protected readonly idMenu = `${this.uid}-menu`;
  protected readonly desplegableAbierto = signal(false);
  protected readonly activo = signal(0);

  protected readonly colapsado = computed(
    () =>
      this.elementos().length > this.maximo() &&
      this.antes() + this.despues() < this.elementos().length,
  );

  protected readonly nodos = computed<NodoBreadcrumb[]>(() => {
    const elementos = this.elementos();
    const ultimo = elementos.length - 1;
    const colapsado = this.colapsado();
    const antes = colapsado ? elementos.slice(0, this.antes()) : elementos;
    const ocultos = colapsado
      ? elementos.slice(this.antes(), elementos.length - this.despues())
      : [];
    const despues = colapsado ? elementos.slice(elementos.length - this.despues()) : [];
    const nodos: NodoBreadcrumb[] = [];

    const empujarElemento = (elemento: ElementoBreadcrumb, indice: number): void => {
      if (nodos.length) nodos.push({ tipo: 'separador' });
      nodos.push({ tipo: 'elemento', elemento, indice, actual: indice === ultimo });
    };

    antes.forEach((elemento, indice) => empujarElemento(elemento, indice));

    if (colapsado) {
      nodos.push({ tipo: 'separador' });
      nodos.push({ tipo: 'elipsis', ocultos, desplazamiento: this.antes() });

      despues.forEach((elemento, posicion) => {
        const indice = elementos.length - this.despues() + posicion;
        nodos.push({ tipo: 'separador' });
        nodos.push({ tipo: 'elemento', elemento, indice, actual: indice === ultimo });
      });
    }

    return nodos;
  });

  private readonly nodoElipsis = computed(() =>
    this.nodos().find((nodo): nodo is NodoElipsis => nodo.tipo === 'elipsis'),
  );

  constructor() {
    afterNextRender(() => {
      if (typeof document === 'undefined') return;

      const alPuntero = (evento: MouseEvent): void => {
        if (!this.desplegableAbierto()) return;
        const objetivo = evento.target as Node | null;
        if (objetivo && !this.host.nativeElement.contains(objetivo)) {
          this.desplegableAbierto.set(false);
        }
      };

      document.addEventListener('mousedown', alPuntero);
      this.destruir.onDestroy(() => document.removeEventListener('mousedown', alPuntero));
    });
  }

  protected alternarMenu(): void {
    this.activo.set(0);
    this.desplegableAbierto.update((abierto) => !abierto);
  }

  protected alNavegar(elemento: ElementoBreadcrumb, indice: number, evento: MouseEvent): void {
    this.navegar.emit({ elemento, indice, evento });
  }

  protected elegirOculto(
    ocultos: readonly ElementoBreadcrumb[],
    desplazamiento: number,
    indice: number,
    evento: MouseEvent,
  ): void {
    const elemento = ocultos[indice];
    if (!elemento) return;

    this.desplegableAbierto.set(false);
    this.navegar.emit({ elemento, indice: desplazamiento + indice, evento });
  }

  protected alPresionarTeclaElipsis(evento: KeyboardEvent): void {
    const elipsis = this.nodoElipsis();

    if (!this.desplegableAbierto()) {
      if (['ArrowDown', 'Enter', ' '].includes(evento.key)) {
        evento.preventDefault();
        this.activo.set(0);
        this.desplegableAbierto.set(true);
      }
      return;
    }

    if (evento.key === 'ArrowDown') {
      evento.preventDefault();
      this.activo.update((indice) => Math.min((elipsis?.ocultos.length ?? 1) - 1, indice + 1));
    } else if (evento.key === 'ArrowUp') {
      evento.preventDefault();
      this.activo.update((indice) => Math.max(0, indice - 1));
    } else if (evento.key === 'Enter') {
      evento.preventDefault();
      this.itemsMenu()[this.activo()]?.nativeElement.click();
    } else if (evento.key === 'Escape') {
      this.desplegableAbierto.set(false);
      this.botonElipsis()?.nativeElement.focus();
    }
  }
}
