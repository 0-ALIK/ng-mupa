import { booleanAttribute, Component, computed, input } from '@angular/core';

/**
 * Barra de progreso simple.
 *
 * Réplica del patrón `.prog` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-progress',
  template: `
    <div class="mupa-progress">
      @if (etiqueta() || mostrarValor()) {
        <div class="mupa-progress__cabecera">
          @if (etiqueta()) {
            <span class="mupa-progress__etiqueta">{{ etiqueta() }}</span>
          }
          @if (mostrarValor()) {
            <span class="mupa-progress__valor">{{ valorFormateado() }}</span>
          }
        </div>
      }

      <div
        class="mupa-progress__pista"
        role="progressbar"
        [attr.aria-label]="etiqueta() ?? ariaLabel() ?? null"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="maximo()"
        [attr.aria-valuenow]="valorLimitado()"
      >
        <span class="mupa-progress__relleno" [style.width.%]="porcentaje()"></span>
      </div>
    </div>
  `,
  styleUrl: './progress.component.css',
})
export class MupaProgress {
  /** Valor actual de la barra. */
  readonly valor = input(0);

  /** Valor máximo de la escala. */
  readonly maximo = input(100);

  /** Etiqueta visible sobre la barra. */
  readonly etiqueta = input<string>();

  /** Nombre accesible cuando no hay etiqueta visible. */
  readonly ariaLabel = input<string>();

  /** Muestra el porcentaje a la derecha de la etiqueta. */
  readonly mostrarValor = input(false, { transform: booleanAttribute });

  /** Locale para formatear el porcentaje. */
  readonly locale = input('es-PA');

  protected readonly valorLimitado = computed(() =>
    Math.min(Math.max(0, this.valor()), Math.max(1, this.maximo())),
  );

  protected readonly porcentaje = computed(
    () => (this.valorLimitado() / Math.max(1, this.maximo())) * 100,
  );

  protected readonly valorFormateado = computed(() =>
    new Intl.NumberFormat(this.locale(), {
      style: 'percent',
      maximumFractionDigits: 0,
    }).format(this.porcentaje() / 100),
  );
}
