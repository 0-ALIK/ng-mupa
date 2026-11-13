/** Opciones de una explosión de confeti. */
export interface OpcionesConfeti {
  /** Cantidad de piezas. Default 120. */
  cantidadParticulas?: number;
  /** Ancho del cono en grados. Default 70. */
  dispersion?: number;
  /** Ángulo de lanzamiento en grados (90 = arriba). Default 90. */
  angulo?: number;
  /** Velocidad inicial en px/frame. Default 13. */
  velocidadInicial?: number;
  /** Origen como fracción del viewport (0–1). Default centro del disparador. */
  origen?: { x: number; y: number };
  /** Colores de las piezas. Default paleta Lego. */
  colores?: readonly string[];
}

/** Variante visual del botón de confeti. */
export type VarianteBotonConfeti = 'primario' | 'secundario';
