import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaDataTable } from './data-table.component';
import { MupaTemplateDirective } from './template.directive';
import type { ColumnaTabla, RegistroTabla } from './data-table.types';

@Component({
  imports: [MupaDataTable, MupaTemplateDirective],
  template: `
    <mupa-data-table [columnas]="columnas" [filas]="filas">
      <ng-template mupaTemplate="detalle" let-fila let-indice="indice">
        <span class="celda-custom">{{ indice }}: {{ fila['nombre'] }}</span>
      </ng-template>
    </mupa-data-table>
  `,
})
class HostTablaComponent {
  readonly columnas: ColumnaTabla[] = [
    { clave: 'nombre', encabezado: 'Nombre' },
    { clave: 'detalle', encabezado: 'Detalle', plantilla: 'detalle' },
  ];

  readonly filas: RegistroTabla[] = [{ id: 1, nombre: 'Ana' }];
}

describe('MupaDataTable', () => {
  let fixture: ComponentFixture<MupaDataTable>;

  const columnas: ColumnaTabla[] = [
    { clave: 'codigo', encabezado: 'Código', tipo: 'mono', ordenable: true },
    { clave: 'nombre', encabezado: 'Nombre', ordenable: true },
    { clave: 'estado', encabezado: 'Estado', tipo: 'estado' },
  ];

  const filas: RegistroTabla[] = [
    { id: '1', codigo: 'A-001', nombre: 'Zeta', estado: 'Activo' },
    { id: '2', codigo: 'A-002', nombre: 'Alfa', estado: 'Pendiente' },
    { id: '3', codigo: 'A-003', nombre: 'Beta', estado: 'Dañado' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaDataTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaDataTable);
  });

  it('renderiza encabezados, filas y estados', () => {
    fixture.componentRef.setInput('columnas', columnas);
    fixture.componentRef.setInput('filas', filas);
    fixture.detectChanges();

    const encabezados = fixture.nativeElement.querySelectorAll('th');
    const filasRenderizadas = fixture.nativeElement.querySelectorAll(
      'tbody tr.mupa-data-table__fila',
    );
    const estados = fixture.nativeElement.querySelectorAll('.mupa-data-table__estado');

    expect(encabezados.length).toBe(3);
    expect(filasRenderizadas.length).toBe(3);
    expect(estados.length).toBe(3);
    expect((estados[0] as HTMLElement).textContent).toContain('Activo');
  });

  it('ordena ascendentemente, descendientemente y restaura el orden original', () => {
    fixture.componentRef.setInput('columnas', [
      { clave: 'nombre', encabezado: 'Nombre', ordenable: true },
    ]);
    fixture.componentRef.setInput('filas', filas);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '.mupa-data-table__orden',
    ) as HTMLButtonElement;
    const primerNombre = () =>
      (fixture.nativeElement.querySelector('tbody tr.mupa-data-table__fila td') as HTMLElement)
        .textContent;

    boton.click();
    fixture.detectChanges();
    expect(primerNombre()?.trim()).toBe('Alfa');
    expect(fixture.nativeElement.querySelector('th')?.getAttribute('aria-sort')).toBe('ascending');

    boton.click();
    fixture.detectChanges();
    expect(primerNombre()?.trim()).toBe('Zeta');
    expect(fixture.nativeElement.querySelector('th')?.getAttribute('aria-sort')).toBe('descending');

    boton.click();
    fixture.detectChanges();
    expect(primerNombre()?.trim()).toBe('Zeta');
    expect(fixture.nativeElement.querySelector('th')?.getAttribute('aria-sort')).toBeNull();
  });

  it('pagina localmente y actualiza la página actual', () => {
    fixture.componentRef.setInput('columnas', columnas);
    fixture.componentRef.setInput('filas', [
      ...filas,
      { id: '4', codigo: 'A-004', nombre: 'Gamma', estado: 'Activo' },
      { id: '5', codigo: 'A-005', nombre: 'Delta', estado: 'Activo' },
      { id: '6', codigo: 'A-006', nombre: 'Epsilon', estado: 'Activo' },
      { id: '7', codigo: 'A-007', nombre: 'Omega', estado: 'Activo' },
      { id: '8', codigo: 'A-008', nombre: 'Sigma', estado: 'Activo' },
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tbody tr.mupa-data-table__fila').length).toBe(4);
    expect(
      fixture.nativeElement.querySelector('.mupa-data-table__pagina-texto')?.textContent,
    ).toContain('Página 1 de 2');

    const siguiente = fixture.nativeElement.querySelector(
      '[aria-label="Página siguiente"]',
    ) as HTMLButtonElement;
    siguiente.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.pagina()).toBe(2);
    expect(
      fixture.nativeElement.querySelector('.mupa-data-table__pagina-texto')?.textContent,
    ).toContain('Página 2 de 2');
  });

  it('no pagina localmente cuando recibe un total remoto', () => {
    fixture.componentRef.setInput('columnas', columnas);
    fixture.componentRef.setInput('filas', filas);
    fixture.componentRef.setInput('total', 10);
    fixture.componentRef.setInput('tamanoPagina', 4);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('tbody tr.mupa-data-table__fila').length).toBe(3);
    expect(
      fixture.nativeElement.querySelector('.mupa-data-table__pagina-texto')?.textContent,
    ).toContain('Página 1 de 3');
  });

  it('ejecuta las acciones con la fila correspondiente', () => {
    let filaRecibida: RegistroTabla | undefined;

    fixture.componentRef.setInput('columnas', columnas);
    fixture.componentRef.setInput('filas', filas);
    fixture.componentRef.setInput('acciones', [
      {
        icono: 'eye',
        etiqueta: 'Ver detalle',
        alHacerClic: (fila: RegistroTabla) => (filaRecibida = fila),
      },
    ]);
    fixture.detectChanges();

    const accion = fixture.nativeElement.querySelector(
      '[aria-label="Ver detalle: 1"]',
    ) as HTMLButtonElement;
    accion.click();

    expect(filaRecibida).toEqual(filas[0]);
  });

  it('muestra el texto vacío cuando no hay filas', () => {
    fixture.componentRef.setInput('columnas', columnas);
    fixture.componentRef.setInput('filas', []);
    fixture.detectChanges();

    const vacio = fixture.nativeElement.querySelector('.mupa-data-table__vacio') as HTMLElement;
    expect(vacio.textContent).toContain('No hay registros para mostrar.');
  });

  it('renderiza celdas personalizadas con mupaTemplate y contexto let', () => {
    const host = TestBed.createComponent(HostTablaComponent);
    host.detectChanges();

    const celda = host.nativeElement.querySelector('.celda-custom') as HTMLElement;
    expect(celda.textContent?.trim()).toBe('0: Ana');
  });

  it('muestra un guion para valores vacíos', () => {
    fixture.componentRef.setInput('columnas', columnas);
    fixture.componentRef.setInput('filas', [
      { id: '1', codigo: 'A-001', nombre: null, estado: 'Activo' },
    ]);
    fixture.detectChanges();

    const sinAsignar = fixture.nativeElement.querySelector(
      '.mupa-data-table__sin-asignar',
    ) as HTMLElement;
    expect(sinAsignar.textContent).toContain('—');
  });
});
