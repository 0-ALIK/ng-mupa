import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaLogo } from './logo.component';

describe('MupaLogo', () => {
  let fixture: ComponentFixture<MupaLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaLogo],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaLogo);
  });

  it('renderiza el logo horizontal a color por defecto', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const imagen = host.querySelector('img') as HTMLImageElement;

    expect(imagen.getAttribute('src')).toBe('assets/branding/logo-alcaldia-navy.svg');
    expect(imagen.getAttribute('alt')).toBe('Alcaldía de Panamá');
    expect(imagen.style.height).toBe('32px');
  });

  it('cambia de variante, tema y tamaño', () => {
    fixture.componentRef.setInput('variante', 'vertical');
    fixture.componentRef.setInput('tema', 'blanco');
    fixture.componentRef.setInput('tamano', 'lg');
    fixture.detectChanges();

    const imagen = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(imagen.getAttribute('src')).toBe('assets/branding/logo-vertical-white.png');
    expect(imagen.style.height).toBe('96px');
  });

  it('cae a color cuando el tema blanco no existe para la variante', () => {
    fixture.componentRef.setInput('variante', 'escudo');
    fixture.componentRef.setInput('tema', 'blanco');
    fixture.detectChanges();

    const imagen = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(imagen.getAttribute('src')).toBe('assets/branding/logo-escudo-blue.png');
  });

  it('permite reemplazar el archivo con src', () => {
    fixture.componentRef.setInput('src', '/mi-logo.svg');
    fixture.detectChanges();

    const imagen = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(imagen.getAttribute('src')).toBe('/mi-logo.svg');
  });

  it('envuelve el logo en un enlace cuando se indica href', () => {
    fixture.componentRef.setInput('href', '/inicio');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const enlace = host.querySelector('a.mupa-logo') as HTMLAnchorElement;

    expect(enlace.getAttribute('href')).toBe('/inicio');
    expect(enlace.querySelector('img')?.getAttribute('alt')).toBe('Alcaldía de Panamá');
  });
});
