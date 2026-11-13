/** Serie de un gráfico de líneas. */
export interface SerieLineChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

/** Fila de datos de un gráfico de líneas. */
export interface DatoLineChart {
  date: string;
  [clave: string]: number | string;
}
