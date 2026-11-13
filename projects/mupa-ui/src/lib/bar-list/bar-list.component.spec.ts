import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBarList } from './bar-list.component';

describe('MupaBarList', () => {
  let fixture: ComponentFixture<MupaBarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaBarList],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBarList);
    fixture.componentRef.setInput('titulo', 'Canales de llegada');
    fixture.componentRef.setInput('etiquetaValor', 'Visitas');
    fixture.componentRef.setInput('elementos', [
      { etiqueta: 'Acceso directo', valor: 5120, icono: 'search' },
      { etiqueta: 'Búsqueda en Google', valor: 2560, texto: '50 %' },
    ]);
  });

  it('renderiza el ranking, valores y barras', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const barras = host.querySelectorAll('.mupa-bar-list__relleno') as NodeListOf<HTMLElement>;

    expect(host.textContent).toContain('Canales de llegada');
    expect(host.textContent).toContain('Visitas');
    expect(host.querySelectorAll('.mupa-bar-list__item').length).toBe(2);
    expect(barras[0].style.width).toBe('100%');
    expect(barras[1].style.width).toBe('50%');
    expect(host.textContent).toContain('50 %');
  });

  it('no incluye tabla de datos', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mupa-chart-data-table')).toBeNull();
  });
});
