/** Serie de un gráfico de radar. */
export interface SerieRadarChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

/** Fila de datos de un gráfico de radar. */
export interface DatoRadarChart {
  [clave: string]: number | string;
}

export type CuadriculaRadar = 'polygon' | 'circle';
