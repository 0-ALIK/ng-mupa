export type ModoDatePicker = 'single' | 'range';

export interface RangoFechas {
  inicio: Date | null;
  fin: Date | null;
}

export interface CeldaCalendario {
  dia: number;
  atenuada: boolean;
  fecha: Date;
}
