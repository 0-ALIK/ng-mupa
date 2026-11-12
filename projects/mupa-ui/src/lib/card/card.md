# mupa-card

Tarjeta genérica y composable del sistema de diseño. No tiene variantes
semánticas: resuelve superficie, layout, interacción, selección y estados; el
contenido se compone con inputs de conveniencia o con ranuras.

## Uso

```html
<mupa-card
  titulo="Consultar Placa"
  descripcion="Verifica el estado de tu vehículo."
  direccion="horizontal"
  radio="sm"
  espaciado="md"
  borde="grueso"
  sombra="sutil"
  [interactiva]="true"
  [tinteHover]="true"
  [escalaPresionada]="true"
>
  <span mupaCardMedia class="icono">
    <mupa-icon nombre="car" [tamano]="20" />
  </span>

  <span mupaCardActions class="flecha" aria-hidden="true">
    <mupa-icon nombre="arrow-right" [tamano]="18" />
  </span>
</mupa-card>
```

Para usar las ranuras, importa sus directivas:

```ts
import {
  MupaCard,
  MupaCardActionsDirective,
  MupaCardFooterDirective,
  MupaCardHeaderDirective,
  MupaCardMediaDirective,
} from 'mupa-ui';
```

### Media con imagen

La tarjeta proyecta la imagen con `mupaCardMedia`. La carga y optimización de la
imagen son responsabilidad del consumidor; con `mediaCompleta` ocupa el ancho
total y la tarjeta recorta las esquinas.

```html
<mupa-card
  [mediaCompleta]="true"
  radio="card"
  espaciado="sm"
  borde="ninguno"
  sombra="sm"
  titulo="Cascadas y senderos"
>
  <img
    mupaCardMedia
    ngSrc="/assets/portada.jpg"
    width="1600"
    height="900"
    alt="Cascada rodeada de montañas verdes"
  />

  <mupa-pill mupaCardHeader etiqueta="Naturaleza" color="lime" />

  <span mupaCardFooter>
    <mupa-icon nombre="map-pin" [tamano]="13" />
    Parque natural · Ciudad de Panamá
  </span>
</mupa-card>
```

`ngSrc` requiere importar `NgOptimizedImage` en el componente consumidor.

## Inputs

| Input              | Tipo                                        | Default      | Descripción                                                                  |
| ------------------ | ------------------------------------------- | ------------ | ---------------------------------------------------------------------------- |
| `href`             | `string`                                    | —            | URL de navegación. Convierte la tarjeta en `<a>`.                            |
| `target`           | `string`                                    | —            | Destino del ancla. Con `_blank` añade `rel="noopener noreferrer"`.           |
| `interactiva`      | `boolean`                                   | `false`      | Convierte la tarjeta en `<button>` y emite `clic`.                           |
| `deshabilitada`    | `boolean`                                   | `false`      | Bloquea la interacción y aplica el estado deshabilitado.                     |
| `seleccionable`    | `boolean`                                   | `false`      | Convierte la tarjeta en un botón seleccionable con `aria-pressed`.           |
| `seleccionada`     | `boolean`                                   | `false`      | Estado seleccionado. Admite `[(seleccionada)]`.                              |
| `etiquetaAria`     | `string`                                    | —            | Nombre accesible de la tarjeta.                                              |
| `estadoVisual`     | `'auto' \| 'hover' \| 'pressed' \| 'focus'` | `'auto'`     | Fuerza un estado visual para vitrinas. No cambia la interacción.             |
| `direccion`        | `'vertical' \| 'horizontal'`                | `'vertical'` | Dirección del layout.                                                        |
| `radio`            | `'card' \| 'sm'`                            | `'card'`     | Radio de 16 px o 8 px.                                                       |
| `espaciado`        | `'ninguno' \| 'sm' \| 'md' \| 'lg'`         | `'md'`       | Relleno interno. `sm` = `14px 16px 16px`, `md` = `20px 18px`, `lg` = `22px`. |
| `borde`            | `'ninguno' \| 'fino' \| 'grueso'`           | `'fino'`     | Sin borde, 1 px o 1.5 px.                                                    |
| `sombra`           | `'ninguna' \| 'sutil' \| 'sm'`              | `'sm'`       | Sin sombra, sombra del trámite o `--shadow-sm`.                              |
| `mediaCompleta`    | `boolean`                                   | `false`      | La media ocupa todo el ancho, sin relleno lateral.                           |
| `tinteHover`       | `boolean`                                   | `false`      | Fondo `--color-primary-50` al pasar el cursor.                               |
| `escalaPresionada` | `boolean`                                   | `false`      | Reduce la tarjeta al 98 % al pulsar.                                         |
| `resaltarAlPasar`  | `boolean`                                   | `false`      | Borde azul claro al pasar en tarjetas no interactivas.                       |
| `etiqueta`         | `string`                                    | —            | Etiqueta de conveniencia sobre el título.                                    |
| `titulo`           | `string`                                    | —            | Título de conveniencia.                                                      |
| `descripcion`      | `string`                                    | —            | Descripción de conveniencia.                                                 |
| `nivelTitulo`      | `2 \| 3 \| 4 \| 5 \| 6`                     | `3`          | Nivel del título cuando la tarjeta no es un botón.                           |

