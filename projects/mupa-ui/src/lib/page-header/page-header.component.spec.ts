import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaPageHeader } from './page-header.component';

describe('MupaPageHeader', () => {
  let fixture: ComponentFixture<MupaPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaPageHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaPageHeader);
    fixture.componentRef.setInput('titulo', 'Inventario');
  });

  it('renderiza título y descripción', () => {
    fixture.componentRef.setInput('descripcion', 'Consulta y administra los bienes.');
    fixture.detectChanges();

    const titulo = fixture.nativeElement.querySelector(
      '.mupa-page-header__texto h1',
    ) as HTMLElement;
    const descripcion = fixture.nativeElement.querySelector(
      '.mupa-page-header__texto p',
    ) as HTMLElement;

    expect(titulo.textContent).toContain('Inventario');
    expect(descripcion.textContent).toContain('Consulta y administra');
  });

  it('renderiza las migas cuando se indican', () => {
    fixture.componentRef.setInput('migas', [
      { etiqueta: 'Inicio', href: '#', icono: 'house' },
      { etiqueta: 'Inventario' },
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mupa-breadcrumb')).toBeTruthy();
  });

  it('ejecuta las acciones', () => {
    let ejecutada = false;
    fixture.componentRef.setInput('acciones', [
      {
        etiqueta: 'Editar',
        icono: 'pencil',
        variante: 'primary',
        alHacerClic: () => (ejecutada = true),
      },
    ]);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '.mupa-page-header__accion',
    ) as HTMLButtonElement;
    boton.click();

    expect(ejecutada).toBe(true);
  });

  it('actualiza y limpia la búsqueda', () => {
    fixture.componentRef.setInput('mostrarBusqueda', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '.mupa-page-header__busqueda input',
    ) as HTMLInputElement;
    input.value = 'armas';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.textoBusqueda()).toBe('armas');

    const limpiar = fixture.nativeElement.querySelector(
      '.mupa-page-header__limpiar',
    ) as HTMLButtonElement;
    limpiar.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.textoBusqueda()).toBe('');
  });

  it('selecciona el primer filtro y permite cambiarlo', () => {
    fixture.componentRef.setInput('filtros', [
      { clave: 'all', etiqueta: 'Todas', conteo: 128 },
      { clave: 'disp', etiqueta: 'Disponibles', conteo: 24 },
    ]);
    fixture.detectChanges();

    expect(fixture.componentInstance.filtroActivo()).toBeUndefined();

    const filtros = fixture.nativeElement.querySelectorAll(
      '.mupa-page-header__filtro',
    ) as NodeListOf<HTMLButtonElement>;
    expect(filtros.length).toBe(2);
    expect(filtros[0].getAttribute('aria-pressed')).toBe('true');

    filtros[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.filtroActivo()).toBe('disp');
  });

  it('cambia el filtro desde el select móvil', () => {
    fixture.componentRef.setInput('filtros', [
      { clave: 'all', etiqueta: 'Todas' },
      { clave: 'disp', etiqueta: 'Disponibles' },
    ]);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector(
      '.mupa-page-header__filtro-movil select',
    ) as HTMLSelectElement;
    select.value = 'disp';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.filtroActivo()).toBe('disp');
  });

  it('oculta el divisor cuando se indica', () => {
    fixture.componentRef.setInput('divisor', false);
    fixture.detectChanges();

    const cabecera = fixture.nativeElement.querySelector('.mupa-page-header') as HTMLElement;
    expect(cabecera.classList.contains('mupa-page-header--sin-divisor')).toBe(true);
  });
});
