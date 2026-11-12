import { DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, type AbstractControl, type ControlValueAccessor } from '@angular/forms';

/**
 * Base compartida para los controles personalizados del sistema de diseño.
 *
 * Implementa `ControlValueAccessor` para Reactive Forms y Template-driven.
 * El `FormField` de Signal Forms también puede usar el control a través de la
 * capa de compatibilidad CVA.
 *
 * Mantiene sincronizados el estado deshabilitado, inválido, tocado y requerido
 * del `NgControl` asociado.
 */
export abstract class MupaFormControlBase<T> implements ControlValueAccessor {
  protected readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destruirBase = inject(DestroyRef);

  protected readonly deshabilitadoFormulario = signal(false);
  protected readonly invalidoFormulario = signal(false);
  protected readonly tocadoFormulario = signal(false);
  protected readonly requeridoFormulario = signal(false);

  protected readonly deshabilitadoEfectivo = computed(() => this.deshabilitadoFormulario());

  private onChange: (valor: T) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor() {
    const control = this.ngControl?.control;

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    if (control) {
      this.actualizarEstado(control);
      control.events
        .pipe(takeUntilDestroyed(this.destruirBase))
        .subscribe(() => this.actualizarEstado(control));
    }
  }

  writeValue(valor: T): void {
    this.escribirValor(valor);
  }

  registerOnChange(fn: (valor: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(deshabilitado: boolean): void {
    this.deshabilitadoFormulario.set(deshabilitado);
  }

  protected notificarCambio(valor: T): void {
    this.onChange(valor);
  }

  protected notificarTocado(): void {
    this.tocadoFormulario.set(true);
    this.onTouched();
  }

  protected abstract escribirValor(valor: T): void;

  private actualizarEstado(control: AbstractControl): void {
    this.invalidoFormulario.set(control.invalid);
    this.tocadoFormulario.set(control.touched);
    this.requeridoFormulario.set(control.hasError('required'));
  }
}
