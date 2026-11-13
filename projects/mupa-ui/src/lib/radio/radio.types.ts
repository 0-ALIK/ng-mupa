/** Opción de un grupo de radio. */
export interface OpcionRadio {
  valor: string;
  etiqueta: string;
  descripcion?: string;
  icono?: string;
  deshabilitada?: boolean;
}

/** Apariencia del grupo de radio. */
export type VarianteRadio = 'simple' | 'tarjeta';

/** Disposición de las opciones. */
export type OrientacionRadio = 'vertical' | 'horizontal';
