# mupa-breadcrumb

Ruta de navegación con enlaces a los niveles anteriores y la página actual
marcada con `aria-current="page"`. Los niveles intermedios se colapsan en un
menú de puntos suspensivos.

## Uso

```html
<mupa-breadcrumb [elementos]="ruta()" (navegar)="alNavegar($event)" />
```

```ts
ruta = [
  { etiqueta: 'Inicio', href: '/', icono: 'house' },
  { etiqueta: 'Trámites', href: '/tramites' },
  { etiqueta: 'Licencias', href: '/tramites/licencias' },
  { etiqueta: 'Detalle' },
];
```

## Inputs

| Input       | Tipo                         | Default                | Descripción                                     |
| ----------- | ---------------------------- | ---------------------- | ----------------------------------------------- |
| `elementos` | `ElementoBreadcrumb[]`       | `[]`                   | Ruta completa; el último elemento es la página. |
| `maximo`    | `number`                     | `4`                    | Máximo de elementos antes de colapsar.          |
| `antes`     | `number`                     | `1`                    | Elementos visibles antes de los puntos.         |
| `despues`   | `number`                     | `2`                    | Elementos visibles después, incluido el actual. |
| `separador` | `'chevron-right' \| 'slash'` | `'chevron-right'`      | Separador entre niveles.                        |
| `etiqueta`  | `string`                     | `'Ruta de navegación'` | Nombre accesible de la navegación.              |

## Outputs

| Output    | Payload                                    | Descripción                           |
| --------- | ------------------------------------------ | ------------------------------------- |
| `navegar` | `{ elemento, indice, evento: MouseEvent }` | Emitido al activar un nivel anterior. |

El evento se emite sin `preventDefault`. Si usas el router de Angular, llama
`evento.preventDefault()` y navega con `Router`.

## Tipos

```ts
interface ElementoBreadcrumb {
  etiqueta: string;
  href?: string;
  icono?: string;
}
```

## Variantes

- **Ruta completa** — todos los niveles visibles.
- **Niveles ocultos** — cuando supera `maximo`, los intermedios aparecen en
  un menú de puntos suspensivos.
- **Separador barra** — usa `/` en lugar del chevron.

## Accesibilidad

- `<nav>` con `aria-label`.
- La página actual usa `aria-current="page"` y no es un enlace.
- El botón de puntos suspensivos usa `aria-haspopup="menu"`, `aria-expanded`
  y `aria-controls`.
- Teclado: `↓`/`Enter`/`Espacio` abren el menú; `↑`/`↓` recorren; `Enter`
  selecciona; `Escape` cierra y devuelve el foco al botón.
- El menú cierra al hacer clic fuera.

## Design tokens

`--fg-muted`, `--fg-default`, `--fg-strong`, `--color-primary-500`,
`--color-primary-700`, `--color-primary-50`, `--bg-surface`,
`--border-default`, `--shadow-md`, `--font-body`.
