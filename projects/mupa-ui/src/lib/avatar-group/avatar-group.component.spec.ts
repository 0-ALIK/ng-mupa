import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaAvatarGroup } from './avatar-group.component';
import type { PersonaAvatar } from '../avatar/avatar.types';

describe('MupaAvatarGroup', () => {
  let fixture: ComponentFixture<MupaAvatarGroup>;

  const personas: PersonaAvatar[] = [
    { nombre: 'Ana Pérez' },
    { nombre: 'Luis Gómez' },
    { nombre: 'María Díaz' },
    { nombre: 'Carlos Ruiz' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaAvatarGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaAvatarGroup);
  });

  it('muestra como máximo la cantidad indicada', () => {
    fixture.componentRef.setInput('personas', personas);
    fixture.componentRef.setInput('maximo', 2);
    fixture.detectChanges();

    const avatares = fixture.nativeElement.querySelectorAll('mupa-avatar');
    expect(avatares.length).toBe(2);
  });

  it('muestra el contador de personas restantes', () => {
    fixture.componentRef.setInput('personas', personas);
    fixture.componentRef.setInput('maximo', 2);
    fixture.detectChanges();

    const contador = fixture.nativeElement.querySelector('.mupa-avatar-group__mas') as HTMLElement;
    expect(contador.textContent?.trim()).toBe('+2');
  });

  it('usa el total indicado para calcular el contador', () => {
    fixture.componentRef.setInput('personas', personas);
    fixture.componentRef.setInput('maximo', 2);
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();

    const contador = fixture.nativeElement.querySelector('.mupa-avatar-group__mas') as HTMLElement;
    expect(contador.textContent?.trim()).toBe('+8');
  });

  it('emite verMas cuando el contador es interactivo', () => {
    let emitido = false;
    fixture.componentInstance.verMas.subscribe(() => (emitido = true));

    fixture.componentRef.setInput('personas', personas);
    fixture.componentRef.setInput('maximo', 2);
    fixture.componentRef.setInput('accionVerMas', true);
    fixture.detectChanges();

    const boton = fixture.nativeElement.querySelector(
      '.mupa-avatar-group__accion',
    ) as HTMLButtonElement;
    boton.click();

    expect(emitido).toBe(true);
  });

  it('describe el grupo con el total de personas', () => {
    fixture.componentRef.setInput('personas', personas);
    fixture.detectChanges();

    const grupo = fixture.nativeElement.querySelector('.mupa-avatar-group') as HTMLElement;
    expect(grupo.getAttribute('aria-label')).toBe('4 personas');
  });
});
