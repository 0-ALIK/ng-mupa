# mupa-pie-chart

Gráfico circular o de dona con tooltip, leyenda y etiquetas internas.

Réplica del PieChart del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-pie-chart
  titulo="Reportes por categoría"
  descripcion="Enero – Junio 2026"
  etiquetaValor="Reportes"
  [datos]="reportes"
  tendencia="Subió 5,2% este mes"
  notaAlPie="Total de reportes de los últimos 6 meses"
/>
```

## Inputs

| Input                | Tipo                                    | Default              | Descripción                           |
| -------------------- | --------------------------------------- | -------------------- | ------------------------------------- |
| `titulo`             | `string`                                | `'Gráfico circular'` | Título.                               |
| `descripcion`        | `string`                                | —                    | Descripción.                          |
| `datos`              | `PorcionPieChart[]`                     | `[]`                 | Porciones.                            |
| `etiquetaValor`      | `string`                                | —                    | Nombre de la serie en el tooltip.     |
| `radioInterior`      | `number`                                | `0`                  | 0 = círculo; > 0 = dona (máx. 0.9).   |
| `mostrarCabecera`    | `boolean`                               | `true`               | Muestra u oculta toda la cabecera.    |
| `mostrarTitulo`      | `boolean`                               | `true`               | Muestra u oculta solo el título.      |
| `mostrarDescripcion` | `boolean`                               | `true`               | Muestra u oculta solo la descripción. |
| `mostrarDatos`       | `boolean`                               | `true`               | Muestra u oculta la tabla de datos.   |
| `mostrarBorde`       | `boolean`                               | `true`               | Muestra u oculta el borde.            |
| `mostrarLeyenda`     | `boolean`                               | `true`               | Leyenda bajo el gráfico.              |
| `listaEtiquetas`     | `'etiqueta' \| 'valor' \| 'porcentaje'` | —                    | Texto dentro de las porciones.        |
| `tendencia`          | `string`                                | —                    | Texto de tendencia.                   |
| `direccionTendencia` | `'up' \| 'down'`                        | `'up'`               | Flecha y color.                       |
| `notaAlPie`          | `string`                                | —                    | Nota del pie.                         |
| `tamano`             | `number`                                | `250`                | Diámetro del SVG.                     |
| `locale`             | `string`                                | `'es-PA'`            | Formato numérico.                     |

## Tipo

```ts
interface PorcionPieChart {
  clave: string;
  etiqueta: string;
  valor: number;
  color?: string;
}
```

## Comportamiento

- Las porciones se ordenan según el array.
- El hover separa la porción, atenúa el resto y muestra un tooltip.
- `listaEtiquetas` escribe etiqueta, valor o porcentaje dentro de cada porción.
- La tinta de las etiquetas se elige automáticamente para contraste AA.
- La leyenda muestra punto de color y etiqueta.
- Incluye la tabla de datos accesible.

## Accesibilidad

- SVG con `role="img"` y `aria-label`.
- Cada porción tiene un `<title>` con etiqueta y valor.
- Tooltip decorativo; tabla como alternativa.
- La leyenda aporta el texto que el color no comunica.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--fg-muted`, `--color-success-700`, `--color-error-700`,
`--text-h3`, `--text-body-sm`, `--font-body`, `--font-display`.
