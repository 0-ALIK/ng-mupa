import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaButton } from './button.component';

describe('MupaButton', () => {
  let fixture: ComponentFixture<MupaButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaButton);
  });

  it('crea un botón nativo con la variante primaria', () => {
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(boton).toBeTruthy();
    expect(boton.classList.contains('mupa-button')).toBe(true);
    expect(boton.type).toBe('button');
  });

  it('aplica las clases de variante y tamaño', () => {
    fixture.componentRef.setInput('variante', 'secondary');
    fixture.componentRef.setInput('tamano', 'lg');
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(boton.classList.contains('mupa-button--secondary')).toBe(true);
    expect(boton.classList.contains('mupa-button--lg')).toBe(true);
  });

  it('deshabilita el botón cuando corresponde', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(boton.disabled).toBe(true);
  });

  it('marca aria-busy y bloquea el botón mientras carga', () => {
    fixture.componentRef.setInput('cargando', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(boton.disabled).toBe(true);
    expect(boton.getAttribute('aria-busy')).toBe('true');
  });

  it('renderiza el icono de inicio', () => {
    fixture.componentRef.setInput('iconoInicio', 'save');
    fixture.detectChanges();

    const icono = fixture.nativeElement.querySelector('mupa-icon') as HTMLElement;
    expect(icono).toBeTruthy();
  });

  it('expone aria-expanded y aria-controls cuando se indican', () => {
    fixture.componentRef.setInput('expandidoAria', true);
    fixture.componentRef.setInput('controlaAria', 'panel-detalle');
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(boton.getAttribute('aria-controls')).toBe('panel-detalle');
  });

  it('emite el evento clic', () => {
    let recibido: MouseEvent | undefined;
    fixture.componentInstance.clic.subscribe((evento) => (recibido = evento));
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    boton.click();

    expect(recibido).toBeInstanceOf(MouseEvent);
  });

  it('renderiza un ancla cuando se indica href', () => {
    fixture.componentRef.setInput('href', '/tramites/nuevo');
    fixture.componentRef.setInput('variante', 'secondary');
    fixture.detectChanges();

    const enlace = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(enlace).toBeTruthy();
    expect(enlace.getAttribute('href')).toBe('/tramites/nuevo');
    expect(enlace.classList.contains('mupa-button--secondary')).toBe(true);
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
  });

  it('bloquea la navegación del ancla cuando está deshabilitada', () => {
    let recibido: MouseEvent | undefined;
    fixture.componentInstance.clic.subscribe((evento) => (recibido = evento));

    fixture.componentRef.setInput('href', '/tramites/nuevo');
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    const enlace = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const evento = new MouseEvent('click', { bubbles: true, cancelable: true });
    enlace.dispatchEvent(evento);

    expect(evento.defaultPrevented).toBe(true);
    expect(enlace.getAttribute('aria-disabled')).toBe('true');
    expect(recibido).toBeUndefined();
  });
});