## Outputs

| Output               | Payload      | Descripción                             |
| -------------------- | ------------ | --------------------------------------- |
| `clic`               | `MouseEvent` | Emitido al activar un ancla o un botón. |
| `seleccionadaChange` | `boolean`    | Emitido al alternar la selección.       |

## Semántica

| Condición                 | Elemento                                          |
| ------------------------- | ------------------------------------------------- |
| `seleccionable`           | `<button type="button">` con `aria-pressed`.      |
| `href` presente           | `<a>` con `href`, `target` y `rel` cuando aplica. |
| `interactiva`             | `<button type="button">`.                         |
| Ninguna de las anteriores | `<article>`.                                      |

`seleccionable` tiene prioridad sobre `href`: una tarjeta no puede ser enlace y
control seleccionable a la vez.

Los tres elementos comparten el mismo contenido interno.

## Ranuras

| Ranura    | Selector               | Contenido                                 |
| --------- | ---------------------- | ----------------------------------------- |
| Media     | `[mupaCardMedia]`      | Icono, imagen o bloque de color.          |
| Cabecera  | `[mupaCardHeader]`     | Chip de categoría, icono superior o menú. |
| Contenido | proyección por defecto | Cuerpo libre de la tarjeta.               |
| Pie       | `[mupaCardFooter]`     | Fecha, ubicación, monto o estado.         |
| Acciones  | `[mupaCardActions]`    | Flecha, chevron o indicador.              |

Las ranuras deben ser **hijas directas** de `mupa-card`. La tarjeta solo muestra
el contenedor de una ranura cuando recibe contenido. La media se coloca dentro
del relleno normal o a sangre completa con `mediaCompleta`.

La tarjeta no impone tipografía al contenido proyectado. Los ejemplos de
servicio usan el contenido por defecto para conservar sus tamaños exactos
(17/700 y 12.5/1.45); los inputs `titulo` y `descripcion` usan la escala de la
tarjeta de trámite (18/700 y 13.5/1.4).

## Selección

La tarjeta seleccionable usa un `model` booleano:

```html
<mupa-card
  [seleccionable]="true"
  [(seleccionada)]="seleccionada"
  titulo="Licencia de funcionamiento"
  descripcion="Solicita tu licencia en línea."
>
  <span mupaCardFooter>5 días hábiles</span>

  @if (seleccionada) {
  <span mupaCardActions class="check" aria-hidden="true">
    <mupa-icon nombre="circle-check" [tamano]="22" />
  </span>
  }
</mupa-card>
```

El estado seleccionado pinta el borde con `--color-primary-500`, el fondo con
`--color-primary-50` y expone `aria-pressed="true"`. La tarjeta **no dibuja un
check interno**: el consumidor decide si lo muestra en una ranura.

## Estados

- Normal: fondo `--bg-surface`, borde `--border-default` y sombra según `sombra`.
- Hover: borde `--color-primary-500`, sombra `0 8px 20px rgba(14,34,93,.10)` y,
  con `tinteHover`, fondo `--color-primary-50`.
- Pressed: fondo `--color-primary-100` con `tinteHover` y `scale(.98)` con
  `escalaPresionada`.
- Foco: anillo de `3px` con `rgba(6,96,255,.35)`.
- Deshabilitada: fondo `--color-neutral-50`, borde `--color-neutral-200`, texto
  `--fg-disabled`, sin sombra y cursor `not-allowed`.

`estadoVisual` reproduce estos estados de forma forzada para documentación. En
producción se usan las pseudo-clases del navegador.

## Accesibilidad

- La tarjeta completa es un único control cuando es interactiva. No proyectes
  botones ni enlaces dentro de las ranuras de una tarjeta con `href`,
  `interactiva` o `seleccionable`.
- En tarjetas seleccionables el título de conveniencia se renderiza como
  `<span>` para no introducir un heading dentro de un `<button>`. En anclas y
  artículos se renderiza como heading real con `nivelTitulo`.
- Usa `etiquetaAria` cuando el contenido visible no describa la acción.
- El foco visible se dibuja con `outline` de 3 px.
- El estado deshabilitado aplica `aria-disabled`. En un ancla además elimina
  `href` y retira el elemento del orden de tabulación.
- Las acciones de una tarjeta interactiva deben ser decorativas (flechas,
  checks) para no anidar controles.

## Design tokens

`--bg-surface`, `--border-default`, `--fg-strong`, `--fg-default`,
`--fg-muted`, `--fg-disabled`, `--color-primary-50`,
`--color-primary-100`, `--color-primary-300`, `--color-primary-500`,
`--color-neutral-50`, `--color-neutral-100`, `--color-neutral-200`,
`--radius-card`, `--radius-sm`, `--radius-pill`, `--shadow-sm`,
`--space-1`, `--space-2`, `--space-3`, `--space-4`, `--font-body`,
`--font-display`, `--text-body`.

Valores literales copiados del original: sombra normal
`0 1px 3px rgba(14,34,93,.06)`, sombra hover
`0 8px 20px rgba(14,34,93,.10)` y anillo de foco de `3px` con
`rgba(6,96,255,.35)`.
