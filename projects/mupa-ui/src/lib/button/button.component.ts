import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, input, output } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { TamanoBoton, TipoBoton, VarianteBoton } from './button.types';

/**
 * Botón del sistema de diseño.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: mismas variantes, tamaños,
 * estados, foco y comportamiento táctil.
 */
@Component({
  selector: 'mupa-button',
  imports: [MupaIcon, NgTemplateOutlet],
  template: `
    @if (href()) {
      <a
        [class]="clasesBoton()"
        [href]="href()"
        [attr.aria-disabled]="estaDeshabilitado() ? 'true' : null"
        [attr.aria-busy]="cargando() ? 'true' : null"
        [attr.aria-label]="etiquetaAria() ?? null"
        [attr.aria-expanded]="expandidoAria() ?? null"
        [attr.aria-controls]="controlaAria() ?? null"
        [attr.tabindex]="estaDeshabilitado() ? -1 : null"
        (click)="alClicEnlace($event)"
      >
        <ng-container *ngTemplateOutlet="contenido" />
      </a>
    } @else {
      <button
        [class]="clasesBoton()"
        [attr.type]="tipo()"
        [disabled]="estaDeshabilitado()"
        [attr.aria-busy]="cargando() ? 'true' : null"
        [attr.aria-label]="etiquetaAria() ?? null"
        [attr.aria-expanded]="expandidoAria() ?? null"
        [attr.aria-controls]="controlaAria() ?? null"
        (click)="clic.emit($event)"
      >
        <ng-container *ngTemplateOutlet="contenido" />
      </button>
    }

    <ng-template #contenido>
      @if (iconoInicio()) {
        <mupa-icon [nombre]="iconoInicio()!" [tamano]="18" [trazo]="2" />
      }

      <ng-content />

      @if (iconoFin()) {
        <mupa-icon [nombre]="iconoFin()!" [tamano]="18" [trazo]="2" />
      }
    </ng-template>
  `,
  styleUrl: './button.component.css',
  host: {
    '[class.mupa-button-host--bloque]': 'bloque()',
  },
})
export class MupaButton {
  /** Intención visual del botón. */
  readonly variante = input<VarianteBoton>('primary');

  /** Tamaño del botón. */
  readonly tamano = input<TamanoBoton>('md');

  /** Tipo nativo del botón. Se ignora cuando hay `href`. */
  readonly tipo = input<TipoBoton>('button');

  /** URL de navegación. Convierte el botón en un ancla con la misma apariencia. */
  readonly href = input<string>();

  /** Deshabilita la acción. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Marca la operación en curso y bloquea nuevas activaciones. */
  readonly cargando = input(false, { transform: booleanAttribute });

  /** Reduce el botón a un cuadrado de solo icono. */
  readonly soloIcono = input(false, { transform: booleanAttribute });

  /** Ocupa todo el ancho disponible. */
  readonly bloque = input(false, { transform: booleanAttribute });

  /** Nombre del icono Lucide al inicio de la etiqueta. */
  readonly iconoInicio = input<string>();

  /** Nombre del icono Lucide al final de la etiqueta. */
  readonly iconoFin = input<string>();

  /** Nombre accesible para botones de solo icono. */
  readonly etiquetaAria = input<string>();

  /** Estado expandido para controles que despliegan contenido. */
  readonly expandidoAria = input<boolean | undefined>(undefined);

  /** ID del elemento controlado por el botón. */
  readonly controlaAria = input<string>();

  /** Emitido al activar el botón. */
  readonly clic = output<MouseEvent>();

  protected readonly estaDeshabilitado = computed(() => this.deshabilitado() || this.cargando());

  protected readonly clasesBoton = computed(() =>
    [
      'mupa-button',
      this.variante() !== 'primary' ? `mupa-button--${this.variante()}` : '',
      this.tamano() !== 'md' ? `mupa-button--${this.tamano()}` : '',
      this.soloIcono() ? 'mupa-button--icon' : '',
      this.bloque() ? 'mupa-button--block' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected alClicEnlace(evento: MouseEvent): void {
    if (this.estaDeshabilitado()) {
      evento.preventDefault();
      evento.stopPropagation();
      return;
    }

    this.clic.emit(evento);
  }
}
