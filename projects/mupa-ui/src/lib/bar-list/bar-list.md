# mupa-bar-list

Ranking de barras horizontales para canales, dispositivos o zonas.

Réplica del BarList del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-bar-list
  titulo="Canales de llegada"
  descripcion="Desde dónde llegan los ciudadanos al portal"
  etiquetaValor="Visitas"
  [elementos]="[
    { etiqueta: 'Acceso directo', valor: 5120, icono: 'search' },
    { etiqueta: 'Búsqueda en Google', valor: 2380, icono: 'search' }
  ]"
/>
```

## Inputs

| Input                | Tipo            | Default                    | Descripción                           |
| -------------------- | --------------- | -------------------------- | ------------------------------------- |
| `titulo`             | `string`        | —                          | Título opcional.                      |
| `descripcion`        | `string`        | —                          | Descripción opcional.                 |
| `mostrarCabecera`    | `boolean`       | `true`                     | Muestra u oculta toda la cabecera.    |
| `mostrarTitulo`      | `boolean`       | `true`                     | Muestra u oculta solo el título.      |
| `mostrarDescripcion` | `boolean`       | `true`                     | Muestra u oculta solo la descripción. |
| `mostrarBorde`       | `boolean`       | `true`                     | Muestra u oculta el borde.            |
| `elementos`          | `ItemBarList[]` | `[]`                       | Elementos del ranking.                |
| `color`              | `string`        | `var(--color-primary-500)` | Color de las barras.                  |
| `maximo`             | `number`        | Mayor valor                | Escala máxima.                        |
| `etiquetaValor`      | `string`        | —                          | Encabezado de la columna de valores.  |
| `locale`             | `string`        | `'es-PA'`                  | Formato numérico.                     |

## Tipo

```ts
interface ItemBarList {
  etiqueta: string;
  valor: number;
  texto?: string;
  icono?: string;
}
```

## Comportamiento

- Es un ranking, no un indicador de progreso.
- El ancho de cada barra se calcula respecto al máximo.
- `texto` permite mostrar un valor preformateado, por ejemplo `68 %`.
- Cada barra tiene `role="img"` y un nombre accesible con etiqueta y valor.
- La animación de ancho respeta `prefers-reduced-motion`.
- No incluye tabla de datos: los valores ya están visibles en la lista.

## Accesibilidad

- La lista usa `ul`/`li`.
- Los iconos son decorativos.
- El nombre accesible de cada barra incluye etiqueta y valor.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--fg-muted`, `--color-neutral-100`, `--color-primary-500`,
`--radius-pill`, `--text-h3`, `--font-body`.
