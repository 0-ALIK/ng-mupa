import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBreadcrumb } from './breadcrumb.component';
import type { ElementoBreadcrumb } from './breadcrumb.types';

describe('MupaBreadcrumb', () => {
  let fixture: ComponentFixture<MupaBreadcrumb>;

  const ruta: ElementoBreadcrumb[] = [
    { etiqueta: 'Inicio', href: '#inicio', icono: 'house' },
    { etiqueta: 'Inventario', href: '#inventario' },
    { etiqueta: 'Armas', href: '#armas' },
    { etiqueta: 'Detalle' },
  ];

  const rutaLarga: ElementoBreadcrumb[] = [
    { etiqueta: 'Inicio', href: '#inicio', icono: 'house' },
    { etiqueta: 'Seguridad', href: '#seguridad' },
    { etiqueta: 'Policía municipal', href: '#policia' },
    { etiqueta: 'Inventario', href: '#inventario' },
    { etiqueta: 'Armas', href: '#armas' },
    { etiqueta: 'Detalle' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaBreadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBreadcrumb);
  });

  it('renderiza la ruta y marca la página actual', () => {
    fixture.componentRef.setInput('elementos', ruta);
    fixture.detectChanges();

    const enlaces = fixture.nativeElement.querySelectorAll('a.mupa-breadcrumb__enlace');
    const actual = fixture.nativeElement.querySelector('.mupa-breadcrumb__actual') as HTMLElement;

    expect(enlaces.length).toBe(3);
    expect(actual.textContent).toContain('Detalle');
    expect(actual.getAttribute('aria-current')).toBe('page');
  });

  it('emite el nivel seleccionado con su índice', () => {
    let indiceRecibido: number | undefined;
    fixture.componentInstance.navegar.subscribe(({ indice }) => (indiceRecibido = indice));

    fixture.componentRef.setInput('elementos', ruta);
    fixture.detectChanges();

    const evitarNavegacion = (evento: Event): void => evento.preventDefault();
    document.addEventListener('click', evitarNavegacion);

    const enlace = fixture.nativeElement.querySelector(
      'a.mupa-breadcrumb__enlace',
    ) as HTMLAnchorElement;
    enlace.click();

    document.removeEventListener('click', evitarNavegacion);

    expect(indiceRecibido).toBe(0);
  });

  it('colapsa los niveles intermedios en el menú de puntos suspensivos', () => {
    fixture.componentRef.setInput('elementos', rutaLarga);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '.mupa-breadcrumb__boton-elipsis',
    ) as HTMLButtonElement;
    expect(boton).toBeTruthy();

    boton.click();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.mupa-breadcrumb__menu-item');
    expect(items.length).toBe(3);
  });

  it('emite un nivel oculto con su índice real', () => {
    let indiceRecibido: number | undefined;
    fixture.componentInstance.navegar.subscribe(({ indice }) => (indiceRecibido = indice));

    fixture.componentRef.setInput('elementos', rutaLarga);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '.mupa-breadcrumb__boton-elipsis',
    ) as HTMLButtonElement;
    boton.click();
    fixture.detectChanges();

    const evitarNavegacion = (evento: Event): void => evento.preventDefault();
    document.addEventListener('click', evitarNavegacion);

    const items = fixture.nativeElement.querySelectorAll(
      '.mupa-breadcrumb__menu-item',
    ) as NodeListOf<HTMLAnchorElement>;
    items[1].click();

    document.removeEventListener('click', evitarNavegacion);

    expect(indiceRecibido).toBe(2);
  });

  it('usa el separador de barra cuando se indica', () => {
    fixture.componentRef.setInput('elementos', ruta);
    fixture.componentRef.setInput('separador', 'slash');
    fixture.detectChanges();

    const barras = fixture.nativeElement.querySelectorAll('.mupa-breadcrumb__slash');
    expect(barras.length).toBe(3);
  });

  it('abre y cierra el menú con teclado', () => {
    fixture.componentRef.setInput('elementos', rutaLarga);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '.mupa-breadcrumb__boton-elipsis',
    ) as HTMLButtonElement;

    boton.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mupa-breadcrumb__menu')).toBeTruthy();

    boton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mupa-breadcrumb__menu')).toBeNull();
  });
});
