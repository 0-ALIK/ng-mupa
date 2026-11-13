# mupa-area-chart

Gráfico de área interactivo con selector de periodo, series apiladas y tooltip.

Réplica del AreaChart del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-area-chart
  titulo="Reportes ciudadanos"
  descripcion="Reportes recibidos según el periodo seleccionado"
  [datos]="datos"
  [series]="[
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' }
  ]"
/>
```

## Inputs

| Input             | Tipo               | Default             | Descripción                             |
| ----------------- | ------------------ | ------------------- | --------------------------------------- |
| `titulo`          | `string`           | `'Gráfico de área'` | Título de la tarjeta.                   |
| `descripcion`     | `string`           | —                   | Descripción bajo el título.             |
| `datos`           | `DatoAreaChart[]`  | `[]`                | Filas con `date` y una clave por serie. |
| `series`          | `SerieAreaChart[]` | `[]`                | Series que se dibujan.                  |
| `rangos`          | `RangoAreaChart[]` | `RANGOS_AREA`       | Periodos disponibles.                   |
| `rangoPorDefecto` | `string`           | Primer rango        | Rango inicial.                          |
| `apilado`         | `boolean`          | `true`              | Apila las series.                       |
| `altura`          | `number`           | `250`               | Altura del SVG en píxeles.              |
| `locale`          | `string`           | `'es-PA'`           | Locale para fechas y números.           |

## Tipos

```ts
interface SerieAreaChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

interface RangoAreaChart {
  value: string;
  etiqueta: string;
  days: number;
}

interface DatoAreaChart {
  date: string; // YYYY-MM-DD
  [clave: string]: number | string;
}
```

`RANGOS_AREA` incluye 90, 30 y 7 días con las etiquetas del sistema.

## Comportamiento

- El rango se calcula desde la última fecha de los datos.
- En contenedores de 560 px o más se muestran botones; por debajo, un select.
- Los botones usan `aria-pressed`; el select tiene etiqueta asociada.
- El hover muestra una línea vertical, puntos por serie y tooltip.
- La leyenda aparece centrada bajo el gráfico.
- Incluye «Ver datos del gráfico» con la tabla filtrada.

## Accesibilidad

- SVG con `role="img"` y `aria-label`.
- Tooltip decorativo; la tabla es la alternativa accesible.
- Periodos seleccionables con estado expuesto.
- Tabla con caption, encabezados `th` y región desplazable.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--border-control`,
`--fg-strong`, `--fg-default`, `--fg-muted`, `--color-primary-50`,
`--color-primary-500`, `--color-primary-700`, `--link`, `--radius-pill`,
`--text-h3`, `--text-body-sm`, `--font-body`.
