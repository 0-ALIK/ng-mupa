import { Component, input, output } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { GrupoMenu, ItemMenu } from './menu.types';

/**
 * Menú con grupos e ítems que disparan acciones.
 *
 * Réplica del patrón `.nav` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-menu',
  imports: [MupaIcon],
  template: `
    <nav class="mupa-menu" [attr.aria-label]="ariaLabel()">
      @for (grupo of grupos(); track $index) {
        <div class="mupa-menu__grupo">
          @if (grupo.etiqueta) {
            <div class="mupa-menu__titulo">{{ grupo.etiqueta }}</div>
          }

          @for (item of grupo.items; track item.id) {
            @if (item.href) {
              <a
                class="mupa-menu__item"
                [class.mupa-menu__item--activo]="item.activo"
                [class.mupa-menu__item--deshabilitado]="item.deshabilitado"
                [href]="item.href"
                [attr.aria-current]="item.activo ? 'page' : null"
                [attr.aria-disabled]="item.deshabilitado ? 'true' : null"
                [attr.tabindex]="item.deshabilitado ? -1 : null"
                (click)="seleccionar(item, $event)"
              >
                @if (item.icono) {
                  <mupa-icon [nombre]="item.icono" [tamano]="16" />
                }
                <span>{{ item.etiqueta }}</span>
              </a>
            } @else {
              <button
                type="button"
                class="mupa-menu__item"
                [class.mupa-menu__item--activo]="item.activo"
                [class.mupa-menu__item--deshabilitado]="item.deshabilitado"
                [disabled]="item.deshabilitado ?? false"
                (click)="seleccionar(item)"
              >
                @if (item.icono) {
                  <mupa-icon [nombre]="item.icono" [tamano]="16" />
                }
                <span>{{ item.etiqueta }}</span>
              </button>
            }
          }
        </div>
      }
    </nav>
  `,
  styleUrl: './menu.component.css',
})
export class MupaMenu {
  /** Grupos e ítems del menú. */
  readonly grupos = input.required<readonly GrupoMenu[]>();

  /** Nombre accesible de la navegación. */
  readonly ariaLabel = input('Menú');

  /** Emite el ítem seleccionado. */
  readonly seleccion = output<ItemMenu>();

  protected seleccionar(item: ItemMenu, evento?: Event): void {
    if (item.deshabilitado) {
      evento?.preventDefault();
      evento?.stopPropagation();
      return;
    }

    this.seleccion.emit(item);
  }
}
