import { Injectable } from '@angular/core';

import type { OpcionesConfeti } from './confetti.types';
import { dispararConfeti } from './confetti.util';

/**
 * Servicio inyectable para lanzar confeti desde cualquier componente.
 *
 * Delega en `dispararConfeti()` y permite sustituirlo en pruebas.
 */
@Injectable({ providedIn: 'root' })
export class MupaConfettiService {
  disparar(opciones?: OpcionesConfeti): void {
    dispararConfeti(opciones);
  }
}
