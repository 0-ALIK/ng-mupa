import { booleanAttribute, Component, computed, input, model, signal } from '@angular/core';

import { MupaBreadcrumb } from '../breadcrumb/breadcrumb.component';
import { MupaIcon } from '../icon/icon.component';
import type { AccionPageHeader, FiltroPageHeader, MigasPageHeader } from './page-header.types';

let secuenciaPageHeader = 0;

/**
 * Cabecera de página del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: breadcrumbs, título,
 * descripción, acciones, búsqueda y filtros. Los filtros pasan de chips a un
 * select cuando el contenedor mide menos de 560 px.
 */
@Component({
  selector: 'mupa-page-header',
  imports: [MupaBreadcrumb, MupaIcon],
  template: `
    <header class="mupa-page-header" [class.mupa-page-header--sin-divisor]="!divisor()">
      @if (migas().length > 0) {
        <mupa-breadcrumb [elementos]="migas()" />
      }

      <div class="mupa-page-header__fila-titulo">
        <div class="mupa-page-header__texto">
          <h1>{{ titulo() }}</h1>
          @if (descripcion()) {
            <p>{{ descripcion() }}</p>
          }
        </div>

        @if (acciones().length > 0) {
          <div class="mupa-page-header__acciones">
            @for (accion of acciones(); track accion.etiqueta) {
              <button
                type="button"
                class="mupa-page-header__accion"
                [class.mupa-page-header__accion--primary]="accion.variante === 'primary'"
                (click)="ejecutarAccion(accion)"
              >
                @if (accion.icono) {
                  <mupa-icon [nombre]="accion.icono" [tamano]="18" />
                }
                {{ accion.etiqueta }}
              </button>
            }
          </div>
        }
      </div>

      @if (mostrarBusqueda() || filtros().length > 0) {
        <div class="mupa-page-header__herramientas">
          @if (mostrarBusqueda()) {
            <label
              class="mupa-page-header__busqueda"
              [class.mupa-page-header__busqueda--enfocada]="enfocado()"
            >
              <mupa-icon
                nombre="search"
                [tamano]="18"
                [color]="enfocado() ? 'var(--color-primary-500)' : 'var(--fg-muted)'"
              />
              <input
                type="search"
                [value]="textoBusqueda()"
                [placeholder]="marcadorBusqueda()"
                [attr.aria-label]="marcadorBusqueda()"
                (focus)="enfocado.set(true)"
                (blur)="enfocado.set(false)"
                (input)="actualizarBusqueda($event)"
              />
              @if (textoBusqueda()) {
                <button
                  type="button"
                  class="mupa-page-header__limpiar"
                  aria-label="Limpiar búsqueda"
                  (click)="limpiarBusqueda()"
                >
                  <mupa-icon nombre="x" [tamano]="16" />
                </button>
              }
            </label>
          }

          @if (filtros().length > 0) {
            <label class="mupa-page-header__filtro-movil" [attr.for]="idFiltro">
              {{ etiquetaFiltro() }}
              <select
                [id]="idFiltro"
                [value]="filtroSeleccionado()"
                (change)="alCambiarFiltro($event)"
              >
                @for (filtro of filtros(); track filtro.clave) {
                  <option [value]="filtro.clave">
                    {{ filtro.etiqueta
                    }}{{ filtro.conteo !== undefined ? ' (' + filtro.conteo + ')' : '' }}
                  </option>
                }
              </select>
            </label>

            <div
              class="mupa-page-header__filtros"
              role="group"
              [attr.aria-label]="etiquetaFiltro()"
            >
              @for (filtro of filtros(); track filtro.clave) {
                <button
                  type="button"
                  class="mupa-page-header__filtro"
                  [class.mupa-page-header__filtro--activo]="filtro.clave === filtroSeleccionado()"
                  [attr.aria-pressed]="filtro.clave === filtroSeleccionado()"
                  (click)="seleccionarFiltro(filtro.clave)"
                >
                  {{ filtro.etiqueta }}
                  @if (filtro.conteo !== undefined) {
                    <span class="mupa-page-header__filtro-conteo">{{ filtro.conteo }}</span>
                  }
                </button>
              }
            </div>
          }
        </div>
      }
    </header>
  `,
  styleUrl: './page-header.component.css',
})
export class MupaPageHeader {
  private readonly uid = ++secuenciaPageHeader;

  /** Título de la página. */
  readonly titulo = input.required<string>();

  /** Descripción de una línea bajo el título. */
  readonly descripcion = input<string>();

  /** Ruta de migas. */
  readonly migas = input<MigasPageHeader>([]);

  /** Acciones de la cabecera. */
  readonly acciones = input<readonly AccionPageHeader[]>([]);

  /** Muestra el campo de búsqueda. */
  readonly mostrarBusqueda = input(false, { transform: booleanAttribute });

  /** Marcador y nombre accesible de la búsqueda. */
  readonly marcadorBusqueda = input('Buscar…');

  /** Texto de búsqueda. Admite `[(textoBusqueda)]`. */
  readonly textoBusqueda = model('');

  /** Filtros de la cabecera. */
  readonly filtros = input<readonly FiltroPageHeader[]>([]);

  /** Etiqueta visible y accesible de los filtros. */
  readonly etiquetaFiltro = input('Filtrar por');

  /** Clave del filtro activo. Admite `[(filtroActivo)]`. */
  readonly filtroActivo = model<string | undefined>(undefined);

  /** Muestra el divisor inferior. */
  readonly divisor = input(true, { transform: booleanAttribute });

  protected readonly idFiltro = `mupa-page-header-${this.uid}-filtro`;
  protected readonly enfocado = signal(false);

  protected readonly filtroSeleccionado = computed(
    () => this.filtroActivo() ?? this.filtros()[0]?.clave ?? '',
  );

  protected actualizarBusqueda(evento: Event): void {
    this.textoBusqueda.set((evento.target as HTMLInputElement).value);
  }

  protected limpiarBusqueda(): void {
    this.textoBusqueda.set('');
  }

  protected seleccionarFiltro(clave: string): void {
    this.filtroActivo.set(clave);
  }

  protected alCambiarFiltro(evento: Event): void {
    this.filtroActivo.set((evento.target as HTMLSelectElement).value);
  }

  protected ejecutarAccion(accion: AccionPageHeader): void {
    accion.alHacerClic?.();
  }
}
