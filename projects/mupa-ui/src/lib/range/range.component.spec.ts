import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaRange } from './range.component';

describe('MupaRange', () => {
  let fixture: ComponentFixture<MupaRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaRange],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaRange);
    fixture.componentRef.setInput('etiqueta', 'Brillo');
    fixture.componentRef.setInput('valor', 50);
  });

  it('renderiza el slider con sus límites', () => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.min).toBe('0');
    expect(input.max).toBe('100');
    expect(input.value).toBe('50');
  });

  it('actualiza el valor al mover el slider', () => {
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    input.value = '72';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.valor()).toBe(72);
  });

  it('muestra el valor cuando se solicita', () => {
    fixture.componentRef.setInput('mostrarValor', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('50');
  });
});
