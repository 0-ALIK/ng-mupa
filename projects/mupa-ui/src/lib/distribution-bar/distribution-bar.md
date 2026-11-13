# mupa-distribution-bar

Barra apilada al 100 % con leyenda de cantidades y porcentajes.

Réplica del DistributionBar del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-distribution-bar
  titulo="Estado de los expedientes"
  descripcion="Tres categorías excluyentes dentro del mismo periodo."
  etiquetaTotal="Expedientes en el periodo"
  [total]="4930"
  [elementos]="[
    { id: 'finalizados', etiqueta: 'Finalizados', valor: 1462, tono: 'success' },
    { id: 'vigentes', etiqueta: 'Vigentes', valor: 1359, tono: 'primary' },
    { id: 'vencidos', etiqueta: 'Vencidos', valor: 2109, tono: 'error' }
  ]"
/>
```

## Inputs

| Input                | Tipo                 | Default                    | Descripción                           |
| -------------------- | -------------------- | -------------------------- | ------------------------------------- |
| `titulo`             | `string`             | `'Distribución del total'` | Título.                               |
| `descripcion`        | `string`             | —                          | Descripción.                          |
| `elementos`          | `ItemDistribucion[]` | `[]`                       | Categorías excluyentes.               |
| `total`              | `number`             | —                          | Total esperado para validar la suma.  |
| `etiquetaTotal`      | `string`             | `'Total'`                  | Etiqueta del total.                   |
| `notaAlPie`          | `string`             | —                          | Nota del pie.                         |
| `locale`             | `string`             | `'es-PA'`                  | Formato de números y porcentajes.     |
| `mostrarPorcentajes` | `boolean`            | `true`                     | Etiquetas dentro de segmentos anchos. |

## Tipos

```ts
type TonoDistribucion = 'primary' | 'success' | 'error' | 'warning' | 'neutral';

interface ItemDistribucion {
  id: string;
  etiqueta: string;
  valor: number;
  tono?: TonoDistribucion;
}
```

## Validación

- Cada elemento necesita `id` único, etiqueta y valor finito ≥ 0.
- Si se indica `total`, la suma debe coincidir con tolerancia numérica.
- Si la suma es cero, se muestra el estado vacío y no se inventan porcentajes.
- Si los porcentajes redondeados no suman 100 %, se informa la diferencia.
- Ante datos inválidos se muestra un error y no una barra engañosa.

## Accesibilidad

- `figure` con `aria-labelledby` al título.
- La barra es `aria-hidden`; la leyenda contiene etiqueta, valor y porcentaje.
- Los mensajes de error y vacío usan `role="status"`.
- Las etiquetas internas solo aparecen si el segmento mide al menos 52 px.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--fg-muted`, `--color-neutral-100`, `--color-neutral-500`,
`--color-neutral-900`, `--color-primary-500`, `--color-success-700`,
`--color-warning-500`, `--color-error-100`, `--color-error-300`,
`--color-error-700`, `--fg-on-success`, `--fg-on-error`, `--font-body`.
