import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaAvatar } from './avatar.component';

describe('MupaAvatar', () => {
  let fixture: ComponentFixture<MupaAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaAvatar);
  });

  it('muestra las iniciales cuando no hay imagen', () => {
    fixture.componentRef.setInput('nombre', 'Ana Pérez');
    fixture.detectChanges();

    const texto = fixture.nativeElement.querySelector('.mupa-avatar__circulo span') as HTMLElement;
    expect(texto.textContent?.trim()).toBe('AP');
  });

  it('expone el nombre completo en el texto accesible', () => {
    fixture.componentRef.setInput('nombre', 'Ana Pérez');
    fixture.detectChanges();

    const contenedor = fixture.nativeElement.querySelector(
      '.mupa-avatar__contenedor',
    ) as HTMLElement;
    expect(contenedor.getAttribute('role')).toBe('img');
    expect(contenedor.getAttribute('aria-label')).toBe('Ana Pérez');
  });

  it('incluye el estado en el texto accesible', () => {
    fixture.componentRef.setInput('nombre', 'Ana Pérez');
    fixture.componentRef.setInput('estado', 'online');
    fixture.detectChanges();

    const contenedor = fixture.nativeElement.querySelector(
      '.mupa-avatar__contenedor',
    ) as HTMLElement;
    expect(contenedor.getAttribute('aria-label')).toBe('Ana Pérez · En línea');
    expect(fixture.nativeElement.querySelector('.mupa-avatar__estado')).toBeTruthy();
  });

  it('usa un ancla cuando se indica href', () => {
    fixture.componentRef.setInput('nombre', 'Ana Pérez');
    fixture.componentRef.setInput('href', '/perfil/ana');
    fixture.detectChanges();

    const enlace = fixture.nativeElement.querySelector('.mupa-avatar__enlace') as HTMLAnchorElement;
    expect(enlace.getAttribute('href')).toBe('/perfil/ana');
    expect(enlace.getAttribute('aria-label')).toBe('Ana Pérez');
  });

  it('respeta el tamaño indicado', () => {
    fixture.componentRef.setInput('nombre', 'Ana Pérez');
    fixture.componentRef.setInput('tamano', 64);
    fixture.detectChanges();

    const cuerpo = fixture.nativeElement.querySelector('.mupa-avatar__cuerpo') as HTMLElement;
    expect(cuerpo.style.width).toBe('64px');
    expect(cuerpo.style.height).toBe('64px');
  });
});
