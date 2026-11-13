# mupa-contador-numerico

Contador numérico animado que inicia al entrar en el viewport. Réplica de
`NumberTicker` del Lego Design System.

## Uso

```html
<mupa-contador-numerico [valor]="1842" prefijo="B/. " [decimales]="2" [tamano]="56" />

<mupa-contador-numerico [valor]="92" sufijo="%" direccion="abajo" [iniciarAlVer]="false" />
```

## Inputs

| Input               | Tipo                  | Default              | Descripción                      |
| ------------------- | --------------------- | -------------------- | -------------------------------- |
| `valor`             | `number`              | requerido            | Valor final del conteo.          |
| `valorInicial`      | `number`              | `0`                  | Valor desde el que inicia.       |
| `direccion`         | `'arriba' \| 'abajo'` | `'arriba'`           | Sentido del conteo.              |
| `decimales`         | `number`              | `0`                  | Decimales fijos.                 |
| `duracion`          | `number`              | `1600`               | Duración en ms.                  |
| `retraso`           | `number`              | `0`                  | Retraso antes de iniciar, en ms. |
| `prefijo`           | `string`              | `''`                 | Texto anterior al número.        |
| `sufijo`            | `string`              | `''`                 | Texto posterior al número.       |
| `locale`            | `string`              | `'es-PA'`            | Configuración regional.          |
| `iniciarAlVer`      | `boolean`             | `true`               | Espera a entrar en el viewport.  |
| `tamano`            | `number`              | `48`                 | Tamaño de fuente en px.          |
| `color`             | `string`              | `'var(--fg-strong)'` | Color del texto.                 |
| `claveReproduccion` | `unknown`             | `undefined`          | Cambiarlo reinicia la animación. |

## Accesibilidad

- El valor animado está marcado con `aria-hidden="true"`.
- El valor final se expone en un texto visualmente oculto para lectores de pantalla.
- Con `prefers-reduced-motion: reduce` se muestra el valor final sin animación.

## Design tokens

`--font-display`, `--fg-strong`.

## Excepciones literales

Se conservan del original: `font-weight: 500`, `line-height: 1`,
`letter-spacing: -0.02em`, `threshold: 0.3`, duración `1600` ms y easing
cuártico `1 - (1 - t)^4`.
