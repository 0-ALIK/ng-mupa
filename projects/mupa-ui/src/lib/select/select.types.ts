export interface OpcionSelect {
  /** Texto visible de la opción. */
  etiqueta: string;
  /** Valor de la opción. `null` identifica el elemento de marcador. */
  valor: string | null;
  /** Deshabilita la opción. */
  deshabilitada?: boolean;
}

export interface GrupoSelect {
  /** Título del grupo. */
  etiqueta?: string;
  opciones: OpcionSelect[];
}
