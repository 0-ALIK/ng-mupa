import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaMenu } from './menu.component';

describe('MupaMenu', () => {
  let fixture: ComponentFixture<MupaMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaMenu);
    fixture.componentRef.setInput('grupos', [
      {
        etiqueta: 'Resumen',
        items: [
          { id: 'panel', etiqueta: 'Panel de control', icono: 'house', activo: true },
          { id: 'cuentas', etiqueta: 'Cuentas', icono: 'wallet' },
        ],
      },
      {
        etiqueta: 'Soporte',
        items: [{ id: 'ayuda', etiqueta: 'Centro de ayuda', icono: 'info', href: '/ayuda' }],
      },
    ]);
  });

  it('renderiza los grupos y marca el ítem activo', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelectorAll('.mupa-menu__titulo').length).toBe(2);
    expect(host.querySelectorAll('.mupa-menu__item').length).toBe(3);
    expect(host.querySelector('.mupa-menu__item--activo')?.textContent).toContain(
      'Panel de control',
    );
  });

  it('emite el ítem seleccionado', () => {
    fixture.detectChanges();

    let seleccionado = '';
    fixture.componentInstance.seleccion.subscribe((item) => {
      seleccionado = item.id;
    });

    const boton = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.mupa-menu__item',
    )[1];
    boton.click();

    expect(seleccionado).toBe('cuentas');
  });

  it('renderiza los ítems con href como enlaces', () => {
    fixture.detectChanges();

    const enlace = fixture.nativeElement.querySelector('a.mupa-menu__item') as HTMLAnchorElement;
    expect(enlace.getAttribute('href')).toBe('/ayuda');
  });
});
