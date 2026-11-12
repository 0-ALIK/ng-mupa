import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBubbleSuggestions } from './bubble-suggestions.component';

describe('MupaBubbleSuggestions', () => {
  let fixture: ComponentFixture<MupaBubbleSuggestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaBubbleSuggestions],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBubbleSuggestions);
  });

  it('renderiza los chips con el icono de respuesta', () => {
    fixture.componentRef.setInput('elementos', [
      'Consultar estado',
      { etiqueta: 'Pagar en línea', valor: 'pagar' },
    ]);
    fixture.detectChanges();

    const grupo = fixture.nativeElement.querySelector('.mupa-bubble-suggestions') as HTMLElement;
    const chips = fixture.nativeElement.querySelectorAll(
      '.mupa-bubble-suggestions__chip',
    ) as NodeListOf<HTMLButtonElement>;
    const icono = fixture.nativeElement.querySelector('svg') as SVGElement | null;

    expect(grupo.getAttribute('role')).toBe('group');
    expect(grupo.getAttribute('aria-label')).toBe('Sugerencias');
    expect(chips.length).toBe(2);
    expect(chips[0].textContent).toContain('Consultar estado');
    expect(chips[1].textContent).toContain('Pagar en línea');
    expect(icono?.getAttribute('data-lucide')).toBe('corner-down-right');
  });

  it('emite el valor de la sugerencia elegida', () => {
    let seleccionado = '';

    fixture.componentRef.setInput('elementos', [
      'Consultar estado',
      { etiqueta: 'Pagar en línea', valor: 'pagar' },
    ]);
    fixture.componentInstance.seleccionar.subscribe((valor) => (seleccionado = valor));
    fixture.detectChanges();

    const chips = fixture.nativeElement.querySelectorAll(
      '.mupa-bubble-suggestions__chip',
    ) as NodeListOf<HTMLButtonElement>;
    chips[1].click();

    expect(seleccionado).toBe('pagar');
  });
});
