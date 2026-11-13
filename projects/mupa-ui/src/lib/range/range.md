# mupa-range

Control deslizante para ajustar un valor numérico.

Réplica del patrón `input[type=range]` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-range
  etiqueta="Brillo"
  [minimo]="0"
  [maximo]="100"
  [paso]="1"
  [(valor)]="brillo"
  [mostrarValor]="true"
/>
```

## Inputs

| Input           | Tipo      | Default   | Descripción                          |
| --------------- | --------- | --------- | ------------------------------------ |
| `valor`         | `number`  | `0`       | Valor actual; admite `[(valor)]`.    |
| `minimo`        | `number`  | `0`       | Valor mínimo.                        |
| `maximo`        | `number`  | `100`     | Valor máximo.                        |
| `paso`          | `number`  | `1`       | Incremento entre valores.            |
| `etiqueta`      | `string`  | —         | Etiqueta visible.                    |
| `ariaLabel`     | `string`  | —         | Nombre accesible si no hay etiqueta. |
| `mostrarValor`  | `boolean` | `false`   | Muestra el valor numérico.           |
| `deshabilitado` | `boolean` | `false`   | Deshabilita la interacción.          |
| `locale`        | `string`  | `'es-PA'` | Locale para formatear el valor.      |

## Comportamiento

- Usa un `<input type="range">` nativo, por lo que hereda teclado y lectores de pantalla.
- El color de la pista y el thumb se controla con `accent-color`.
- La etiqueta envuelve al input; si no hay etiqueta visible, usa `ariaLabel`.

## Design tokens

`--color-primary-500`, `--fg-strong`, `--fg-muted`, `--link`, `--font-body`.
