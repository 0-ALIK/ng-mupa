import { InjectionToken, type Signal } from '@angular/core';

import type { AlineacionBurbuja, VarianteBurbuja } from './bubble.types';

/**
 * Contexto que comparte `mupa-bubble` con su contenido proyectado.
 *
 * `mupa-bubble-content` lo consume para ajustar tipografía y color de enlace.
 */
export interface ContextoBurbuja {
  readonly alineacion: Signal<AlineacionBurbuja>;
  readonly varianteResuelta: Signal<VarianteBurbuja>;
}

export const CONTEXTO_BURBUJA = new InjectionToken<ContextoBurbuja>('ContextoBurbuja');
