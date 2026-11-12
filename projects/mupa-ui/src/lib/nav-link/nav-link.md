# mupa-nav-link

Espécimen estático de los estados visuales de un enlace de landing. Se usa en
la documentación para mostrar `default`, `hover`, `pressed`, `selected` y
`focus`. **No es un enlace interactivo**; para la navegación real usa
`mupa-landing-nav`.

## Uso

```html
<mupa-nav-link etiqueta="Vacantes" estado="default" />
<mupa-nav-link etiqueta="Vacantes" estado="hover" />
<mupa-nav-link etiqueta="Vacantes" estado="pressed" />
<mupa-nav-link etiqueta="Vacantes" estado="selected" />
<mupa-nav-link etiqueta="Vacantes" estado="focus" />
```

## Inputs

| Input      | Tipo                                                         | Default     | Descripción              |
| ---------- | ------------------------------------------------------------ | ----------- | ------------------------ |
| `etiqueta` | `string` (requerido)                                         | —           | Texto del enlace.        |
| `estado`   | `'default' \| 'hover' \| 'pressed' \| 'selected' \| 'focus'` | `'default'` | Estado visual a mostrar. |

## Estados

- `default` — texto `--fg-default`, indicador transparente.
- `hover` — texto `--color-primary-700`, indicador `--color-primary-200`.
- `pressed` — fondo `--color-primary-50`, indicador `--color-primary-300`.
- `selected` — texto `--fg-strong` en 700, indicador `--color-primary-500`.
- `focus` — sombra `0 0 0 3px rgba(6,96,255,.3)`.

## Accesibilidad

Es un espécimen visual, no un control. No recibe foco ni tiene semántica de
enlace. Para navegación accesible usa `mupa-landing-nav`.

## Design tokens

`--fg-default`, `--fg-strong`, `--color-primary-50`, `--color-primary-200`,
`--color-primary-300`, `--color-primary-500`, `--color-primary-700`,
`--font-body`.
