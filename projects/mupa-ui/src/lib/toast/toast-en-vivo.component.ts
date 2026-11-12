import {
  afterNextRender,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';

import { MupaToast } from './toast.component';
import type { ToastVisible } from './toast.types';

/**
 * Notificación viva del stack: gestiona la animación de entrada y el
 * progreso de cierre automático con pausa al pasar el cursor o recibir foco.
 *
 * Réplica del componente interno `Live` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-toast-en-vivo',
  imports: [MupaToast],
  template: `
    <div
      class="mupa-toast-en-vivo"
      [class.mupa-toast-en-vivo--sin-movimiento]="reducirMovimiento"
      [style.transform]="mostrado() || reducirMovimiento ? 'none' : 'translateX(24px)'"
      [style.opacity]="mostrado() || reducirMovimiento ? 1 : 0"
      (mouseenter)="sobre.set(true)"
      (mouseleave)="sobre.set(false)"
      (focusin)="enfocado.set(true)"
      (focusout)="alPerderFoco($event)"
    >
      <mupa-toast
        [tono]="toast().tono"
        [titulo]="toast().titulo"
        [descripcion]="toast().descripcion ?? undefined"
        [accion]="toast().accion ?? undefined"
        [descartable]="toast().descartable"
        [progreso]="toast().duracion ? progreso() : undefined"
        (cerrar)="cerrar.emit()"
      />
    </div>
  `,
  styleUrl: './toast-en-vivo.component.css',
})
export class MupaToastEnVivo {
  /** Notificación que se muestra. */
  readonly toast = input.required<ToastVisible>();

  /** Emitido al cerrar la notificación. */
  readonly cerrar = output<void>();

  protected readonly progreso = signal(1);
  protected readonly sobre = signal(false);
  protected readonly enfocado = signal(false);
  protected readonly mostrado = signal(false);

  protected readonly pausado = computed(() => this.sobre() || this.enfocado());

  protected readonly reducirMovimiento =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    afterNextRender(() => {
      if (this.reducirMovimiento || typeof requestAnimationFrame === 'undefined') {
        this.mostrado.set(true);
        return;
      }

      requestAnimationFrame(() => this.mostrado.set(true));
    });

    effect((onCleanup) => {
      const toast = this.toast();
      const pausado = this.pausado();

      if (!toast.duracion || pausado) return;
      if (typeof requestAnimationFrame === 'undefined' || typeof performance === 'undefined') {
        return;
      }

      let restante = toast.duracion * untracked(() => this.progreso());
      let ultimo = performance.now();
      let cuadro = 0;

      const paso = (ahora: number): void => {
        restante -= ahora - ultimo;
        ultimo = ahora;
        this.progreso.set(Math.max(0, restante / toast.duracion));

        if (restante <= 0) {
          this.cerrar.emit();
          return;
        }

        cuadro = requestAnimationFrame(paso);
      };

      cuadro = requestAnimationFrame(paso);
      onCleanup(() => cancelAnimationFrame(cuadro));
    });
  }

  protected alPerderFoco(evento: FocusEvent): void {
    const contenedor = evento.currentTarget as HTMLElement | null;
    const siguiente = evento.relatedTarget as Node | null;

    if (!contenedor || !siguiente || !contenedor.contains(siguiente)) {
      this.enfocado.set(false);
    }
  }
}
