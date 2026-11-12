import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, input, signal } from '@angular/core';

import {
  ESTADOS_AVATAR,
  TINTES_AVATAR,
  type EstadoAvatar,
  type InfoEstadoAvatar,
} from './avatar.types';

/**
 * Avatar circular del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: foto o iniciales sobre un tinte
 * institucional, borde de 1.5 px, punto de presencia y anillo opcional.
 */
@Component({
  selector: 'mupa-avatar',
  imports: [NgTemplateOutlet],
  template: `
    @if (href()) {
      <a
        class="mupa-avatar__enlace"
        [href]="href()"
        [attr.aria-label]="etiqueta()"
        [attr.title]="nombre()"
      >
        <ng-container *ngTemplateOutlet="cuerpo" />
      </a>
    } @else {
      <span
        class="mupa-avatar__contenedor"
        role="img"
        [attr.aria-label]="etiqueta()"
        [attr.title]="nombre()"
      >
        <ng-container *ngTemplateOutlet="cuerpo" />
      </span>
    }

    <ng-template #cuerpo>
      <span class="mupa-avatar__cuerpo" [style.width.px]="tamano()" [style.height.px]="tamano()">
        <span
          class="mupa-avatar__circulo"
          [style.width.px]="tamano()"
          [style.height.px]="tamano()"
          [style.background]="fondoCirculo()"
          [style.border]="bordeCirculo()"
          [style.box-shadow]="sombraCirculo()"
          [style.font-size.px]="tamanoIniciales()"
          [style.color]="tinte()[2]"
        >
          @if (mostrarImagen()) {
            <img class="mupa-avatar__imagen" [src]="src()" alt="" (error)="errorImagen.set(true)" />
          } @else {
            <span aria-hidden="true">{{ iniciales() }}</span>
          }
        </span>

        @if (infoEstado(); as estado) {
          <span
            class="mupa-avatar__estado"
            [attr.title]="estado.etiqueta"
            [style.width.px]="tamanoEstado()"
            [style.height.px]="tamanoEstado()"
            [style.background]="estado.color"
          ></span>
        }
      </span>
    </ng-template>
  `,
  styleUrl: './avatar.component.css',
})
export class MupaAvatar {
  /** Nombre completo: iniciales y texto accesible. */
  readonly nombre = input.required<string>();

  /** URL de la foto. */
  readonly src = input<string>();

  /** Tamaño en píxeles. */
  readonly tamano = input(40);

  /** Enlace de perfil. Convierte el avatar en un ancla. */
  readonly href = input<string>();

  /** Punto de presencia. */
  readonly estado = input<EstadoAvatar>();

  /** Anillo blanco para apilar avatares. */
  readonly anillo = input(false, { transform: booleanAttribute });

  protected readonly errorImagen = signal(false);

  protected readonly mostrarImagen = computed(() => Boolean(this.src()) && !this.errorImagen());

  protected readonly tinte = computed(() => {
    const indice = hash(this.nombre()) % TINTES_AVATAR.length;
    return TINTES_AVATAR[indice];
  });

  protected readonly iniciales = computed(() => obtenerIniciales(this.nombre()));

  protected readonly infoEstado = computed<InfoEstadoAvatar | null>(() => {
    const estado = this.estado();
    return estado ? ESTADOS_AVATAR[estado] : null;
  });

  protected readonly etiqueta = computed(() => {
    const estado = this.infoEstado();
    return estado ? `${this.nombre()} · ${estado.etiqueta}` : this.nombre();
  });

  protected readonly tamanoIniciales = computed(() => Math.round(this.tamano() * 0.36));

  protected readonly tamanoEstado = computed(() => Math.max(10, this.tamano() * 0.28));

  protected readonly fondoCirculo = computed(() =>
    this.mostrarImagen() ? 'var(--color-neutral-100)' : this.tinte()[0],
  );

  protected readonly bordeCirculo = computed(() => {
    if (this.anillo()) return '2px solid #FFFFFF';
    return `1.5px solid ${this.mostrarImagen() ? 'var(--border-default)' : this.tinte()[1]}`;
  });

  protected readonly sombraCirculo = computed(() => {
    if (!this.anillo()) return 'none';
    const color = this.mostrarImagen() ? 'var(--border-default)' : this.tinte()[1];
    return `0 0 0 1px ${color}`;
  });
}

/** Iniciales de las dos primeras palabras del nombre. */
function obtenerIniciales(nombre: string): string {
  return String(nombre || '?')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();
}

/** Hash estable usado por el sistema original para elegir el tinte. */
function hash(valor: string): number {
  return [...String(valor)].reduce((acumulado, caracter) => {
    return (acumulado * 31 + caracter.charCodeAt(0)) >>> 0;
  }, 7);
}
