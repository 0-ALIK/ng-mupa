# mupa-toast

Tarjeta de notificación individual. Superficie blanca, radio de 16 px, barra
lateral de tono, icono en contenedor y acciones opcionales.

## Uso

```html
<mupa-toast
  tono="success"
  titulo="Reporte enviado"
  descripcion="Tu folio es #PTY-48230."
  [accion]="{ etiqueta: 'Ver recibo' }"
  [progreso]="0.45"
  (cerrar)="cerrarNotificacion()"
  (accionClic)="verRecibo()"
/>
```

## Inputs

| Input         | Tipo                                          | Default  | Descripción                                |
| ------------- | --------------------------------------------- | -------- | ------------------------------------------ |
| `tono`        | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` | Tono visual.                               |
| `titulo`      | `string` (requerido)                          | —        | Título de la notificación.                 |
| `descripcion` | `string`                                      | —        | Texto descriptivo opcional.                |
| `accion`      | `AccionToast`                                 | —        | Acción de texto opcional.                  |
| `descartable` | `boolean`                                     | `true`   | Muestra el botón de cierre.                |
| `progreso`    | `number`                                      | —        | Progreso de cierre automático entre 0 y 1. |

## Outputs

| Output       | Payload | Descripción                            |
| ------------ | ------- | -------------------------------------- |
| `cerrar`     | `void`  | Emitido al pulsar el botón de cierre.  |
| `accionClic` | `void`  | Emitido al activar la acción de texto. |

## Variantes

- `success` — barra, icono y texto en verde semántico.
- `info` — azul institucional.
- `warning` — ámbar.
- `error` — rojo, con `role="alert"` y `aria-live="assertive"`.

## Accesibilidad

- `role="status"` y `aria-live="polite"` para informaciones.
- `role="alert"` y `aria-live="assertive"` para errores.
- El botón de cierre tiene `aria-label="Cerrar notificación"`.
- La barra y el progreso son decorativos (`aria-hidden`).
- El foco visible usa `--link`.

## Design tokens

`--color-success-*`, `--color-warning-*`, `--color-error-*`,
`--color-info-100`, `--color-primary-500/700`, `--color-secondary-300`,
`--bg-surface`, `--border-default`, `--fg-strong`, `--fg-default`,
`--fg-muted`, `--color-neutral-50`, `--font-body`, `--link`.

La sombra se conserva literal desde el original:
`0 12px 32px rgba(14,34,93,.14)`.
