import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaCard } from './card.component';
import {
  MupaCardActionsDirective,
  MupaCardFooterDirective,
  MupaCardHeaderDirective,
  MupaCardMediaDirective,
} from './card-slots.directive';

@Component({
  imports: [
    MupaCard,
    MupaCardMediaDirective,
    MupaCardHeaderDirective,
    MupaCardFooterDirective,
    MupaCardActionsDirective,
  ],
  template: `
    <mupa-card
      [seleccionable]="true"
      [(seleccionada)]="seleccionada"
      etiqueta="Trámite"
      titulo="Licencia de funcionamiento"
      descripcion="Solicita tu licencia en línea."
    >
      <span mupaCardMedia class="media">Icono</span>
      <span mupaCardHeader class="cabecera">Cabecera</span>
      <span class="contenido">Contenido libre</span>
      <span mupaCardFooter class="pie">5 días hábiles</span>
      <span mupaCardActions class="acciones">Check</span>
    </mupa-card>
  `,
})
class HostTarjetaComponent {
  seleccionada = false;
}

describe('MupaCard', () => {
  let fixture: ComponentFixture<MupaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaCard);
  });

  it('renderiza un artículo por defecto', () => {
    fixture.detectChanges();

    const articulo = fixture.nativeElement.querySelector('article.mupa-card') as HTMLElement;
    expect(articulo).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('renderiza un ancla cuando recibe href y target', () => {
    fixture.componentRef.setInput('href', '/tramites/placa');
    fixture.componentRef.setInput('target', '_blank');
    fixture.detectChanges();

    const ancla = fixture.nativeElement.querySelector('a.mupa-card') as HTMLAnchorElement;
    expect(ancla.getAttribute('href')).toBe('/tramites/placa');
    expect(ancla.getAttribute('target')).toBe('_blank');
    expect(ancla.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('bloquea el ancla deshabilitada y no emite clic', () => {
    let emitido = false;
    fixture.componentInstance.clic.subscribe(() => (emitido = true));
    fixture.componentRef.setInput('href', '#');
    fixture.componentRef.setInput('deshabilitada', true);
    fixture.detectChanges();

    const ancla = fixture.nativeElement.querySelector('a.mupa-card') as HTMLAnchorElement;
    expect(ancla.hasAttribute('href')).toBe(false);
    expect(ancla.getAttribute('aria-disabled')).toBe('true');
    expect(ancla.getAttribute('tabindex')).toBe('-1');

    ancla.click();
    expect(emitido).toBe(false);
  });

  it('renderiza un botón interactivo y emite clic', () => {
    let evento: MouseEvent | undefined;
    fixture.componentInstance.clic.subscribe((valor) => (evento = valor));
    fixture.componentRef.setInput('interactiva', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button.mupa-card') as HTMLButtonElement;
    boton.click();

    expect(evento).toBeInstanceOf(MouseEvent);
  });

  it('alterna la selección y actualiza aria-pressed', () => {
    fixture.componentRef.setInput('seleccionable', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button.mupa-card') as HTMLButtonElement;
    expect(boton.getAttribute('aria-pressed')).toBe('false');

    boton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.seleccionada()).toBe(true);
    expect(boton.getAttribute('aria-pressed')).toBe('true');
    expect(boton.classList.contains('mupa-card--seleccionada')).toBe(true);

    boton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.seleccionada()).toBe(false);
    expect(boton.getAttribute('aria-pressed')).toBe('false');
  });

  it('prioriza la selección sobre href', () => {
    fixture.componentRef.setInput('href', '/detalle');
    fixture.componentRef.setInput('seleccionable', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button.mupa-card')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
  });

  it('no alterna la selección cuando está deshabilitada', () => {
    fixture.componentRef.setInput('seleccionable', true);
    fixture.componentRef.setInput('deshabilitada', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button.mupa-card') as HTMLButtonElement;
    expect(boton.disabled).toBe(true);
    expect(boton.getAttribute('aria-disabled')).toBe('true');

    boton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.seleccionada()).toBe(false);
  });

  it('expone aria-disabled en cualquier superficie deshabilitada', () => {
    fixture.componentRef.setInput('deshabilitada', true);
    fixture.detectChanges();

    const articulo = fixture.nativeElement.querySelector('article.mupa-card') as HTMLElement;
    expect(articulo.getAttribute('aria-disabled')).toBe('true');
  });

  it('renderiza etiqueta, título, descripción y nivel de título', () => {
    fixture.componentRef.setInput('etiqueta', 'Servicio');
    fixture.componentRef.setInput('titulo', 'Mapa de obras');
    fixture.componentRef.setInput('descripcion', 'Consulta proyectos activos.');
    fixture.componentRef.setInput('nivelTitulo', 2);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mupa-card__etiqueta')?.textContent).toContain(
      'Servicio',
    );
    expect(fixture.nativeElement.querySelector('h2.mupa-card__titulo')?.textContent).toContain(
      'Mapa de obras',
    );
    expect(fixture.nativeElement.querySelector('.mupa-card__descripcion')?.textContent).toContain(
      'Consulta proyectos activos.',
    );
  });

  it('mantiene el título como span cuando la tarjeta es un botón', () => {
    fixture.componentRef.setInput('interactiva', true);
    fixture.componentRef.setInput('titulo', 'Seleccionar servicio');
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button.mupa-card') as HTMLButtonElement;
    expect(boton.querySelector('span.mupa-card__titulo')).toBeTruthy();
    expect(boton.querySelector('h3')).toBeNull();
  });

  it('renderiza las ranuras y oculta los contenedores vacíos', () => {
    const host = TestBed.createComponent(HostTarjetaComponent);
    host.detectChanges();

    const elemento = host.nativeElement as HTMLElement;
    expect(elemento.querySelector('.media')?.textContent).toContain('Icono');
    expect(elemento.querySelector('.cabecera')?.textContent).toContain('Cabecera');
    expect(elemento.querySelector('.contenido')?.textContent).toContain('Contenido libre');
    expect(elemento.querySelector('.pie')?.textContent).toContain('5 días hábiles');
    expect(elemento.querySelector('.acciones')?.textContent).toContain('Check');

    expect(
      elemento.querySelector('.mupa-card__media')?.classList.contains('mupa-card__media--vacio'),
    ).toBe(false);
    expect(
      elemento.querySelector('.mupa-card__header')?.classList.contains('mupa-card__header--vacio'),
    ).toBe(false);
  });

  it('oculta las ranuras que no reciben contenido', () => {
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(
      elemento.querySelector('.mupa-card__media')?.classList.contains('mupa-card__media--vacio'),
    ).toBe(true);
    expect(
      elemento.querySelector('.mupa-card__header')?.classList.contains('mupa-card__header--vacio'),
    ).toBe(true);
    expect(
      elemento.querySelector('.mupa-card__footer')?.classList.contains('mupa-card__footer--vacio'),
    ).toBe(true);
    expect(
      elemento
        .querySelector('.mupa-card__acciones')
        ?.classList.contains('mupa-card__acciones--vacio'),
    ).toBe(true);
  });

  it('aplica las clases de presentación y el estado forzado', () => {
    fixture.componentRef.setInput('direccion', 'horizontal');
    fixture.componentRef.setInput('radio', 'sm');
    fixture.componentRef.setInput('espaciado', 'lg');
    fixture.componentRef.setInput('borde', 'grueso');
    fixture.componentRef.setInput('sombra', 'sutil');
    fixture.componentRef.setInput('mediaCompleta', true);
    fixture.componentRef.setInput('estadoVisual', 'hover');
    fixture.detectChanges();

    const articulo = fixture.nativeElement.querySelector('article.mupa-card') as HTMLElement;
    expect(articulo.classList.contains('mupa-card--horizontal')).toBe(true);
    expect(articulo.classList.contains('mupa-card--radio-sm')).toBe(true);
    expect(articulo.classList.contains('mupa-card--espaciado-lg')).toBe(true);
    expect(articulo.classList.contains('mupa-card--borde-grueso')).toBe(true);
    expect(articulo.classList.contains('mupa-card--sombra-sutil')).toBe(true);
    expect(articulo.classList.contains('mupa-card--media-completa')).toBe(true);
    expect(articulo.classList.contains('mupa-card--estado-hover')).toBe(true);
    expect(articulo.classList.contains('mupa-card--estado-forzado')).toBe(true);
  });

  it('usa el nivel de título 3 por defecto y normaliza valores inválidos', () => {
    fixture.componentRef.setInput('titulo', 'Título');
    fixture.componentRef.setInput('nivelTitulo', 9);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h3.mupa-card__titulo')).toBeTruthy();
  });
});
