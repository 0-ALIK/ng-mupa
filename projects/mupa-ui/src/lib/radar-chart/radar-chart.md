# mupa-radar-chart

Gráfico de radar para comparar varias series en los mismos ejes.

Réplica del RadarChart del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-radar-chart
  titulo="Reportes por canal"
  descripcion="Total de reportes de los últimos 6 meses"
  [datos]="reportes"
  [series]="[
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' }
  ]"
  tendencia="Subió 5,2% este mes"
/>
```

## Inputs

| Input                | Tipo                    | Default              | Descripción                   |
| -------------------- | ----------------------- | -------------------- | ----------------------------- |
| `titulo`             | `string`                | `'Gráfico de radar'` | Título.                       |
| `descripcion`        | `string`                | —                    | Descripción.                  |
| `datos`              | `DatoRadarChart[]`      | `[]`                 | Una fila por eje.             |
| `claveCategoria`     | `string`                | `'month'`            | Clave de la etiqueta del eje. |
| `series`             | `SerieRadarChart[]`     | `[]`                 | Series del radar.             |
| `cuadricula`         | `'polygon' \| 'circle'` | `'polygon'`          | Forma de la cuadrícula.       |
| `opacidadRelleno`    | `number`                | `0.6` / `0.35`       | Opacidad del relleno.         |
| `tendencia`          | `string`                | —                    | Texto de tendencia.           |
| `direccionTendencia` | `'up' \| 'down'`        | `'up'`               | Flecha y color.               |
| `notaAlPie`          | `string`                | —                    | Nota del pie.                 |
| `tamano`             | `number`                | `250`                | Tamaño del radar.             |
| `locale`             | `string`                | `'es-PA'`            | Formato numérico.             |

## Tipos

```ts
interface SerieRadarChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

interface DatoRadarChart {
  [clave: string]: number | string;
}
```

## Comportamiento

- La cuadrícula puede ser poligonal o circular.
- El hover resalta el eje, dibuja puntos por serie y muestra un tooltip.
- La leyenda solo aparece con más de una serie.
- El relleno se ajusta automáticamente según la cantidad de series.
- Incluye la tabla de datos accesible.

## Accesibilidad

- SVG con `role="img"` y `aria-label`.
- Tooltip decorativo; tabla como alternativa.
- Etiquetas de eje con texto y leyenda para las series.
- Tabla con caption y encabezados.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--fg-muted`, `--color-success-700`, `--color-error-700`,
`--text-h3`, `--text-body-sm`, `--font-body`, `--font-display`.
