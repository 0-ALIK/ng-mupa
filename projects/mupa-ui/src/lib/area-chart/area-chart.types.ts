/** Serie de un gráfico de área. */
export interface SerieAreaChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

/** Rango de tiempo de un gráfico de área. */
export interface RangoAreaChart {
  value: string;
  etiqueta: string;
  days: number;
}

/** Fila de datos de un gráfico de área. */
export interface DatoAreaChart {
  date: string;
  [clave: string]: number | string;
}

export const RANGOS_AREA: readonly RangoAreaChart[] = [
  { value: '90d', etiqueta: 'Últimos 3 meses', days: 90 },
  { value: '30d', etiqueta: 'Últimos 30 días', days: 30 },
  { value: '7d', etiqueta: 'Últimos 7 días', days: 7 },
];
