import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaLogoLoop } from './logo-loop.component';
import type { ItemLogoLoop } from './logo-loop.types';

@Component({
  selector: 'pg-host-plantilla-logo-loop',
  template: `
    <ng-template #plantilla let-datos>
      <span class="plantilla-prueba">{{ datos.nombre }}</span>
    </ng-template>
  `,
})
class HostPlantillaLogoLoopComponent {
  @ViewChild('plantilla', { static: true }) plantilla!: TemplateRef<unknown>;
}

describe('MupaLogoLoop', () => {
  let fixture: ComponentFixture<MupaLogoLoop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaLogoLoop, HostPlantillaLogoLoopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaLogoLoop);
  });

  it('renderiza logos de imagen y duplica la lista', () => {
    const logos: ItemLogoLoop[] = [
      { src: '/logo-a.svg', alt: 'Logo A' },
      { src: '/logo-b.svg', alt: 'Logo B' },
    ];

    fixture.componentRef.setInput('logos', logos);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const listas = host.querySelectorAll('.mupa-logo-loop__lista');

    expect(listas.length).toBe(2);
    expect(listas[1].getAttribute('aria-hidden')).toBe('true');
    expect(listas[1].hasAttribute('inert')).toBe(true);
    expect(host.querySelectorAll('img').length).toBe(4);
    expect(host.querySelector('img')?.getAttribute('alt')).toBe('Logo A');
  });

  it('envuelve en enlace los items con href', () => {
    fixture.componentRef.setInput('logos', [
      { src: '/logo-a.svg', alt: 'Logo A', href: 'https://example.com' },
    ]);
    fixture.detectChanges();

    const enlace = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(enlace.getAttribute('href')).toBe('https://example.com');
    expect(enlace.getAttribute('target')).toBe('_blank');
    expect(enlace.getAttribute('rel')).toContain('noreferrer');
    expect(enlace.getAttribute('aria-label')).toBe('Logo A');
  });

  it('renderiza items con plantilla y contexto', () => {
    const hostPlantilla = TestBed.createComponent(HostPlantillaLogoLoopComponent);
    hostPlantilla.detectChanges();

    fixture.componentRef.setInput('logos', [
      {
        plantilla: hostPlantilla.componentInstance.plantilla,
        contexto: { $implicit: { nombre: 'Tesorería Municipal' } },
        titulo: 'Tesorería Municipal',
        etiquetaAria: 'Tesorería Municipal',
      },
    ]);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.plantilla-prueba')?.textContent).toContain('Tesorería Municipal');
  });

  it('omite los degradados cuando colorDesvanecido es null', () => {
    fixture.componentRef.setInput('logos', [{ src: '/logo-a.svg', alt: 'Logo A' }]);
    fixture.componentRef.setInput('colorDesvanecido', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.mupa-logo-loop__borde')).toBeNull();
  });

  it('expone la región con etiqueta accesible', () => {
    fixture.componentRef.setInput('etiquetaAria', 'Instituciones aliadas');
    fixture.detectChanges();

    const region = fixture.nativeElement.querySelector('[role="region"]') as HTMLElement;
    expect(region.getAttribute('aria-label')).toBe('Instituciones aliadas');
  });
});
