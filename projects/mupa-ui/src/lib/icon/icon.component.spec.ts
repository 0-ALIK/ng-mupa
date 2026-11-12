import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaIcon } from './icon.component';

describe('MupaIcon', () => {
  let fixture: ComponentFixture<MupaIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaIcon);
  });

  it('crea el icono con el nombre por defecto', () => {
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('data-lucide')).toBe('circle');
  });

  it('renderiza los nodos del icono solicitado', () => {
    fixture.componentRef.setInput('nombre', 'search');
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.querySelectorAll('circle, path').length).toBeGreaterThan(0);
  });

  it('aplica tamaño y color', () => {
    fixture.componentRef.setInput('nombre', 'x');
    fixture.componentRef.setInput('tamano', 32);
    fixture.componentRef.setInput('color', '#0660FF');
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('height')).toBe('32');
    expect(svg.getAttribute('stroke')).toBe('#0660FF');
  });

  it('expone título accesible cuando se indica', () => {
    fixture.componentRef.setInput('nombre', 'check');
    fixture.componentRef.setInput('titulo', 'Confirmado');
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Confirmado');
    expect(svg.querySelector('title')?.textContent).toBe('Confirmado');
  });

  it('marca el icono como decorativo cuando no hay título', () => {
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('role')).toBeNull();
  });
});
