import type {
  DatoAreaChart,
  DatoBarChart,
  DatoLineChart,
  DatoLineChartLabel,
  ItemBarList,
  ItemDistribucion,
  ItemRadialChart,
  PorcionPieChart,
  DatoRadarChart,
} from 'mupa-ui';

function iso(fecha: Date): string {
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(fecha.getDate()).padStart(2, '0')}`;
}

/** Datos exactos del ejemplo Área — interactivo. */
export function generarDatosArea(): DatoAreaChart[] {
  const datos: DatoAreaChart[] = [];
  const inicio = new Date(2026, 6, 1);
  let semilla = 7;
  const aleatorio = () => {
    semilla = (semilla * 9301 + 49297) % 233280;
    return semilla / 233280;
  };

  for (let indice = 0; indice < 92; indice++) {
    const fecha = new Date(inicio);
    fecha.setDate(fecha.getDate() + indice);
    const finDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6 ? 0.6 : 1;
    datos.push({
      date: iso(fecha),
      app: Math.round((140 + aleatorio() * 320) * finDeSemana),
      web: Math.round((60 + aleatorio() * 200) * finDeSemana),
    });
  }

  return datos;
}

/** Datos exactos del ejemplo Líneas — interactivo. */
export function generarDatosLinea(): DatoLineChart[] {
  const datos: DatoLineChart[] = [];
  const inicio = new Date(2026, 3, 1);
  let semilla = 11;
  const aleatorio = () => {
    semilla = (semilla * 9301 + 49297) % 233280;
    return semilla / 233280;
  };

  for (let indice = 0; indice < 91; indice++) {
    const fecha = new Date(inicio);
    fecha.setDate(fecha.getDate() + indice);
    datos.push({
      date: iso(fecha),
      web: Math.round(60 + aleatorio() * 440),
      app: Math.round(110 + aleatorio() * 420),
    });
  }

  return datos;
}

export const DATOS_BARRAS: readonly DatoBarChart[] = [
  { month: 'Enero', pagos: 186 },
  { month: 'Febrero', pagos: 305 },
  { month: 'Marzo', pagos: 237 },
  { month: 'Abril', pagos: 73 },
  { month: 'Mayo', pagos: 209 },
  { month: 'Junio', pagos: 214 },
];

export const DATOS_BARRAS_MULTIPLE: readonly DatoBarChart[] = [
  { month: 'Enero', web: 186, app: 80 },
  { month: 'Febrero', web: 305, app: 200 },
  { month: 'Marzo', web: 237, app: 120 },
  { month: 'Abril', web: 73, app: 190 },
  { month: 'Mayo', web: 209, app: 130 },
  { month: 'Junio', web: 214, app: 140 },
];

export const DATOS_BARRAS_PROPIO: readonly DatoBarChart[] = [
  { mes: 'Aseo', web: 420, app: 180 },
  { mes: 'Placas', web: 310, app: 240 },
  { mes: 'Inmueble', web: 260, app: 150 },
  { mes: 'Permisos', web: 180, app: 120 },
];

export const DATOS_LINEA_LABEL: readonly DatoLineChartLabel[] = [
  { month: 'Enero', solicitudes: 186 },
  { month: 'Febrero', solicitudes: 305 },
  { month: 'Marzo', solicitudes: 237 },
  { month: 'Abril', solicitudes: 73 },
  { month: 'Mayo', solicitudes: 209 },
  { month: 'Junio', solicitudes: 214 },
];

export const DATOS_LINEA_CUSTOM: readonly DatoLineChartLabel[] = [
  { canal: 'app', reportes: 275 },
  { canal: 'web', reportes: 200 },
  { canal: 'linea', reportes: 187 },
  { canal: 'presencial', reportes: 173 },
  { canal: 'otros', reportes: 90 },
];

export const DATOS_LINEA_PROPIO: readonly DatoLineChart[] = [
  { date: '2026-10-01', web: 42 },
  { date: '2026-10-02', web: 58 },
  { date: '2026-10-03', web: 51 },
  { date: '2026-10-04', web: 69 },
  { date: '2026-10-05', web: 64 },
  { date: '2026-10-06', web: 82 },
  { date: '2026-10-07', web: 77 },
];

export const DATOS_PIE: readonly PorcionPieChart[] = [
  { clave: 'vias', etiqueta: 'Vías y aceras', valor: 275 },
  { clave: 'basura', etiqueta: 'Recolección', valor: 200 },
  { clave: 'luz', etiqueta: 'Alumbrado', valor: 187 },
  { clave: 'agua', etiqueta: 'Drenaje', valor: 173 },
  { clave: 'otros', etiqueta: 'Otros', valor: 90 },
];

export const DATOS_PIE_PAGOS: readonly PorcionPieChart[] = [
  { clave: 'inmueble', etiqueta: 'Inmueble', valor: 275 },
  { clave: 'placa', etiqueta: 'Placa', valor: 200 },
  { clave: 'aseo', etiqueta: 'Aseo', valor: 187 },
  { clave: 'permiso', etiqueta: 'Permisos', valor: 173 },
  { clave: 'otros', etiqueta: 'Otros', valor: 90 },
];

export const DATOS_RADAR: readonly DatoRadarChart[] = [
  { month: 'Enero', resueltos: 186 },
  { month: 'Febrero', resueltos: 305 },
  { month: 'Marzo', resueltos: 237 },
  { month: 'Abril', resueltos: 273 },
  { month: 'Mayo', resueltos: 209 },
  { month: 'Junio', resueltos: 214 },
];

export const DATOS_RADAR_CANAL: readonly DatoRadarChart[] = [
  { month: 'Enero', web: 186, app: 80 },
  { month: 'Febrero', web: 305, app: 200 },
  { month: 'Marzo', web: 237, app: 120 },
  { month: 'Abril', web: 73, app: 190 },
  { month: 'Mayo', web: 209, app: 130 },
  { month: 'Junio', web: 214, app: 140 },
];

export const DATOS_RADIAL: readonly ItemRadialChart[] = [
  { clave: 'vias', etiqueta: 'Vías', valor: 275 },
  { clave: 'basura', etiqueta: 'Recolección', valor: 200 },
  { clave: 'luz', etiqueta: 'Alumbrado', valor: 187 },
  { clave: 'agua', etiqueta: 'Drenaje', valor: 173 },
  { clave: 'otros', etiqueta: 'Otros', valor: 90 },
];

export const DATOS_RADIAL_CENTRO: readonly ItemRadialChart[] = [
  { clave: 'resueltos', etiqueta: 'Resueltos', valor: 200 },
];

export const ITEMS_BAR_LIST_CANALES: readonly ItemBarList[] = [
  {
    etiqueta: 'Acceso directo',
    valor: 5120,
    icono: 'mouse-pointer-click',
  },
  { etiqueta: 'Búsqueda en Google', valor: 2380, icono: 'search' },
  { etiqueta: 'Redes sociales', valor: 1740, icono: 'share-2' },
  { etiqueta: 'Línea 311', valor: 1040, icono: 'phone' },
];

export const ITEMS_BAR_LIST_DISPOSITIVOS: readonly ItemBarList[] = [
  { etiqueta: 'Móvil', valor: 68, texto: '68 %', icono: 'smartphone' },
  { etiqueta: 'Escritorio', valor: 28, texto: '28 %', icono: 'monitor' },
  { etiqueta: 'Tableta', valor: 4, texto: '4 %', icono: 'tablet' },
];

export const ITEMS_BAR_LIST_PROPIO: readonly ItemBarList[] = [
  { etiqueta: 'Calidonia', valor: 420 },
  { etiqueta: 'San Felipe', valor: 360 },
  { etiqueta: 'Bella Vista', valor: 310 },
  { etiqueta: 'Ancón', valor: 220 },
];

export interface EscenarioDistribucion {
  etiqueta: string;
  valores: readonly [number, number, number];
  total: number;
}

export const ESCENARIOS_DISTRIBUCION: Readonly<Record<string, EscenarioDistribucion>> = {
  expedientes: {
    etiqueta: 'Estados de expedientes',
    valores: [1462, 1359, 2109],
    total: 4930,
  },
  pequenos: {
    etiqueta: 'Segmentos pequeños',
    valores: [4870, 35, 25],
    total: 4930,
  },
  vacio: {
    etiqueta: 'Sin registros',
    valores: [0, 0, 0],
    total: 0,
  },
  inconsistente: {
    etiqueta: 'Total inconsistente',
    valores: [1462, 1359, 2109],
    total: 5000,
  },
};

export const ITEMS_DISTRIBUCION_PROPIO: readonly ItemDistribucion[] = [
  { id: 'web', etiqueta: 'Portal web', valor: 1240, tono: 'primary' },
  { id: 'app', etiqueta: 'App Ciudadana', valor: 980, tono: 'success' },
  { id: 'presencial', etiqueta: 'Presencial', valor: 310, tono: 'warning' },
  { id: 'otros', etiqueta: 'Otros canales', valor: 120, tono: 'neutral' },
];
