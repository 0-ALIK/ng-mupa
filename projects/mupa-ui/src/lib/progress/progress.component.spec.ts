import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaProgress } from './progress.component';

describe('MupaProgress', () => {
  let fixture: ComponentFixture<MupaProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaProgress);
    fixture.componentRef.setInput('valor', 40);
    fixture.componentRef.setInput('etiqueta', 'Avance');
  });

  it('renderiza la barra y calcula el porcentaje', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const barra = host.querySelector('[role="progressbar"]');
    const relleno = host.querySelector<HTMLElement>('.mupa-progress__relleno');

    expect(barra?.getAttribute('aria-valuenow')).toBe('40');
    expect(barra?.getAttribute('aria-valuemax')).toBe('100');
    expect(relleno?.style.width).toBe('40%');
  });

  it('limita el valor al rango de la escala', () => {
    fixture.componentRef.setInput('valor', 150);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mupa-progress__relleno')?.style.width).toBe(
      '100%',
    );
  });

  it('muestra el porcentaje cuando se solicita', () => {
    fixture.componentRef.setInput('mostrarValor', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('40%');
  });
});
