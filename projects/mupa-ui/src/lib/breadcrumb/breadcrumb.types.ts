export interface ElementoBreadcrumb {
  etiqueta: string;
  href?: string;
  /** Nombre de icono Lucide opcional, por ejemplo `house`. */
  icono?: string;
}

export type SeparadorBreadcrumb = 'chevron-right' | 'slash';

export interface EventoNavegacionBreadcrumb {
  elemento: ElementoBreadcrumb;
  indice: number;
  /** Evento original. Usa `preventDefault()` si el router maneja la ruta. */
  evento: MouseEvent;
}
