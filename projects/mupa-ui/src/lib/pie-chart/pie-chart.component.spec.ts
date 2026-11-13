import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaPieChart } from './pie-chart.component';

const DATOS = [
  { clave: 'vias', etiqueta: 'Vías', valor: 275 },
  { clave: 'basura', etiqueta: 'Recolección', valor: 200 },
  { clave: 'luz', etiqueta: 'Alumbrado', valor: 187 },
  { clave: 'agua', etiqueta: 'Drenaje', valor: 173 },
  { clave: 'otros', etiqueta: 'Otros', valor: 90 },
];

describe('MupaPieChart', () => {
  let fixture: ComponentFixture<MupaPieChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaPieChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaPieChart);
    fixture.componentRef.setInput('titulo', 'Reportes por categoría');
    fixture.componentRef.setInput('datos', DATOS);
  });

  it('renderiza porciones, leyenda y tabla de datos', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-pie-chart__porcion').length).toBe(5);
    expect(host.querySelectorAll('.mupa-chart-legend__elemento').length).toBe(5);
    expect(host.querySelectorAll('tbody tr').length).toBe(5);
  });

  it('permite ocultar la leyenda y mostrar etiquetas internas', () => {
    fixture.componentRef.setInput('mostrarLeyenda', false);
    fixture.componentRef.setInput('listaEtiquetas', 'etiqueta');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-chart-legend')).toBeNull();
    expect(host.querySelectorAll('.mupa-pie-chart__etiqueta-porcion').length).toBe(5);
  });

  it('admite una dona con radio interior', () => {
    fixture.componentRef.setInput('radioInterior', 0.6);
    fixture.detectChanges();

    const porciones = fixture.nativeElement.querySelectorAll(
      '.mupa-pie-chart__porcion',
    ) as NodeListOf<SVGPathElement>;
    expect(porciones[0].getAttribute('d')).toContain('A');
  });
});
