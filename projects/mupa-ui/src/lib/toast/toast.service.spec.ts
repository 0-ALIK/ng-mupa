import { TestBed } from '@angular/core/testing';

import { MupaToastService } from './toast.service';

describe('MupaToastService', () => {
  let servicio: MupaToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(MupaToastService);
    servicio.cerrarTodos();
  });

  it('agrega notificaciones y devuelve un id incremental', () => {
    const primero = servicio.mostrar({ titulo: 'Primera' });
    const segundo = servicio.mostrar({ titulo: 'Segunda' });

    expect(segundo).toBe(primero + 1);
    expect(servicio.toasts().length).toBe(2);
  });

  it('usa 5000 ms por defecto', () => {
    servicio.mostrar({ titulo: 'Guardado' });

    expect(servicio.toasts()[0].duracion).toBe(5000);
  });

  it('usa 8000 ms para errores', () => {
    servicio.mostrar({ titulo: 'Error', tono: 'error' });

    expect(servicio.toasts()[0].duracion).toBe(8000);
  });

  it('permanece abierta cuando tiene acción', () => {
    servicio.mostrar({
      titulo: 'Con acción',
      accion: { etiqueta: 'Ver detalle' },
    });

    expect(servicio.toasts()[0].duracion).toBe(0);
  });

  it('respeta la duración explícita', () => {
    servicio.mostrar({ titulo: 'Personalizada', duracion: 1500 });

    expect(servicio.toasts()[0].duracion).toBe(1500);
  });

  it('cierra una notificación por id', () => {
    const primero = servicio.mostrar({ titulo: 'Primera' });
    servicio.mostrar({ titulo: 'Segunda' });

    servicio.cerrar(primero);

    expect(servicio.toasts().length).toBe(1);
    expect(servicio.toasts()[0].titulo).toBe('Segunda');
  });

  it('cierra todas las notificaciones', () => {
    servicio.mostrar({ titulo: 'Primera' });
    servicio.mostrar({ titulo: 'Segunda' });

    servicio.cerrarTodos();

    expect(servicio.toasts().length).toBe(0);
  });
});
