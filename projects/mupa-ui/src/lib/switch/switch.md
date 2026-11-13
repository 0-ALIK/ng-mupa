# mupa-switch

Interruptor binario para activar o desactivar una opción.

Réplica del patrón `.sw` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-switch
  etiqueta="Notificaciones"
  descripcion="Recibe avisos por correo"
  [(activo)]="notificacionesActivas"
/>
```

## Inputs

| Input           | Tipo      | Default | Descripción                                  |
| --------------- | --------- | ------- | -------------------------------------------- |
| `activo`        | `boolean` | `false` | Estado del interruptor; admite `[(activo)]`. |
| `etiqueta`      | `string`  | —       | Etiqueta visible.                            |
| `descripcion`   | `string`  | —       | Descripción secundaria.                      |
| `ariaLabel`     | `string`  | —       | Nombre accesible si no hay etiqueta visible. |
| `deshabilitado` | `boolean` | `false` | Deshabilita la interacción.                  |

## Comportamiento

- Usa `role="switch"` y `aria-checked`.
- Se activa con clic, Enter o Espacio.
- El foco visible usa el token `--link`.
- La transición respeta `prefers-reduced-motion`.

## Design tokens

`--color-neutral-200`, `--color-primary-500`, `--radius-pill`,
`--radius-sm`, `--shadow-xs`, `--fg-strong`, `--fg-muted`, `--link`,
`--font-body`.
