/** Porción de un gráfico circular o de dona. */
export interface PorcionPieChart {
  clave: string;
  etiqueta: string;
  valor: number;
  color?: string;
}

export type ListaEtiquetasPie = 'etiqueta' | 'valor' | 'porcentaje';
