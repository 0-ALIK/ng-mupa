import { booleanAttribute, Component, computed, input, output } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import { TONOS_TOAST, type AccionToast, type TonoToast } from './toast.types';

/**
 * Tarjeta de notificación del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: superficie blanca, radio de 16 px,
 * barra lateral de tono, icono en contenedor, título, descripción y acción.
 */
@Component({
  selector: 'mupa-toast',
  imports: [MupaIcon],
  template: `
    <div
      class="mupa-toast"
      [attr.role]="tono() === 'error' ? 'alert' : 'status'"
      [attr.aria-live]="tono() === 'error' ? 'assertive' : 'polite'"
    >
      <span
        class="mupa-toast__barra"
        aria-hidden="true"
        [style.background]="configuracion().barra"
      ></span>

      <div class="mupa-toast__contenido">
        <div
          class="mupa-toast__icono"
          [style.background]="configuracion().fondo"
          [style.border-color]="configuracion().borde"
        >
          <mupa-icon
            [nombre]="configuracion().icono"
            [tamano]="18"
            [color]="configuracion().texto"
          />
        </div>

        <div class="mupa-toast__texto">
          <div class="mupa-toast__titulo">{{ titulo() }}</div>

          @if (descripcion()) {
            <div class="mupa-toast__descripcion">{{ descripcion() }}</div>
          }

          @if (accion(); as accionActual) {
            <button type="button" class="mupa-toast__accion" (click)="activarAccion(accionActual)">
              {{ accionActual.etiqueta }}
            </button>
          }
        </div>

        @if (descartable()) {
          <button
            type="button"
            class="mupa-toast__cerrar"
            aria-label="Cerrar notificación"
            (click)="cerrar.emit()"
          >
            <mupa-icon nombre="x" [tamano]="16" />
          </button>
        }
      </div>

      @if (progreso() !== undefined) {
        <span
          class="mupa-toast__progreso"
          aria-hidden="true"
          [style.background]="configuracion().barra"
          [style.width]="anchoProgreso()"
        ></span>
      }
    </div>
  `,
  styleUrl: './toast.component.css',
})
export class MupaToast {
  /** Tono visual de la notificación. */
  readonly tono = input<TonoToast>('info');

  /** Título de la notificación. */
  readonly titulo = input.required<string>();

  /** Texto descriptivo opcional. */
  readonly descripcion = input<string>();

  /** Acción de texto opcional. */
  readonly accion = input<AccionToast>();

  /** Muestra el botón de cierre. */
  readonly descartable = input(true, { transform: booleanAttribute });

  /** Progreso de cierre automático entre 0 y 1. */
  readonly progreso = input<number>();

  /** Emitido al cerrar la notificación. */
  readonly cerrar = output<void>();

  /** Emitido al activar la acción de texto. */
  readonly accionClic = output<void>();

  protected readonly configuracion = computed(() => TONOS_TOAST[this.tono()] ?? TONOS_TOAST.info);

  protected readonly anchoProgreso = computed(() => {
    const valor = Math.max(0, Math.min(1, this.progreso() ?? 0));
    return `calc((100% - 6px) * ${valor})`;
  });

  protected activarAccion(accion: AccionToast): void {
    accion.alHacerClic?.();
    this.accionClic.emit();
  }
}
