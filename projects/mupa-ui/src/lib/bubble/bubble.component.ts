import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, forwardRef, input, signal } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import { CONTEXTO_BURBUJA, type ContextoBurbuja } from './bubble-context';
import {
  VARIANTES_BURBUJA,
  type AlineacionBurbuja,
  type AnchoBurbuja,
  type PosicionBurbuja,
  type VarianteBurbuja,
} from './bubble.types';

function valorAncho(valor: AnchoBurbuja | undefined, respaldo: string): string {
  if (typeof valor === 'number' && Number.isFinite(valor)) return `${valor}px`;
  if (typeof valor === 'string' && valor.trim()) return valor;
  return respaldo;
}

/**
 * Mensaje de conversación del sistema de diseño.
 *
 * Réplica de `Bubble` en el Lego Design System — Alcaldía de Panamá. El ciudadano se alinea
 * a la derecha con la variante primaria; el asistente a la izquierda con
 * avatar, nombre, hora y contenido libre.
 */
@Component({
  selector: 'mupa-bubble',
  imports: [NgTemplateOutlet, MupaIcon],
  providers: [
    {
      provide: CONTEXTO_BURBUJA,
      useExisting: forwardRef(() => MupaBubble),
    },
  ],
  template: `
    <ng-template #contenido>
      <ng-content />
    </ng-template>

    @if (alineacion() === 'end') {
      <div class="mupa-bubble mupa-bubble--end">
        <div
          class="mupa-bubble__cuerpo mupa-bubble__cuerpo--end"
          [style.max-width]="anchoMaximoFin()"
          [style.background]="configuracion().fondo"
          [style.border-color]="configuracion().borde"
          [style.border-radius]="bordeRadio()"
          [style.box-shadow]="
            varianteResuelta() === 'primary' ? '0 8px 20px rgba(14,34,93,.18)' : null
          "
        >
          <ng-container *ngTemplateOutlet="contenido" />
        </div>

        @if (ultima() && (hora() || meta())) {
          <div class="mupa-bubble__meta">{{ metaFin() }}</div>
        }
      </div>
    } @else {
      <div class="mupa-bubble mupa-bubble--start">
        @if (avatar() || autor()) {
          @if (primera()) {
            <span class="mupa-bubble__avatar" aria-hidden="true">
              @if (avatarEsImagen()) {
                <img [src]="avatar()" alt="" width="22" height="22" />
              } @else {
                <mupa-icon [nombre]="avatar() || 'bot'" [tamano]="20" color="var(--fg-on-brand)" />
              }
            </span>
          } @else {
            <span class="mupa-bubble__avatar-espacio" aria-hidden="true"></span>
          }
        }

        <div class="mupa-bubble__columna" [style.max-width]="anchoMaximoInicio()">
          @if (primera() && (autor() || hora())) {
            <div class="mupa-bubble__cabecera">
              @if (autor()) {
                <span class="mupa-bubble__autor">{{ autor() }}</span>
              }
              @if (hora()) {
                <span class="mupa-bubble__hora">{{ hora() }}</span>
              }
            </div>
          }

          @if (varianteResuelta() === 'plain') {
            <ng-container *ngTemplateOutlet="contenido" />
          } @else {
            <div
              class="mupa-bubble__cuerpo mupa-bubble__cuerpo--inicio"
              [style.background]="configuracion().fondo"
              [style.border-color]="configuracion().borde"
            >
              <ng-container *ngTemplateOutlet="contenido" />
            </div>
          }

          @if (ultima() && meta()) {
            <div class="mupa-bubble__meta">{{ meta() }}</div>
          }
        </div>
      </div>
    }
  `,
  styleUrl: './bubble.component.css',
})
export class MupaBubble implements ContextoBurbuja {
  /** Lado del hilo. `end` es el ciudadano; `start` el asistente. */
  readonly alineacion = input<AlineacionBurbuja>('start');

  /** Variante visual. Por defecto es `primary` en `end` y `plain` en `start`. */
  readonly variante = input<VarianteBurbuja>();

  /** Nombre del asistente o funcionario. */
  readonly autor = input<string>();

  /** Nombre de icono Lucide o URL de imagen para el avatar. */
  readonly avatar = input<string>();

  /** Hora del mensaje. */
  readonly hora = input<string>();

  /** Texto adicional bajo el mensaje. */
  readonly meta = input<string>();

  /** Ancho máximo del contenido. */
  readonly anchoMaximo = input<AnchoBurbuja>();

  /** Posición dentro de `mupa-bubble-group`; la controla el grupo. */
  readonly posicion = signal<PosicionBurbuja>('single');

  readonly varianteResuelta = computed<VarianteBurbuja>(
    () => this.variante() ?? (this.alineacion() === 'end' ? 'primary' : 'plain'),
  );

  protected readonly configuracion = computed(() => VARIANTES_BURBUJA[this.varianteResuelta()]);

  protected readonly primera = computed(
    () => this.posicion() === 'single' || this.posicion() === 'first',
  );

  protected readonly ultima = computed(
    () => this.posicion() === 'single' || this.posicion() === 'last',
  );

  protected readonly bordeRadio = computed(() => {
    if (this.alineacion() !== 'end') return '16px';

    const R = 18;
    const r = 6;
    const posicion = this.posicion();
    const superiorDerecha = posicion === 'middle' || posicion === 'last' ? r : R;
    const inferiorDerecha = posicion === 'first' || posicion === 'middle' ? r : R;

    return `${R}px ${superiorDerecha}px ${inferiorDerecha}px ${R}px`;
  });

  protected readonly anchoMaximoFin = computed(() => valorAncho(this.anchoMaximo(), '75%'));

  protected readonly anchoMaximoInicio = computed(() => valorAncho(this.anchoMaximo(), '560px'));

  protected readonly avatarEsImagen = computed(() => /[./]/.test(this.avatar() ?? ''));

  protected readonly metaFin = computed(() =>
    [this.hora(), this.meta()].filter(Boolean).join(' · '),
  );
}
