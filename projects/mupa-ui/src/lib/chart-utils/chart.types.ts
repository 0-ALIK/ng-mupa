/** Dirección de una tendencia en el pie de un gráfico. */
export type DireccionTendencia = 'up' | 'down';

/** Alineación del encabezado y pie de la tarjeta de gráfico. */
export type AlineacionGrafico = 'inicio' | 'centro';

/** Punto bidimensional usado por las rutas SVG. */
export type PuntoGrafico = readonly [number, number];

/** Fila de datos de un gráfico. */
export type RegistroGrafico = object;

export interface ColumnaDatosGrafico {
  clave: string;
  etiqueta: string;
}

export type TipoMarcadorTooltip = 'punto' | 'linea' | 'barra';

export interface FilaTooltipGrafico {
  color: string;
  etiqueta: string;
  valor: string;
  marcador?: TipoMarcadorTooltip;
}

export type TipoMarcadorLeyenda = 'cuadro' | 'punto';

export interface ElementoLeyendaGrafico {
  color: string;
  etiqueta: string;
}
