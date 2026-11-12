/** Fase del `mupa-lattice-loader`. */
export type EstadoLattice = 'working' | 'done' | 'error';

/** Forma de las celdas de la retícula. */
export type FormaLattice = 'round' | 'square';

export type NombrePatronLattice =
  'arrow' | 'dots' | 'ripple' | 'spiral' | 'orbit' | 'snake' | 'sweep' | 'spin' | 'rain' | 'pulse';

export interface DefinicionPatronLattice {
  cells: readonly (number | null)[];
  loop: number;
  scale?: number;
  lit?: number;
}

/** Nombre de patrón o definición personalizada. */
export type PatronLattice = NombrePatronLattice | DefinicionPatronLattice;

/**
 * Patrones y marcas copiados del Lego Design System — Alcaldía de Panamá.
 */
export const PATRONES_LATTICE: Record<
  NombrePatronLattice,
  Partial<Record<3 | 4, DefinicionPatronLattice>>
> = {
  arrow: {
    3: { cells: [1, 2, 3, 0, 1, 2, 1, 2, 3], loop: 7.2, scale: 1 },
  },
  dots: {
    3: { cells: [0, 1, 2, 0, 1, 2, 0, 1, 2], loop: 3, scale: 2.4 },
  },
  ripple: {
    3: { cells: [2, 1, 2, 1, 0, 1, 2, 1, 2], loop: 4.8, scale: 1.5 },
  },
  spiral: {
    3: {
      cells: [0, 1, 2, 7, 8, 3, 6, 5, 4],
      loop: 9,
      scale: 1.2,
      lit: 0.35,
    },
  },
  orbit: {
    3: {
      cells: [0, 1, 2, 7, null, 3, 6, 5, 4],
      loop: 8,
      scale: 1.2,
    },
    4: {
      cells: [0, 1, 2, 3, 11, null, null, 4, 10, null, null, 5, 9, 8, 7, 6],
      loop: 6,
      scale: 1.2,
      lit: 0.45,
    },
  },
  snake: {
    3: {
      cells: [0, 1, 2, 5, 4, 3, 6, 7, 8],
      loop: 9,
      scale: 1,
      lit: 0.35,
    },
    4: {
      cells: [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11, 15, 14, 13, 12],
      loop: 16,
      scale: 1,
      lit: 0.25,
    },
  },
  sweep: {
    4: {
      cells: [0, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6],
      loop: 5,
      scale: 1,
      lit: 0.45,
    },
  },
  spin: {
    4: {
      cells: [0, 0, 1, 1, 0, 0, 1, 1, 3, 3, 2, 2, 3, 3, 2, 2],
      loop: 4,
      scale: 1.6,
      lit: 0.35,
    },
  },
  rain: {
    4: {
      cells: [0, 2, 1, 3, 1, 3, 2, 4, 2, 4, 3, 5, 3, 5, 4, 6],
      loop: 4,
      scale: 1.2,
      lit: 0.35,
    },
  },
  pulse: {
    4: {
      cells: [2, 1, 1, 2, 1, 0, 0, 1, 1, 0, 0, 1, 2, 1, 1, 2],
      loop: 2.4,
      scale: 2.5,
      lit: 0.45,
    },
  },
};

export const PATRONES_POR_CUADRICULA: Readonly<Record<3 | 4, readonly NombrePatronLattice[]>> = {
  3: ['arrow', 'dots', 'ripple', 'spiral', 'orbit', 'snake'],
  4: ['orbit', 'snake', 'sweep', 'spin', 'rain', 'pulse'],
};

export const ETIQUETAS_PATRON_LATTICE: Readonly<Record<NombrePatronLattice, string>> = {
  arrow: 'Flecha',
  dots: 'Puntos',
  ripple: 'Onda',
  spiral: 'Espiral',
  orbit: 'Órbita',
  snake: 'Serpiente',
  sweep: 'Barrido',
  spin: 'Giro',
  rain: 'Lluvia',
  pulse: 'Pulso',
};

export const MARCAS_LATTICE = {
  3: {
    done: [2, 3, 5, 7],
    error: [0, 2, 4, 6, 8],
  },
  4: {
    done: [7, 8, 10, 13],
    error: [0, 3, 5, 6, 9, 10, 12, 15],
  },
} as const;
