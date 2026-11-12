/** Dirección del layout interno de la tarjeta. */
export type DireccionCard = 'vertical' | 'horizontal';

/** Radio de la superficie: `card` = 16 px, `sm` = 8 px. */
export type RadioCard = 'card' | 'sm';

/**
 * Relleno interno de la tarjeta.
 *
 * Los valores reproducen los paddings de las tarjetas del sistema original:
 * servicio `14px 16px 16px`, trámite `20px 18px` y tarjeta web `22px`.
 */
export type EspaciadoCard = 'ninguno' | 'sm' | 'md' | 'lg';

/** Grosor del borde: 1 px (`fino`) o 1.5 px (`grueso`). */
export type BordeCard = 'ninguno' | 'fino' | 'grueso';

/** Elevación de la superficie. */
export type SombraCard = 'ninguna' | 'sutil' | 'sm';

/**
 * Estado visual forzado para vitrinas y documentación.
 *
 * En producción los estados se activan con las pseudo-clases del navegador.
 * `auto` desactiva el forzado.
 */
export type EstadoVisualCard = 'auto' | 'hover' | 'pressed' | 'focus';

/** Nivel del título accesible de la tarjeta. */
export type NivelTituloCard = 2 | 3 | 4 | 5 | 6;
