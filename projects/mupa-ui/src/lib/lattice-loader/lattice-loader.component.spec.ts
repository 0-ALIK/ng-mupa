import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaLatticeLoader } from './lattice-loader.component';

describe('MupaLatticeLoader', () => {
  let fixture: ComponentFixture<MupaLatticeLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaLatticeLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaLatticeLoader);
    fixture.componentRef.setInput('transcurrido', 0);
    fixture.componentRef.setInput('mostrarTiempo', false);
  });

  it('renderiza el estado en curso como región de estado', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('role')).toBe('status');
    expect(host.getAttribute('aria-live')).toBe('polite');
    expect(host.getAttribute('aria-atomic')).toBe('true');
    expect(host.getAttribute('data-status')).toBe('working');
    expect(
      host.querySelectorAll('.mupa-lattice-loader__run .mupa-lattice-loader__cell').length,
    ).toBe(9);
    expect(host.querySelector('.mupa-lattice-loader__sr')?.textContent).toContain(
      'Procesando, en curso',
    );
  });

  it('muestra el estado completado, la marca y el tiempo', () => {
    fixture.componentRef.setInput('estado', 'done');
    fixture.componentRef.setInput('transcurrido', 3.2);
    fixture.componentRef.setInput('mostrarTiempo', true);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-status')).toBe('done');
    expect(host.textContent).toContain('Completado en');
    expect(host.textContent).toContain('3.2 s');
    expect(host.querySelector('.mupa-lattice-loader__sr')?.textContent).toBe(
      'Completado en 3,2 segundos',
    );
    expect(
      host.querySelectorAll('.mupa-lattice-loader__mark .mupa-lattice-loader__cell[data-on]')
        .length,
    ).toBe(4);
  });

  it('muestra el estado de error y permite etiquetas personalizadas', () => {
    fixture.componentRef.setInput('estado', 'error');
    fixture.componentRef.setInput('etiquetaError', 'No se pudo validar');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.getAttribute('data-status')).toBe('error');
    expect(host.textContent).toContain('No se pudo validar');
    expect(host.querySelector('.mupa-lattice-loader__sr')?.textContent).toBe('No se pudo validar');
    expect(
      host.querySelectorAll('.mupa-lattice-loader__mark .mupa-lattice-loader__cell[data-on]')
        .length,
    ).toBe(5);
  });

  it('cambia a una retícula de 4 × 4', () => {
    fixture.componentRef.setInput('cuadricula', 4);
    fixture.componentRef.setInput('patron', 'sweep');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(
      host.querySelectorAll('.mupa-lattice-loader__run .mupa-lattice-loader__cell').length,
    ).toBe(16);
    expect(host.getAttribute('style')).toContain('--ll-n: 4');
  });

  it('usa el patrón de respaldo cuando no existe para la retícula', () => {
    fixture.componentRef.setInput('cuadricula', 4);
    fixture.componentRef.setInput('patron', 'arrow');
    fixture.detectChanges();

    expect(fixture.componentInstance['patronResuelto']().cells).toEqual([
      0, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6,
    ]);
  });

  it('acepta un patrón personalizado', () => {
    fixture.componentRef.setInput('patron', {
      cells: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      loop: 4,
      lit: 0.4,
    });
    fixture.detectChanges();

    expect(fixture.componentInstance['patronResuelto']().cells).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  });

  it('aplica pausa, resplandor y forma cuadrada', () => {
    fixture.componentRef.setInput('pausado', true);
    fixture.componentRef.setInput('resplandor', true);
    fixture.componentRef.setInput('forma', 'square');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.hasAttribute('data-paused')).toBe(true);
    expect(host.hasAttribute('data-glow')).toBe(true);
    expect(host.getAttribute('data-shape')).toBe('square');
  });
});
