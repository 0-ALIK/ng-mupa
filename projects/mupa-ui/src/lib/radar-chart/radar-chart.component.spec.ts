import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaRadarChart } from './radar-chart.component';

const DATOS = [
  { month: 'Enero', web: 186, app: 80 },
  { month: 'Febrero', web: 305, app: 200 },
  { month: 'Marzo', web: 237, app: 120 },
  { month: 'Abril', web: 73, app: 190 },
];

describe('MupaRadarChart', () => {
  let fixture: ComponentFixture<MupaRadarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaRadarChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaRadarChart);
    fixture.componentRef.setInput('titulo', 'Reportes por canal');
    fixture.componentRef.setInput('datos', DATOS);
    fixture.componentRef.setInput('series', [
      { clave: 'web', etiqueta: 'Portal web' },
      { clave: 'app', etiqueta: 'App Ciudadana' },
    ]);
  });

  it('renderiza ejes, series, leyenda y tabla de datos', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-radar-chart__etiqueta-eje').length).toBe(4);
    expect(host.querySelectorAll('.mupa-chart-legend__elemento').length).toBe(2);
    expect(host.querySelectorAll('tbody tr').length).toBe(4);
  });

  it('cambia a cuadrícula circular', () => {
    fixture.componentRef.setInput('cuadricula', 'circle');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.mupa-radar-chart__svg circle').length).toBe(5);
  });

  it('oculta la leyenda con una sola serie', () => {
    fixture.componentRef.setInput('series', [{ clave: 'web', etiqueta: 'Portal web' }]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mupa-chart-legend')).toBeNull();
  });
});
