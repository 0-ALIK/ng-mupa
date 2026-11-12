import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBubble } from './bubble.component';
import { MupaBubbleContent } from './bubble-content.component';
import { MupaBubbleGroup } from './bubble-group.component';

@Component({
  imports: [MupaBubbleGroup, MupaBubble, MupaBubbleContent],
  template: `
    <mupa-bubble-group [espacio]="10">
      <mupa-bubble autor="Hati" avatar="bot" hora="8:30 a. m.">
        <mupa-bubble-content>Primer mensaje.</mupa-bubble-content>
      </mupa-bubble>
      <mupa-bubble autor="Hati" avatar="bot" hora="8:31 a. m.">
        <mupa-bubble-content>Segundo mensaje.</mupa-bubble-content>
      </mupa-bubble>
    </mupa-bubble-group>
  `,
})
class HostGrupoInicioComponent {}

@Component({
  imports: [MupaBubbleGroup, MupaBubble],
  template: `
    <mupa-bubble-group>
      <mupa-bubble alineacion="end"><span>Primero</span></mupa-bubble>
      <mupa-bubble alineacion="end"><span>Segundo</span></mupa-bubble>
    </mupa-bubble-group>
  `,
})
class HostGrupoFinComponent {}

describe('MupaBubbleGroup', () => {
  let fixture: ComponentFixture<HostGrupoInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostGrupoInicioComponent, HostGrupoFinComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostGrupoInicioComponent);
    fixture.detectChanges();
  });

  it('expone el grupo y aplica la separación', () => {
    const grupo = fixture.nativeElement.querySelector('mupa-bubble-group') as HTMLElement;
    expect(grupo.getAttribute('role')).toBe('group');
    expect(grupo.style.gap).toBe('10px');
  });

  it('oculta el avatar y la cabecera repetidos en el segundo mensaje', () => {
    const burbujas = fixture.nativeElement.querySelectorAll(
      'mupa-bubble',
    ) as NodeListOf<HTMLElement>;

    expect(burbujas[0].querySelectorAll('.mupa-bubble__avatar').length).toBe(1);
    expect(burbujas[0].querySelectorAll('.mupa-bubble__cabecera').length).toBe(1);
    expect(burbujas[1].querySelectorAll('.mupa-bubble__cabecera').length).toBe(0);
    expect(burbujas[1].querySelectorAll('.mupa-bubble__avatar-espacio').length).toBe(1);
  });

  it('une los radios de mensajes consecutivos alineados al final', () => {
    const fixtureFin = TestBed.createComponent(HostGrupoFinComponent);
    fixtureFin.detectChanges();

    const cuerpos = fixtureFin.nativeElement.querySelectorAll(
      '.mupa-bubble__cuerpo--end',
    ) as NodeListOf<HTMLElement>;

    expect(cuerpos[0].style.borderRadius).toBe('18px 18px 6px 18px');
    expect(cuerpos[1].style.borderRadius).toBe('18px 6px 18px 18px');
  });
});
