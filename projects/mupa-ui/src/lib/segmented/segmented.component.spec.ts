import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaSegmented } from './segmented.component';

describe('MupaSegmented', () => {
  let fixture: ComponentFixture<MupaSegmented>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaSegmented],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaSegmented);
    fixture.componentRef.setInput('opciones', [
      { valor: 'abrir', etiqueta: 'Abrir' },
      { valor: 'mitad', etiqueta: 'A la mitad' },
      { valor: 'cerrar', etiqueta: 'Cerrada' },
    ]);
    fixture.componentRef.setInput('valor', 'mitad');
  });

  it('renderiza las opciones y marca la activa', () => {
    fixture.detectChanges();

    const botones = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.mupa-segmented__opcion',
    );
    expect(botones.length).toBe(3);
    expect(botones[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('cambia el valor al pulsar una opción', () => {
    fixture.detectChanges();

    const botones = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.mupa-segmented__opcion',
    );
    botones[2].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.valor()).toBe('cerrar');
    expect(botones[2].getAttribute('aria-pressed')).toBe('true');
  });
});
