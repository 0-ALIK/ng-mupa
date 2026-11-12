import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaToast } from './toast.component';

describe('MupaToast', () => {
  let fixture: ComponentFixture<MupaToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaToast],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaToast);
    fixture.componentRef.setInput('titulo', 'Reporte enviado');
  });

  it('muestra el título y la descripción', () => {
    fixture.componentRef.setInput('descripcion', 'Tu folio es #PTY-48230.');
    fixture.detectChanges();

    const titulo = fixture.nativeElement.querySelector('.mupa-toast__titulo') as HTMLElement;
    const descripcion = fixture.nativeElement.querySelector(
      '.mupa-toast__descripcion',
    ) as HTMLElement;
    expect(titulo.textContent).toContain('Reporte enviado');
    expect(descripcion.textContent).toContain('#PTY-48230');
  });

  it('usa role alert para errores', () => {
    fixture.componentRef.setInput('tono', 'error');
    fixture.detectChanges();

    const toast = fixture.nativeElement.querySelector('.mupa-toast') as HTMLElement;
    expect(toast.getAttribute('role')).toBe('alert');
    expect(toast.getAttribute('aria-live')).toBe('assertive');
  });

  it('usa role status para informaciones', () => {
    fixture.componentRef.setInput('tono', 'info');
    fixture.detectChanges();

    const toast = fixture.nativeElement.querySelector('.mupa-toast') as HTMLElement;
    expect(toast.getAttribute('role')).toBe('status');
    expect(toast.getAttribute('aria-live')).toBe('polite');
  });

  it('emite cerrar al pulsar el botón de cierre', () => {
    let cerrado = false;
    fixture.componentInstance.cerrar.subscribe(() => (cerrado = true));
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('.mupa-toast__cerrar') as HTMLButtonElement;
    boton.click();

    expect(cerrado).toBe(true);
  });

  it('oculta el cierre cuando no es descartable', () => {
    fixture.componentRef.setInput('descartable', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mupa-toast__cerrar')).toBeNull();
  });

  it('emite accionClic al activar la acción', () => {
    let activada = false;
    fixture.componentInstance.accionClic.subscribe(() => (activada = true));

    fixture.componentRef.setInput('accion', { etiqueta: 'Ver recibo' });
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('.mupa-toast__accion') as HTMLButtonElement;
    boton.click();

    expect(activada).toBe(true);
  });
});
