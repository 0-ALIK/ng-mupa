import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaToaster } from './toaster.component';
import { MupaToastService } from './toast.service';

describe('MupaToaster', () => {
  let fixture: ComponentFixture<MupaToaster>;
  let servicio: MupaToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaToaster],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaToaster);
    servicio = TestBed.inject(MupaToastService);
    servicio.cerrarTodos();
  });

  it('muestra las notificaciones registradas en el servicio', () => {
    servicio.mostrar({ titulo: 'Guardado', duracion: 0 });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('mupa-toast').length).toBe(1);
  });

  it('respeta el máximo de notificaciones visibles', () => {
    servicio.mostrar({ titulo: 'Uno', duracion: 0 });
    servicio.mostrar({ titulo: 'Dos', duracion: 0 });
    servicio.mostrar({ titulo: 'Tres', duracion: 0 });

    fixture.componentRef.setInput('maximo', 2);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('mupa-toast').length).toBe(2);
  });

  it('elimina la notificación al cerrarla', () => {
    const id = servicio.mostrar({ titulo: 'Guardado', duracion: 0 });
    fixture.detectChanges();

    servicio.cerrar(id);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('mupa-toast').length).toBe(0);
  });

  it('ordena las notificaciones de la más reciente a la más antigua', () => {
    servicio.mostrar({ titulo: 'Primera', duracion: 0 });
    servicio.mostrar({ titulo: 'Segunda', duracion: 0 });
    fixture.detectChanges();

    const titulos = Array.from(fixture.nativeElement.querySelectorAll('.mupa-toast__titulo')).map(
      (elemento) => (elemento as HTMLElement).textContent?.trim(),
    );

    expect(titulos).toEqual(['Segunda', 'Primera']);
  });
});
