/** Elemento de un menú. */
export interface ItemMenu {
  id: string;
  etiqueta: string;
  icono?: string;
  activo?: boolean;
  deshabilitado?: boolean;
  /** Opcional. Si existe, el ítem se renderiza como enlace. */
  href?: string;
}

/** Grupo de elementos de un menú. */
export interface GrupoMenu {
  etiqueta?: string;
  items: readonly ItemMenu[];
}
