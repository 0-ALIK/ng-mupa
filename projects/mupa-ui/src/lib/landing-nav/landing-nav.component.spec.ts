import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaLandingNav } from './landing-nav.component';
import type { ElementoLandingNav } from './landing-nav.types';

describe('MupaLandingNav', () => {
  let fixture: ComponentFixture<MupaLandingNav>;

  const elementos: ElementoLandingNav[] = [
    { clave: 'inicio', etiqueta: 'Inicio', href: '/inicio' },
    { clave: 'vacantes', etiqueta: 'Vacantes', href: '/vacantes' },
    { clave: 'empresas', etiqueta: 'Empresas', href: '/empresas' },
    { clave: 'perfil', etiqueta: 'Perfil', href: '/perfil' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaLandingNav],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaLandingNav);
    fixture.componentRef.setInput('elementos', elementos);
  });

  it('renderiza los enlaces en escritorio', () => {
    fixture.componentRef.setInput('diseno', 'desktop');
    fixture.detectChanges();

    const enlaces = fixture.nativeElement.querySelectorAll('.mupa-landing-nav__enlace');
    expect(enlaces.length).toBe(4);
  });

  it('marca el enlace activo con aria-current', () => {
    fixture.componentRef.setInput('diseno', 'desktop');
    fixture.componentRef.setInput('activo', 'empresas');
    fixture.detectChanges();

    const activo = fixture.nativeElement.querySelector(
      '[aria-current="page"]',
    ) as HTMLAnchorElement;
    expect(activo.textContent).toContain('Empresas');
    expect(activo.classList.contains('mupa-landing-nav__enlace--seleccionado')).toBe(true);
  });

  it('emite la clave al seleccionar un enlace', () => {
    let claveRecibida: string | undefined;
    fixture.componentInstance.navegar.subscribe((clave) => (claveRecibida = clave));

    fixture.componentRef.setInput('diseno', 'desktop');
    fixture.detectChanges();

    const enlace = fixture.nativeElement.querySelector(
      '.mupa-landing-nav__enlace',
    ) as HTMLAnchorElement;
    enlace.click();

    expect(claveRecibida).toBe('inicio');
  });

  it('usa el menú hamburguesa en móvil', () => {
    fixture.componentRef.setInput('diseno', 'mobile');
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '.mupa-landing-nav__boton-menu',
    ) as HTMLButtonElement;
    expect(boton).toBeTruthy();
    expect(boton.getAttribute('aria-expanded')).toBe('false');

    boton.click();
    fixture.detectChanges();

    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelectorAll('.mupa-landing-nav__fila-movil').length).toBe(4);
  });

  it('abre el menú móvil por defecto cuando se indica', () => {
    fixture.componentRef.setInput('diseno', 'mobile');
    fixture.componentRef.setInput('abiertoPorDefecto', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mupa-landing-nav__menu-movil')).toBeTruthy();
  });

  it('marca la barra como pegajosa cuando corresponde', () => {
    fixture.componentRef.setInput('diseno', 'desktop');
    fixture.componentRef.setInput('pegajoso', true);
    fixture.detectChanges();

    const cabecera = fixture.nativeElement.querySelector('.mupa-landing-nav') as HTMLElement;
    expect(cabecera.classList.contains('mupa-landing-nav--pegajosa')).toBe(true);
  });

  it('usa el logo institucional por defecto', () => {
    fixture.componentRef.setInput('diseno', 'desktop');
    fixture.detectChanges();

    const logo = fixture.nativeElement.querySelector(
      '.mupa-landing-nav__logo img',
    ) as HTMLImageElement;
    expect(logo.getAttribute('src')).toBe('assets/logo-alcaldia-navy.svg');
    expect(logo.getAttribute('alt')).toBe('Alcaldía de Panamá');
  });
});
