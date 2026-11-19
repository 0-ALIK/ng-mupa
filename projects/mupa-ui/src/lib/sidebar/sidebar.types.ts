export interface EnlaceSidebar {
  id: string;
  etiqueta: string;
  href: string;
  icono?: string;
  badge?: number | string;
}

export interface RamaSidebar {
  id: string;
  etiqueta: string;
  icono?: string;
  hijos: EnlaceSidebar[];
}

export interface GrupoSidebar {
  id?: string;
  etiqueta?: string;
  items: (EnlaceSidebar | RamaSidebar)[];
}

export interface UsuarioSidebar {
  nombre: string;
  correo?: string;
  avatarSrc?: string;
}

export interface EventoNavegacionSidebar {
  enlace: EnlaceSidebar;
  evento: MouseEvent;
}

/** Ubicación del disparador que abre el cajón de navegación en móvil. */
export type PosicionDisparadorSidebar = 'contenido' | 'flotante' | 'oculto';

/** Distingue una rama con hijos de un enlace simple. */
export function esRamaSidebar(item: EnlaceSidebar | RamaSidebar): item is RamaSidebar {
  return 'hijos' in item;
}
