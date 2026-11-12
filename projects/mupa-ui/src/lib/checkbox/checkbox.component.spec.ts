import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MupaCheckbox } from './checkbox.component';

@Component({
  imports: [MupaCheckbox, ReactiveFormsModule],
  template: `<mupa-checkbox [formControl]="control" etiqueta="Acepto" />`,
})
class HostCheckboxComponent {
  readonly control = new FormControl(false, { nonNullable: true });
}

describe('MupaCheckbox', () => {
  let fixture: ComponentFixture<MupaCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaCheckbox);
  });

  it('crea la casilla sin marcar', () => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.checked).toBe(false);
  });

  it('marca la casilla al hacer clic', () => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.marcado()).toBe(true);
  });

  it('refleja el estado indeterminado en el input nativo', () => {
    fixture.componentRef.setInput('indeterminado', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('mixed');
  });

  it('muestra la etiqueta', () => {
    fixture.componentRef.setInput('etiqueta', 'Acepto los términos');
    fixture.detectChanges();

    const etiqueta = fixture.nativeElement.querySelector('.mupa-checkbox__etiqueta') as HTMLElement;
    expect(etiqueta.textContent).toContain('Acepto los términos');
  });

  it('deshabilita la casilla', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  describe('ControlValueAccessor', () => {
    it('escribe el valor del FormControl en la casilla', () => {
      const host = TestBed.createComponent(HostCheckboxComponent);
      host.detectChanges();

      host.componentInstance.control.setValue(true);
      host.detectChanges();

      const input = host.nativeElement.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('actualiza el FormControl al cambiar la casilla', () => {
      const host = TestBed.createComponent(HostCheckboxComponent);
      host.detectChanges();

      const input = host.nativeElement.querySelector('input') as HTMLInputElement;
      input.click();
      host.detectChanges();

      expect(host.componentInstance.control.value).toBe(true);
    });

    it('sincroniza el estado deshabilitado y tocado', () => {
      const host = TestBed.createComponent(HostCheckboxComponent);
      host.detectChanges();

      host.componentInstance.control.disable();
      host.detectChanges();

      const input = host.nativeElement.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);

      input.dispatchEvent(new Event('blur'));
      host.detectChanges();

      expect(host.componentInstance.control.touched).toBe(true);
    });
  });
});
