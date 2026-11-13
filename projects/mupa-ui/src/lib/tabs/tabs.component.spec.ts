import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaTabs } from './tabs.component';

describe('MupaTabs', () => {
  let fixture: ComponentFixture<MupaTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaTabs);
    fixture.componentRef.setInput('pestanas', [
      { id: 'general', etiqueta: 'General' },
      { id: 'facturacion', etiqueta: 'Facturación' },
      { id: 'metas', etiqueta: 'Metas' },
    ]);
    fixture.componentRef.setInput('activa', 'general');
  });

  it('renderiza las pestañas y marca la activa', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const botones = host.querySelectorAll<HTMLButtonElement>('.mupa-tabs__pestana');
    expect(botones.length).toBe(3);
    expect(botones[0].getAttribute('aria-selected')).toBe('true');
    expect(botones[1].getAttribute('aria-selected')).toBe('false');
  });

  it('cambia la pestaña activa al pulsar', () => {
    fixture.detectChanges();

    const botones = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.mupa-tabs__pestana',
    );
    botones[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.activa()).toBe('facturacion');
    expect(botones[1].getAttribute('aria-selected')).toBe('true');
  });

  it('navega con las flechas del teclado', () => {
    fixture.detectChanges();

    const botones = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.mupa-tabs__pestana',
    );
    botones[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.activa()).toBe('facturacion');
  });
});
