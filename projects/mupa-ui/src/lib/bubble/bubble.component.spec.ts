import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBubble } from './bubble.component';
import { MupaBubbleContent } from './bubble-content.component';

@Component({
  imports: [MupaBubble, MupaBubbleContent],
  template: `
    <mupa-bubble alineacion="end" hora="8:30 a. m." meta="Enviado">
      <mupa-bubble-content>hola</mupa-bubble-content>
    </mupa-bubble>

    <mupa-bubble autor="Hati" avatar="bot" hora="8:30 a. m.">
      <mupa-bubble-content>¡Hola, vecino!</mupa-bubble-content>
    </mupa-bubble>
  `,
})
class HostConversacionComponent {}

describe('MupaBubble', () => {
  let fixture: ComponentFixture<HostConversacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostConversacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostConversacionComponent);
    fixture.detectChanges();
  });

  it('renderiza el mensaje del ciudadano a la derecha con la variante primaria', () => {
    const burbujas = fixture.nativeElement.querySelectorAll(
      'mupa-bubble',
    ) as NodeListOf<HTMLElement>;
    const fin = burbujas[0];
    const cuerpo = fin.querySelector('.mupa-bubble__cuerpo--end') as HTMLElement;

    expect(cuerpo.textContent).toContain('hola');
    expect(cuerpo.style.background).toBe('var(--color-primary-900)');
    expect(cuerpo.style.borderRadius).toBe('18px 18px 18px 18px');
    expect(fin.querySelector('.mupa-bubble__meta')?.textContent).toContain('8:30 a. m. · Enviado');
    expect(
      fin
        .querySelector('mupa-bubble-content .mupa-bubble-content')
        ?.classList.contains('mupa-bubble-content--primary'),
    ).toBe(true);
  });

  it('renderiza el mensaje del asistente con avatar, autor y hora', () => {
    const burbujas = fixture.nativeElement.querySelectorAll(
      'mupa-bubble',
    ) as NodeListOf<HTMLElement>;
    const inicio = burbujas[1];

    expect(inicio.querySelector('.mupa-bubble__autor')?.textContent).toContain('Hati');
    expect(inicio.querySelector('.mupa-bubble__hora')?.textContent).toContain('8:30 a. m.');
    expect(inicio.querySelector('.mupa-bubble__avatar svg')?.getAttribute('data-lucide')).toBe(
      'bot',
    );
    expect(inicio.querySelector('.mupa-bubble__columna')?.textContent).toContain('¡Hola, vecino!');
    expect(inicio.querySelector('.mupa-bubble__columna mupa-bubble-content')).toBeTruthy();
    expect(inicio.querySelector('.mupa-bubble__cuerpo--inicio')).toBeNull();
    expect(
      inicio
        .querySelector('mupa-bubble-content .mupa-bubble-content')
        ?.classList.contains('mupa-bubble-content--plain'),
    ).toBe(true);
  });

  it('acepta una imagen como avatar', () => {
    const host = TestBed.createComponent(HostAvatarImagenComponent);
    host.detectChanges();

    const imagen = host.nativeElement.querySelector('.mupa-bubble__avatar img') as HTMLImageElement;
    expect(imagen.getAttribute('src')).toBe('/avatar.png');
    expect(imagen.getAttribute('alt')).toBe('');
  });

  it('respeta el ancho máximo en el mensaje de inicio', () => {
    const fixtureInicio = TestBed.createComponent(MupaBubble);
    fixtureInicio.componentRef.setInput('anchoMaximo', 320);
    fixtureInicio.detectChanges();

    const columna = fixtureInicio.nativeElement.querySelector(
      '.mupa-bubble__columna',
    ) as HTMLElement;
    expect(columna.style.maxWidth).toBe('320px');
  });
});

@Component({
  imports: [MupaBubble],
  template: `<mupa-bubble avatar="/avatar.png"><span>Mensaje</span></mupa-bubble>`,
})
class HostAvatarImagenComponent {}
