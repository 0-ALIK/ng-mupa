/** Lado del hilo de conversación. */
export type AlineacionBurbuja = 'start' | 'end';

/** Variantes visuales de una burbuja. */
export type VarianteBurbuja = 'plain' | 'primary' | 'muted' | 'outline';

/** Posición de una burbuja dentro de un grupo. */
export type PosicionBurbuja = 'single' | 'first' | 'middle' | 'last';

export type AnchoBurbuja = number | string;

export interface ConfiguracionVarianteBurbuja {
  fondo: string;
  texto: string;
  borde: string;
  enlace: string;
  tamano: number;
  interlineado: number;
}

/** Configuración copiada del Lego Design System — Alcaldía de Panamá. */
export const VARIANTES_BURBUJA: Record<VarianteBurbuja, ConfiguracionVarianteBurbuja> = {
  plain: {
    fondo: 'transparent',
    texto: 'var(--fg-strong)',
    borde: 'transparent',
    enlace: 'var(--color-primary-700)',
    tamano: 16,
    interlineado: 1.6,
  },
  primary: {
    fondo: 'var(--color-primary-900)',
    texto: 'var(--fg-on-brand)',
    borde: 'var(--color-primary-900)',
    enlace: 'var(--fg-on-brand)',
    tamano: 15,
    interlineado: 1.5,
  },
  muted: {
    fondo: 'var(--color-neutral-100)',
    texto: 'var(--fg-strong)',
    borde: 'transparent',
    enlace: 'var(--color-primary-700)',
    tamano: 15,
    interlineado: 1.5,
  },
  outline: {
    fondo: 'var(--bg-surface)',
    texto: 'var(--fg-strong)',
    borde: 'var(--border-default)',
    enlace: 'var(--color-primary-700)',
    tamano: 15,
    interlineado: 1.5,
  },
};

export interface SugerenciaBurbuja {
  etiqueta: string;
  valor?: string;
}

export type ElementoSugerenciaBurbuja = string | SugerenciaBurbuja;
