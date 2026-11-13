import { Component, computed, input } from '@angular/core';

import {
  ALTURAS_LOGO,
  ARCHIVOS_LOGO,
  type TamanoLogo,
  type TemaLogo,
  type VarianteLogo,
} from './logo.types';

/**
 * Logo institucional de la Alcaldía de Panamá.
 *
 * Usa los assets empaquetados en `assets/branding` y permite reemplazarlos
 * con `src` cuando el consumidor los publique en otra ruta.
 */
@Component({
  selector: 'mupa-logo',
  template: `
    @if (href()) {
      <a [class]="'mupa-logo mupa-logo--' + variante()" [href]="href()">
        <img [src]="archivo()" [alt]="alt()" [style.height.px]="altura()" decoding="async" />
      </a>
    } @else {
      <span [class]="'mupa-logo mupa-logo--' + variante()">
        <img [src]="archivo()" [alt]="alt()" [style.height.px]="altura()" decoding="async" />
      </span>
    }
  `,
  styleUrl: './logo.component.css',
})
export class MupaLogo {
  /** Variante del logo. */
  readonly variante = input<VarianteLogo>('horizontal');

  /** Versión cromática. En escudo e isotipo cae a color. */
  readonly tema = input<TemaLogo>('color');

  /** Tamaño relativo. */
  readonly tamano = input<TamanoLogo>('md');

  /** Permite usar un archivo propio en lugar del asset empaquetado. */
  readonly src = input<string>();

  /** Texto alternativo. */
  readonly alt = input('Alcaldía de Panamá');

  /** Si se indica, el logo se envuelve en un enlace. */
  readonly href = input<string>();

  protected readonly archivo = computed(() => {
    if (this.src()) return this.src()!;
    const variante = this.variante();
    return ARCHIVOS_LOGO[variante][this.tema()] ?? ARCHIVOS_LOGO[variante].color!;
  });

  protected readonly altura = computed(() => ALTURAS_LOGO[this.variante()][this.tamano()]);
}
