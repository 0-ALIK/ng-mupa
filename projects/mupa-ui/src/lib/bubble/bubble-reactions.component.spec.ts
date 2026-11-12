import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MupaBubbleReactions } from './bubble-reactions.component';

@Component({
  imports: [MupaBubbleReactions],
  template: `
    <mupa-bubble-reactions etiquetaAria="Reacciones: 3 útiles"> 👍 3 </mupa-bubble-reactions>
  `,
})
class HostReaccionesComponent {}

describe('MupaBubbleReactions', () => {
  it('renderiza la píldora con nombre accesible y contenido', () => {
    const fixture = TestBed.createComponent(HostReaccionesComponent);
    fixture.detectChanges();

    const reacciones = fixture.nativeElement.querySelector('.mupa-bubble-reactions') as HTMLElement;
    expect(reacciones.getAttribute('role')).toBe('img');
    expect(reacciones.getAttribute('aria-label')).toBe('Reacciones: 3 útiles');
    expect(reacciones.textContent).toContain('👍 3');
  });
});
