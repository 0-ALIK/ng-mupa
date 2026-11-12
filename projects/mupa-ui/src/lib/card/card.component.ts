import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  contentChild,
  input,
  model,
  output,
} from '@angular/core';

import {
  MupaCardActionsDirective,
  MupaCardFooterDirective,
  MupaCardHeaderDirective,
  MupaCardMediaDirective,
} from './card-slots.directive';
import type {
  BordeCard,
  DireccionCard,
  EspaciadoCard,
  EstadoVisualCard,
  NivelTituloCard,
  RadioCard,
  SombraCard,
} from './card.types';

type TipoSuperficieCard = 'ancla' | 'boton' | 'articulo';

function normalizarNivelTitulo(valor: unknown): NivelTituloCard {
  const numero = Number(valor);
  return Number.isInteger(numero) && numero >= 2 && numero <= 6 ? (numero as NivelTituloCard) : 3;
}

/**
 * Tarjeta del sistema de diseño.
 *
 * Shell genérico y composable, sin variantes semánticas. Resuelve superficie,
 * layout, interacción, selección y estados; el contenido se compone con los
 * inputs de conveniencia (`etiqueta`, `titulo`, `descripcion`) o con las
 * ranuras `mupaCardMedia`, `mupaCardHeader`, contenido por defecto,
 * `mupaCardFooter` y `mupaCardActions`.
 *
 * Los valores visuales provienen del Lego Design System — Alcaldía de Panamá
 * y de la anatomía común de las tarjetas del sistema (servicio, KPI,
 * testimonio y web).
 */
