/** Tonos de un segmento de distribución. */
export type TonoDistribucion = 'primary' | 'success' | 'error' | 'warning' | 'neutral';

/** Categoría excluyente de una barra de distribución. */
export interface ItemDistribucion {
  id: string;
  etiqueta: string;
  valor: number;
  tono?: TonoDistribucion;
}
