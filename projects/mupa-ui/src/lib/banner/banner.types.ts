/** Tonos semánticos de `mupa-banner`. */
export type TonoBanner = 'info' | 'success' | 'warning' | 'error';

export interface ConfiguracionTonoBanner {
  fondo: string;
  acento: string;
  texto: string;
  icono: string;
}

/** Tonos copiados del Lego Design System — Alcaldía de Panamá. */
export const TONOS_BANNER: Record<TonoBanner, ConfiguracionTonoBanner> = {
  info: {
    fondo: 'var(--color-info-100)',
    acento: 'var(--color-primary-500)',
    texto: 'var(--color-primary-800)',
    icono: 'info',
  },
  success: {
    fondo: 'var(--color-success-100)',
    acento: 'var(--color-success-500)',
    texto: 'var(--color-success-700)',
    icono: 'circle-check',
  },
  warning: {
    fondo: 'var(--color-warning-100)',
    acento: 'var(--color-warning-500)',
    texto: 'var(--color-warning-700)',
    icono: 'circle-alert',
  },
  error: {
    fondo: 'var(--color-error-100)',
    acento: 'var(--color-error-500)',
    texto: 'var(--color-error-700)',
    icono: 'circle-x',
  },
};
