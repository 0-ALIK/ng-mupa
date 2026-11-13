# mupa-logo-loop

Cinta continua de logos o de elementos con plantilla. Réplica de `LogoLoop` del
Lego Design System.

## Uso

```html
<mupa-logo-loop
  [logos]="aliados"
  [alturaLogo]="40"
  [separacion]="56"
  [velocidad]="70"
  etiquetaAria="Instituciones aliadas"
/>
```

```ts
readonly aliados: ItemLogoLoop[] = [
  { src: '/assets/logo-alcaldia-navy.svg', alt: 'Alcaldía de Panamá' },
  { src: '/assets/logo-aseo.png', alt: 'Aseo Capital' },
];
```

## Inputs

| Input              | Tipo                                              | Default              | Descripción                                      |
| ------------------ | ------------------------------------------------- | -------------------- | ------------------------------------------------ |
| `logos`            | `ItemLogoLoop[]`                                  | `[]`                 | Logos o elementos.                               |
| `velocidad`        | `number`                                          | `80`                 | Velocidad en px/s. Negativa invierte el sentido. |
| `direccion`        | `'izquierda' \| 'derecha' \| 'arriba' \| 'abajo'` | `'izquierda'`        | Sentido del desplazamiento.                      |
| `alturaLogo`       | `number`                                          | `32`                 | Altura del logo o tamaño de fuente.              |
| `separacion`       | `number`                                          | `48`                 | Separación en px.                                |
| `pausaAlPasar`     | `boolean`                                         | `true`               | Detiene la cinta al pasar el cursor.             |
| `velocidadAlPasar` | `number`                                          | —                    | Velocidad personalizada al pasar.                |
| `colorDesvanecido` | `string \| null`                                  | `'#FFFFFF'`          | Color de los degradados; `null` los oculta.      |
| `escalarAlPasar`   | `boolean`                                         | `false`              | Escala 1.15× al pasar.                           |
| `escalaDeGrises`   | `boolean`                                         | `false`              | Gris en reposo, color al pasar.                  |
| `altura`           | `number`                                          | `320`                | Altura de la región en modo vertical.            |
| `etiquetaAria`     | `string`                                          | `'Logos de aliados'` | Etiqueta accesible de la región.                 |

## Tipos de item

```ts
type ItemLogoLoop =
  | {
      src: string;
      alt?: string;
      titulo?: string;
      href?: string;
      ancho?: number;
      alto?: number;
    }
  | {
      plantilla: TemplateRef<unknown>;
      contexto?: unknown;
      titulo?: string;
      etiquetaAria?: string;
      href?: string;
    };
```

## Direcciones e Instituciones en Loop

El patrón del sistema original se reproduce con items de plantilla:

```html
<ng-template #institucion let-datos>
  <span class="institucion-loop">
    <span class="institucion-loop__marca">
      <mupa-icon [nombre]="datos.icono" [tamano]="20" />
    </span>
    {{ datos.nombre }}
  </span>
</ng-template>

<mupa-logo-loop
  [logos]="instituciones"
  [alturaLogo]="40"
  [separacion]="56"
  [velocidad]="70"
  etiquetaAria="Direcciones e instituciones aliadas"
/>
```

```ts
readonly instituciones: ItemLogoLoop[] = [
  {
    plantilla: this.institucion,
    contexto: { $implicit: { icono: 'landmark', nombre: 'Tesorería Municipal' } },
    titulo: 'Tesorería Municipal',
    etiquetaAria: 'Tesorería Municipal',
  },
];
```

Para fondos azul marino, usa `colorDesvanecido="#0E225D"` y una plantilla con
texto e iconos claros.

## Accesibilidad

- La región usa `role="region"` con etiqueta.
- Cada lista usa `role="list"` y cada item `role="listitem"`.
- Las copias adicionales llevan `aria-hidden="true"` e `inert` para que no
  reciban foco.
- Los items con `href` abren en pestaña nueva con `rel="noreferrer noopener"` y
  etiqueta accesible.
- El foco visible usa un anillo de 3 px.
- Con `prefers-reduced-motion: reduce` se muestra una sola copia, sin animación y
  con desplazamiento manual.
- En fondos oscuros, proporciona logos con contraste y ajusta
  `colorDesvanecido` al color del fondo.

## Design tokens

`--font-body`.

## Excepciones literales

Se conservan del original: `TAU = 0.25`, mínimo de copias `2`, margen de copias
`2`, escala `1.15`, opacidad `0.7`, transición
`transform .3s cubic-bezier(.4,0,.2,1), filter .3s, opacity .3s`, anillo de foco
`rgba(6,96,255,.3)`, degradados `clamp(24px, 10%, 120px)`, relleno de escala
`ceil(alturaLogo * 0.12)`, `width: max-content` y `user-select: none`.

Como protección de layout, el componente limita el cálculo a `100` copias.
