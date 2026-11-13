# mupa-line-chart-label

Gráfico de líneas con un valor o una etiqueta personalizada sobre cada punto.

Réplica del LineChartLabel del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-line-chart-label
  titulo="Solicitudes de empleo"
  descripcion="Enero – Junio 2026"
  [datos]="solicitudes"
  claveValor="solicitudes"
  etiquetaSerie="Solicitudes"
  tendencia="Subió 5,2% este mes"
  notaAlPie="Postulaciones en la Bolsa de empleo"
/>
```

## Inputs

| Input                | Tipo                     | Default               | Descripción                                  |
| -------------------- | ------------------------ | --------------------- | -------------------------------------------- |
| `titulo`             | `string`                 | `'Gráfico de líneas'` | Título.                                      |
| `descripcion`        | `string`                 | —                     | Descripción.                                 |
| `datos`              | `DatoLineChartLabel[]`   | `[]`                  | Filas de datos.                              |
| `claveCategoria`     | `string`                 | `'month'`             | Clave de la categoría del eje X.             |
| `claveValor`         | `string`                 | Requerido             | Clave del valor a dibujar.                   |
| `etiquetaSerie`      | `string`                 | `claveValor`          | Etiqueta usada en el tooltip.                |
| `color`              | `string`                 | `#0660FF`             | Color de la línea.                           |
| `longitudEtiqueta`   | `number`                 | `3`                   | Recorte de categorías; 0 = sin recorte.      |
| `mostrarCabecera`    | `boolean`                | `true`                | Muestra u oculta la cabecera.                |
| `mostrarTitulo`      | `boolean`                | `true`                | Muestra u oculta el título.                  |
| `mostrarDescripcion` | `boolean`                | `true`                | Muestra u oculta la descripción.             |
| `mostrarDatos`       | `boolean`                | `true`                | Muestra u oculta la tabla.                   |
| `mostrarBorde`       | `boolean`                | `true`                | Muestra u oculta el borde.                   |
| `tendencia`          | `string`                 | —                     | Texto de tendencia.                          |
| `direccionTendencia` | `'up' \| 'down'`         | `'up'`                | Flecha y color.                              |
| `notaAlPie`          | `string`                 | —                     | Nota del pie.                                |
| `altura`             | `number`                 | `250`                 | Altura del SVG.                              |
| `locale`             | `string`                 | `'es-PA'`             | Formato numérico.                            |
| `claveEtiquetaPunto` | `string`                 | —                     | Clave que se muestra sobre cada punto.       |
| `etiquetasPunto`     | `Record<string, string>` | `{}`                  | Mapa de etiquetas para `claveEtiquetaPunto`. |
| `mostrarEjeX`        | `boolean`                | `true`                | Muestra categorías bajo el eje X.            |

## Comportamiento

- Sin `claveEtiquetaPunto`, cada punto muestra su valor.
- Con `claveEtiquetaPunto`, cada punto muestra la etiqueta mapeada.
- La línea usa un spline natural, como el original.
- El hover resalta el punto y muestra un tooltip.
- El pie de tendencia y la nota son opcionales.
- Incluye la tabla de datos accesible.

## Accesibilidad

- SVG con `role="img"` y `aria-label`.
- Tooltip decorativo; tabla como alternativa.
- Los valores visibles no dependen solo del color.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--fg-muted`, `--color-success-700`, `--color-error-700`,
`--text-h3`, `--text-body-sm`, `--font-body`, `--font-display`.
