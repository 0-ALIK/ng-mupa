/** Elemento de un acordeón. */
export interface ItemAcordeon {
  id: string;
  titulo: string;
  contenido: string;
  abierto?: boolean;
  deshabilitado?: boolean;
}
