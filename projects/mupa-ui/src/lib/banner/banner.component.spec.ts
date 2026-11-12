import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBanner } from './banner.component';

describe('MupaBanner', () => {
  let fixture: ComponentFixture<MupaBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBanner);
  });

  it('renderiza el tono info con su icono por defecto', () => {
    fixture.componentRef.setInput('titulo', 'Próximos pasos');
    fixture.componentRef.setInput('mensaje', 'Una cuadrilla revisará el reporte en 48 horas.');
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.mupa-banner') as HTMLElement;
    const icono = fixture.nativeElement.querySelector('svg') as SVGElement | null;

    expect(banner.classList.contains('mupa-banner--info')).toBe(true);
    expect(banner.textContent).toContain('Próximos pasos');
    expect(banner.textContent).toContain('Una cuadrilla');
    expect(icono?.getAttribute('data-lucide')).toBe('info');
  });

  it('cambia el icono según el tono', () => {
    fixture.componentRef.setInput('tono', 'warning');
    fixture.detectChanges();

    const icono = fixture.nativeElement.querySelector('svg') as SVGElement | null;
    expect(icono?.getAttribute('data-lucide')).toBe('circle-alert');
  });

  it('permite personalizar el icono', () => {
    fixture.componentRef.setInput('tono', 'error');
    fixture.componentRef.setInput('icono', 'circle-alert');
    fixture.detectChanges();

    const icono = fixture.nativeElement.querySelector('svg') as SVGElement | null;
    expect(icono?.getAttribute('data-lucide')).toBe('circle-alert');
  });

  it('proyecta contenido rico con énfasis', () => {
    const host = TestBed.createComponent(HostBannerComponent);
    host.detectChanges();

    const banner = host.nativeElement.querySelector('.mupa-banner') as HTMLElement;
    const fuerte = host.nativeElement.querySelector('.mupa-banner__mensaje strong') as HTMLElement;

    expect(banner.classList.contains('mupa-banner--success')).toBe(true);
    expect(fuerte.textContent).toContain('Pago completado');
    expect(banner.textContent).toContain('comprobante');
  });

  it('normaliza un tono inválido a info', () => {
    fixture.componentRef.setInput('tono', 'desconocido');
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.mupa-banner') as HTMLElement;
    expect(banner.classList.contains('mupa-banner--info')).toBe(true);
  });
});

@Component({
  imports: [MupaBanner],
  template: `
    <mupa-banner tono="success" titulo="Pago completado">
      <strong>Pago completado:</strong> tu comprobante ya está disponible.
    </mupa-banner>
  `,
})
class HostBannerComponent {}
