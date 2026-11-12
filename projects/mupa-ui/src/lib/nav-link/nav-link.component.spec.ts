import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaNavLink } from './nav-link.component';
import type { EstadoNavLink } from './nav-link.types';

describe('MupaNavLink', () => {
  let fixture: ComponentFixture<MupaNavLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaNavLink],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaNavLink);
    fixture.componentRef.setInput('etiqueta', 'Vacantes');
  });

  it('renderiza la etiqueta', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Vacantes');
  });

  it('aplica la clase del estado indicado', () => {
    const estados: EstadoNavLink[] = ['default', 'hover', 'pressed', 'selected', 'focus'];

    for (const estado of estados) {
      fixture.componentRef.setInput('estado', estado);
      fixture.detectChanges();

      const enlace = fixture.nativeElement.querySelector('.mupa-nav-link') as HTMLElement;
      expect(enlace.classList.contains(`mupa-nav-link--${estado}`)).toBe(true);
    }
  });
});
