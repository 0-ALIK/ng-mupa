export type ColorPill =
  | 'cyan'
  | 'purple'
  | 'lime'
  | 'brown'
  | 'coral'
  | 'blue'
  | 'slate'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type DisenoPill = 'relleno' | 'solido' | 'contorno';

export type TamanoPill = 'sm' | 'md';

export interface ConfiguracionColorPill {
  fondo: string;
  texto: string;
  borde: string;
}

/** Colores de categoría, estado y variantes del sistema original. */
export const COLORES_PILL: Record<ColorPill, ConfiguracionColorPill> = {
  cyan: {
    fondo: 'var(--color-cyan-100)',
    texto: 'var(--color-cyan-700)',
    borde: 'var(--color-cyan-200)',
  },
  purple: {
    fondo: 'var(--color-purple-100)',
    texto: 'var(--color-purple-700)',
    borde: 'var(--color-purple-200)',
  },
  lime: {
    fondo: 'var(--color-lime-100)',
    texto: 'var(--color-lime-700)',
    borde: 'var(--color-lime-200)',
  },
  brown: {
    fondo: 'var(--color-brown-100)',
    texto: 'var(--color-brown-700)',
    borde: 'var(--color-brown-200)',
  },
  coral: {
    fondo: 'var(--color-coral-100)',
    texto: 'var(--color-coral-700)',
    borde: 'var(--color-coral-200)',
  },
  blue: {
    fondo: 'var(--color-primary-50)',
    texto: 'var(--color-primary-700)',
    borde: 'var(--color-primary-200)',
  },
  slate: {
    fondo: 'var(--color-neutral-100)',
    texto: 'var(--color-neutral-600)',
    borde: 'var(--color-neutral-200)',
  },
  success: {
    fondo: 'var(--color-success-100)',
    texto: 'var(--color-success-700)',
    borde: 'var(--color-success-300)',
  },
  warning: {
    fondo: 'var(--color-warning-100)',
    texto: 'var(--color-warning-700)',
    borde: 'var(--color-warning-300)',
  },
  error: {
    fondo: 'var(--color-error-100)',
    texto: 'var(--color-error-700)',
    borde: 'var(--color-error-300)',
  },
  info: {
    fondo: 'var(--color-info-100)',
    texto: 'var(--color-info-700)',
    borde: 'var(--color-secondary-300)',
  },
};

export const CONFIGURACION_SOLIDA: ConfiguracionColorPill = {
  fondo: 'var(--color-primary-500)',
  texto: '#FFFFFF',
  borde: 'var(--color-primary-600)',
};

export const CONFIGURACION_CONTORNO: ConfiguracionColorPill = {
  fondo: 'var(--bg-surface)',
  texto: 'var(--fg-default)',
  borde: 'var(--border-default)',
};
