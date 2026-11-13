import type { OpcionesConfeti } from './confetti.types';

/** Paleta institucional usada por el confeti. */
export const COLORES_CONFETI = [
  '#0660FF',
  '#48A9FF',
  '#0E225D',
  '#22B8CF',
  '#8BC34A',
  '#FF7A59',
  '#7C6AE6',
] as const;

interface ParticulaConfeti {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tamano: number;
  color: string;
  rotacion: number;
  velocidadRotacion: number;
  ondulacion: number;
  velocidadOndulacion: number;
  forma: 0 | 1;
  vida: number;
}

let lienzo: HTMLCanvasElement | null = null;
let contexto: CanvasRenderingContext2D | null = null;
let particulas: ParticulaConfeti[] = [];
let raf = 0;

function movimientoReducido(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function redimensionar(): void {
  if (!lienzo || !contexto || typeof window === 'undefined') return;

  const densidad = window.devicePixelRatio || 1;
  lienzo.width = window.innerWidth * densidad;
  lienzo.height = window.innerHeight * densidad;
  contexto.setTransform(densidad, 0, 0, densidad, 0, 0);
}

function asegurarLienzo(): void {
  if (lienzo || typeof document === 'undefined') return;

  lienzo = document.createElement('canvas');
  lienzo.setAttribute('aria-hidden', 'true');
  Object.assign(lienzo.style, {
    position: 'fixed',
    inset: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '9999',
  });
  document.body.appendChild(lienzo);
  contexto = lienzo.getContext('2d');
  redimensionar();

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', redimensionar);
  }
}

function limpiar(): void {
  if (typeof window !== 'undefined') {
    window.cancelAnimationFrame(raf);
    window.removeEventListener('resize', redimensionar);
  }

  raf = 0;

  if (lienzo) {
    lienzo.remove();
  }

  lienzo = null;
  contexto = null;
  particulas = [];
}

function animar(): void {
  if (typeof window === 'undefined' || !contexto) {
    limpiar();
    return;
  }

  const ctx = contexto;
  const ancho = window.innerWidth;
  const alto = window.innerHeight;

  ctx.clearRect(0, 0, ancho, alto);
  particulas = particulas.filter((particula) => particula.vida > 0 && particula.y < alto + 40);

  for (const particula of particulas) {
    particula.vx *= 0.985;
    particula.vy = particula.vy * 0.985 + 0.32;
    particula.x += particula.vx + Math.sin(particula.ondulacion) * 0.6;
    particula.y += particula.vy;
    particula.ondulacion += particula.velocidadOndulacion;
    particula.rotacion += particula.velocidadRotacion;
    particula.vida -= 1;

    const giro = Math.abs(Math.cos(particula.rotacion));

    ctx.save();
    ctx.globalAlpha = Math.min(1, particula.vida / 40);
    ctx.translate(particula.x, particula.y);
    ctx.rotate(particula.rotacion);
    ctx.fillStyle = particula.color;

    if (particula.forma === 0) {
      ctx.fillRect(
        -particula.tamano / 2,
        (-particula.tamano * giro) / 2,
        particula.tamano,
        particula.tamano * giro * 0.6 + 1,
      );
    } else {
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        particula.tamano / 2.4,
        (particula.tamano * giro) / 2.4 + 0.5,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    ctx.restore();
  }

  if (particulas.length) {
    raf = window.requestAnimationFrame(animar);
  } else {
    limpiar();
  }
}

/**
 * Lanza una explosión de confeti a pantalla completa.
 *
 * Réplica de `fireConfetti` del Lego Design System — Alcaldía de Panamá.
 */
export function dispararConfeti(opciones: OpcionesConfeti = {}): void {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    typeof window.requestAnimationFrame !== 'function' ||
    movimientoReducido()
  ) {
    return;
  }

  const {
    cantidadParticulas = 120,
    dispersion = 70,
    angulo = 90,
    velocidadInicial = 13,
    origen = { x: 0.5, y: 0.6 },
    colores = COLORES_CONFETI,
  } = opciones;

  asegurarLienzo();
  if (!lienzo || !contexto) return;

  const origenX = origen.x * window.innerWidth;
  const origenY = origen.y * window.innerHeight;
  const paleta = colores.length ? colores : COLORES_CONFETI;

  for (let indice = 0; indice < cantidadParticulas; indice++) {
    const radianes = ((angulo + (Math.random() - 0.5) * dispersion) * Math.PI) / 180;
    const velocidad = velocidadInicial * (0.55 + Math.random() * 0.6);
    const color = paleta[Math.floor(Math.random() * paleta.length)] ?? COLORES_CONFETI[0];

    particulas.push({
      x: origenX,
      y: origenY,
      vx: Math.cos(radianes) * velocidad,
      vy: -Math.sin(radianes) * velocidad,
      tamano: 7 + Math.random() * 6,
      color,
      rotacion: Math.random() * Math.PI,
      velocidadRotacion: (Math.random() - 0.5) * 0.3,
      ondulacion: Math.random() * 10,
      velocidadOndulacion: 0.05 + Math.random() * 0.1,
      forma: Math.random() < 0.65 ? 0 : 1,
      vida: 160 + Math.random() * 60,
    });
  }

  if (!raf) {
    raf = window.requestAnimationFrame(animar);
  }
}
