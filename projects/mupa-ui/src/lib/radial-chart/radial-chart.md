# mupa-radial-chart

Gráfico radial de anillos concéntricos con etiquetas sobre el arco o cifra central.

Réplica del RadialChart del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-radial-chart
  titulo="Reportes por categoría"
  descripcion="Enero – Junio 2026"
  etiquetaValor="Reportes"
  [datos]="reportes"
  tendencia="Subió 5,2% este mes"
/>

<mupa-radial-chart
  titulo="Reportes resueltos"
  [datos]="[{ clave: 'resueltos', etiqueta: 'Resueltos', valor: 200 }]"
  [maximo]="288"
  [anguloMaximo]="360"
  [valorCentral]="200"
  etiquetaCentral="Resueltos"
/>
```

## Inputs

| Input                | Tipo                | Default            | Descripción                              |
| -------------------- | ------------------- | ------------------ | ---------------------------------------- |
| `titulo`             | `string`            | `'Gráfico radial'` | Título.                                  |
| `descripcion`        | `string`            | —                  | Descripción.                             |
| `datos`              | `ItemRadialChart[]` | `[]`               | Anillos, del interior al exterior.       |
| `etiquetaValor`      | `string`            | —                  | Nombre de la serie en el tooltip.        |
| `mostrarEtiquetas`   | `boolean`           | `true`             | Etiquetas sobre los arcos.               |
| `anguloMaximo`       | `number`            | `300`              | Barrido máximo en grados.                |
| `valorCentral`       | `string \| number`  | —                  | Cifra central; los números se formatean. |
| `etiquetaCentral`    | `string`            | —                  | Texto bajo la cifra central.             |
| `maximo`             | `number`            | Mayor valor        | Valor que llena `anguloMaximo`.          |
| `grosor`             | `number`            | Automático         | Grosor de anillo en píxeles.             |
| `tendencia`          | `string`            | —                  | Texto de tendencia.                      |
| `direccionTendencia` | `'up' \| 'down'`    | `'up'`             | Flecha y color.                          |
| `notaAlPie`          | `string`            | —                  | Nota del pie.                            |
| `tamano`             | `number`            | `250`              | Tamaño del SVG.                          |
| `locale`             | `string`            | `'es-PA'`          | Formato numérico.                        |

## Tipo

```ts
interface ItemRadialChart {
  clave: string;
  etiqueta: string;
  valor: number;
  color?: string;
}
```

## Comportamiento

- El primer elemento es el anillo interior.
- Los arcos usan el color de cada elemento y un fondo neutro.
- Con `valorCentral` o `etiquetaCentral` se ocultan las etiquetas de arco y se muestra el centro.
- El hover resalta el anillo y muestra etiqueta, valor y porcentaje.
- `maximo` y `anguloMaximo` permiten representar metas.
- Incluye la tabla de datos accesible.

## Accesibilidad

- SVG con `role="img"` y `aria-label`.
- Cada arco tiene un `<title>` con etiqueta y valor.
- La cifra central es texto SVG; el tooltip es decorativo.
- Tabla con caption y encabezados.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--fg-muted`, `--color-neutral-100`, `--color-success-700`,
`--color-error-700`, `--text-h3`, `--text-body-sm`, `--font-body`,
`--font-display`.
