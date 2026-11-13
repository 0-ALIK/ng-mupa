import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBarChart } from './bar-chart.component';

const DATOS = [
  { month: 'Enero', pagos: 186 },
  { month: 'Febrero', pagos: 305 },
  { month: 'Marzo', pagos: 237 },
];

describe('MupaBarChart', () => {
  let fixture: ComponentFixture<MupaBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaBarChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBarChart);
    fixture.componentRef.setInput('titulo', 'Pagos de impuestos');
    fixture.componentRef.setInput('datos', DATOS);
    fixture.componentRef.setInput('series', [{ clave: 'pagos', etiqueta: 'Pagos en línea' }]);
  });

  it('renderiza barras, etiquetas y tabla de datos', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Pagos de impuestos');
    expect(host.querySelectorAll('.mupa-bar-chart__barra').length).toBe(3);
    expect(host.querySelectorAll('tbody tr').length).toBe(3);
    expect(host.querySelectorAll('.mupa-chart-legend').length).toBe(0);
  });

  it('renderiza leyenda y barras agrupadas con varias series', () => {
    fixture.componentRef.setInput('datos', [
      { month: 'Enero', web: 186, app: 80 },
      { month: 'Febrero', web: 305, app: 200 },
    ]);
    fixture.componentRef.setInput('series', [
      { clave: 'web', etiqueta: 'Portal web' },
      { clave: 'app', etiqueta: 'App Ciudadana' },
    ]);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-bar-chart__barra').length).toBe(4);
    expect(host.querySelectorAll('.mupa-chart-legend__elemento').length).toBe(2);
  });

  it('muestra tendencia y nota al pie', () => {
    fixture.componentRef.setInput('tendencia', 'Subió 5,2% este mes');
    fixture.componentRef.setInput('notaAlPie', 'Últimos 6 meses');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Subió 5,2% este mes');
    expect(host.textContent).toContain('Últimos 6 meses');
  });

  it('oculta cabecera, tabla y borde', () => {
    fixture.componentRef.setInput('mostrarCabecera', false);
    fixture.componentRef.setInput('mostrarDatos', false);
    fixture.componentRef.setInput('mostrarBorde', false);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-chart-card__cabecera')).toBeNull();
    expect(host.querySelector('mupa-chart-data-table')).toBeNull();
    expect(
      host.querySelector('.mupa-chart-card')?.classList.contains('mupa-chart-card--sin-borde'),
    ).toBe(true);
  });
});
