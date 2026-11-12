import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChildren,
  input,
  model,
  signal,
  TemplateRef,
} from '@angular/core';

import {
  TONOS_ESTADO_POR_DEFECTO,
  TONOS_ESTADO_TABLA,
  type AccionTabla,
  type ColumnaTabla,
  type RegistroTabla,
  type TonoEstadoTabla,
} from './data-table.types';
import { ICONOS, type NombreIcono } from '../icon/icon.types';
import { MupaIcon } from '../icon/icon.component';
import { MupaTemplateDirective } from './template.directive';

interface OrdenTabla {
  clave: string;
  direccion: 'asc' | 'desc';
}

function listaPaginas(actual: number, total: number): readonly (number | '…')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, indice) => indice + 1);
  }
  if (actual <= 3) return [1, 2, 3, '…', total];
  if (actual >= total - 2) return [1, '…', total - 2, total - 1, total];
  return [1, '…', actual, '…', total];
}

/**
 * Tabla de datos del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: ordenación, paginación
 * local/remota, chips de estado, acciones por fila y celdas personalizadas
 * mediante plantillas `mupaTemplate` con contexto `let-fila`.
 */
@Component({
  selector: 'mupa-data-table',
  imports: [NgTemplateOutlet, MupaIcon],
  template: `
    <div class="mupa-data-table">
      <div
        class="mupa-data-table__scroll"
        tabindex="0"
        role="region"
        [attr.aria-label]="
          leyenda()
            ? leyenda() + ': tabla con desplazamiento horizontal'
            : 'Tabla de datos con desplazamiento horizontal'
        "
      >
        <table>
          @if (leyenda()) {
            <caption class="mupa-data-table__caption">
              {{
                leyenda()
              }}
            </caption>
          }

          <thead>
            <tr>
              @for (columna of columnas(); track columna.clave) {
                <th
                  scope="col"
                  [attr.aria-sort]="ariaSort(columna)"
                  [style.width]="columna.ancho"
                  [style.text-align]="columna.alineacion ?? 'left'"
                >
                  @if (columna.ordenable) {
                    <button
                      type="button"
                      class="mupa-data-table__orden"
                      [class.mupa-data-table__orden--activo]="ordenActual(columna)"
                      (click)="alternarOrden(columna)"
                    >
                      {{ columna.encabezado }}
                      <mupa-icon [nombre]="iconoOrden(columna)" [tamano]="14" />
                    </button>
                  } @else {
                    {{ columna.encabezado }}
                  }
                </th>
              }

              @if (acciones().length > 0) {
                <th scope="col" class="mupa-data-table__th-acciones">Acciones</th>
              }
            </tr>
          </thead>

          <tbody>
            @if (visibles().length === 0) {
              <tr>
                <td
                  class="mupa-data-table__vacio"
                  [attr.colspan]="columnas().length + (acciones().length ? 1 : 0)"
                >
                  {{ textoVacio() }}
                </td>
              </tr>
            }

            @for (fila of visibles(); track claveDeFila(fila, $index); let indiceFila = $index) {
              <tr class="mupa-data-table__fila">
                @for (columna of columnas(); track columna.clave) {
                  <td [style.text-align]="columna.alineacion ?? 'left'">
                    @if (columna.plantilla) {
                      @if (plantillaDe(columna.plantilla); as plantilla) {
                        <ng-container
                          *ngTemplateOutlet="
                            plantilla;
                            context: {
                              $implicit: fila,
                              columna: columna,
                              indice: indiceFila,
                            }
                          "
                        />
                      } @else {
                        {{ valorTexto(fila, columna.clave) }}
                      }
                    } @else if (esVacio(fila, columna.clave)) {
                      <span class="mupa-data-table__sin-asignar" aria-label="Sin asignar">—</span>
                    } @else if (columna.tipo === 'mono') {
                      <span class="mupa-data-table__mono">{{
                        valorTexto(fila, columna.clave)
                      }}</span>
                    } @else if (columna.tipo === 'estado') {
                      <span
                        class="mupa-data-table__estado"
                        [style.background]="configEstado(valorTexto(fila, columna.clave)).fondo"
                        [style.border-color]="configEstado(valorTexto(fila, columna.clave)).borde"
                        [style.color]="configEstado(valorTexto(fila, columna.clave)).texto"
                      >
                        <span
                          class="mupa-data-table__punto"
                          [style.background]="configEstado(valorTexto(fila, columna.clave)).punto"
                        ></span>
                        {{ valorTexto(fila, columna.clave) }}
                      </span>
                    } @else if (columna.tipo === 'atenuado') {
                      <span class="mupa-data-table__atenuado">{{
                        valorTexto(fila, columna.clave)
                      }}</span>
                    } @else {
                      {{ valorTexto(fila, columna.clave) }}
                    }
                  </td>
                }

                @if (acciones().length > 0) {
                  <td class="mupa-data-table__td-acciones">
                    <div class="mupa-data-table__acciones">
                      @for (accion of acciones(); track accion.etiqueta) {
                        <button
                          type="button"
                          class="mupa-data-table__accion"
                          [class.mupa-data-table__accion--icono]="tieneIcono(accion)"
                          [class.mupa-data-table__accion--peligro]="accion.tono === 'danger'"
                          [attr.aria-label]="
                            accion.etiqueta + ': ' + etiquetaFila(fila, indiceFila)
                          "
                          [attr.title]="accion.etiqueta + ': ' + etiquetaFila(fila, indiceFila)"
                          (click)="ejecutarAccion(accion, fila)"
                        >
                          @if (tieneIcono(accion)) {
                            <mupa-icon [nombre]="accion.icono" [tamano]="18" />
                          } @else {
                            {{ accion.etiqueta }}
                          }
                        </button>
                      }
                    </div>
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (tamano() > 0) {
        <nav class="mupa-data-table__paginacion" aria-label="Paginación">
          <span class="mupa-data-table__pagina-texto">
            Página <b>{{ paginaActual() }}</b> de <b>{{ paginas() }}</b>
          </span>

          <div class="mupa-data-table__pagina-botones">
            <button
              type="button"
              class="mupa-data-table__pagina-boton"
              aria-label="Primera página"
              [disabled]="paginaActual() === 1"
              (click)="ir(1)"
            >
              <mupa-icon nombre="chevrons-left" [tamano]="16" />
            </button>

            <button
              type="button"
              class="mupa-data-table__pagina-boton"
              aria-label="Página anterior"
              [disabled]="paginaActual() === 1"
              (click)="ir(paginaActual() - 1)"
            >
              <mupa-icon nombre="chevron-left" [tamano]="16" />
            </button>

            @for (pagina of listaPaginasActual(); track $index) {
              @if (esPuntos(pagina)) {
                <span class="mupa-data-table__puntos" aria-hidden="true">…</span>
              } @else {
                <button
                  type="button"
                  class="mupa-data-table__pagina-boton"
                  [class.mupa-data-table__pagina-boton--actual]="pagina === paginaActual()"
                  [attr.aria-label]="'Página ' + pagina"
                  [attr.aria-current]="pagina === paginaActual() ? 'page' : null"
                  (click)="ir(pagina)"
                >
                  {{ pagina }}
                </button>
              }
            }

            <button
              type="button"
              class="mupa-data-table__pagina-boton"
              aria-label="Página siguiente"
              [disabled]="paginaActual() === paginas()"
              (click)="ir(paginaActual() + 1)"
            >
              <mupa-icon nombre="chevron-right" [tamano]="16" />
            </button>

            <button
              type="button"
              class="mupa-data-table__pagina-boton"
              aria-label="Última página"
              [disabled]="paginaActual() === paginas()"
              (click)="ir(paginas())"
            >
              <mupa-icon nombre="chevrons-right" [tamano]="16" />
            </button>
          </div>
        </nav>
      }
    </div>
  `,
  styleUrl: './data-table.component.css',
})
export class MupaDataTable {
  private readonly plantillas = contentChildren(MupaTemplateDirective);

