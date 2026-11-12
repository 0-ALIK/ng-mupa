import { booleanAttribute, Component, computed, input } from '@angular/core';

import { ICONOS, type IconoNodo, type NombreIcono } from './icon-data';

/**
 * Icono Lucide del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: mismo viewBox, trazo, tamaños y
 * atributos de accesibilidad. Los datos de los iconos se generaron desde
 * lucide@0.469.0, la versión usada por el sistema original.
 */
@Component({
  selector: 'mupa-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="tamano()"
      [attr.height]="tamano()"
      viewBox="0 0 24 24"
      fill="none"
      [style.fill]="relleno()"
      [attr.stroke]="color()"
      [attr.stroke-width]="trazoCalculado()"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.role]="titulo() ? 'img' : null"
      [attr.aria-label]="titulo() ?? null"
      [attr.aria-hidden]="titulo() ? null : 'true'"
      [attr.data-lucide]="nombre()"
    >
      @if (titulo()) {
        <title>{{ titulo() }}</title>
      }

      @for (nodo of nodos(); track $index) {
        @switch (nodo[0]) {
          @case ('path') {
            <path [attr.d]="nodo[1]['d']" />
          }
          @case ('circle') {
            <circle [attr.cx]="nodo[1]['cx']" [attr.cy]="nodo[1]['cy']" [attr.r]="nodo[1]['r']" />
          }
          @case ('rect') {
            <rect
              [attr.x]="nodo[1]['x']"
              [attr.y]="nodo[1]['y']"
              [attr.width]="nodo[1]['width']"
              [attr.height]="nodo[1]['height']"
              [attr.rx]="nodo[1]['rx']"
              [attr.ry]="nodo[1]['ry']"
            />
          }
          @case ('line') {
            <line
              [attr.x1]="nodo[1]['x1']"
              [attr.x2]="nodo[1]['x2']"
              [attr.y1]="nodo[1]['y1']"
              [attr.y2]="nodo[1]['y2']"
            />
          }
          @case ('polyline') {
            <polyline [attr.points]="nodo[1]['points']" />
          }
          @case ('polygon') {
            <polygon [attr.points]="nodo[1]['points']" />
          }
        }
      }
    </svg>
  `,
  styleUrl: './icon.component.css',
})
export class MupaIcon {
  /** Nombre del icono Lucide, por ejemplo `search`, `circle-check` o `x`. */
  readonly nombre = input<string>('circle');

  /** Tamaño en píxeles del lado del icono. */
  readonly tamano = input(20);

  /** Color del trazo. Por defecto hereda el color del texto. */
  readonly color = input('currentColor');

  /** Relleno del icono. `currentColor` rellena las formas, por ejemplo el corazón activo. */
  readonly relleno = input('none');

  /** Grosor del trazo. */
  readonly trazo = input(2);

  /** Ajusta el grosor para que sea absoluto sin importar el tamaño. */
  readonly trazoAbsoluto = input(false, { transform: booleanAttribute });

  /** Si se indica, el icono se anuncia como imagen con este título. */
  readonly titulo = input<string>();

  protected readonly nodos = computed<readonly IconoNodo[]>(() => {
    const icono = ICONOS[this.nombre() as NombreIcono];

    if (!icono) {
      console.warn(
        `mupa-icon: el icono "${this.nombre()}" no está incluido en el sistema de diseño.`,
      );
      return [];
    }

    return icono;
  });

  protected readonly trazoCalculado = computed(() =>
    this.trazoAbsoluto() ? (this.trazo() * 24) / this.tamano() : this.trazo(),
  );
}
