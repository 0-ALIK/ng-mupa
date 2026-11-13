import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBotonConfeti } from './boton-confeti.component';
import { MupaConfetti } from './confetti.component';
import { MupaConfettiService } from './confetti.service';
import { MupaDisparadorConfeti } from './disparador-confeti.directive';
import type { OpcionesConfeti } from './confetti.types';

describe('MupaConfetti', () => {
  let fixture: ComponentFixture<MupaConfetti>;
  let servicio: { disparar: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    servicio = { disparar: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [MupaConfetti],
      providers: [{ provide: MupaConfettiService, useValue: servicio }],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaConfetti);
  });

  it('no dispara en el primer render por defecto', () => {
    fixture.detectChanges();

    expect(servicio.disparar).not.toHaveBeenCalled();
  });

  it('dispara cuando cambia el disparador', () => {
    fixture.componentRef.setInput('disparador', 1);
    fixture.detectChanges();

    fixture.componentRef.setInput('disparador', 2);
    fixture.detectChanges();

    expect(servicio.disparar).toHaveBeenCalledTimes(1);
  });

  it('dispara al cargar cuando se solicita', () => {
    fixture.componentRef.setInput('dispararAlCargar', true);
    fixture.detectChanges();

    expect(servicio.disparar).toHaveBeenCalledTimes(1);
  });

  it('expone disparar() para uso imperativo', () => {
    fixture.componentInstance.disparar();

    expect(servicio.disparar).toHaveBeenCalledTimes(1);
  });
});

describe('MupaBotonConfeti', () => {
  let fixture: ComponentFixture<MupaBotonConfeti>;
  let servicio: { disparar: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    servicio = { disparar: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [MupaBotonConfeti],
      providers: [{ provide: MupaConfettiService, useValue: servicio }],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBotonConfeti);
  });

  it('muestra el texto Celebrar cuando no se proyecta contenido', () => {
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(boton.textContent?.trim()).toBe('Celebrar');
  });

  it('muestra el icono party-popper por defecto', () => {
    fixture.detectChanges();

    const icono = fixture.nativeElement.querySelector('[data-lucide="party-popper"]');
    expect(icono).toBeTruthy();
  });

  it('lanza confeti desde el centro y emite clic', () => {
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    vi.spyOn(boton, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
      width: 40,
      height: 20,
    } as DOMRect);

    let eventoRecibido: MouseEvent | undefined;
    fixture.componentInstance.clic.subscribe((evento) => (eventoRecibido = evento));

    boton.click();

    expect(servicio.disparar).toHaveBeenCalledWith({
      origen: {
        x: (100 + 20) / window.innerWidth,
        y: (50 + 10) / window.innerHeight,
      },
    });
    expect(eventoRecibido).toBeInstanceOf(MouseEvent);
  });

  it('no dispara cuando está deshabilitado', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    boton.click();

    expect(servicio.disparar).not.toHaveBeenCalled();
  });

  it('permite ocultar el icono', () => {
    fixture.componentRef.setInput('icono', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mupa-icon')).toBeNull();
  });
});

@Component({
  selector: 'pg-host-disparador-confeti',
  imports: [MupaDisparadorConfeti],
  template: `
    <button
      type="button"
      [disabled]="deshabilitado()"
      mupaDisparadorConfeti
      [opcionesConfeti]="opciones()"
    >
      Celebrar
    </button>
  `,
})
class HostDisparadorConfetiComponent {
  readonly deshabilitado = signal(false);
  readonly opciones = signal<OpcionesConfeti>({ cantidadParticulas: 10 });
}

describe('MupaDisparadorConfeti', () => {
  let fixture: ComponentFixture<HostDisparadorConfetiComponent>;
  let servicio: { disparar: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    servicio = { disparar: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [HostDisparadorConfetiComponent],
      providers: [{ provide: MupaConfettiService, useValue: servicio }],
    }).compileComponents();

    fixture = TestBed.createComponent(HostDisparadorConfetiComponent);
    fixture.detectChanges();
  });

  it('dispara confeti desde el centro del elemento', () => {
    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    vi.spyOn(boton, 'getBoundingClientRect').mockReturnValue({
      left: 20,
      top: 10,
      width: 100,
      height: 40,
    } as DOMRect);

    boton.click();

    expect(servicio.disparar).toHaveBeenCalledWith({
      cantidadParticulas: 10,
      origen: {
        x: (20 + 50) / window.innerWidth,
        y: (10 + 20) / window.innerHeight,
      },
    });
  });

  it('respeta un origen explícito', () => {
    fixture.componentInstance.opciones.set({
      cantidadParticulas: 10,
      origen: { x: 0.25, y: 0.75 },
    });
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    boton.click();

    expect(servicio.disparar).toHaveBeenCalledWith({
      cantidadParticulas: 10,
      origen: { x: 0.25, y: 0.75 },
    });
  });

  it('ignora el clic en un botón deshabilitado', () => {
    fixture.componentInstance.deshabilitado.set(true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    boton.click();

    expect(servicio.disparar).not.toHaveBeenCalled();
  });
});
