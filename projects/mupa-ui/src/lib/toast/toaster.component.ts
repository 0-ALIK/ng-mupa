import { Component, computed, inject, input } from '@angular/core';

import { MupaToastEnVivo } from './toast-en-vivo.component';
import { MupaToastService } from './toast.service';

/**
 * Pila de notificaciones del sistema de diseño.
 *
 * Se monta una vez por aplicación. Réplica de `Toaster` en el
 * Lego Design System — Alcaldía de Panamá: posición fija arriba a la derecha,
 * máximo de notificaciones visibles y apilado en orden inverso.
 */
@Component({
  selector: 'mupa-toaster',
  imports: [MupaToastEnVivo],
  template: `
    <section
      class="mupa-toaster"
      aria-label="Notificaciones"
      [style.top.px]="desplazamiento()"
      [style.right.px]="desplazamiento()"
      [style.left.px]="desplazamiento()"
    >
      @for (toast of visibles(); track toast.id) {
        <mupa-toast-en-vivo [toast]="toast" (cerrar)="servicio.cerrar(toast.id)" />
      }
    </section>
  `,
  styleUrl: './toaster.component.css',
})
export class MupaToaster {
  protected readonly servicio = inject(MupaToastService);

  /** Máximo de notificaciones visibles a la vez. */
  readonly maximo = input(4);

  /** Separación en píxeles respecto al borde superior y lateral. */
  readonly desplazamiento = input(24);

  protected readonly visibles = computed(() =>
    this.servicio.toasts().slice(-this.maximo()).reverse(),
  );
}
