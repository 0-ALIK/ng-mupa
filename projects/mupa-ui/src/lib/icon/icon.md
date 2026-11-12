# mupa-icon

Icono de línea Lucide del sistema de diseño. Renderiza SVG inline con el mismo
trazo, tamaño y semántica accesible que el componente original.

## Uso

```html
<mupa-icon name="search" />

<mupa-icon name="circle-check" [tamano]="24" color="var(--color-success-500)" />

<mupa-icon name="bell" titulo="Notificaciones" />
```

## Inputs

| Input           | Tipo      | Default          | Descripción                                        |
| --------------- | --------- | ---------------- | -------------------------------------------------- |
| `nombre`        | `string`  | `'circle'`       | Nombre del icono Lucide.                           |
| `tamano`        | `number`  | `20`             | Tamaño en píxeles del lado del icono.              |
| `color`         | `string`  | `'currentColor'` | Color del trazo.                                   |
| `relleno`       | `string`  | `'none'`         | Relleno del icono; `currentColor` rellena formas.  |
| `trazo`         | `number`  | `2`              | Grosor del trazo.                                  |
| `trazoAbsoluto` | `boolean` | `false`          | Mantiene el trazo absoluto sin importar el tamaño. |
| `titulo`        | `string`  | —                | Si se indica, el icono se anuncia como imagen.     |

## Variantes

No tiene variantes visuales. El color y el tamaño se controlan con inputs.

## Accesibilidad

- Sin `titulo`, el SVG lleva `aria-hidden="true"` y se considera decorativo.
- Con `titulo`, el SVG lleva `role="img"`, `aria-label` y un `<title>`.
- Los iconos dentro de botones sin texto requieren un nombre accesible en el botón.

## Design tokens

No consume tokens directamente: hereda el color del contexto (`currentColor`).
El tamaño del trazo y la geometría provienen de Lucide 0.469.0.
