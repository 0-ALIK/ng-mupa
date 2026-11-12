import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MupaSelect } from './select.component';
import type { OpcionSelect } from './select.types';

@Component({
  imports: [MupaSelect, ReactiveFormsModule],
  template: ` <mupa-select [formControl]="control" etiqueta="Trámite" [opciones]="opciones" /> `,
})
class HostSelectComponent {
  readonly control = new FormControl<string | null>(null);
  readonly opciones: OpcionSelect[] = [
    { etiqueta: 'Selecciona una opción', valor: null },
    { etiqueta: 'Licencias', valor: 'licencias' },
    { etiqueta: 'Permisos', valor: 'permisos' },
  ];
}

describe('MupaSelect', () => {
  let fixture: ComponentFixture<MupaSelect>;

  const opciones: OpcionSelect[] = [
    { etiqueta: 'Selecciona una opción', valor: null },
    { etiqueta: 'Licencias', valor: 'licencias' },
    { etiqueta: 'Permisos', valor: 'permisos' },
    { etiqueta: 'Pagos', valor: 'pagos', deshabilitada: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaSelect);
    fixture.componentRef.setInput('opciones', opciones);
    fixture.componentRef.setInput('etiqueta', 'Tipo de trámite');
  });

  it('muestra la etiqueta y el marcador', () => {
    fixture.detectChanges();

    const etiqueta = fixture.nativeElement.querySelector('.mupa-select__etiqueta') as HTMLElement;
    const valor = fixture.nativeElement.querySelector('.mupa-select__valor') as HTMLElement;

    expect(etiqueta.textContent).toContain('Tipo de trámite');
    expect(valor.textContent?.trim()).toBe('Selecciona una opción');
  });

  it('abre la lista y selecciona una opción', () => {
    fixture.detectChanges();

    const disparador = fixture.nativeElement.querySelector(
      '.mupa-select__disparador',
    ) as HTMLButtonElement;
    disparador.click();
    fixture.detectChanges();

    const lista = fixture.nativeElement.querySelector('[role="listbox"]') as HTMLElement;
    expect(lista).toBeTruthy();

    const opcion = lista.querySelector('[data-idx="0"]') as HTMLElement;
    opcion.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.valor()).toBe('licencias');
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).toBeNull();
  });

  it('navega y selecciona con el teclado', () => {
    fixture.detectChanges();

    const disparador = fixture.nativeElement.querySelector(
      '.mupa-select__disparador',
    ) as HTMLButtonElement;

    disparador.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();

    disparador.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    disparador.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.valor()).toBe('permisos');
  });

  it('omite las opciones deshabilitadas', () => {
    fixture.detectChanges();

    const disparador = fixture.nativeElement.querySelector(
      '.mupa-select__disparador',
    ) as HTMLButtonElement;
    disparador.click();
    fixture.detectChanges();

    const deshabilitada = fixture.nativeElement.querySelector('[data-idx="2"]') as HTMLElement;
    expect(deshabilitada.getAttribute('aria-disabled')).toBe('true');

    deshabilitada.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.valor()).toBeNull();
  });

  it('renderiza grupos con encabezados', () => {
    fixture.componentRef.setInput('grupos', [
      { etiqueta: 'Servicios', opciones: [{ etiqueta: 'Licencias', valor: 'licencias' }] },
      { etiqueta: 'Pagos', opciones: [{ etiqueta: 'Tasas', valor: 'tasas' }] },
    ]);
    fixture.detectChanges();

    const disparador = fixture.nativeElement.querySelector(
      '.mupa-select__disparador',
    ) as HTMLButtonElement;
    disparador.click();
    fixture.detectChanges();

    const grupos = fixture.nativeElement.querySelectorAll('[role="group"]');
    expect(grupos.length).toBe(2);
    expect((grupos[0] as HTMLElement).getAttribute('aria-label')).toBe('Servicios');
  });

  it('muestra el error y el texto de ayuda', () => {
    fixture.componentRef.setInput('error', 'Selecciona un trámite');
    fixture.detectChanges();

    const ayuda = fixture.nativeElement.querySelector('.mupa-select__ayuda') as HTMLElement;
    const disparador = fixture.nativeElement.querySelector(
      '.mupa-select__disparador',
    ) as HTMLButtonElement;

    expect(ayuda.textContent).toContain('Selecciona un trámite');
    expect(disparador.getAttribute('aria-invalid')).toBe('true');
    expect(disparador.classList.contains('mupa-select__disparador--error')).toBe(true);
  });

  it('deshabilita el selector', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    const disparador = fixture.nativeElement.querySelector(
      '.mupa-select__disparador',
    ) as HTMLButtonElement;

    expect(disparador.disabled).toBe(true);
    disparador.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).toBeNull();
  });

  it('expone un campo oculto cuando se indica nombre', () => {
    fixture.componentRef.setInput('nombre', 'tramite');
    fixture.componentRef.setInput('valor', 'licencias');
    fixture.detectChanges();

    const oculto = fixture.nativeElement.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(oculto.name).toBe('tramite');
    expect(oculto.value).toBe('licencias');
  });

  describe('ControlValueAccessor', () => {
    it('escribe el valor del FormControl en el selector', () => {
      const host = TestBed.createComponent(HostSelectComponent);
      host.detectChanges();

      host.componentInstance.control.setValue('permisos');
      host.detectChanges();

      const valor = host.nativeElement.querySelector('.mupa-select__valor') as HTMLElement;
      expect(valor.textContent?.trim()).toBe('Permisos');
    });

    it('actualiza el FormControl al elegir una opción', () => {
      const host = TestBed.createComponent(HostSelectComponent);
      host.detectChanges();

      const disparador = host.nativeElement.querySelector(
        '.mupa-select__disparador',
      ) as HTMLButtonElement;
      disparador.click();
      host.detectChanges();

      const opcion = host.nativeElement.querySelector('[data-idx="0"]') as HTMLElement;
      opcion.click();
      host.detectChanges();

      expect(host.componentInstance.control.value).toBe('licencias');
    });

    it('sincroniza deshabilitado y tocado', () => {
      const host = TestBed.createComponent(HostSelectComponent);
      host.detectChanges();

      host.componentInstance.control.disable();
      host.detectChanges();

      const disparador = host.nativeElement.querySelector(
        '.mupa-select__disparador',
      ) as HTMLButtonElement;
      expect(disparador.disabled).toBe(true);

      disparador.dispatchEvent(new Event('blur'));
      host.detectChanges();

      expect(host.componentInstance.control.touched).toBe(true);
    });
  });
});
