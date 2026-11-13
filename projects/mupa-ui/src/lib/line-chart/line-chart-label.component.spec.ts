import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaLineChartLabel } from './line-chart-label.component';

const DATOS = [
  { canal: 'app', reportes: 275 },
  { canal: 'web', reportes: 200 },
  { canal: 'linea', reportes: 187 },
];

describe('MupaLineChartLabel', () => {
  let fixture: ComponentFixture<MupaLineChartLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaLineChartLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaLineChartLabel);
    fixture.componentRef.setInput('titulo', 'Reportes por canal');
    fixture.componentRef.setInput('datos', DATOS);
    fixture.componentRef.setInput('claveCategoria', 'canal');
    fixture.componentRef.setInput('claveValor', 'reportes');
    fixture.componentRef.setInput('etiquetaSerie', 'Reportes');
  });

  it('renderiza valores sobre cada punto y la tabla de datos', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-line-chart-label__valor-punto').length).toBe(3);
    expect(host.querySelectorAll('tbody tr').length).toBe(3);
    expect(host.textContent).toContain('Reportes por canal');
  });

  it('usa etiquetas personalizadas sobre los puntos', () => {
    fixture.componentRef.setInput('claveEtiquetaPunto', 'canal');
    fixture.componentRef.setInput('etiquetasPunto', {
      app: 'App Ciudadana',
      web: 'Portal web',
      linea: 'Línea 311',
    });
    fixture.componentRef.setInput('mostrarEjeX', false);
    fixture.detectChanges();

    const etiquetas = Array.from(
      fixture.nativeElement.querySelectorAll(
        '.mupa-line-chart-label__valor-punto',
      ) as NodeListOf<SVGTextElement>,
    ).map((elemento) => elemento.textContent?.trim());

    expect(etiquetas).toEqual(['App Ciudadana', 'Portal web', 'Línea 311']);
  });
});