  /** Columnas de la tabla. */
  readonly columnas = input<readonly ColumnaTabla[]>([]);

  /** Filas de la tabla. */
  readonly filas = input<readonly RegistroTabla[]>([]);

  /** Campo que identifica cada fila. */
  readonly claveFila = input('id');

  /** Acciones por fila. */
  readonly acciones = input<readonly AccionTabla[]>([]);

  /** Filas por página. 0 o inválido desactiva la paginación. */
  readonly tamanoPagina = input(4);

  /** Total remoto de filas; si se indica, no se pagina localmente. */
  readonly total = input<number>();

  /** Página actual, base 1. Admite `[(pagina)]`. */
  readonly pagina = model(1);

  /** Tonos adicionales para los estados. */
  readonly tonosEstado = input<Readonly<Record<string, TonoEstadoTabla>>>({});

  /** Texto del estado vacío. */
  readonly textoVacio = input('No hay registros para mostrar.');

  /** Leyenda accesible de la tabla. */
  readonly leyenda = input<string>();

  protected readonly orden = signal<OrdenTabla | null>(null);

  private readonly mapaPlantillas = computed(() => {
    const mapa = new Map<string, TemplateRef<unknown>>();
    for (const plantilla of this.plantillas()) {
      mapa.set(plantilla.nombre(), plantilla.template);
    }
    return mapa;
  });

