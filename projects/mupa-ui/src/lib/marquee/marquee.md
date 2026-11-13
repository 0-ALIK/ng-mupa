# mupa-marquee

Cinta infinita horizontal o vertical con pausa al pasar/enfocar y degradados en
los bordes. Réplica de `Marquee` del Lego Design System.

## Uso

```html
<mupa-marquee [duracion]="35" [separacion]="16" etiqueta="Testimonios de la ciudadanía">
  <ng-template>
    <mupa-testimonio nombre="Ana Castillo" meta="Ciudad de Panamá" [calificacion]="5">
      El trámite fue claro y rápido.
    </mupa-testimonio>
  </ng-template>
</mupa-marquee>
```

## Inputs

| Input          | Tipo             | Default                     | Descripción                            |
| -------------- | ---------------- | --------------------------- | -------------------------------------- |
| `reverso`      | `boolean`        | `false`                     | Invierte el sentido.                   |
| `pausaAlPasar` | `boolean`        | `true`                      | Pausa al pasar o enfocar.              |
| `vertical`     | `boolean`        | `false`                     | Desplazamiento vertical.               |
| `duracion`     | `number`         | `30`                        | Segundos por ciclo.                    |
| `separacion`   | `number`         | `16`                        | Separación en px.                      |
| `desvanecido`  | `string \| null` | `'#FFFFFF'`                 | Color del degradado; `null` lo oculta. |
| `repeticion`   | `number`         | `4`                         | Repeticiones por pista.                |
| `etiqueta`     | `string`         | `'Contenido en movimiento'` | Etiqueta accesible de la región.       |

## Proyección

El contenido se declara dentro de un `<ng-template>` para poder instanciarlo
varias veces y crear el bucle sin saltos:

```html
<mupa-marquee>
  <ng-template>
    <!-- contenido repetible -->
  </ng-template>
</mupa-marquee>
```

Si se proyecta contenido suelto con `<ng-content>`, se muestra una sola copia y
no se anima. Evita IDs únicos dentro de la plantilla, porque se repetirán.

En modo vertical, el contenedor debe definir una altura visible.

## `mupa-testimonio`

| Input          | Tipo     | Default   | Descripción            |
| -------------- | -------- | --------- | ---------------------- |
| `nombre`       | `string` | requerido | Nombre de la persona.  |
| `meta`         | `string` | —         | Línea secundaria.      |
| `imagen`       | `string` | —         | URL del avatar.        |
| `calificacion` | `number` | —         | Calificación de 1 a 5. |

El cuerpo se proyecta:

```html
<mupa-testimonio nombre="Ana Castillo" meta="Ciudad de Panamá" [calificacion]="5">
  El trámite fue claro y rápido.
</mupa-testimonio>
```

## Accesibilidad

- El marquee usa `role="region"` con etiqueta.
- Solo la primera copia es accesible; las demás llevan `aria-hidden="true"` e
  `inert` para que no reciban foco.
- Pausa al recibir foco y al pasar el cursor.
- Con `prefers-reduced-motion: reduce` no hay animación y el contenido se puede
  desplazar manualmente.
- El testimonio usa `figure`, `figcaption` y `blockquote`; la calificación tiene
  etiqueta accesible y las estrellas están ocultas a lectores de pantalla.

## Design tokens

`--mq-gap` (propiedad local), `--font-body`, `--fg-strong`, `--fg-muted`,
`--fg-default`, `--bg-surface`, `--color-neutral-50`, `--border-default`,
`--color-primary-50`, `--color-primary-200`, `--color-primary-300`,
`--color-primary-700`, `--color-warning-500`, `--color-neutral-200`.

## Excepciones literales

Se conservan del original: `width: 280px`, `padding: 18px`, `border-radius: 16px`,
`gap: 12px`, avatar `40px`, tipografías `700 14px/1.3`, `500 12.5px/1.3`,
`400 14px/1.5`, `letter-spacing: 2px`, degradado por defecto `#FFFFFF`, ancho/alto
de borde `18%` y padding vertical `4px`.

Las superficies de la tarjeta usan `--bg-surface` y `--color-neutral-50` para
adaptarse al modo oscuro. En apariencia clara equivalen a `#FCFDFD` y `#F4F6F7`
frente a `#FFFFFF` y `#F8F9FA` del original.
