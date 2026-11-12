# mupa-pill

Chip o etiqueta del sistema de diseño. Unifica las categorías de `Pill`
(AppKit), los chips de `Chip` (WebKit) y las variantes del preview
`comp-pills.html`: colores de categoría, estados semánticos, sólido,
contorno, icono y eliminación.

## Uso

```html
<mupa-pill etiqueta="Servicios digitales" color="cyan" icono="map" />

<mupa-pill etiqueta="Cultura" color="purple" icono="star" />

<mupa-pill etiqueta="Resuelto" color="success" icono="check" />

<mupa-pill etiqueta="Calidonia" diseno="solido" [removible]="true" (quitar)="limpiar()" />

<mupa-pill etiqueta="Esta semana" diseno="contorno" [removible]="true" />

<mupa-pill tamano="md" color="blue">Contenido proyectado</mupa-pill>
```

## Inputs

| Input       | Tipo                                                                                                                     | Default     | Descripción                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ | ----------- | --------------------------------------------------- |
| `etiqueta`  | `string`                                                                                                                 | —           | Texto del chip. Si se omite, se proyecta contenido. |
| `color`     | `'cyan' \| 'purple' \| 'lime' \| 'brown' \| 'coral' \| 'blue' \| 'slate' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'blue'`    | Color de categoría o estado.                        |
| `diseno`    | `'relleno' \| 'solido' \| 'contorno'`                                                                                    | `'relleno'` | Diseño visual.                                      |
| `tamano`    | `'sm' \| 'md'`                                                                                                           | `'sm'`      | Tamaño del chip.                                    |
| `icono`     | `string`                                                                                                                 | —           | Nombre de icono Lucide opcional.                    |
| `removible` | `boolean`                                                                                                                | `false`     | Muestra el botón de quitar.                         |

## Outputs

| Output   | Payload | Descripción                           |
| -------- | ------- | ------------------------------------- |
| `quitar` | `void`  | Emitido al pulsar el botón de quitar. |

## Variantes

- **Relleno** — fondo tono-100, texto tono-700 y borde tono-200/300.
- **Sólido** — azul institucional con texto blanco.
- **Contorno** — fondo de superficie, texto por defecto y borde neutro.
- **Removible** — icono de cierre con botón accesible.

## Accesibilidad

- Es un `<span>` de texto; el contenido se anuncia normalmente.
- El botón de quitar tiene `aria-label="Quitar etiqueta"`.
- El foco visible del botón de quitar usa `--focus-ring`.
- Los colores mantienen contraste AA con los tonos 700.

## Design tokens

`--color-cyan-*`, `--color-purple-*`, `--color-lime-*`, `--color-brown-*`,
`--color-coral-*`, `--color-primary-*`, `--color-neutral-*`,
`--color-success-*`, `--color-warning-*`, `--color-error-*`,
`--color-info-*`, `--color-secondary-300`, `--bg-surface`, `--fg-default`,
`--border-default`, `--text-caption`, `--focus-ring`.
