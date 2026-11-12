import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBubbleContent } from './bubble-content.component';

@Component({
  imports: [MupaBubbleContent],
  template: `
    <mupa-bubble-content [colapsable]="true" [expandidoPorDefecto]="true" [maxLineas]="2">
      Texto largo de conversación para probar el control de expansión.
    </mupa-bubble-content>
  `,
})
class HostContenidoComponent {}

describe('MupaBubbleContent', () => {
  let fixture: ComponentFixture<MupaBubbleContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaBubbleContent, HostContenidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBubbleContent);
  });

  it('renderiza el texto y la variante plain por defecto', () => {
    fixture.componentRef.setInput('maxLineas', 3);
    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('.mupa-bubble-content')
        ?.classList.contains('mupa-bubble-content--plain'),
    ).toBe(true);
    expect(
      (
        fixture.nativeElement.querySelector('.mupa-bubble-content__texto') as HTMLElement
      ).style.getPropertyValue('--mupa-bubble-lineas'),
    ).toBe('3');
  });

  it('muestra Ver menos cuando inicia expandido y alterna al pulsar', () => {
    const host = TestBed.createComponent(HostContenidoComponent);
    host.detectChanges();

    const boton = host.nativeElement.querySelector(
      '.mupa-bubble-content__toggle',
    ) as HTMLButtonElement;

    expect(boton.textContent).toContain('Ver menos');
    expect(boton.getAttribute('aria-expanded')).toBe('true');
    expect(
      host.nativeElement
        .querySelector('.mupa-bubble-content__texto')
        ?.classList.contains('mupa-bubble-content__texto--recortado'),
    ).toBe(false);

    boton.click();
    host.detectChanges();

    expect(
      host.nativeElement
        .querySelector('.mupa-bubble-content__texto')
        ?.classList.contains('mupa-bubble-content__texto--recortado'),
    ).toBe(true);
  });

  it('no muestra el control cuando no es colapsable', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.mupa-bubble-content__toggle')).toBeNull();
  });
});
