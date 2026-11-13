# mupa-line-chart

Gráfico de líneas interactivo con selector de serie y totales por serie.

Réplica del LineChart del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-line-chart
  titulo="Visitas a trámites en línea"
  descripcion="Total de visitas en los últimos 3 meses"
  [datos]="visitas"
  [series]="[
    { clave: 'web', etiqueta: 'Portal web' },
    { clave: 'app', etiqueta: 'App Ciudadana' }
  ]"
/>
```

Solo el gráfico, sin cabecera, tabla ni borde:

```html
<mupa-line-chart
  titulo="Visitas a trámites en línea"
  [datos]="visitas"
  [series]="series"
  [mostrarCabecera]="false"
  [mostrarDatos]="false"
  [mostrarBorde]="false"
/>
```

Para conservar el selector de series sin título ni descripción, usa
`[mostrarTitulo]="false"` y `[mostrarDescripcion]="false"` en lugar de
`mostrarCabecera`.

## Inputs

| Input                | Tipo               | Default               | Descripción                                   |
| -------------------- | ------------------ | --------------------- | --------------------------------------------- |
| `titulo`             | `string`           | `'Gráfico de líneas'` | Título.                                       |
| `descripcion`        | `string`           | —                     | Descripción.                                  |
| `datos`              | `DatoLineChart[]`  | `[]`                  | Filas con `date` y claves de serie.           |
| `series`             | `SerieLineChart[]` | `[]`                  | Series disponibles.                           |
| `seriePorDefecto`    | `string`           | Primera serie         | Serie activa inicial.                         |
| `mostrarTotales`     | `boolean`          | `true`                | Muestra selector y totales con varias series. |
| `mostrarCabecera`    | `boolean`          | `true`                | Muestra u oculta toda la cabecera.            |
| `mostrarTitulo`      | `boolean`          | `true`                | Muestra u oculta solo el título.              |
| `mostrarDescripcion` | `boolean`          | `true`                | Muestra u oculta solo la descripción.         |
| `mostrarDatos`       | `boolean`          | `true`                | Muestra u oculta la tabla de datos.           |
| `mostrarBorde`       | `boolean`          | `true`                | Muestra u oculta el borde de la tarjeta.      |
| `altura`             | `number`           | `250`                 | Altura del SVG.                               |
| `locale`             | `string`           | `'es-PA'`             | Formato de fechas y números.                  |

## Tipos

```ts
interface SerieLineChart {
  clave: string;
  etiqueta: string;
  color?: string;
}

interface DatoLineChart {
  date: string;
  [clave: string]: number | string;
}
```

## Comportamiento

- Con varias series aparecen pestañas con el total de cada una.
- En contenedores estrechos las pestañas se sustituyen por un select.
- El hover dibuja una guía vertical, un punto y un tooltip.
- La serie activa determina la línea, el tooltip y los totales.
- Si no hay series o datos, se muestra un estado «no hay datos disponibles».
- Incluye la tabla de datos accesible.

## Accesibilidad

- SVG con `role="img"` y `aria-label` que incluye la serie activa.
- Pestañas con `aria-pressed`; select con etiqueta.
- Tooltip decorativo; tabla como alternativa.
- Tabla con caption y encabezados.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--border-control`,
`--fg-strong`, `--fg-default`, `--fg-muted`, `--color-primary-50`,
`--color-primary-700`, `--link`, `--radius-pill`, `--text-h3`,
`--text-body-sm`, `--font-body`, `--font-display`.
