/** Elemento de un ranking de `mupa-bar-list`. */
export interface ItemBarList {
  etiqueta: string;
  valor: number;
  /** Texto preformateado a la derecha; si se omite, se usa el número. */
  texto?: string;
  /** Nombre de icono Lucide opcional antes de la etiqueta. */
  icono?: string;
}
