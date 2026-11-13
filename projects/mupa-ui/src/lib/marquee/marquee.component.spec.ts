import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaMarquee } from './marquee.component';
import { MupaTestimonio } from './testimonio.component';

@Component({
  selector: 'pg-host-marquee',
  imports: [MupaMarquee],
  template: `
    <mupa-marquee [duracion]="30" [separacion]="16" etiqueta="Testimonios">
      <ng-template>
        <span class="elemento-prueba">Contenido</span>
      </ng-template>
    </mupa-marquee>
  `,
})
class HostMarqueeComponent {}

describe('MupaMarquee', () => {
  let fixture: ComponentFixture<HostMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostMarqueeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostMarqueeComponent);
    fixture.detectChanges();
  });

  it('duplica el contenido y oculta la copia a lectores de pantalla', () => {
    const host = fixture.nativeElement as HTMLElement;
    const carriles = host.querySelectorAll('.mupa-marquee__carril');

    expect(carriles.length).toBe(2);
    expect(carriles[1].getAttribute('aria-hidden')).toBe('true');
    expect(carriles[1].hasAttribute('inert')).toBe(true);
    expect(host.querySelectorAll('.elemento-prueba').length).toBeGreaterThan(1);
  });

  it('expone la región con etiqueta accesible', () => {
    const region = (fixture.nativeElement as HTMLElement).querySelector(
      '[role="region"]',
    ) as HTMLElement;

    expect(region.getAttribute('aria-label')).toBe('Testimonios');
  });

  it('pausa la animación al pasar el cursor', () => {
    const region = (fixture.nativeElement as HTMLElement).querySelector(
      '.mupa-marquee',
    ) as HTMLElement;
    const carril = region.querySelector('.mupa-marquee__carril') as HTMLElement;

    region.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    expect(carril.style.animationPlayState).toBe('paused');

    region.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();

    expect(carril.style.animationPlayState).toBe('running');
  });
});

@Component({
  selector: 'pg-host-testimonio',
  imports: [MupaTestimonio],
  template: `
    <mupa-testimonio nombre="Ana Castillo" meta="Ciudad de Panamá" [calificacion]="4">
      El trámite fue claro y rápido.
    </mupa-testimonio>
  `,
})
class HostTestimonioComponent {}

describe('MupaTestimonio', () => {
  let fixture: ComponentFixture<HostTestimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostTestimonioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostTestimonioComponent);
    fixture.detectChanges();
  });

  it('renderiza nombre, meta y cuerpo proyectado', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('.mupa-testimonio__nombre')?.textContent).toContain('Ana Castillo');
    expect(host.querySelector('.mupa-testimonio__meta')?.textContent).toContain('Ciudad de Panamá');
    expect(host.querySelector('blockquote')?.textContent).toContain(
      'El trámite fue claro y rápido.',
    );
  });

  it('muestra iniciales cuando no hay imagen', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('.mupa-testimonio__iniciales')?.textContent?.trim()).toBe('AC');
  });

  it('expone la calificación accesible y las estrellas', () => {
    const host = fixture.nativeElement as HTMLElement;
    const calificacion = host.querySelector('.mupa-testimonio__calificacion') as HTMLElement;

    expect(calificacion.getAttribute('aria-label')).toBe('Calificación: 4 de 5');
    expect(calificacion.getAttribute('role')).toBe('img');
    expect(calificacion.textContent?.replace(/\s/g, '')).toBe('★★★★★');
    expect(host.querySelectorAll('.mupa-testimonio__estrellas-vacias').length).toBe(1);
  });
});
