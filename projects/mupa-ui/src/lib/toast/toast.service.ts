import { Service, signal } from '@angular/core';

import type { OpcionesToast, ToastVisible } from './toast.types';

/**
 * Almacén de notificaciones.
 *
 * Equivalente al `Toaster` con estado global del Lego Design System — Alcaldía de Panamá:
 * `mostrar()` agrega una notificación y devuelve un id; `cerrar()` la elimina.
 */
@Service()
export class MupaToastService {
  private readonly _toasts = signal<readonly ToastVisible[]>([]);

  /** Notificaciones activas. */
  readonly toasts = this._toasts.asReadonly();

  private secuencia = 0;

  /** Agrega una notificación y devuelve su identificador. */
  mostrar(opciones: OpcionesToast): number {
    const id = ++this.secuencia;
    const tono = opciones.tono ?? 'info';
    const duracion = opciones.duracion ?? (opciones.accion ? 0 : tono === 'error' ? 8000 : 5000);

    const toast: ToastVisible = {
      id,
      tono,
      titulo: opciones.titulo,
      descripcion: opciones.descripcion,
      accion: opciones.accion,
      descartable: opciones.descartable ?? true,
      duracion,
    };

    this._toasts.update((lista) => [...lista, toast]);
    return id;
  }

  /** Cierra una notificación por identificador. */
  cerrar(id: number): void {
    this._toasts.update((lista) => lista.filter((toast) => toast.id !== id));
  }

  /** Cierra todas las notificaciones activas. */
  cerrarTodos(): void {
    this._toasts.set([]);
  }
}
