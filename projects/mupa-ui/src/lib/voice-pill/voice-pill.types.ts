export type FuenteVoz = 'simulated' | 'mic';

export type RazonDetencionVoz =
  | 'tap'
  | 'release'
  | 'key'
  | 'escape'
  | 'cancel'
  | 'blur'
  | 'visibility'
  | 'disabled'
  | 'unmount'
  | 'source-change'
  | 'mic-denied'
  | 'mic-unavailable';

export interface EventoDetencionVoz {
  razon: RazonDetencionVoz;
  /** Duración de la sesión activa en milisegundos; 0 si no se inició. */
  duracion: number;
  fuente: FuenteVoz;
  iniciada: boolean;
  cancelada: boolean;
}

export interface EventoInicioVoz {
  fuente: FuenteVoz;
}

export interface EventoErrorVoz {
  codigo: 'mic-denied' | 'mic-unavailable';
  mensaje: string;
}

export type ModoVoicePill = 'auto' | 'hold' | 'toggle';

export type FormaVoicePill = 'pill' | 'rounded';

export type FaseVoicePill = 'idle' | 'requesting' | 'listening' | 'error';
