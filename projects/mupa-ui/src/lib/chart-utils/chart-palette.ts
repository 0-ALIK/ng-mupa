/** Paleta de series de los gráficos cartesianos del sistema. */
export const PALETA_GRAFICOS = ['#0660FF', '#48A9FF', '#7C6AE6', '#0EA5C6'] as const;

/** Paleta de los gráficos circulares y radiales. */
export const PALETA_CIRCULAR = ['#0660FF', '#48A9FF', '#0E225D', '#7C6AE6', '#A4C8FF'] as const;

export function colorDePaleta(indice: number, paleta: readonly string[] = PALETA_GRAFICOS): string {
  return paleta[indice % paleta.length];
}
