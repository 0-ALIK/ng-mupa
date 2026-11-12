export type RegistroTabla = Record<string, unknown>;

export type TipoColumnaTabla = 'texto' | 'mono' | 'estado' | 'atenuado';

export type AlineacionColumnaTabla = 'left' | 'right' | 'center';

export type TonoEstadoTabla = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface ColumnaTabla {
  clave: string;
  encabezado: string;
  tipo?: TipoColumnaTabla;
  ancho?: number | string;
  alineacion?: AlineacionColumnaTabla;
  ordenable?: boolean;
  /** Nombre de la plantilla registrada con `mupaTemplate`. */
  plantilla?: string;
}

export interface AccionTabla {
  icono: string;
  etiqueta: string;
  tono?: 'default' | 'danger';
  alHacerClic?: (fila: RegistroTabla) => void;
}

export interface ConfiguracionEstadoTabla {
  fondo: string;
  borde: string;
  texto: string;
  punto: string;
}

/** Tonos de estado copiados del Lego Design System — Alcaldía de Panamá. */
export const TONOS_ESTADO_TABLA: Record<TonoEstadoTabla, ConfiguracionEstadoTabla> = {
  success: {
    fondo: 'var(--color-success-100)',
    borde: 'var(--color-success-300)',
    texto: 'var(--color-success-700)',
    punto: 'var(--color-success-500)',
  },
  warning: {
    fondo: 'var(--color-warning-100)',
    borde: 'var(--color-warning-300)',
    texto: 'var(--color-warning-700)',
    punto: 'var(--color-warning-500)',
  },
  error: {
    fondo: 'var(--color-error-100)',
    borde: 'var(--color-error-300)',
    texto: 'var(--color-error-700)',
    punto: 'var(--color-error-500)',
  },
  info: {
    fondo: 'var(--color-info-100)',
    borde: 'var(--color-secondary-300)',
    texto: 'var(--color-primary-700)',
    punto: 'var(--color-primary-500)',
  },
  neutral: {
    fondo: 'var(--color-neutral-100)',
    borde: 'var(--color-neutral-200)',
    texto: 'var(--fg-default)',
    punto: 'var(--color-neutral-400)',
  },
};

/** Mapa de estados por defecto del original. */
export const TONOS_ESTADO_POR_DEFECTO: Readonly<Record<string, TonoEstadoTabla>> = {
  Activo: 'success',
  Aprobado: 'success',
  Pendiente: 'warning',
  'En revisión': 'warning',
  'En proceso': 'info',
  Dañado: 'error',
  Rechazado: 'error',
  Legal: 'info',
  Inactivo: 'neutral',
};
