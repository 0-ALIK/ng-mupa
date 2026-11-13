import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaLineChart } from './line-chart.component';

function datosDemo(cantidad = 30) {
  return Array.from({ length: cantidad }, (_, indice) => {
    const fecha = new Date(2026, 3, 1 + indice);
    return {
      date: `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(
        2,
        '0',
      )}-${String(fecha.getDate()).padStart(2, '0')}`,
      web: 60 + indice,
      app: 110 + indice,
    };
  });
}

describe('MupaLineChart', () => {
  let fixture: ComponentFixture<MupaLineChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaLineChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaLineChart);
    fixture.componentRef.setInput('titulo', 'Visitas a trámites');
    fixture.componentRef.setInput('datos', datosDemo());
    fixture.componentRef.setInput('series', [
      { clave: 'web', etiqueta: 'Portal web' },
      { clave: 'app', etiqueta: 'App Ciudadana' },
    ]);
  });

  it('renderiza el selector de series y los totales', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const botones = host.querySelectorAll('.mupa-line-chart__serie');
    expect(botones.length).toBe(2);
    expect(botones[0].getAttribute('aria-pressed')).toBe('true');
    expect(host.textContent).toContain('Total de Portal web');
    expect(host.querySelectorAll('tbody tr').length).toBe(30);
  });

  it('cambia la serie activa al pulsar una pestaña', () => {
    fixture.detectChanges();

    const botones = fixture.nativeElement.querySelectorAll(
      '.mupa-line-chart__serie',
    ) as NodeListOf<HTMLButtonElement>;
    botones[1].click();
    fixture.detectChanges();

    expect(botones[0].getAttribute('aria-pressed')).toBe('false');
    expect(botones[1].getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('Total de App Ciudadana');
  });

  it('muestra un estado sin datos', () => {
    fixture.componentRef.setInput('datos', []);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.mupa-line-chart__sin-datos')?.textContent,
    ).toContain('no hay datos disponibles');
  });

  it('oculta cabecera, tabla y borde', () => {
    fixture.componentRef.setInput('mostrarCabecera', false);
    fixture.componentRef.setInput('mostrarDatos', false);
    fixture.componentRef.setInput('mostrarBorde', false);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-line-chart__cabecera')).toBeNull();
    expect(host.querySelector('mupa-chart-data-table')).toBeNull();
    expect(
      host.querySelector('.mupa-chart-card')?.classList.contains('mupa-chart-card--sin-borde'),
    ).toBe(true);
  });

  it('oculta el título y conserva el selector de series', () => {
    fixture.componentRef.setInput('mostrarTitulo', false);
    fixture.componentRef.setInput('mostrarDescripcion', false);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-line-chart__titulo')).toBeNull();
    expect(host.querySelectorAll('.mupa-line-chart__serie').length).toBe(2);
  });
});
