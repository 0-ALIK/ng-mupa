import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

import type { ItemImagenLogoLoop, ItemLogoLoop, ItemPlantillaLogoLoop } from './logo-loop.types';

/**
 * Item interno de `mupa-logo-loop`.
 *
 * Réplica del `Item` de `DESARROLLO/logo-loop/LogoLoop.jsx`: imagen o
 * plantilla, enlace opcional, escala y escala de grises al pasar.
 */
@Component({
  selector: 'mupa-logo-loop-item',
  imports: [NgTemplateOutlet],
  template: `
    @if (href(); as enlace) {
      <a
        class="mupa-logo-loop-item__enlace"
        [class.mupa-logo-loop-item__enlace--foco]="foco()"
        [href]="enlace"
        target="_blank"
        rel="noreferrer noopener"
        [attr.aria-label]="etiqueta()"
        (focus)="alEnfocar()"
        (blur)="alDesenfocar()"
      >
        <ng-container *ngTemplateOutlet="contenido" />
      </a>
    } @else {
      <ng-container *ngTemplateOutlet="contenido" />
    }

    <ng-template #contenido>
      @if (comoPlantilla(); as plantilla) {
        <span
          class="mupa-logo-loop-item__contenido"
          [attr.aria-hidden]="ocultarContenido() ? 'true' : null"
          [style.font-size.px]="alturaLogo()"
          [style.transform]="transformacion()"
          [style.filter]="filtro()"
          [style.opacity]="opacidad()"
        >
          <ng-container
            *ngTemplateOutlet="plantilla.plantilla; context: $any(plantilla.contexto ?? {})"
          />
        </span>
      } @else if (comoImagen(); as imagen) {
        <img
          class="mupa-logo-loop-item__contenido mupa-logo-loop-item__imagen"
          [src]="imagen.src"
          [attr.alt]="imagen.alt ?? ''"
          [attr.title]="imagen.titulo ?? null"
          [attr.width]="imagen.ancho ?? null"
          [attr.height]="imagen.alto ?? null"
          [style.height.px]="alturaLogo()"
          [style.transform]="transformacion()"
          [style.filter]="filtro()"
          [style.opacity]="opacidad()"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      }
    </ng-template>
  `,
  styleUrl: './logo-loop-item.component.css',
  host: {
    class: 'mupa-logo-loop-item',
    '(mouseenter)': 'alEntrar()',
    '(mouseleave)': 'alSalir()',
  },
})
export class MupaLogoLoopItem {
  /** Item a renderizar. */
  readonly item = input.required<ItemLogoLoop>();

  /** Altura del logo o tamaño de fuente de la plantilla. */
  readonly alturaLogo = input(32, { transform: numberAttribute });

  /** Escala 1.15× al pasar el cursor. */
  readonly escalarAlPasar = input(false, { transform: booleanAttribute });

  /** Escala de grises en reposo, color al pasar. */
  readonly escalaDeGrises = input(false, { transform: booleanAttribute });

  protected readonly hover = signal(false);
  protected readonly foco = signal(false);

  protected readonly activo = computed(() => this.hover() || this.foco());

  protected readonly comoPlantilla = computed<ItemPlantillaLogoLoop | null>(() => {
    const item = this.item();
    return 'plantilla' in item ? item : null;
  });

  protected readonly comoImagen = computed<ItemImagenLogoLoop | null>(() => {
    const item = this.item();
    return 'src' in item ? item : null;
  });

  protected readonly href = computed(() => this.item().href);

  protected readonly etiqueta = computed(() => {
    const plantilla = this.comoPlantilla();
    if (plantilla) return plantilla.etiquetaAria || plantilla.titulo || 'Logo';

    const imagen = this.comoImagen();
    return imagen?.alt || imagen?.titulo || 'Logo';
  });

  protected readonly ocultarContenido = computed(() => {
    const plantilla = this.comoPlantilla();
    return Boolean(plantilla?.href && !plantilla.etiquetaAria);
  });

  protected readonly transformacion = computed(() =>
    this.escalarAlPasar() && this.activo() ? 'scale(1.15)' : 'none',
  );

  protected readonly filtro = computed(() =>
    this.escalaDeGrises() && !this.activo() ? 'grayscale(1)' : 'none',
  );

  protected readonly opacidad = computed(() => (this.escalaDeGrises() && !this.activo() ? 0.7 : 1));

  protected alEntrar(): void {
    this.hover.set(true);
  }

  protected alSalir(): void {
    this.hover.set(false);
  }

  protected alEnfocar(): void {
    this.foco.set(true);
  }

  protected alDesenfocar(): void {
    this.foco.set(false);
  }
}
