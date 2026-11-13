import type { TemplateRef } from '@angular/core';

/** Sentido del desplazamiento del logo loop. */
export type DireccionLogoLoop = 'izquierda' | 'derecha' | 'arriba' | 'abajo';

/** Lado del degradado del logo loop. */
export type LadoLogoLoop = 'izquierda' | 'derecha' | 'arriba' | 'abajo';

/** Item de imagen del logo loop. */
export interface ItemImagenLogoLoop {
  src: string;
  alt?: string;
  titulo?: string;
  href?: string;
  ancho?: number;
  alto?: number;
}

/** Item de plantilla del logo loop. */
export interface ItemPlantillaLogoLoop {
  plantilla: TemplateRef<unknown>;
  contexto?: unknown;
  titulo?: string;
  etiquetaAria?: string;
  href?: string;
}

/** Item del logo loop: imagen o plantilla. */
export type ItemLogoLoop = ItemImagenLogoLoop | ItemPlantillaLogoLoop;
