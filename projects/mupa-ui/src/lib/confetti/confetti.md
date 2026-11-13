# mupa-confetti

Confeti a pantalla completa con canvas. Réplica de `Confetti`, `ConfettiButton` y
`fireConfetti` del Lego Design System.

## Uso

```html
<!-- Botón prearmado -->
<mupa-boton-confeti [opciones]="opciones" (clic)="alCelebrar($event)">
  Celebrar
</mupa-boton-confeti>

<!-- Trigger totalmente custom -->
<button type="button" mupaDisparadorConfeti [opcionesConfeti]="opciones">Mi botón</button>

<!-- Trigger headless por estado -->
<mupa-confetti #confetti="mupaConfetti" [disparador]="senal()" />
<button (click)="confetti.disparar()">Disparar</button>
```

```ts
import { dispararConfeti } from 'mupa-ui';

dispararConfeti({ cantidadParticulas: 80, origen: { x: 0.5, y: 0.5 } });
```

## `mupa-boton-confeti`

| Input           | Tipo                              | Default          | Descripción                     |
| --------------- | --------------------------------- | ---------------- | ------------------------------- |
| `opciones`      | `OpcionesConfeti`                 | `{}`             | Opciones de la explosión.       |
| `variante`      | `'primario' \| 'secundario'`      | `'primario'`     | Variante visual.                |
| `icono`         | `string \| null`                  | `'party-popper'` | Icono Lucide anterior al texto. |
| `tipo`          | `'button' \| 'submit' \| 'reset'` | `'button'`       | Tipo nativo.                    |
| `etiquetaAria`  | `string`                          | —                | Etiqueta accesible.             |
| `deshabilitado` | `boolean`                         | `false`          | Deshabilita el botón.           |

Output: `clic: MouseEvent`.

## `mupa-confetti`

| Input              | Tipo              | Default | Descripción                              |
| ------------------ | ----------------- | ------- | ---------------------------------------- |
| `disparador`       | `unknown`         | —       | Cambiar su valor lanza una explosión.    |
| `dispararAlCargar` | `boolean`         | `false` | Lanza una explosión en el primer render. |
| `opciones`         | `OpcionesConfeti` | `{}`    | Opciones de la explosión.                |

Método público: `disparar()`.

## `mupaDisparadorConfeti`

Directiva para cualquier elemento. Input: `opcionesConfeti: OpcionesConfeti`.
Calcula el origen desde el centro del elemento; si `opcionesConfeti.origen` existe,
lo respeta. Ignora el clic en un `<button disabled>`.

## `OpcionesConfeti`

| Campo                | Tipo                       | Default            |
| -------------------- | -------------------------- | ------------------ |
| `cantidadParticulas` | `number`                   | `120`              |
| `dispersion`         | `number`                   | `70`               |
| `angulo`             | `number`                   | `90`               |
| `velocidadInicial`   | `number`                   | `13`               |
| `origen`             | `{ x: number; y: number }` | `{ x: .5, y: .6 }` |
| `colores`            | `string[]`                 | `COLORES_CONFETI`  |

## Accesibilidad

- El canvas es `aria-hidden="true"` y `pointer-events: none`.
- Con `prefers-reduced-motion: reduce` no se crean partículas; el botón sigue funcionando.
- El botón conserva su etiqueta accesible y foco visible.

## Design tokens

`--color-primary-500`, `--color-primary-50`, `--color-primary-700`,
`--action-hover`, `--action-press`, `--focus-ring`, `--font-body`,
`--fg-on-brand`, `--bg-surface`.

## Excepciones literales

Se conservan del original: colores de la paleta de confeti, `z-index: 9999`,
`inset: 0`, física de partículas, tamaño `7 + random * 6`, vida `160 + random * 60`,
borde `1.5px`, radio `999px`, padding `12px 24px`, altura mínima `48px` y
tipografía `600 15px/1.2`.

El fondo del botón secundario usa `--bg-surface` en lugar de `#FFFFFF` para
adaptarse al modo oscuro; en claro equivale a `#FCFDFD`.
