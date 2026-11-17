import { TestBed } from '@angular/core/testing';

import { LoginTemplateComponent } from './login-template.component';

describe('LoginTemplateComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTemplateComponent],
    }).compileComponents();
  });

  it('renderiza el login y habilita el botón con correo y contraseña', async () => {
    const fixture = TestBed.createComponent(LoginTemplateComponent);
    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;

    const vistaLogin = elemento.querySelector('#v-login') as HTMLElement;
    const vistaRecuperacion = elemento.querySelector('#v-rec') as HTMLElement;
    const boton = elemento.querySelector('#v-login mupa-button button') as HTMLButtonElement;

    expect(vistaLogin.hasAttribute('hidden')).toBe(false);
    expect(vistaRecuperacion.hasAttribute('hidden')).toBe(true);
    expect(boton.disabled).toBe(true);

    const correo = elemento.querySelector('#em') as HTMLInputElement;
    correo.value = 'ana@mupa.gob.pa';
    correo.dispatchEvent(new Event('input'));

    const contrasena = elemento.querySelector('#pw') as HTMLInputElement;
    contrasena.value = 'secreta';
    contrasena.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(boton.disabled).toBe(false);

    const ojo = elemento.querySelector('#eye') as HTMLButtonElement;
    ojo.click();
    fixture.detectChanges();

    expect(contrasena.type).toBe('text');
    expect(ojo.getAttribute('aria-pressed')).toBe('true');
  });

  it('cambia a recuperación, valida el correo y muestra la confirmación', async () => {
    const fixture = TestBed.createComponent(LoginTemplateComponent);
    await fixture.whenStable();
    const elemento = fixture.nativeElement as HTMLElement;

    const correo = elemento.querySelector('#em') as HTMLInputElement;
    correo.value = 'ana@mupa.gob.pa';
    correo.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const irARecuperacion = elemento.querySelector('#to-rec') as HTMLAnchorElement;
    irARecuperacion.click();
    fixture.detectChanges();

    const vistaLogin = elemento.querySelector('#v-login') as HTMLElement;
    const vistaRecuperacion = elemento.querySelector('#v-rec') as HTMLElement;
    const recuperacion = elemento.querySelector('#rem') as HTMLInputElement;

    expect(vistaLogin.hasAttribute('hidden')).toBe(true);
    expect(vistaRecuperacion.hasAttribute('hidden')).toBe(false);
    expect(recuperacion.value).toBe('ana@mupa.gob.pa');

    recuperacion.value = 'correo-invalido';
    recuperacion.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const formulario = elemento.querySelector('#fr') as HTMLFormElement;
    formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(elemento.querySelector('#fre')?.classList).toContain('bad');
    expect(elemento.querySelector('#sent')?.hasAttribute('hidden')).toBe(true);

    recuperacion.value = 'ana@mupa.gob.pa';
    recuperacion.dispatchEvent(new Event('input'));
    formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(elemento.querySelector('#sent')?.hasAttribute('hidden')).toBe(false);
    const botonEnviar = elemento.querySelector('#v-rec mupa-button button') as HTMLButtonElement;
    expect(botonEnviar.disabled).toBe(true);
  });
});
