import { Directive } from '@angular/core';

/**
 * Marca el contenido multimedia de `mupa-card`.
 *
 * Debe ser hijo directo de la tarjeta. El elemento puede ser un icono, una
 * imagen o un bloque de color; la tarjeta solo controla su posición y, con
 * `mediaCompleta`, su ancho completo.
 */
@Directive({
  selector: '[mupaCardMedia]',
})
export class MupaCardMediaDirective {}

/**
 * Marca la cabecera personalizada de `mupa-card`.
 *
 * Útil para chips de categoría, iconos superiores o menús. Debe ser hijo
 * directo de la tarjeta.
 */
@Directive({
  selector: '[mupaCardHeader]',
})
export class MupaCardHeaderDirective {}

/**
 * Marca el pie de `mupa-card` para metadatos, fechas, ubicaciones o estados.
 *
 * Debe ser hijo directo de la tarjeta.
 */
@Directive({
  selector: '[mupaCardFooter]',
})
export class MupaCardFooterDirective {}

/**
 * Marca la zona de acciones o indicadores de `mupa-card`.
 *
 * Cuando la tarjeta es interactiva, no debe contener otros controles
 * interactivos: la tarjeta completa ya es un enlace o un botón. Debe ser hijo
 * directo de la tarjeta.
 */
@Directive({
  selector: '[mupaCardActions]',
})
export class MupaCardActionsDirective {}
