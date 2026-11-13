import { Component, computed, input, numberAttribute, signal } from '@angular/core';

function calcularIniciales(nombre: string): string {
  return String(nombre)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();
}

/**
 * Tarjeta de testimonio para usar dentro de `mupa-marquee`.
 *
 * Réplica de `TestimonialCard` de `DESARROLLO/marquee/Marquee.jsx`.
 */
@Component({
  selector: 'mupa-testimonio',
  template: `
    <figure
      class="mupa-testimonio"
      [class.mupa-testimonio--hover]="hover()"
      (mouseenter)="hover.set(true)"
      (mouseleave)="hover.set(false)"
    >
      <div class="mupa-testimonio__cabecera">
        @if (imagen()) {
          <img class="mupa-testimonio__avatar" [src]="imagen()" alt="" width="40" height="40" />
        } @else {
          <span class="mupa-testimonio__avatar mupa-testimonio__iniciales" aria-hidden="true">
            {{ iniciales() }}
          </span>
        }

        <div class="mupa-testimonio__identidad">
          <figcaption class="mupa-testimonio__nombre">{{ nombre() }}</figcaption>
          @if (meta()) {
            <div class="mupa-testimonio__meta">{{ meta() }}</div>
          }
        </div>
      </div>

      @if (calificacion() !== undefined && calificacion() !== null) {
        <div
          class="mupa-testimonio__calificacion"
          role="img"
          [attr.aria-label]="'Calificación: ' + calificacionEfectiva() + ' de 5'"
        >
          <span aria-hidden="true"
            >{{ estrellasLlenas()
            }}<span class="mupa-testimonio__estrellas-vacias">{{ estrellasVacias() }}</span></span
          >
        </div>
      }

      <blockquote class="mupa-testimonio__cuerpo"><ng-content /></blockquote>
    </figure>
  `,
  styleUrl: './testimonio.component.css',
})
export class MupaTestimonio {
  /** Nombre de la persona. */
  readonly nombre = input.required<string>();

  /** Línea secundaria: corregimiento, cargo o usuario. */
  readonly meta = input<string>();

  /** URL del avatar. Si falta, se usan iniciales. */
  readonly imagen = input<string>();

  /** Calificación de 1 a 5. */
  readonly calificacion = input<number>(undefined, { transform: numberAttribute });

  protected readonly hover = signal(false);

  protected readonly iniciales = computed(() => calcularIniciales(this.nombre()));

  protected readonly calificacionEfectiva = computed(() =>
    Math.max(0, Math.min(5, Math.floor(this.calificacion() ?? 0))),
  );

  protected readonly estrellasLlenas = computed(() => '★'.repeat(this.calificacionEfectiva()));

  protected readonly estrellasVacias = computed(() => '★'.repeat(5 - this.calificacionEfectiva()));
}
