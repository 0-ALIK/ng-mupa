import { booleanAttribute, Component, computed, input, model } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { VariantePaginacion } from './pagination.types';

function calcularRango(
  actual: number,
  totalPaginas: number,
  hermanos: number,
): readonly (number | string)[] {
  const total = hermanos * 2 + 5;
  if (totalPaginas <= total) {
    return Array.from({ length: totalPaginas }, (_, indice) => indice + 1);
  }

  const izquierda = Math.max(actual - hermanos, 2);
  const derecha = Math.min(actual + hermanos, totalPaginas - 1);
  const salida: (number | string)[] = [1];

  if (izquierda > 2) {
    salida.push('l…');
  } else {
    for (let indice = 2; indice < izquierda; indice++) salida.push(indice);
  }

  for (let indice = izquierda; indice <= derecha; indice++) salida.push(indice);

  if (derecha < totalPaginas - 1) {
    salida.push('r…');
  } else {
    for (let indice = derecha + 1; indice < totalPaginas; indice++) salida.push(indice);
  }

  salida.push(totalPaginas);

  if (actual - hermanos <= 3) {
    return [
      ...Array.from({ length: hermanos * 2 + 3 }, (_, indice) => indice + 1),
      'r…',
      totalPaginas,
    ];
  }

  if (actual + hermanos >= totalPaginas - 2) {
    return [
      1,
      'l…',
      ...Array.from(
        { length: hermanos * 2 + 3 },
        (_, indice) => totalPaginas - (hermanos * 2 + 2) + indice,
      ),
    ];
  }

  return salida;
}

/**
 * Paginación del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: objetivos de 40 px,
 * radio 8 px, borde 1.5 px y página actual en azul institucional con
 * `aria-current`. Incluye las variantes default, compact y simple.
 */
@Component({
  selector: 'mupa-pagination',
  imports: [MupaIcon],
  template: `
    @switch (variante()) {
      @case ('simple') {
        <nav class="mupa-pagination mupa-pagination--simple" [attr.aria-label]="etiqueta()">
          <button
            type="button"
            class="mupa-pagination__boton"
            aria-label="Página anterior"
            [disabled]="actual() <= 1"
            (click)="ir(actual() - 1)"
          >
            <mupa-icon nombre="arrow-left" [tamano]="18" />
          </button>

          <span class="mupa-pagination__estado" aria-live="polite">
            Página <b>{{ actual() }}</b> de <b>{{ total() }}</b>
          </span>

          <button
            type="button"
            class="mupa-pagination__boton"
            aria-label="Página siguiente"
            [disabled]="actual() >= total()"
            (click)="ir(actual() + 1)"
          >
            <mupa-icon nombre="arrow-right" [tamano]="18" />
          </button>
        </nav>
      }

      @case ('compact') {
        <nav class="mupa-pagination mupa-pagination--compact" [attr.aria-label]="etiqueta()">
          @if (mostrarExtremos()) {
            <button
              type="button"
              class="mupa-pagination__boton"
              aria-label="Primera página"
              [disabled]="actual() <= 1"
              (click)="ir(1)"
            >
              <mupa-icon nombre="chevrons-left" [tamano]="16" />
            </button>
          }

          <button
            type="button"
            class="mupa-pagination__boton"
            aria-label="Página anterior"
            [disabled]="actual() <= 1"
            (click)="ir(actual() - 1)"
          >
            <mupa-icon nombre="chevron-left" [tamano]="16" />
          </button>

          @for (pagina of rango(); track $index) {
            @if (esNumero(pagina)) {
              <button
                type="button"
                class="mupa-pagination__boton"
                [class.mupa-pagination__boton--actual]="pagina === actual()"
                [attr.aria-label]="'Página ' + pagina"
                [attr.aria-current]="pagina === actual() ? 'page' : null"
                (click)="ir(pagina)"
              >
                {{ pagina }}
              </button>
            } @else {
              <span class="mupa-pagination__puntos" aria-hidden="true">…</span>
            }
          }

          <button
            type="button"
            class="mupa-pagination__boton"
            aria-label="Página siguiente"
            [disabled]="actual() >= total()"
            (click)="ir(actual() + 1)"
          >
            <mupa-icon nombre="chevron-right" [tamano]="16" />
          </button>

          @if (mostrarExtremos()) {
            <button
              type="button"
              class="mupa-pagination__boton"
              aria-label="Última página"
              [disabled]="actual() >= total()"
              (click)="ir(total())"
            >
              <mupa-icon nombre="chevrons-right" [tamano]="16" />
            </button>
          }
        </nav>
      }

      @default {
        <nav class="mupa-pagination mupa-pagination--default" [attr.aria-label]="etiqueta()">
          <div class="mupa-pagination__lado">
            <button
              type="button"
              class="mupa-pagination__boton mupa-pagination__boton--ancho"
              aria-label="Página anterior"
              [disabled]="actual() <= 1"
              (click)="ir(actual() - 1)"
            >
              <mupa-icon nombre="arrow-left" [tamano]="18" />
              Anterior
            </button>
          </div>

          <div class="mupa-pagination__numeros">
            @for (pagina of rango(); track $index) {
              @if (esNumero(pagina)) {
                <button
                  type="button"
                  class="mupa-pagination__boton mupa-pagination__boton--fantasma"
                  [class.mupa-pagination__boton--actual]="pagina === actual()"
                  [attr.aria-label]="'Página ' + pagina"
                  [attr.aria-current]="pagina === actual() ? 'page' : null"
                  (click)="ir(pagina)"
                >
                  {{ pagina }}
                </button>
              } @else {
                <span class="mupa-pagination__puntos" aria-hidden="true">…</span>
              }
            }
          </div>

          <div class="mupa-pagination__lado mupa-pagination__lado--derecha">
            <button
              type="button"
              class="mupa-pagination__boton mupa-pagination__boton--ancho"
              aria-label="Página siguiente"
              [disabled]="actual() >= total()"
              (click)="ir(actual() + 1)"
            >
              Siguiente
              <mupa-icon nombre="arrow-right" [tamano]="18" />
            </button>
          </div>
        </nav>
      }
    }
  `,
  styleUrl: './pagination.component.css',
})
export class MupaPagination {
  /** Página actual, base 1. Admite enlace bidireccional con `[(pagina)]`. */
  readonly pagina = model(1);

  /** Total de páginas. */
  readonly total = input(10);

  /** Variante visual. */
  readonly variante = input<VariantePaginacion>('default');

  /** Páginas visibles a cada lado de la actual. */
  readonly hermanos = input(1);

  /** Muestra los botones de primera y última página en la variante compacta. */
  readonly mostrarExtremos = input(true, { transform: booleanAttribute });

  /** Nombre accesible de la navegación. */
  readonly etiqueta = input('Paginación');

  protected readonly actual = computed(() =>
    Math.min(Math.max(1, this.pagina()), Math.max(1, this.total())),
  );

  protected readonly rango = computed(() =>
    calcularRango(this.actual(), this.total(), this.hermanos()),
  );

  protected esNumero(pagina: number | string): pagina is number {
    return typeof pagina === 'number';
  }

  protected ir(pagina: number): void {
    const valor = Math.min(Math.max(1, pagina), Math.max(1, this.total()));
    this.pagina.set(valor);
  }
}
