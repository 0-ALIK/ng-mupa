import { booleanAttribute, Component, input, model } from '@angular/core';

/**
 * Interruptor binario.
 *
 * Réplica del patrón `.sw` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-switch',
  template: `
    <button
      type="button"
      class="mupa-switch"
      [class.mupa-switch--activo]="activo()"
      role="switch"
      [attr.aria-checked]="activo()"
      [attr.aria-label]="ariaLabel() ?? null"
      [disabled]="deshabilitado()"
      (click)="alternar()"
    >
      <span class="mupa-switch__pista" aria-hidden="true">
        <span class="mupa-switch__thumb"></span>
      </span>

      @if (etiqueta() || descripcion()) {
        <span class="mupa-switch__texto">
          @if (etiqueta()) {
            <span class="mupa-switch__etiqueta">{{ etiqueta() }}</span>
          }
          @if (descripcion()) {
            <span class="mupa-switch__descripcion">{{ descripcion() }}</span>
          }
        </span>
      }
    </button>
  `,
  styleUrl: './switch.component.css',
})
export class MupaSwitch {
  /** Estado del interruptor. */
  readonly activo = model(false);

  /** Etiqueta visible. */
  readonly etiqueta = input<string>();

  /** Descripción secundaria. */
  readonly descripcion = input<string>();

  /** Nombre accesible cuando no hay etiqueta visible. */
  readonly ariaLabel = input<string>();

  /** Deshabilita la interacción. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  protected alternar(): void {
    if (this.deshabilitado()) return;
    this.activo.update((valor) => !valor);
  }
}
