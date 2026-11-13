import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaDistributionBar } from './distribution-bar.component';

const ITEMS = [
  { id: 'finalizados', etiqueta: 'Finalizados', valor: 1462, tono: 'success' as const },
  { id: 'vigentes', etiqueta: 'Vigentes', valor: 1359, tono: 'primary' as const },
  { id: 'vencidos', etiqueta: 'Vencidos', valor: 2109, tono: 'error' as const },
];

describe('MupaDistributionBar', () => {
  let fixture: ComponentFixture<MupaDistributionBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaDistributionBar],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaDistributionBar);
    fixture.componentRef.setInput('titulo', 'Estado de los expedientes');
    fixture.componentRef.setInput('elementos', ITEMS);
    fixture.componentRef.setInput('total', 4930);
  });

  it('renderiza segmentos, total y leyenda', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-distribution__segmento').length).toBe(3);
    expect(host.querySelectorAll('.mupa-distribution__leyenda li').length).toBe(3);
    expect(host.textContent).toContain('4,930');
    expect(host.textContent).toContain('Finalizados');
  });

  it('muestra un error cuando el total no coincide', () => {
    fixture.componentRef.setInput('total', 5000);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-distribution__error')?.textContent).toContain('no coinciden');
    expect(host.querySelector('.mupa-distribution__barra')).toBeNull();
  });

  it('muestra el estado vacío cuando todo suma cero', () => {
    fixture.componentRef.setInput('elementos', [
      { id: 'a', etiqueta: 'A', valor: 0 },
      { id: 'b', etiqueta: 'B', valor: 0 },
    ]);
    fixture.componentRef.setInput('total', 0);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-distribution__vacio')?.textContent).toContain(
      'No hay registros',
    );
    expect(host.querySelector('.mupa-distribution__barra--vacia')).toBeTruthy();
  });

  it('avisa de la diferencia de redondeo', () => {
    fixture.componentRef.setInput('elementos', [
      { id: 'a', etiqueta: 'A', valor: 1 },
      { id: 'b', etiqueta: 'B', valor: 1 },
      { id: 'c', etiqueta: 'C', valor: 1 },
    ]);
    fixture.componentRef.setInput('total', undefined);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.mupa-distribution__redondeo')?.textContent,
    ).toContain('100 % exacto');
  });
});