  private readonly mapaTonos = computed<Readonly<Record<string, TonoEstadoTabla>>>(() => ({
    ...TONOS_ESTADO_POR_DEFECTO,
    ...this.tonosEstado(),
  }));

  private readonly datosOrdenados = computed<readonly RegistroTabla[]>(() => {
    const orden = this.orden();
    if (!orden) return this.filas();

    const factor = orden.direccion === 'asc' ? 1 : -1;
    return [...this.filas()].sort(
      (a, b) =>
        String(a[orden.clave] ?? '').localeCompare(String(b[orden.clave] ?? ''), 'es', {
          numeric: true,
        }) * factor,
    );
  });

  protected readonly tamano = computed(() => {
    const tamano = this.tamanoPagina();
    return Number.isInteger(tamano) && tamano > 0 ? tamano : 0;
  });

  protected readonly totalRemoto = computed(() => {
    const total = this.total();
    return typeof total === 'number' && Number.isFinite(total) && total >= 0;
  });

  protected readonly cantidad = computed(() =>
    this.totalRemoto() ? Math.floor(this.total() as number) : this.filas().length,
  );

  protected readonly paginas = computed(() =>
    this.tamano() ? Math.max(1, Math.ceil(this.cantidad() / this.tamano())) : 1,
  );

  protected readonly paginaActual = computed(() =>
    Math.min(this.paginas(), Math.max(1, Math.trunc(this.pagina()))),
  );

  protected readonly visibles = computed(() => {
    const datos = this.datosOrdenados();
    if (this.tamano() && !this.totalRemoto()) {
      const inicio = (this.paginaActual() - 1) * this.tamano();
      return datos.slice(inicio, inicio + this.tamano());
    }
    return datos;
  });

  protected readonly listaPaginasActual = computed(() =>
    listaPaginas(this.paginaActual(), this.paginas()),
  );

  protected alternarOrden(columna: ColumnaTabla): void {
    const actual = this.orden();

    if (!actual || actual.clave !== columna.clave) {
      this.orden.set({ clave: columna.clave, direccion: 'asc' });
    } else if (actual.direccion === 'asc') {
      this.orden.set({ clave: columna.clave, direccion: 'desc' });
    } else {
      this.orden.set(null);
    }
  }

  protected ordenActual(columna: ColumnaTabla): boolean {
    return this.orden()?.clave === columna.clave;
  }

  protected ariaSort(columna: ColumnaTabla): string | null {
    const orden = this.orden();
    if (!orden || orden.clave !== columna.clave) return null;
    return orden.direccion === 'asc' ? 'ascending' : 'descending';
  }

  protected iconoOrden(columna: ColumnaTabla): string {
    const orden = this.orden();
    if (!orden || orden.clave !== columna.clave) return 'arrow-up-down';
    return orden.direccion === 'asc' ? 'arrow-up' : 'arrow-down';
  }

  protected plantillaDe(nombre: string): TemplateRef<unknown> | null {
    return this.mapaPlantillas().get(nombre) ?? null;
  }

  protected valorTexto(fila: RegistroTabla, clave: string): string {
    const valor = fila[clave];
    return valor === null || valor === undefined ? '' : String(valor);
  }

  protected esVacio(fila: RegistroTabla, clave: string): boolean {
    const valor = fila[clave];
    return valor === null || valor === undefined || valor === '';
  }

  protected configEstado(valor: string) {
    const tono = this.mapaTonos()[valor] ?? 'neutral';
    return TONOS_ESTADO_TABLA[tono] ?? TONOS_ESTADO_TABLA.neutral;
  }

  protected claveDeFila(fila: RegistroTabla, indice: number): string | number {
    const valor = fila[this.claveFila()];
    return typeof valor === 'string' || typeof valor === 'number' ? valor : indice;
  }

  protected etiquetaFila(fila: RegistroTabla, indice: number): string {
    const valor = fila[this.claveFila()];
    return valor === null || valor === undefined ? String(indice + 1) : String(valor);
  }

  protected tieneIcono(accion: AccionTabla): boolean {
    return Boolean(ICONOS[accion.icono as NombreIcono]);
  }

  protected ejecutarAccion(accion: AccionTabla, fila: RegistroTabla): void {
    accion.alHacerClic?.(fila);
  }

  protected esPuntos(pagina: number | '…'): pagina is '…' {
    return pagina === '…';
  }

  protected ir(pagina: number): void {
    const valor = Math.min(this.paginas(), Math.max(1, pagina));
    this.pagina.set(valor);
  }
}
