import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaRadio } from './radio.component';

describe('MupaRadio', () => {
  let fixture: ComponentFixture<MupaRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaRadio],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaRadio);
    fixture.componentRef.setInput('nombre', 'metodo');
    fixture.componentRef.setInput('ariaLabel', 'Método de recepción');
    fixture.componentRef.setInput('opciones', [
      { valor: 'transferencia', etiqueta: 'Transferencia bancaria', descripcion: 'SWIFT / IBAN' },
      { valor: 'paypal', etiqueta: 'PayPal', descripcion: 'Desembolso inmediato' },
    ]);
  });

  it('renderiza el grupo y selecciona una opción', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const inputs = host.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    expect(host.querySelector('[role="radiogroup"]')).toBeTruthy();
    expect(inputs.length).toBe(2);

    inputs[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.valor()).toBe('paypal');
    expect(host.querySelectorAll('.mupa-radio__opcion--activa').length).toBe(1);
  });

  it('aplica la variante tarjeta solo cuando se solicita', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-radio')?.classList.contains('mupa-radio--tarjeta')).toBe(
      false,
    );

    fixture.componentRef.setInput('variante', 'tarjeta');
    fixture.detectChanges();

    expect(host.querySelector('.mupa-radio')?.classList.contains('mupa-radio--tarjeta')).toBe(true);
  });

  it('deshabilita todas las opciones', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    const inputs = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLInputElement>(
      'input[type="radio"]',
    );
    expect(Array.from(inputs).every((input) => input.disabled)).toBe(true);
  });
});
