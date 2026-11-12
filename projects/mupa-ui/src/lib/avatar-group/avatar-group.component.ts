import { booleanAttribute, Component, computed, input, output } from '@angular/core';

import { MupaAvatar } from '../avatar/avatar.component';
import type { PersonaAvatar } from '../avatar/avatar.types';

/**
 * Grupo de avatares superpuestos con contador "+N".
 *
 * Réplica de `AvatarGroup` en el Lego Design System — Alcaldía de Panamá: anillo blanco,
 * solapamiento del 28 % del tamaño y contador institucional.
 */
@Component({
  selector: 'mupa-avatar-group',
  imports: [MupaAvatar],
  template: `
    <div class="mupa-avatar-group" role="group" [attr.aria-label]="totalPersonas() + ' personas'">
      @for (persona of visibles(); track $index; let i = $index) {
        <span
          class="mupa-avatar-group__item"
          [style.margin-left.px]="i ? -solapamiento() : 0"
          [style.z-index]="visibles().length - i"
        >
          <mupa-avatar
            [nombre]="persona.nombre"
            [src]="persona.src ?? undefined"
            [href]="persona.href ?? undefined"
            [estado]="persona.estado ?? undefined"
            [tamano]="tamano()"
            [anillo]="true"
          />
        </span>
      }

      @if (restantes() > 0) {
        @if (accionVerMas()) {
          <button
            type="button"
            class="mupa-avatar-group__accion"
            [attr.aria-label]="'Ver ' + restantes() + ' personas más'"
            [style.margin-left.px]="-solapamiento()"
            [style.z-index]="visibles().length + 1"
            (click)="verMas.emit()"
          >
            <span
              class="mupa-avatar-group__mas"
              [style.width.px]="tamano()"
              [style.height.px]="tamano()"
              [style.font-size.px]="tamanoRestantes()"
            >
              +{{ restantes() }}
            </span>
          </button>
        } @else {
          <span
            class="mupa-avatar-group__mas"
            [attr.aria-label]="'y ' + restantes() + ' más'"
            [style.margin-left.px]="-solapamiento()"
            [style.z-index]="visibles().length + 1"
            [style.width.px]="tamano()"
            [style.height.px]="tamano()"
            [style.font-size.px]="tamanoRestantes()"
          >
            +{{ restantes() }}
          </span>
        }
      }
    </div>
  `,
  styleUrl: './avatar-group.component.css',
})
export class MupaAvatarGroup {
  /** Personas a mostrar. */
  readonly personas = input<readonly PersonaAvatar[]>([]);

  /** Máximo de avatares antes del contador. */
  readonly maximo = input(5);

  /** Total de personas; por defecto, la longitud de `personas`. */
  readonly total = input<number>();

  /** Tamaño en píxeles de cada avatar. */
  readonly tamano = input(40);

  /** Convierte el contador "+N" en un botón interactivo. */
  readonly accionVerMas = input(false, { transform: booleanAttribute });

  /** Emitido al pulsar el contador cuando `accionVerMas` está activo. */
  readonly verMas = output<void>();

  protected readonly visibles = computed(() => this.personas().slice(0, this.maximo()));

  protected readonly totalPersonas = computed(() => this.total() ?? this.personas().length);

  protected readonly restantes = computed(() => this.totalPersonas() - this.visibles().length);

  protected readonly solapamiento = computed(() => Math.round(this.tamano() * 0.28));

  protected readonly tamanoRestantes = computed(() => Math.round(this.tamano() * 0.32));
}
