# mupa-progress

Barra de progreso simple, con etiqueta y porcentaje opcionales.

Réplica del patrón `.prog` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-progress etiqueta="Avance de la meta" [valor]="65" [maximo]="100" [mostrarValor]="true" />
```

## Inputs

| Input          | Tipo      | Default   | Descripción                                      |
| -------------- | --------- | --------- | ------------------------------------------------ |
| `valor`        | `number`  | `0`       | Valor actual de la barra.                        |
| `maximo`       | `number`  | `100`     | Valor máximo de la escala.                       |
| `etiqueta`     | `string`  | —         | Etiqueta visible sobre la barra.                 |
| `ariaLabel`    | `string`  | —         | Nombre accesible cuando no hay etiqueta visible. |
| `mostrarValor` | `boolean` | `false`   | Muestra el porcentaje a la derecha.              |
| `locale`       | `string`  | `'es-PA'` | Locale para formatear el porcentaje.             |

## Comportamiento

- El valor se limita al rango `0..maximo`.
- `role="progressbar"` expone `aria-valuemin`, `aria-valuemax` y `aria-valuenow`.
- La animación de ancho respeta `prefers-reduced-motion`.

## Design tokens

`--color-primary-50`, `--color-primary-500`, `--radius-pill`,
`--fg-strong`, `--fg-muted`, `--font-body`.
