import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaBubbleCard } from './bubble-card.component';

describe('MupaBubbleCard', () => {
  let fixture: ComponentFixture<MupaBubbleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaBubbleCard],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaBubbleCard);
  });

  it('usa el ancho máximo por defecto', () => {
    fixture.detectChanges();

    const tarjeta = fixture.nativeElement.querySelector('.mupa-bubble-card') as HTMLElement;
    expect(tarjeta.style.maxWidth).toBe('460px');
  });

  it('acepta un ancho numérico o una medida CSS', () => {
    fixture.componentRef.setInput('anchoMaximo', 320);
    fixture.detectChanges();

    const tarjeta = fixture.nativeElement.querySelector('.mupa-bubble-card') as HTMLElement;
    expect(tarjeta.style.maxWidth).toBe('320px');

    fixture.componentRef.setInput('anchoMaximo', '80%');
    fixture.detectChanges();
    expect(tarjeta.style.maxWidth).toBe('80%');
  });
});
