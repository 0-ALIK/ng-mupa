import type { PuntoGrafico } from './chart.types';

/** Ruta suave por medias de tangentes, usada por AreaChart y LineChart. */
export function rutaSuave(puntos: readonly PuntoGrafico[]): string {
  if (!puntos.length) return '';
  if (puntos.length === 1) return `M${puntos[0][0]},${puntos[0][1]}`;

  const n = puntos.length;
  const derivadas: number[] = [];
  const tangentes: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    derivadas.push((puntos[i + 1][1] - puntos[i][1]) / (puntos[i + 1][0] - puntos[i][0]));
  }

  tangentes.push(derivadas[0]);
  for (let i = 1; i < n - 1; i++) {
    tangentes.push(
      derivadas[i - 1] * derivadas[i] <= 0 ? 0 : (derivadas[i - 1] + derivadas[i]) / 2,
    );
  }
  tangentes.push(derivadas[n - 2]);

  let ruta = `M${puntos[0][0]},${puntos[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = puntos[i];
    const [x1, y1] = puntos[i + 1];
    const h = (x1 - x0) / 3;
    ruta += `C${x0 + h},${y0 + tangentes[i] * h} ${x1 - h},${
      y1 - tangentes[i + 1] * h
    } ${x1},${y1}`;
  }
  return ruta;
}

/** Ruta de spline natural, usada por LineChartLabel. */
export function rutaNatural(puntos: readonly PuntoGrafico[]): string {
  const n = puntos.length;
  if (!n) return '';
  if (n < 3) return 'M' + puntos.map((punto) => punto.join(',')).join('L');

  const resolver = (valores: number[]) => {
    const k = n - 1;
    const a: number[] = [];
    const b: number[] = [];
    const c: number[] = [];
    const r: number[] = [];

    a[0] = 0;
    b[0] = 2;
    c[0] = 1;
    r[0] = valores[0] + 2 * valores[1];

    for (let i = 1; i < k - 1; i++) {
      a[i] = 1;
      b[i] = 4;
      c[i] = 1;
      r[i] = 4 * valores[i] + 2 * valores[i + 1];
    }

    a[k - 1] = 2;
    b[k - 1] = 7;
    c[k - 1] = 0;
    r[k - 1] = 8 * valores[k - 1] + valores[k];

    for (let i = 1; i < k; i++) {
      const m = a[i] / b[i - 1];
      b[i] -= m * c[i - 1];
      r[i] -= m * r[i - 1];
    }

    const p1: number[] = [];
    p1[k - 1] = r[k - 1] / b[k - 1];
    for (let i = k - 2; i >= 0; i--) {
      p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];
    }

    const p2: number[] = [];
    for (let i = 0; i < k - 1; i++) {
      p2[i] = 2 * valores[i + 1] - p1[i + 1];
    }
    p2[k - 1] = (valores[k] + p1[k - 1]) / 2;

    return [p1, p2];
  };

  const [x1, x2] = resolver(puntos.map((punto) => punto[0]));
  const [y1, y2] = resolver(puntos.map((punto) => punto[1]));

  let ruta = `M${puntos[0][0]},${puntos[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    ruta += `C${x1[i]},${y1[i]} ${x2[i]},${y2[i]} ${puntos[i + 1][0]},${puntos[i + 1][1]}`;
  }
  return ruta;
}

/** Barra con la parte superior redondeada. */
export function barraSuperiorRedondeada(
  x: number,
  y: number,
  ancho: number,
  alto: number,
  radio: number,
): string {
  if (alto <= 0) return '';
  const r = Math.min(radio, ancho / 2, alto);
  return `M${x},${y + alto}V${y + r}Q${x},${y} ${x + r},${y}H${
    x + ancho - r
  }Q${x + ancho},${y} ${x + ancho},${y + r}V${y + alto}Z`;
}

/** Convierte una fecha ISO `YYYY-MM-DD` en fecha local. */
export function parsearFecha(fecha: string): Date {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

/** Elige tinta blanca o navy para texto sobre un color de relleno. */
export function tintaParaColor(color: string): string {
  const coincidencia = /^#([0-9a-f]{6})$/i.exec(color || '');
  if (!coincidencia) return '#FFFFFF';

  const numero = parseInt(coincidencia[1], 16);
  const canal = (valor: number) => {
    const normalizado = valor / 255;
    return normalizado <= 0.03928
      ? normalizado / 12.92
      : Math.pow((normalizado + 0.055) / 1.055, 2.4);
  };

  const luminancia =
    0.2126 * canal(numero >> 16) +
    0.7152 * canal((numero >> 8) & 255) +
    0.0722 * canal(numero & 255);

  return 1.05 / (luminancia + 0.05) >= 4.5 ? '#FFFFFF' : '#0F1319';
}

/** Arco de una porción circular o de dona. */
export function arcoPorcion(
  cx: number,
  cy: number,
  radio: number,
  radioInterior: number,
  inicio: number,
  fin: number,
): string {
  const punto = (r: number, angulo: number): PuntoGrafico => [
    cx + r * Math.cos(angulo),
    cy + r * Math.sin(angulo),
  ];

  let finAjustado = fin;
  if (finAjustado - inicio >= Math.PI * 2 - 1e-6) {
    finAjustado = inicio + Math.PI * 2 - 1e-4;
  }

  const grande = finAjustado - inicio > Math.PI ? 1 : 0;
  const [x0, y0] = punto(radio, inicio);
  const [x1, y1] = punto(radio, finAjustado);

  if (radioInterior <= 0) {
    return `M${cx},${cy}L${x0},${y0}A${radio},${radio} 0 ${grande} 1 ${x1},${y1}Z`;
  }

  const [x2, y2] = punto(radioInterior, finAjustado);
  const [x3, y3] = punto(radioInterior, inicio);
  return `M${x0},${y0}A${radio},${radio} 0 ${grande} 1 ${x1},${y1}L${x2},${y2}A${radioInterior},${radioInterior} 0 ${grande} 0 ${x3},${y3}Z`;
}

/** Arco radial desde las 12 en punto. */
export function arcoRadial(cx: number, radio: number, grados: number): string {
  const angulo = (Math.min(grados, 359.9) * Math.PI) / 180;
  const x = cx + radio * Math.sin(angulo);
  const y = cx - radio * Math.cos(angulo);
  return `M${cx},${cx - radio}A${radio},${radio} 0 ${grados > 180 ? 1 : 0} 1 ${x},${y}`;
}
