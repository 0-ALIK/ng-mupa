export type TonoToast = 'success' | 'info' | 'warning' | 'error';

export interface AccionToast {
  /** Texto del enlace de acción. */
  etiqueta: string;
  /** Función opcional que se ejecuta al pulsar la acción. */
  alHacerClic?: () => void;
}

export interface OpcionesToast {
  /** Tono visual. Por defecto `info`. */
  tono?: TonoToast;
  /** Título de la notificación. */
  titulo: string;
  /** Texto descriptivo opcional. */
  descripcion?: string;
  /** Acción de texto opcional. */
  accion?: AccionToast;
  /** Muestra el botón de cierre. Por defecto `true`. */
  descartable?: boolean;
  /** Milisegundos antes del cierre automático. 0 = permanece abierta. */
  duracion?: number;
}

export interface ToastVisible extends OpcionesToast {
  id: number;
  tono: TonoToast;
  descartable: boolean;
  duracion: number;
}

export interface ConfiguracionTonoToast {
  barra: string;
  fondo: string;
  borde: string;
  texto: string;
  icono: string;
}

/** Configuración visual de cada tono, copiada del Lego Design System — Alcaldía de Panamá. */
export const TONOS_TOAST: Record<TonoToast, ConfiguracionTonoToast> = {
  success: {
    barra: 'var(--color-success-500)',
    fondo: 'var(--color-success-100)',
    borde: 'var(--color-success-300)',
    texto: 'var(--color-success-700)',
    icono: 'circle-check',
  },
  info: {
    barra: 'var(--color-primary-500)',
    fondo: 'var(--color-info-100)',
    borde: 'var(--color-secondary-300)',
    texto: 'var(--color-primary-700)',
    icono: 'info',
  },
  warning: {
    barra: 'var(--color-warning-500)',
    fondo: 'var(--color-warning-100)',
    borde: 'var(--color-warning-300)',
    texto: 'var(--color-warning-700)',
    icono: 'triangle-alert',
  },
  error: {
    barra: 'var(--color-error-500)',
    fondo: 'var(--color-error-100)',
    borde: 'var(--color-error-300)',
    texto: 'var(--color-error-700)',
    icono: 'circle-x',
  },
};
