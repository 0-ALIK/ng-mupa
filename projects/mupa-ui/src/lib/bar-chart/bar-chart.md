# mupa-bar-chart

Gráfico de barras simple o agrupado, con tooltip, leyenda y tendencia.

Réplica del BarChart del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-bar-chart
  titulo="Pagos de impuestos"
  descripcion="Enero – Junio 2026"
  [datos]="pagos"
  [series]="[{ clave: 'pagos', etiqueta: 'Pagos en línea' }]"
  tendencia="Subió 5,2% este mes"
  direccionTendencia="up"
  notaAlPie="Total de pagos en línea de los últimos 6 meses"
/>
```

## Inputs

| Input                | Tipo              | Default               | Descripción                                      |
| -------------------- | ----------------- | --------------------- | ------------------------------------------------ |
| `titulo`             | `string`          | `'Gráfico de barras'` | Título.                                          |
| `descripcion`        | `string`          | —                     | Descripción.                                     |
| `datos`              | `DatoBarChart[]`  | `[]`                  | Filas de datos.                                  |
| `claveCategoria`     | `string`          | `'month'`             | Clave de la categoría del eje X.                 |
| `series`             | `SerieBarChart[]` | `[]`                  | Una o varias series.                             |
| `longitudEtiqueta`   | `number`          | `3`                   | Recorte de la etiqueta del eje; 0 = sin recorte. |
| `mostrarCabecera`    | `boolean`         | `true`                | Muestra u oculta toda la cabecera.               |
| `mostrarTitulo`      | `boolean`         | `true`                | Muestra u oculta solo el título.                 |
| `mostrarDescripcion` | `boolean`         | `true`                | Muestra u oculta solo la descripción.            |
| `mostrarDatos`       | `boolean`         | `true`                | Muestra u oculta la tabla de datos.              |
| `mostrarBorde`       | `boolean`         | `true`                | Muestra u oculta el borde de la tarjeta.         |
| `tendencia`          | `string`          | —                     | Texto de tendencia en el pie.                    |
| `direccionTendencia` | `'up' \| 'down'`  | `'up'`                | Flecha y color de tendencia.                     |
| `notaAlPie`          | `string`          | —                     | Nota adicional del pie.                          |
| `altura`             | `number`          | `250`                 | Altura del SVG.                                  |
| `locale`             | `string`          | `'es-PA'`             | Formato numérico.                                |
| `radio`              | `number`          | 8 / 4                 | Radio superior de las barras.                    |

## Tipos

```ts
interface SerieBarChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

interface DatoBarChart {
  [clave: string]: number | string;
}
```

## Comportamiento

- Una serie produce barras simples; varias series se agrupan.
- El hover resalta el grupo, atenúa el resto y muestra un tooltip.
- Cada barra incluye un `<title>` con categoría, serie y valor.
- La leyenda solo aparece con varias series.
- El pie de tendencia y la nota son opcionales.
- Incluye la tabla de datos accesible.

## Accesibilidad

- SVG con `role="img"` y `aria-label`.
- Tooltip decorativo; la tabla contiene todos los valores.
- La leyenda no depende solo del color: cada serie tiene texto.
- Tabla con caption y encabezados.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--fg-muted`, `--color-success-700`, `--color-error-700`,
`--text-h3`, `--text-body-sm`, `--font-body`, `--font-display`.
