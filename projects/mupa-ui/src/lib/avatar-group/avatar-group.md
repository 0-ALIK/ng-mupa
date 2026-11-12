# mupa-avatar-group

Grupo de avatares superpuestos con anillo blanco y contador `+N`. Mantiene el
solapamiento del 28 % del tamaño y los colores institucionales del original.

## Uso

```html
<mupa-avatar-group [personas]="equipo()" />

<mupa-avatar-group
  [personas]="equipo()"
  [maximo]="3"
  [total]="equipoTotal()"
  [accionVerMas]="true"
  (verMas)="abrirEquipo()"
/>
```

## Inputs

| Input          | Tipo              | Default | Descripción                                         |
| -------------- | ----------------- | ------- | --------------------------------------------------- |
| `personas`     | `PersonaAvatar[]` | `[]`    | Personas a mostrar.                                 |
| `maximo`       | `number`          | `5`     | Máximo de avatares antes del contador.              |
| `total`        | `number`          | —       | Total de personas; por defecto `personas.length`.   |
| `tamano`       | `number`          | `40`    | Tamaño en píxeles de cada avatar.                   |
| `accionVerMas` | `boolean`         | `false` | Convierte el contador `+N` en un botón interactivo. |

## Outputs

| Output   | Payload | Descripción                                          |
| -------- | ------- | ---------------------------------------------------- |
| `verMas` | `void`  | Emitido al pulsar el contador cuando es interactivo. |

## Variantes

- **Contador estático** — el `+N` es un `<span>` informativo.
- **Contador interactivo** — con `accionVerMas`, el `+N` es un botón que
  cambia a `--color-primary-700` al pasar el cursor y emite `verMas`.

## Accesibilidad

- El grupo usa `role="group"` y `aria-label` con el total de personas.
- El contador estático lleva `aria-label="y N más"`.
- El contador interactivo es un `<button>` con `aria-label="Ver N personas más"`.
- Los avatares internos conservan su propio texto accesible.

## Design tokens

`--color-primary-500`, `--color-primary-700`, `--font-body`, `--link`.
Los avatares internos consumen además los tokens de `mupa-avatar`.
