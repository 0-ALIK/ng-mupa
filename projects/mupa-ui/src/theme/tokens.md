# Fundamentos — tokens

`tokens.css` es una copia exacta de los tokens del Lego Design System — Alcaldía de Panamá.
Define las fuentes Montserrat, los tokens de color, la escala tipográfica,
radios, espaciado, elevación y los alias semánticos del sistema.

## Fuentes

Montserrat en pesos 100–900, normal e itálica, autoalojada en `fonts/`.
La familia de interfaz es `--font-body`; `--font-display` y `--font-brand`
resuelven a la misma familia.

## Color

| Grupo           | Tokens                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------- |
| Primario        | `--color-primary-50` … `--color-primary-900`                                                 |
| Secundario      | `--color-secondary-100` … `--color-secondary-400`                                            |
| Neutros         | `--color-neutral-0` … `--color-neutral-900`                                                  |
| Complementarios | `--color-purple-*`, `--color-cyan-*`, `--color-brown-*`, `--color-lime-*`, `--color-coral-*` |
| Semánticos      | `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*`                |
| Impresión       | `--color-print-reflex-blue`                                                                  |

## Alias semánticos

Se usan en la interfaz de producto en lugar de los colores crudos.

| Alias              | Uso                                 |
| ------------------ | ----------------------------------- |
| `--bg-base`        | Fondo de aplicación                 |
| `--bg-surface`     | Tarjetas y superficies              |
| `--bg-subtle`      | Zonas suaves de información         |
| `--bg-inverse`     | Relleno de marca                    |
| `--fg-strong`      | Títulos y texto principal           |
| `--fg-default`     | Texto de cuerpo                     |
| `--fg-muted`       | Texto secundario y captions         |
| `--fg-disabled`    | Texto deshabilitado                 |
| `--fg-on-brand`    | Texto sobre azul institucional      |
| `--border-subtle`  | Bordes suaves                       |
| `--border-default` | Bordes por defecto                  |
| `--border-strong`  | Bordes de controles                 |
| `--border-control` | Bordes de campos                    |
| `--action`         | Acción principal                    |
| `--action-hover`   | Acción principal al pasar el cursor |
| `--action-press`   | Acción principal pulsada            |
| `--action-subtle`  | Fondo de acciones tonales           |
| `--focus-ring`     | Anillo de foco                      |
| `--link`           | Enlaces                             |

## Tipografía

Escala disponible:

`--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-title`,
`--text-body-lg`, `--text-body`, `--text-body-sm`, `--text-label`,
`--text-button`, `--text-caption`, `--text-overline`.

## Radios, espaciado y elevación

- Radios: `--radius-xs` 6px, `--radius-sm` 8px, `--radius-md` 12px,
  `--radius-card`/`--radius-lg` 16px, `--radius-xl` 24px, `--radius-pill` 999px.
- Espaciado base 4 pt: `--space-1` … `--space-12`.
- Sombras: `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`,
  `--shadow-focus`.

## Modo oscuro

Actívalo con `data-theme="dark"` en un contenedor. Los alias semánticos y los
neutros se redefinen automáticamente.

## Sidebar y modo oscuro

`mupa-sidebar` usa los tokens de superficie y texto, por lo que respeta
`data-theme="dark"` como el resto de componentes. Si necesitas forzar una
superficie blanca institucional dentro de un tema oscuro, aplica
`data-sidebar="white"` manualmente.

## Reglas de uso

- No uses colores hexadecimales sueltos: usa los alias semánticos.
- No inventes tamaños, radios, sombras ni espaciados fuera de esta escala.
- Carga `tokens.css` una sola vez en los estilos globales de la aplicación.
