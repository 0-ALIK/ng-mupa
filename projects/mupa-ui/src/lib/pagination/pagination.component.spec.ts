import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaPagination } from './pagination.component';

describe('MupaPagination', () => {
  let fixture: ComponentFixture<MupaPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaPagination);
  });

  it('marca la página actual con aria-current', () => {
    fixture.componentRef.setInput('pagina', 3);
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();

    const actual = fixture.nativeElement.querySelector(
      '[aria-current="page"]',
    ) as HTMLButtonElement;

    expect(actual).toBeTruthy();
    expect(actual.textContent?.trim()).toBe('3');
  });

  it('cambia de página al pulsar siguiente', () => {
    fixture.componentRef.setInput('pagina', 3);
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '[aria-label="Página siguiente"]',
    ) as HTMLButtonElement;
    boton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.pagina()).toBe(4);
  });

  it('deshabilita anterior y siguiente en los extremos', () => {
    fixture.componentRef.setInput('pagina', 1);
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();

    const anterior = fixture.nativeElement.querySelector(
      '[aria-label="Página anterior"]',
    ) as HTMLButtonElement;
    expect(anterior.disabled).toBe(true);

    fixture.componentRef.setInput('pagina', 10);
    fixture.detectChanges();

    const siguiente = fixture.nativeElement.querySelector(
      '[aria-label="Página siguiente"]',
    ) as HTMLButtonElement;
    expect(siguiente.disabled).toBe(true);
  });

  it('muestra los extremos en la variante compacta', () => {
    fixture.componentRef.setInput('variante', 'compact');
    fixture.componentRef.setInput('pagina', 3);
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-label="Primera página"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Última página"]')).toBeTruthy();

    fixture.componentRef.setInput('mostrarExtremos', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-label="Primera página"]')).toBeNull();
  });

  it('colapsa rangos largos con puntos suspensivos', () => {
    fixture.componentRef.setInput('variante', 'compact');
    fixture.componentRef.setInput('pagina', 5);
    fixture.componentRef.setInput('total', 20);
    fixture.detectChanges();

    const puntos = fixture.nativeElement.querySelectorAll('.mupa-pagination__puntos');
    expect(puntos.length).toBeGreaterThan(0);
  });

  it('muestra el estado en la variante simple', () => {
    fixture.componentRef.setInput('variante', 'simple');
    fixture.componentRef.setInput('pagina', 3);
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();

    const estado = fixture.nativeElement.querySelector('.mupa-pagination__estado') as HTMLElement;
    expect(estado.textContent).toContain('Página');
    expect(estado.textContent).toContain('3');
    expect(estado.textContent).toContain('10');
  });

  it('muestra el rango con hermanos configurados', () => {
    fixture.componentRef.setInput('variante', 'compact');
    fixture.componentRef.setInput('pagina', 10);
    fixture.componentRef.setInput('total', 20);
    fixture.componentRef.setInput('hermanos', 2);
    fixture.detectChanges();

    const botones = Array.from(
      fixture.nativeElement.querySelectorAll('.mupa-pagination__boton'),
    ).map((boton) => (boton as HTMLButtonElement).textContent?.trim());

    expect(botones).toContain('8');
    expect(botones).toContain('9');
    expect(botones).toContain('10');
    expect(botones).toContain('11');
    expect(botones).toContain('12');
  });
});
