# mupa-toaster

Pila fija de notificaciones en la esquina superior derecha. Se monta una vez
por aplicación y consume las notificaciones de `MupaToastService`.

## Uso

```html
<!-- En el layout raíz -->
<mupa-toaster />
```

```ts
import { inject } from '@angular/core';
import { MupaToastService } from 'mupa-ui';

export class MiComponente {
  private readonly notificaciones = inject(MupaToastService);

  guardar(): void {
    const id = this.notificaciones.mostrar({
      tono: 'success',
      titulo: 'Cambios guardados',
      descripcion: 'La solicitud se actualizó correctamente.',
    });

    // Opcional: cerrar manualmente
    // this.notificaciones.cerrar(id);
  }
}
```

## Inputs

| Input            | Tipo     | Default | Descripción                                  |
| ---------------- | -------- | ------- | -------------------------------------------- |
| `maximo`         | `number` | `4`     | Máximo de notificaciones visibles a la vez.  |
| `desplazamiento` | `number` | `24`    | Separación en píxeles respecto a los bordes. |

## Servicio `MupaToastService`

| Método          | Retorno  | Descripción                               |
| --------------- | -------- | ----------------------------------------- |
| `mostrar()`     | `number` | Agrega una notificación y devuelve su id. |
| `cerrar(id)`    | `void`   | Cierra una notificación por id.           |
| `cerrarTodos()` | `void`   | Cierra todas las notificaciones.          |

Duración automática, igual que el original:

- Con acción: permanece abierta (`0`).
- Error: `8000` ms.
- Resto de tonos: `5000` ms.
- `duracion` explícita en las opciones tiene prioridad.

## Accesibilidad

- La pila usa `aria-label="Notificaciones"`.
- Las notificaciones usan `role="status"` o `role="alert"` según el tono.
- El progreso se pausa al pasar el cursor o al recibir foco.
- Respeta `prefers-reduced-motion`.

## Design tokens

No consume tokens directamente; delega en `mupa-toast`.
