import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaSidebar } from './sidebar.component';
import type { GrupoSidebar } from './sidebar.types';

describe('MupaSidebar', () => {
  let fixture: ComponentFixture<MupaSidebar>;

  const grupos: GrupoSidebar[] = [
    {
      id: 'principal',
      etiqueta: 'Principal',
      items: [
        { id: 'inicio', etiqueta: 'Inicio', href: '/inicio', icono: 'house' },
        {
          id: 'tramites',
          etiqueta: 'Trámites',
          icono: 'folder',
          hijos: [
            { id: 'licencias', etiqueta: 'Licencias', href: '/licencias', icono: 'file-text' },
            { id: 'permisos', etiqueta: 'Permisos', href: '/permisos', badge: 3 },
          ],
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaSidebar);
    fixture.componentRef.setInput('grupos', grupos);
  });

  it('renderiza los grupos y enlaces', () => {
    fixture.detectChanges();

    const enlaces = fixture.nativeElement.querySelectorAll('a.mupa-sidebar__enlace');
    expect(enlaces.length).toBeGreaterThan(0);
    expect((enlaces[0] as HTMLAnchorElement).getAttribute('href')).toBe('/inicio');
  });

  it('marca el enlace activo con aria-current', () => {
    fixture.componentRef.setInput('idActivo', 'inicio');
    fixture.detectChanges();

    const activo = fixture.nativeElement.querySelector(
      'a[aria-current="page"]',
    ) as HTMLAnchorElement;
    expect(activo).toBeTruthy();
    expect(activo.textContent).toContain('Inicio');
  });

  it('expande una rama por defecto cuando está configurada', () => {
    fixture.componentRef.setInput('idsExpandidosPorDefecto', ['tramites']);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      'button.mupa-sidebar__enlace',
    ) as HTMLButtonElement;
    expect(boton.getAttribute('aria-expanded')).toBe('true');
  });

  it('alterna una rama al pulsarla', () => {
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      'button.mupa-sidebar__enlace',
    ) as HTMLButtonElement;
    expect(boton.getAttribute('aria-expanded')).toBe('false');

    boton.click();
    fixture.detectChanges();

    expect(boton.getAttribute('aria-expanded')).toBe('true');
  });

  it('emite colapsadoCambio al contraer la barra', () => {
    let estado: boolean | undefined;
    fixture.componentInstance.colapsadoCambio.subscribe((valor) => (estado = valor));
    fixture.detectChanges();

    const control = fixture.nativeElement.querySelector(
      '.mupa-sidebar__boton',
    ) as HTMLButtonElement;
    control.click();

    expect(estado).toBe(true);
  });

  it('emite navegar con el enlace y el evento', () => {
    let enlaceRecibido: string | undefined;
    fixture.componentInstance.navegar.subscribe(({ enlace }) => {
      enlaceRecibido = enlace.id;
    });

    fixture.detectChanges();

    const enlace = fixture.nativeElement.querySelector(
      'a.mupa-sidebar__enlace',
    ) as HTMLAnchorElement;

    const evitarNavegacion = (evento: Event): void => evento.preventDefault();
    document.addEventListener('click', evitarNavegacion);
    enlace.click();
    document.removeEventListener('click', evitarNavegacion);

    expect(enlaceRecibido).toBe('inicio');
  });

  it('muestra el usuario y sus acciones', () => {
    fixture.componentRef.setInput('usuario', {
      nombre: 'Ana Pérez',
      correo: 'ana@mupa.gob.pa',
    });
    fixture.componentRef.setInput('accionesUsuario', [
      { id: 'perfil', etiqueta: 'Mi perfil', href: '/perfil', icono: 'user' },
    ]);
    fixture.detectChanges();

    const identidad = fixture.nativeElement.querySelector(
      '.mupa-sidebar__identidad',
    ) as HTMLElement;
    expect(identidad.textContent).toContain('Ana Pérez');
    expect(fixture.nativeElement.querySelector('.mupa-sidebar__usuario-panel')).toBeTruthy();
  });
});
