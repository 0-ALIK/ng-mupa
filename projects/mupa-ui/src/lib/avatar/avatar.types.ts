export type EstadoAvatar = 'online' | 'busy' | 'away' | 'offline';

export interface PersonaAvatar {
  /** Nombre completo: se usa para las iniciales y el texto accesible. */
  nombre: string;
  /** URL de la foto. Si falta o falla, se usan las iniciales. */
  src?: string;
  /** Enlace de perfil: envuelve el avatar en un ancla. */
  href?: string;
  /** Punto de presencia. */
  estado?: EstadoAvatar;
}

export interface InfoEstadoAvatar {
  color: string;
  etiqueta: string;
}

/**
 * Colores de presencia definidos literalmente por el componente original
 * del Lego Design System — Alcaldía de Panamá.
 */
export const ESTADOS_AVATAR: Record<EstadoAvatar, InfoEstadoAvatar> = {
  online: { color: '#22A05A', etiqueta: 'En línea' },
  busy: { color: '#E5484D', etiqueta: 'Ocupado' },
  away: { color: '#F5A400', etiqueta: 'Ausente' },
  offline: { color: '#8A97A8', etiqueta: 'Desconectado' },
};

/**
 * Tintes institucionales para las iniciales: fondo, borde y texto.
 * Se eligen de forma determinista a partir del nombre.
 */
export const TINTES_AVATAR: readonly (readonly [string, string, string])[] = [
  ['var(--color-primary-50)', 'var(--color-primary-200)', 'var(--color-primary-700)'],
  ['var(--color-cyan-100)', 'var(--color-cyan-200)', 'var(--color-cyan-700)'],
  ['var(--color-purple-100)', 'var(--color-purple-200)', 'var(--color-purple-700)'],
  ['var(--color-lime-100)', 'var(--color-lime-200)', 'var(--color-lime-700)'],
  ['var(--color-coral-100)', 'var(--color-coral-200)', 'var(--color-coral-700)'],
];