@Component({
  selector: 'mupa-card',
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #superficie>
      <div
        class="mupa-card__layout"
        [class.mupa-card__layout--horizontal]="direccion() === 'horizontal'"
        [class.mupa-card__layout--media-completa]="mediaCompleta()"
      >
        <div class="mupa-card__media" [class.mupa-card__media--vacio]="!media()">
          <ng-content select="[mupaCardMedia]" />
        </div>

        <div class="mupa-card__cuerpo-exterior">
          <div class="mupa-card__cuerpo">
            <div class="mupa-card__header" [class.mupa-card__header--vacio]="!header()">
              <ng-content select="[mupaCardHeader]" />
            </div>

            @if (etiqueta() || titulo() || descripcion()) {
              <div class="mupa-card__texto">
                @if (etiqueta()) {
                  <span class="mupa-card__etiqueta">{{ etiqueta() }}</span>
                }

                @if (titulo()) {
                  @if (tipo() === 'boton') {
                    <span class="mupa-card__titulo">{{ titulo() }}</span>
                  } @else {
                    @switch (nivelTitulo()) {
                      @case (2) {
                        <h2 class="mupa-card__titulo">{{ titulo() }}</h2>
                      }
                      @case (3) {
                        <h3 class="mupa-card__titulo">{{ titulo() }}</h3>
                      }
                      @case (4) {
                        <h4 class="mupa-card__titulo">{{ titulo() }}</h4>
                      }
                      @case (5) {
                        <h5 class="mupa-card__titulo">{{ titulo() }}</h5>
                      }
                      @case (6) {
                        <h6 class="mupa-card__titulo">{{ titulo() }}</h6>
                      }
                    }
                  }
                }

                @if (descripcion()) {
                  <span class="mupa-card__descripcion">{{ descripcion() }}</span>
                }
              </div>
            }

            <div class="mupa-card__contenido">
              <ng-content />
            </div>

            <div class="mupa-card__footer" [class.mupa-card__footer--vacio]="!footer()">
              <ng-content select="[mupaCardFooter]" />
            </div>
          </div>

          <div class="mupa-card__acciones" [class.mupa-card__acciones--vacio]="!acciones()">
            <ng-content select="[mupaCardActions]" />
          </div>
        </div>
      </div>
    </ng-template>

    @switch (tipo()) {
      @case ('ancla') {
        <a
          [class]="clases()"
          [attr.href]="deshabilitada() ? null : href()"
          [attr.target]="tieneHref() ? target() : null"
          [attr.rel]="tieneHref() && target() === '_blank' ? 'noopener noreferrer' : null"
          [attr.aria-label]="etiquetaAria() ?? null"
          [attr.aria-disabled]="deshabilitada() ? 'true' : null"
          [attr.tabindex]="deshabilitada() ? -1 : null"
          (click)="alHacerClic($event)"
        >
          <ng-container *ngTemplateOutlet="superficie" />
        </a>
      }
      @case ('boton') {
        <button
          type="button"
          [class]="clases()"
          [disabled]="deshabilitada()"
          [attr.aria-label]="etiquetaAria() ?? null"
          [attr.aria-disabled]="deshabilitada() ? 'true' : null"
          [attr.aria-pressed]="seleccionable() ? seleccionada() : null"
          (click)="alHacerClic($event)"
        >
          <ng-container *ngTemplateOutlet="superficie" />
        </button>
      }
      @default {
        <article
          [class]="clases()"
          [attr.aria-label]="etiquetaAria() ?? null"
          [attr.aria-disabled]="deshabilitada() ? 'true' : null"
        >
          <ng-container *ngTemplateOutlet="superficie" />
        </article>
      }
    }
  `,
  styleUrl: './card.component.css',
})
export class MupaCard {
  private readonly mediaProyectada = contentChild(MupaCardMediaDirective);
  private readonly headerProyectado = contentChild(MupaCardHeaderDirective);
  private readonly footerProyectado = contentChild(MupaCardFooterDirective);
  private readonly accionesProyectadas = contentChild(MupaCardActionsDirective);

  /** URL de navegación. Convierte la tarjeta en un ancla. */
  readonly href = input<string>();

  /** Destino del ancla. Con `_blank` se añade `rel="noopener noreferrer"`. */
  readonly target = input<string>();

  /** Convierte la tarjeta en un botón interactivo. */
  readonly interactiva = input(false, { transform: booleanAttribute });

  /** Bloquea la interacción y aplica el estado visual deshabilitado. */
  readonly deshabilitada = input(false, { transform: booleanAttribute });

  /** Convierte la tarjeta en un botón seleccionable con `aria-pressed`. */
  readonly seleccionable = input(false, { transform: booleanAttribute });

  /** Estado seleccionado. Admite `[(seleccionada)]`. */
  readonly seleccionada = model(false);

  /** Nombre accesible de la tarjeta. */
  readonly etiquetaAria = input<string>();

  /**
   * Fuerza un estado visual para vitrinas y documentación.
   *
   * No cambia la interacción real; en producción usa las pseudo-clases.
   */
  readonly estadoVisual = input<EstadoVisualCard>('auto');

  /** Dirección del layout interno. */
  readonly direccion = input<DireccionCard>('vertical');

  /** Radio de la superficie. */
  readonly radio = input<RadioCard>('card');

  /** Relleno interno, con los valores de las tarjetas del sistema. */
  readonly espaciado = input<EspaciadoCard>('md');

  /** Grosor del borde. */
  readonly borde = input<BordeCard>('fino');

  /** Elevación de la superficie. */
  readonly sombra = input<SombraCard>('sm');

  /** Hace que la media ocupe todo el ancho, sin relleno lateral. */
  readonly mediaCompleta = input(false, { transform: booleanAttribute });

  /** Aplica el fondo azul claro al pasar el cursor. */
  readonly tinteHover = input(false, { transform: booleanAttribute });

  /** Reduce la tarjeta al 98 % mientras se pulsa. */
  readonly escalaPresionada = input(false, { transform: booleanAttribute });

  /** Resalta con borde azul claro las tarjetas no interactivas. */
  readonly resaltarAlPasar = input(false, { transform: booleanAttribute });

  /** Etiqueta de conveniencia sobre el título. */
  readonly etiqueta = input<string>();

  /** Título de conveniencia. */
  readonly titulo = input<string>();

  /** Descripción de conveniencia. */
  readonly descripcion = input<string>();

  /** Nivel del título accesible cuando la tarjeta no es un botón. */
  readonly nivelTitulo = input<NivelTituloCard>(3, {
    transform: normalizarNivelTitulo,
  });

  /** Emitido al activar un ancla o un botón. */
  readonly clic = output<MouseEvent>();

  protected readonly media = this.mediaProyectada;
  protected readonly header = this.headerProyectado;
  protected readonly footer = this.footerProyectado;
  protected readonly acciones = this.accionesProyectadas;

  protected readonly tieneHref = computed(() => typeof this.href() === 'string');

  protected readonly tipo = computed<TipoSuperficieCard>(() => {
    if (this.seleccionable()) return 'boton';
    if (this.tieneHref()) return 'ancla';
    if (this.interactiva()) return 'boton';
    return 'articulo';
  });

  protected readonly clases = computed(() =>
    [
      'mupa-card',
      this.direccion() === 'horizontal' ? 'mupa-card--horizontal' : '',
      `mupa-card--radio-${this.radio()}`,
      `mupa-card--espaciado-${this.espaciado()}`,
      `mupa-card--borde-${this.borde()}`,
      `mupa-card--sombra-${this.sombra()}`,
      this.mediaCompleta() ? 'mupa-card--media-completa' : '',
      this.tinteHover() ? 'mupa-card--tinte-hover' : '',
      this.escalaPresionada() ? 'mupa-card--escala-presionada' : '',
      this.resaltarAlPasar() ? 'mupa-card--resaltar' : '',
      this.tipo() !== 'articulo' ? 'mupa-card--interactiva' : '',
      this.seleccionable() ? 'mupa-card--seleccionable' : '',
      this.seleccionable() && this.seleccionada() ? 'mupa-card--seleccionada' : '',
      this.deshabilitada() ? 'mupa-card--deshabilitada' : '',
      this.estadoVisual() !== 'auto' ? `mupa-card--estado-${this.estadoVisual()}` : '',
      this.estadoVisual() !== 'auto' ? 'mupa-card--estado-forzado' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected alHacerClic(evento: MouseEvent): void {
    if (this.deshabilitada()) {
      evento.preventDefault();
      return;
    }

    if (this.seleccionable()) {
      this.seleccionada.set(!this.seleccionada());
    }

    this.clic.emit(evento);
  }
}
