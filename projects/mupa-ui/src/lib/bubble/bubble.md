# mupa-bubble

Familia de componentes para construir una conversación: mensajes, contenido
colapsable, sugerencias, tarjetas embebidas, grupos y reacciones.

Réplica de la familia Bubble del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-bubble alineacion="end" hora="8:30 a. m.">
  <mupa-bubble-content>hola</mupa-bubble-content>
</mupa-bubble>

<mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:30 a. m.">
  <mupa-bubble-content> ¡Hola, vecino! ¿En qué te ayudo hoy? </mupa-bubble-content>

  <mupa-bubble-suggestions
    [elementos]="['Consultar mi Paz y Salvo', 'Ver lo pendiente']"
    (seleccionar)="elegirSugerencia($event)"
  />

  <mupa-bubble-card>
    <!-- Formulario, resultado o comprobante -->
  </mupa-bubble-card>
</mupa-bubble>
```

La directiva de contenido no existe: los componentes se proyectan directamente
dentro de `mupa-bubble`.

## Componentes

### `mupa-bubble`

| Input         | Tipo                                           | Default          | Descripción                   |
| ------------- | ---------------------------------------------- | ---------------- | ----------------------------- |
| `alineacion`  | `'start' \| 'end'`                             | `'start'`        | Lado del hilo.                |
| `variante`    | `'plain' \| 'primary' \| 'muted' \| 'outline'` | Según alineación | Variante visual.              |
| `autor`       | `string`                                       | —                | Nombre del asistente.         |
| `avatar`      | `string`                                       | —                | Icono Lucide o URL de imagen. |
| `hora`        | `string`                                       | —                | Hora del mensaje.             |
| `meta`        | `string`                                       | —                | Texto adicional.              |
| `anchoMaximo` | `number \| string`                             | `560px` / `75%`  | Ancho máximo del contenido.   |

La variante por defecto es `primary` cuando `alineacion="end"` y `plain` cuando
es `start`. Las variantes `muted` y `outline` usan burbuja con fondo o borde.

### `mupa-bubble-content`

| Input                 | Tipo      | Default | Descripción                           |
| --------------------- | --------- | ------- | ------------------------------------- |
| `colapsable`          | `boolean` | `false` | Recorta el texto y muestra «Ver más». |
| `maxLineas`           | `number`  | `4`     | Líneas visibles al estar recortado.   |
| `expandidoPorDefecto` | `boolean` | `false` | Inicia expandido.                     |

El componente hereda la tipografía y el color del enlace según la variante de
la burbuja que lo contiene.

### `mupa-bubble-suggestions`

| Input       | Tipo                                                 | Default | Descripción         |
| ----------- | ---------------------------------------------------- | ------- | ------------------- |
| `elementos` | `(string \| { etiqueta: string; valor?: string })[]` | `[]`    | Respuestas rápidas. |

| Output        | Payload  | Descripción                     |
| ------------- | -------- | ------------------------------- |
| `seleccionar` | `string` | Valor de la sugerencia elegida. |

### `mupa-bubble-card`

| Input         | Tipo               | Default | Descripción                 |
| ------------- | ------------------ | ------- | --------------------------- |
| `anchoMaximo` | `number \| string` | `460`   | Ancho máximo de la tarjeta. |

### `mupa-bubble-group`

| Input     | Tipo     | Default | Descripción                           |
| --------- | -------- | ------- | ------------------------------------- |
| `espacio` | `number` | `6`     | Separación entre mensajes en píxeles. |

Agrupa burbujas consecutivas. El grupo calcula la posición de cada mensaje:
la primera muestra avatar y cabecera, las siguientes ocultan el encabezado
repetido y unen los radios cuando corresponde.

### `mupa-bubble-reactions`

| Input          | Tipo     | Default        | Descripción                     |
| -------------- | -------- | -------------- | ------------------------------- |
| `etiquetaAria` | `string` | `'Reacciones'` | Nombre accesible de la píldora. |

## Accesibilidad

- La conversación debe tener una región o lista que agrupe los mensajes.
- El avatar es decorativo; el nombre del autor se muestra como texto.
- Las sugerencias son botones reales con foco visible y `role="group"` con
  etiqueta «Sugerencias».
- El control «Ver más» usa `aria-expanded` y `aria-controls`.
- Las reacciones usan `role="img"` y un nombre accesible.
- Mantén el texto alternativo de las imágenes decorativas vacío.

## Design tokens

`--color-primary-50`, `--color-primary-100`, `--color-primary-500`,
`--color-primary-900`, `--color-neutral-100`, `--bg-surface`,
`--border-default`, `--fg-strong`, `--fg-default`, `--fg-muted`,
`--fg-on-brand`, `--focus-ring`, `--radius-pill`, `--font-body`.
