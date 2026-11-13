import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaRadialChart } from './radial-chart.component';

const DATOS = [
  { clave: 'vias', etiqueta: 'Vías', valor: 275 },
  { clave: 'basura', etiqueta: 'Recolección', valor: 200 },
  { clave: 'luz', etiqueta: 'Alumbrado', valor: 187 },
];

describe('MupaRadialChart', () => {
  let fixture: ComponentFixture<MupaRadialChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaRadialChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaRadialChart);
    fixture.componentRef.setInput('titulo', 'Reportes por categoría');
    fixture.componentRef.setInput('datos', DATOS);
  });

  it('renderiza arcos, etiquetas y tabla de datos', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-radial-chart__arco').length).toBe(3);
    expect(host.querySelectorAll('.mupa-radial-chart__etiqueta-arco').length).toBe(3);
    expect(host.querySelectorAll('tbody tr').length).toBe(3);
  });

  it('muestra la cifra central y oculta las etiquetas de arco', () => {
    fixture.componentRef.setInput('valorCentral', 200);
    fixture.componentRef.setInput('etiquetaCentral', 'Resueltos');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-radial-chart__etiqueta-arco').length).toBe(0);
    expect(host.textContent).toContain('200');
    expect(host.textContent).toContain('Resueltos');
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
