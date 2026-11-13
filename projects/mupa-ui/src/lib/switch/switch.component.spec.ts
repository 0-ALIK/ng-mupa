import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaSwitch } from './switch.component';

describe('MupaSwitch', () => {
  let fixture: ComponentFixture<MupaSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaSwitch);
    fixture.componentRef.setInput('etiqueta', 'Notificaciones');
    fixture.componentRef.setInput('descripcion', 'Recibe avisos por correo');
  });

  it('renderiza el estado y alterna al pulsar', () => {
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('.mupa-switch') as HTMLButtonElement;
    expect(boton.getAttribute('role')).toBe('switch');
    expect(boton.getAttribute('aria-checked')).toBe('false');

    boton.click();
    fixture.detectChanges();

    expect(boton.getAttribute('aria-checked')).toBe('true');
    expect(boton.classList.contains('mupa-switch--activo')).toBe(true);
  });

  it('no alterna cuando está deshabilitado', () => {
    fixture.componentRef.setInput('deshabilitado', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector('.mupa-switch') as HTMLButtonElement;
    boton.click();
    fixture.detectChanges();

    expect(boton.disabled).toBe(true);
    expect(boton.getAttribute('aria-checked')).toBe('false');
  });
});
