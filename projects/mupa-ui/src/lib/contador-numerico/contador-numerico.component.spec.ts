import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaContadorNumerico } from './contador-numerico.component';

describe('MupaContadorNumerico', () => {
  let fixture: ComponentFixture<MupaContadorNumerico>;
  let matchMediaOriginal: typeof window.matchMedia;

  beforeEach(async () => {
    matchMediaOriginal = window.matchMedia;

    window.matchMedia = ((consulta: string) =>
      ({
        matches: consulta.includes('prefers-reduced-motion'),
        media: consulta,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList) as typeof window.matchMedia;

    await TestBed.configureTestingModule({
      imports: [MupaContadorNumerico],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaContadorNumerico);
    fixture.componentRef.setInput('valor', 1842);
    fixture.componentRef.setInput('iniciarAlVer', false);
  });

  afterEach(() => {
    window.matchMedia = matchMediaOriginal;
  });

  it('expone el valor final en el texto accesible', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const accesible = host.querySelector('.mupa-contador-numerico__sr');
    const visual = host.querySelector('.mupa-contador-numerico__visual');

    expect(accesible?.textContent).toBe('1,842');
    expect(visual?.getAttribute('aria-hidden')).toBe('true');
  });

  it('aplica prefijo, sufijo y decimales', () => {
    fixture.componentRef.setInput('valor', 92.5);
    fixture.componentRef.setInput('prefijo', 'B/. ');
    fixture.componentRef.setInput('sufijo', ' mensual');
    fixture.componentRef.setInput('decimales', 2);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-contador-numerico__sr')?.textContent).toBe(
      'B/. 92.50 mensual',
    );
  });

  it('invierte el recorrido cuando la dirección es abajo', () => {
    fixture.componentRef.setInput('valor', 10);
    fixture.componentRef.setInput('valorInicial', 100);
    fixture.componentRef.setInput('direccion', 'abajo');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-contador-numerico__sr')?.textContent).toBe('100');
  });

  it('muestra el valor final inmediatamente con movimiento reducido', () => {
    fixture.componentRef.setInput('valorInicial', 10);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-contador-numerico__visual')?.textContent?.trim()).toBe(
      '1,842',
    );
  });

  it('usa otro locale para el formato', () => {
    fixture.componentRef.setInput('valor', 1234.5);
    fixture.componentRef.setInput('locale', 'en-US');
    fixture.componentRef.setInput('decimales', 1);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-contador-numerico__sr')?.textContent).toBe('1,234.5');
  });
});
