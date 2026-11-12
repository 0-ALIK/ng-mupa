# mupa-landing-nav

Menú de landing institucional: barra blanca con logo a la izquierda, enlaces a
la derecha y un indicador azul en el enlace activo. Por debajo del punto de
corte se convierte en un menú hamburguesa.

## Uso

```html
<mupa-landing-nav [elementos]="enlaces()" [activo]="seccionActiva()" (navegar)="irA($event)" />

<mupa-landing-nav
  [elementos]="enlaces()"
  diseno="mobile"
  logoSrc="/assets/logo-institucional.svg"
  [pegajoso]="true"
/>
```

## Inputs

| Input               | Tipo                              | Default                         | Descripción                                 |
| ------------------- | --------------------------------- | ------------------------------- | ------------------------------------------- |
| `elementos`         | `ElementoLandingNav[]`            | `[]`                            | Enlaces principales.                        |
| `activo`            | `string`                          | —                               | Clave activa; si se omite, es interna.      |
| `logoSrc`           | `string`                          | `assets/logo-alcaldia-navy.svg` | URL del logo.                               |
| `textoLogo`         | `string`                          | `'Alcaldía de Panamá'`          | Texto alternativo del logo.                 |
| `altoLogo`          | `number`                          | `48` escritorio / `40` móvil    | Altura del logo en píxeles.                 |
| `puntoCorte`        | `number`                          | `768`                           | Ancho para cambiar a menú hamburguesa.      |
| `diseno`            | `'auto' \| 'desktop' \| 'mobile'` | `'auto'`                        | Fuerza el diseño (para previews).           |
| `abiertoPorDefecto` | `boolean`                         | `false`                         | Abre el menú móvil al iniciar.              |
| `pegajoso`          | `boolean`                         | `false`                         | Mantiene la barra pegada al borde superior. |

## Outputs

| Output    | Payload  | Descripción                    |
| --------- | -------- | ------------------------------ |
| `navegar` | `string` | Clave del enlace seleccionado. |

El componente llama `preventDefault()` y emite la clave. Navega con el router
en el manejador del output.

## Tipos

```ts
interface ElementoLandingNav {
  clave: string;
  etiqueta: string;
  href?: string;
}
```

## Variantes

- **Escritorio** — logo + enlaces en línea con indicador de 24×3 px.
- **Móvil** — botón hamburguesa de 44 px y panel desplegable a ancho completo.
- **Pegajosa** — la barra permanece fija al hacer scroll.

La ruta por defecto del logo es `assets/logo-alcaldia-navy.svg`. La aplicación
debe incluir ese asset o pasar `logoSrc` con su propia ruta.

## Accesibilidad

- `<nav aria-label="Principal">`.
- El enlace activo usa `aria-current="page"`.
- El botón hamburguesa usa `aria-expanded` y `aria-controls`.
- `Escape` cierra el menú móvil.
- El foco visible usa `rgba(6,96,255,.3)`.
- El logo tiene `aria-label="… — inicio"`.

## Design tokens

`--bg-surface`, `--border-subtle`, `--border-default`, `--fg-default`,
`--fg-strong`, `--fg-muted`, `--color-primary-50`, `--color-primary-200`,
`--color-primary-300`, `--color-primary-500`, `--color-primary-700`,
`--focus-ring`, `--font-body`.
