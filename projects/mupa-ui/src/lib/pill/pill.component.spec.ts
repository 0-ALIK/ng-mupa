import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaPill } from './pill.component';

describe('MupaPill', () => {
  let fixture: ComponentFixture<MupaPill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaPill],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaPill);
  });

  function pill(): HTMLElement {
    return fixture.nativeElement.querySelector('.mupa-pill') as HTMLElement;
  }

  it('renderiza la etiqueta y el icono', () => {
    fixture.componentRef.setInput('etiqueta', 'Servicios digitales');
    fixture.componentRef.setInput('icono', 'map');
    fixture.detectChanges();

    expect(pill().textContent).toContain('Servicios digitales');
    expect(fixture.nativeElement.querySelector('mupa-icon')).toBeTruthy();
  });

  it('aplica el color de categoría', () => {
    fixture.componentRef.setInput('etiqueta', 'Cultura');
    fixture.componentRef.setInput('color', 'purple');
    fixture.detectChanges();

    expect(pill().style.background).toContain('--color-purple-100');
    expect(pill().style.color).toContain('--color-purple-700');
  });

  it('aplica el color semántico', () => {
    fixture.componentRef.setInput('etiqueta', 'Resuelto');
    fixture.componentRef.setInput('color', 'success');
    fixture.detectChanges();

    expect(pill().style.background).toContain('--color-success-100');
    expect(pill().style.color).toContain('--color-success-700');
  });

  it('aplica la variante sólida', () => {
    fixture.componentRef.setInput('etiqueta', 'Calidonia');
    fixture.componentRef.setInput('diseno', 'solido');
    fixture.detectChanges();

    expect(pill().classList.contains('mupa-pill--solido')).toBe(true);
    expect(pill().style.background).toContain('--color-primary-500');
  });

  it('aplica la variante de contorno', () => {
    fixture.componentRef.setInput('etiqueta', 'Esta semana');
    fixture.componentRef.setInput('diseno', 'contorno');
    fixture.detectChanges();

    expect(pill().classList.contains('mupa-pill--contorno')).toBe(true);
    expect(pill().style.background).toContain('--bg-surface');
  });

  it('emite quitar cuando es removible', () => {
    let quitado = false;
    fixture.componentInstance.quitar.subscribe(() => (quitado = true));

    fixture.componentRef.setInput('etiqueta', 'Calidonia');
    fixture.componentRef.setInput('removible', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('.mupa-pill__quitar') as HTMLButtonElement;
    boton.click();

    expect(quitado).toBe(true);
  });

  it('aplica el tamaño mediano', () => {
    fixture.componentRef.setInput('etiqueta', 'Categoría');
    fixture.componentRef.setInput('tamano', 'md');
    fixture.detectChanges();

    expect(pill().classList.contains('mupa-pill--md')).toBe(true);
  });
});
