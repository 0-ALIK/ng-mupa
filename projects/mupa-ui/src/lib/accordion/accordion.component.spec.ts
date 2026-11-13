import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaAccordion } from './accordion.component';

const ITEMS = [
  {
    id: 'seguridad',
    titulo: '¿Cómo se protege la información?',
    contenido: 'Usamos cifrado y controles de acceso.',
    abierto: true,
  },
  {
    id: 'cuentas',
    titulo: '¿Cómo vinculo otra cuenta?',
    contenido: 'Ve a Cuentas y elige la institución.',
  },
];

describe('MupaAccordion', () => {
  let fixture: ComponentFixture<MupaAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaAccordion);
    fixture.componentRef.setInput('items', ITEMS);
  });

  it('renderiza los paneles y respeta el abierto inicial', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const botones = host.querySelectorAll<HTMLButtonElement>('.mupa-accordion__pregunta');
    expect(botones.length).toBe(2);
    expect(botones[0].getAttribute('aria-expanded')).toBe('true');
    expect(botones[1].getAttribute('aria-expanded')).toBe('false');
    expect(host.querySelectorAll('.mupa-accordion__respuesta').length).toBe(1);
  });

  it('abre y cierra un panel al pulsar', () => {
    fixture.detectChanges();

    const botones = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.mupa-accordion__pregunta',
    );
    botones[1].click();
    fixture.detectChanges();

    expect(botones[0].getAttribute('aria-expanded')).toBe('false');
    expect(botones[1].getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.textContent).toContain('Ve a Cuentas y elige la institución.');
  });

  it('permite varios abiertos cuando se solicita', () => {
    fixture.componentRef.setInput('permitirMultiple', true);
    fixture.detectChanges();

    const botones = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      '.mupa-accordion__pregunta',
    );
    botones[1].click();
    fixture.detectChanges();

    expect(botones[0].getAttribute('aria-expanded')).toBe('true');
    expect(botones[1].getAttribute('aria-expanded')).toBe('true');
  });
});
