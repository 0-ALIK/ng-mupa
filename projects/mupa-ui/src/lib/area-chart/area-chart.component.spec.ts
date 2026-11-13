import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaAreaChart } from './area-chart.component';

function datosDemo(cantidad = 40) {
  return Array.from({ length: cantidad }, (_, indice) => {
    const fecha = new Date(2026, 0, 1 + indice);
    return {
      date: `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(
        2,
        '0',
      )}-${String(fecha.getDate()).padStart(2, '0')}`,
      web: 100 + indice,
      app: 80 + indice,
    };
  });
}

describe('MupaAreaChart', () => {
  let fixture: ComponentFixture<MupaAreaChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaAreaChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaAreaChart);
    fixture.componentRef.setInput('titulo', 'Reportes ciudadanos');
    fixture.componentRef.setInput('datos', datosDemo());
    fixture.componentRef.setInput('series', [
      { clave: 'web', etiqueta: 'Portal web' },
      { clave: 'app', etiqueta: 'App Ciudadana' },
    ]);
  });

  it('renderiza título, series, rangos y tabla de datos', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Reportes ciudadanos');
    expect(host.querySelectorAll('.mupa-area-chart__rango').length).toBe(3);
    expect(host.querySelectorAll('.mupa-chart-legend__elemento').length).toBe(2);
    expect(host.querySelectorAll('tbody tr').length).toBe(40);
    expect(host.querySelectorAll('.mupa-area-chart__svg path').length).toBe(4);
  });

  it('filtra las filas al cambiar de rango', () => {
    fixture.detectChanges();

    const boton = Array.from(
      fixture.nativeElement.querySelectorAll(
        '.mupa-area-chart__rango',
      ) as NodeListOf<HTMLButtonElement>,
    ).find((elemento) => elemento.textContent?.includes('30 días'));

    boton?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(30);
    expect(boton?.getAttribute('aria-pressed')).toBe('true');
  });

  it('respeta el rango por defecto', () => {
    fixture.componentRef.setInput('rangoPorDefecto', '7d');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(7);
  });

  it('oculta cabecera, tabla y borde', () => {
    fixture.componentRef.setInput('mostrarCabecera', false);
    fixture.componentRef.setInput('mostrarDatos', false);
    fixture.componentRef.setInput('mostrarBorde', false);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-area-chart__cabecera')).toBeNull();
    expect(host.querySelector('mupa-chart-data-table')).toBeNull();
    expect(
      host.querySelector('.mupa-chart-card')?.classList.contains('mupa-chart-card--sin-borde'),
    ).toBe(true);
  });

  it('oculta el título y conserva el selector de periodo', () => {
    fixture.componentRef.setInput('mostrarTitulo', false);
    fixture.componentRef.setInput('mostrarDescripcion', false);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-area-chart__titulo')).toBeNull();
    expect(host.querySelectorAll('.mupa-area-chart__rango').length).toBe(3);
  });
});
