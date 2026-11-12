import type { ElementoBreadcrumb } from '../breadcrumb/breadcrumb.types';

export interface AccionPageHeader {
  etiqueta: string;
  icono?: string;
  /** primary = azul relleno (máx. 1); secondary = borde azul. */
  variante?: 'primary' | 'secondary';
  alHacerClic?: () => void;
}

export interface FiltroPageHeader {
  clave: string;
  etiqueta: string;
  /** Conteo opcional mostrado en el chip. */
  conteo?: number;
}

export type MigasPageHeader = readonly ElementoBreadcrumb[];
