import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaVoicePill } from './voice-pill.component';

describe('MupaVoicePill', () => {
  let fixture: ComponentFixture<MupaVoicePill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaVoicePill],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaVoicePill);
  });

  function boton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.voice-pill') as HTMLButtonElement;
  }

  it('inicia en reposo con la etiqueta accesible', () => {
    fixture.detectChanges();

    expect(boton().getAttribute('data-state')).toBe('idle');
    expect(boton().getAttribute('aria-pressed')).toBe('false');
    expect(boton().getAttribute('aria-label')).toBe('Iniciar entrada de voz');
  });

  it('inicia y detiene una simulación con el teclado', () => {
    let iniciada = false;
    let detenida: { razon: string; fuente: string; cancelada: boolean } | undefined;

    fixture.componentInstance.iniciar.subscribe((evento) => {
      iniciada = evento.fuente === 'simulated';
    });
    fixture.componentInstance.detener.subscribe((evento) => {
      detenida = {
        razon: evento.razon,
        fuente: evento.fuente,
        cancelada: evento.cancelada,
      };
    });

    fixture.detectChanges();
    boton().click();
    fixture.detectChanges();

    expect(iniciada).toBe(true);
    expect(boton().getAttribute('data-state')).toBe('listening');
    expect(boton().getAttribute('aria-pressed')).toBe('true');
    expect(boton().getAttribute('aria-label')).toBe('Detener entrada de voz');

    boton().click();
    fixture.detectChanges();

    expect(boton().getAttribute('data-state')).toBe('idle');
    expect(detenida?.razon).toBe('key');
    expect(detenida?.fuente).toBe('simulated');
    expect(detenida?.cancelada).toBe(false);
  });

  it('cancela con Escape', () => {
    let detenida: { razon: string; cancelada: boolean } | undefined;
    fixture.componentInstance.detener.subscribe((evento) => {
      detenida = { razon: evento.razon, cancelada: evento.cancelada };
    });

    fixture.detectChanges();
    boton().click();
    fixture.detectChanges();

    boton().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(detenida?.razon).toBe('escape');
    expect(detenida?.cancelada).toBe(true);
    expect(boton().getAttribute('data-state')).toBe('idle');
  });

  it('no inicia cuando está deshabilitado', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    boton().click();
    fixture.detectChanges();

    expect(boton().disabled).toBe(true);
    expect(boton().getAttribute('data-state')).toBe('idle');
  });

  it('oculta la onda y el tiempo cuando se indica', () => {
    fixture.componentRef.setInput('mostrarOnda', false);
    fixture.componentRef.setInput('mostrarTiempo', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.voice-pill__wave')).toBeNull();
    expect(fixture.nativeElement.querySelector('.voice-pill__time')).toBeNull();
  });

  it('expone la forma redondeada', () => {
    fixture.componentRef.setInput('forma', 'rounded');
    fixture.detectChanges();

    expect(boton().getAttribute('data-shape')).toBe('rounded');
  });

  it('expone el mensaje de estado para lectores de pantalla', () => {
    fixture.detectChanges();
    boton().click();
    fixture.detectChanges();

    const mensaje = fixture.nativeElement.querySelector('.voice-pill__sr') as HTMLElement;
    expect(mensaje.getAttribute('role')).toBe('status');
    expect(mensaje.getAttribute('aria-live')).toBe('polite');

    boton().click();
    fixture.detectChanges();

    expect(mensaje.textContent).toContain('Entrada de voz detenida');
  });
});
