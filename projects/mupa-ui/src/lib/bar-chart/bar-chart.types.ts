/** Serie de un gráfico de barras. */
export interface SerieBarChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

/** Fila de datos de un gráfico de barras. */
export interface DatoBarChart {
  [clave: string]: number | string;
}
