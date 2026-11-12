import { booleanAttribute, Component, computed, input, model, OnInit, output } from '@angular/core';

import { MupaIcon } from '../icon/icon.component';
import type { TamanoToggleButton, VarianteToggleButton } from './toggle-button.types';

/**
 * Botón de alternancia con estado activo persistente.
 *
 * Generaliza el `SavedToggle` del Lego Design System — Alcaldía de Panamá:
 * mismo botón, variantes, tamaños, corazón relleno, estado ocupado y bloqueo.
 * En el playground se usa con el ejemplo original de "Guardados".
 */
@Component({
  selector: 'mupa-toggle-button',
  imports: [MupaIcon],
  template: `
    <button
      type="button"
      [id]="id() ?? null"
      [class]="clases()"
      [disabled]="bloqueado()"
      [attr.aria-pressed]="activo()"
      [attr.aria-busy]="ocupado() ? 'true' : null"
      [attr.aria-label]="etiquetaAriaCalculada()"
      [attr.title]="titulo()"
      (click)="alHacerClic($event)"
    >
      <span class="mupa-toggle-button__icono" aria-hidden="true">
        <mupa-icon
          [nombre]="icono()"
          [tamano]="tamanoIcono()"
          [relleno]="activo() ? 'currentColor' : 'none'"
        />
      </span>

      @if (mostrarEtiqueta()) {
        <span>{{ etiquetaVisible() }}</span>
      }
    </button>
  `,
  styleUrl: './toggle-button.component.css',
})
export class MupaToggleButton implements OnInit {
  /** Estado activo. Admite enlace bidireccional con `[(activo)]`. */
  readonly activo = model(false);

  /** Estado activo inicial cuando no se controla desde fuera. */
  readonly activoPorDefecto = input(false, { transform: booleanAttribute });

  /** Si es true, el componente solo solicita el cambio y no modifica `activo`. */
  readonly controlado = input(false, { transform: booleanAttribute });

  /** Texto visible cuando está activo. */
  readonly etiquetaActiva = input('Guardado');

  /** Texto visible cuando está inactivo. */
  readonly etiquetaInactiva = input('Guardar');

  /** Texto visible mientras se procesa la acción. */
  readonly etiquetaOcupado = input('Actualizando…');

  /** Nombre del elemento para las etiquetas accesibles. */
  readonly etiquetaElemento = input('este elemento');

  /** Texto accesible mientras se procesa. */
  readonly ariaOcupado = input('Actualizando');

  /** Inicio del título cuando está activo. */
  readonly tituloActivo = input('Quitar de guardados');

  /** Inicio del título cuando está inactivo. */
  readonly tituloInactivo = input('Guardar');

  /** Título mientras se procesa. */
  readonly tituloOcupado = input('Actualizando guardados');

  /** Variante visual. */
  readonly variante = input<VarianteToggleButton>('outline');

  /** Tamaño del botón. */
  readonly tamano = input<TamanoToggleButton>('md');

  /** Muestra el texto junto al icono. */
  readonly mostrarEtiqueta = input(false, { transform: booleanAttribute });

  /** Deshabilita la interacción. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Marca una operación en curso y bloquea nuevas activaciones. */
  readonly ocupado = input(false, { transform: booleanAttribute });

  /** Nombre del icono Lucide. */
  readonly icono = input('heart');

  /** Nombre accesible personalizado; reemplaza al calculado. */
  readonly etiquetaAria = input<string>();

  /** Identificador del botón. */
  readonly id = input<string>();

  /** Emitido al activar el botón antes de alternar el estado. */
  readonly clic = output<MouseEvent>();

  /** Estado solicitado cuando `controlado` es verdadero. */
  readonly solicitudCambio = output<boolean>();

  protected readonly bloqueado = computed(() => this.deshabilitado() || this.ocupado());

  protected readonly etiquetaVisible = computed(() =>
    this.ocupado()
      ? this.etiquetaOcupado()
      : this.activo()
        ? this.etiquetaActiva()
        : this.etiquetaInactiva(),
  );

  protected readonly etiquetaAriaCalculada = computed(() => {
    const personalizada = this.etiquetaAria();
    if (personalizada) return personalizada;

    const accion = this.mostrarEtiqueta()
      ? this.ocupado()
        ? this.ariaOcupado()
        : this.activo()
          ? this.etiquetaActiva()
          : this.etiquetaInactiva()
      : this.etiquetaInactiva();

    return `${accion} ${this.etiquetaElemento()}`;
  });

  protected readonly titulo = computed(() => {
    if (this.ocupado()) return this.tituloOcupado();

    const accion = this.activo() ? this.tituloActivo() : this.tituloInactivo();
    return `${accion}: ${this.etiquetaElemento()}`;
  });

  protected readonly tamanoIcono = computed(() => (this.tamano() === 'lg' ? 22 : 20));

  protected readonly clases = computed(() =>
    [
      'mupa-toggle-button',
      `mupa-toggle-button--${this.variante()}`,
      this.tamano() !== 'md' ? `mupa-toggle-button--${this.tamano()}` : '',
      this.mostrarEtiqueta() ? '' : 'mupa-toggle-button--icono',
      this.activo() ? 'mupa-toggle-button--activo' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  ngOnInit(): void {
    if (this.activoPorDefecto() && !this.controlado()) {
      this.activo.set(true);
    }
  }

  protected alHacerClic(evento: MouseEvent): void {
    if (this.bloqueado()) return;

    this.clic.emit(evento);
    if (evento.defaultPrevented) return;

    const siguiente = !this.activo();
    this.solicitudCambio.emit(siguiente);

    if (!this.controlado()) {
      this.activo.set(siguiente);
    }
  }
}
