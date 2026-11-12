# mupa-pagination

Paginación con tres variantes: completa, compacta para tablas y simple para
móvil. La página actual se muestra en azul institucional con `aria-current`.

## Uso

```html
<mupa-pagination [(pagina)]="paginaActual" [total]="10" />

<mupa-pagination
  variante="compact"
  [pagina]="paginaActual()"
  [total]="totalPaginas()"
  (paginaChange)="paginaActual.set($event)"
/>

<mupa-pagination variante="simple" [pagina]="paginaActual()" [total]="totalPaginas()" />
```

## Inputs

| Input             | Tipo                                 | Default        | Descripción                                     |
| ----------------- | ------------------------------------ | -------------- | ----------------------------------------------- |
| `pagina`          | `number`                             | `1`            | Página actual, base 1. Admite `[(pagina)]`.     |
| `total`           | `number`                             | `10`           | Total de páginas.                               |
| `variante`        | `'default' \| 'compact' \| 'simple'` | `'default'`    | Variante visual.                                |
| `hermanos`        | `number`                             | `1`            | Páginas visibles a cada lado de la actual.      |
| `mostrarExtremos` | `boolean`                            | `true`         | Muestra primera/última en la variante compacta. |
| `etiqueta`        | `string`                             | `'Paginación'` | Nombre accesible de la navegación.              |

## Outputs

| Output         | Payload  | Descripción                   |
| -------------- | -------- | ----------------------------- |
| `paginaChange` | `number` | Emitido al cambiar de página. |

## Variantes

- **default** — "Anterior" a la izquierda, números al centro y "Siguiente" a
  la derecha. Separador superior.
- **compact** — números y flechas agrupados, con extremos `«` y `»`.
- **simple** — "Página X de Y" con flechas, pensado para móvil.

## Accesibilidad

- `<nav>` con `aria-label`.
- La página actual usa `aria-current="page"`.
- Todos los botones tienen `aria-label` en español.
- Los puntos suspensivos son decorativos (`aria-hidden`).
- El estado de la variante simple usa `aria-live="polite"`.
- El foco visible usa `box-shadow: 0 0 0 3px rgba(6,96,255,.3)`.

## Design tokens

`--color-primary-50`, `--color-primary-100`, `--color-primary-300`,
`--color-primary-500`, `--color-primary-700`, `--color-neutral-300`,
`--fg-strong`, `--fg-default`, `--fg-muted`, `--border-default`,
`--border-subtle`, `--font-body`.
