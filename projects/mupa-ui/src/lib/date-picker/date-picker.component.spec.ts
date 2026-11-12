import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MupaDatePicker } from './date-picker.component';
import type { RangoFechas } from './date-picker.types';

@Component({
  imports: [MupaDatePicker, ReactiveFormsModule],
  template: `<mupa-date-picker [formControl]="control" />`,
})
class HostDatePickerComponent {
  readonly control = new FormControl<Date | RangoFechas | null>(new Date(2026, 0, 15));
}

function inicioDelDia(fecha: Date): Date {
  const resultado = new Date(fecha);
  resultado.setHours(0, 0, 0, 0);
  return resultado;
}

describe('MupaDatePicker', () => {
  let fixture: ComponentFixture<MupaDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaDatePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaDatePicker);
  });

  function botonDia(fecha: Date): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector(
      `[data-date="${inicioDelDia(fecha).getTime()}"]`,
    ) as HTMLButtonElement | null;
  }

  it('muestra el mes de la fecha inicial', () => {
    fixture.componentRef.setInput('fecha', new Date(2026, 0, 15));
    fixture.detectChanges();

    const mes = fixture.nativeElement.querySelector('.mupa-datepicker__mes') as HTMLElement;
    expect(mes.textContent).toContain('enero 2026');
    expect(fixture.nativeElement.querySelectorAll('[role="columnheader"]').length).toBe(7);
  });

  it('selecciona una fecha en modo simple', () => {
    let seleccionada: Date | undefined;
    fixture.componentInstance.seleccion.subscribe((valor) => {
      if (valor instanceof Date) seleccionada = valor;
    });

    fixture.componentRef.setInput('fecha', new Date(2026, 0, 15));
    fixture.detectChanges();

    const boton = botonDia(new Date(2026, 0, 20));
    expect(boton).toBeTruthy();
    boton?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.fecha()?.getDate()).toBe(20);
    expect(seleccionada?.getDate()).toBe(20);
  });

  it('selecciona un rango completo', () => {
    fixture.componentRef.setInput('modo', 'range');
    fixture.componentRef.setInput('rango', {
      inicio: new Date(2026, 0, 1),
      fin: new Date(2026, 0, 1),
    });
    fixture.detectChanges();

    botonDia(new Date(2026, 0, 10))?.click();
    fixture.detectChanges();
    botonDia(new Date(2026, 0, 20))?.click();
    fixture.detectChanges();

    const rango = fixture.componentInstance.rango();
    const estado = fixture.nativeElement.querySelector('.mupa-datepicker__estado') as HTMLElement;

    expect(rango.inicio?.getDate()).toBe(10);
    expect(rango.fin?.getDate()).toBe(20);
    expect(estado.textContent).toContain('Del');
  });

  it('marca el día actual con aria-current', () => {
    fixture.detectChanges();

    const hoy = fixture.nativeElement.querySelector('[aria-current="date"]') as HTMLElement;
    expect(hoy).toBeTruthy();
  });

  it('navega con las flechas y cambia de mes', () => {
    fixture.componentRef.setInput('fecha', new Date(2026, 0, 15));
    fixture.detectChanges();

    const dia = botonDia(new Date(2026, 0, 15)) as HTMLButtonElement;
    dia.focus();
    dia.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(botonDia(new Date(2026, 0, 16))?.getAttribute('tabindex')).toBe('0');

    botonDia(new Date(2026, 0, 16))?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }),
    );
    fixture.detectChanges();

    const mes = fixture.nativeElement.querySelector('.mupa-datepicker__mes') as HTMLElement;
    expect(mes.textContent).toContain('febrero 2026');
  });

  it('deshabilita los días atenuados', () => {
    fixture.detectChanges();

    const deshabilitados = fixture.nativeElement.querySelectorAll('.mupa-datepicker__dia:disabled');
    expect(deshabilitados.length).toBeGreaterThan(0);
  });

  it('marca los días intermedios del rango como seleccionados', () => {
    fixture.componentRef.setInput('modo', 'range');
    fixture.componentRef.setInput('rango', {
      inicio: new Date(2026, 0, 1),
      fin: new Date(2026, 0, 1),
    });
    fixture.detectChanges();

    botonDia(new Date(2026, 0, 10))?.click();
    botonDia(new Date(2026, 0, 20))?.click();
    fixture.detectChanges();

    const intermedio = fixture.nativeElement
      .querySelector(`[data-date="${inicioDelDia(new Date(2026, 0, 15)).getTime()}"]`)
      ?.closest('[role="gridcell"]') as HTMLElement;

    expect(intermedio.getAttribute('aria-selected')).toBe('true');
  });

  describe('ControlValueAccessor', () => {
    it('escribe la fecha del FormControl en el calendario', () => {
      const host = TestBed.createComponent(HostDatePickerComponent);
      host.detectChanges();

      host.componentInstance.control.setValue(new Date(2026, 1, 12));
      host.detectChanges();

      const mes = host.nativeElement.querySelector('.mupa-datepicker__mes') as HTMLElement;
      expect(mes.textContent).toContain('febrero 2026');
    });

    it('actualiza el FormControl al elegir un día', () => {
      const host = TestBed.createComponent(HostDatePickerComponent);
      host.detectChanges();

      const boton = host.nativeElement.querySelector(
        `[data-date="${inicioDelDia(new Date(2026, 0, 20)).getTime()}"]`,
      ) as HTMLButtonElement;
      boton.click();
      host.detectChanges();

      const valor = host.componentInstance.control.value;
      expect(valor instanceof Date).toBe(true);
      expect((valor as Date).getDate()).toBe(20);
      expect(host.componentInstance.control.touched).toBe(true);
    });

    it('sincroniza el estado deshabilitado', () => {
      const host = TestBed.createComponent(HostDatePickerComponent);
      host.detectChanges();

      host.componentInstance.control.disable();
      host.detectChanges();

      const anterior = host.nativeElement.querySelector(
        '[aria-label="Mes anterior"]',
      ) as HTMLButtonElement;
      expect(anterior.disabled).toBe(true);
    });
  });
});
