import { booleanAttribute, Component, computed, input, model } from '@angular/core';

/**
 * Control deslizante (slider).
 *
 * Réplica del patrón `input[type=range]` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-range',
  template: `
    <label class="mupa-range">
      @if (etiqueta() || mostrarValor()) {
        <span class="mupa-range__cabecera">
          @if (etiqueta()) {
            <span class="mupa-range__etiqueta">{{ etiqueta() }}</span>
          }
          @if (mostrarValor()) {
            <span class="mupa-range__valor">{{ valorFormateado() }}</span>
          }
        </span>
      }

      <input
        class="mupa-range__input"
        type="range"
        [min]="minimo()"
        [max]="maximo()"
        [step]="paso()"
        [value]="valor()"
        [disabled]="deshabilitado()"
        [attr.aria-label]="!etiqueta() ? (ariaLabel() ?? null) : null"
        (input)="alCambiar($event)"
      />
    </label>
  `,
  styleUrl: './range.component.css',
})
export class MupaRange {
  /** Valor actual. */
  readonly valor = model(0);

  /** Valor mínimo. */
  readonly minimo = input(0);

  /** Valor máximo. */
  readonly maximo = input(100);

  /** Incremento entre valores. */
  readonly paso = input(1);

  /** Etiqueta visible. */
  readonly etiqueta = input<string>();

  /** Nombre accesible cuando no hay etiqueta visible. */
  readonly ariaLabel = input<string>();

  /** Muestra el valor numérico a la derecha. */
  readonly mostrarValor = input(false, { transform: booleanAttribute });

  /** Deshabilita la interacción. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Locale para formatear el valor. */
  readonly locale = input('es-PA');

  protected readonly valorFormateado = computed(() =>
    new Intl.NumberFormat(this.locale()).format(this.valor()),
  );

  protected alCambiar(evento: Event): void {
    this.valor.set(Number((evento.target as HTMLInputElement).value));
  }
}
