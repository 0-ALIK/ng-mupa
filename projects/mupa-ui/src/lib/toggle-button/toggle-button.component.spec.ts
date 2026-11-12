import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaToggleButton } from './toggle-button.component';

describe('MupaToggleButton', () => {
  let fixture: ComponentFixture<MupaToggleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaToggleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaToggleButton);
    fixture.componentRef.setInput('etiquetaElemento', 'este elemento');
  });

  function boton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  }

  it('inicia inactivo con etiqueta accesible de guardado', () => {
    fixture.detectChanges();

    expect(boton().getAttribute('aria-pressed')).toBe('false');
    expect(boton().getAttribute('aria-label')).toBe('Guardar este elemento');
    expect(boton().getAttribute('title')).toBe('Guardar: este elemento');
  });

  it('alterna el estado al pulsar', () => {
    fixture.detectChanges();

    boton().click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activo()).toBe(true);
    expect(boton().getAttribute('aria-pressed')).toBe('true');
    expect(boton().getAttribute('title')).toBe('Quitar de guardados: este elemento');
  });

  it('respeta preventDefault en el evento clic', () => {
    fixture.componentInstance.clic.subscribe((evento) => evento.preventDefault());
    fixture.detectChanges();

    boton().click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activo()).toBe(false);
  });

  it('inicia activo cuando se indica activoPorDefecto', () => {
    fixture.componentRef.setInput('activoPorDefecto', true);
    fixture.detectChanges();

    expect(fixture.componentInstance.activo()).toBe(true);
    expect(boton().getAttribute('aria-pressed')).toBe('true');
  });

  it('en modo controlado solo emite la solicitud de cambio', () => {
    let solicitado: boolean | undefined;
    fixture.componentInstance.solicitudCambio.subscribe((valor) => (solicitado = valor));

    fixture.componentRef.setInput('controlado', true);
    fixture.detectChanges();

    boton().click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activo()).toBe(false);
    expect(solicitado).toBe(true);
  });

  it('bloquea la interacción cuando está deshabilitado u ocupado', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();
    boton().click();
    expect(fixture.componentInstance.activo()).toBe(false);

    fixture.componentRef.setInput('deshabilitado', false);
    fixture.componentRef.setInput('ocupado', true);
    fixture.detectChanges();

    expect(boton().disabled).toBe(true);
    expect(boton().getAttribute('aria-busy')).toBe('true');
  });

  it('muestra la etiqueta visible y el estado ocupado', () => {
    fixture.componentRef.setInput('mostrarEtiqueta', true);
    fixture.detectChanges();
    expect(boton().textContent).toContain('Guardar');

    fixture.componentRef.setInput('activo', true);
    fixture.detectChanges();
    expect(boton().textContent).toContain('Guardado');

    fixture.componentRef.setInput('ocupado', true);
    fixture.detectChanges();
    expect(boton().textContent).toContain('Actualizando…');
  });

  it('aplica las clases de variante y tamaño', () => {
    fixture.componentRef.setInput('variante', 'tonal');
    fixture.componentRef.setInput('tamano', 'lg');
    fixture.detectChanges();

    expect(boton().classList.contains('mupa-toggle-button--tonal')).toBe(true);
    expect(boton().classList.contains('mupa-toggle-button--lg')).toBe(true);
  });

  it('rellena el icono cuando está activo', () => {
    fixture.detectChanges();

    const icono = fixture.nativeElement.querySelector('mupa-icon svg') as SVGElement;
    expect(icono.style.fill).toBe('none');

    fixture.componentRef.setInput('activo', true);
    fixture.detectChanges();

    expect(icono.style.fill).toBe('currentcolor');
  });
});
