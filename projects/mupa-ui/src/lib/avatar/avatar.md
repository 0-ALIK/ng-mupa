# mupa-avatar

Avatar circular con foto o iniciales sobre un tinte institucional. Incluye
punto de presencia y anillo blanco para apilar avatares.

## Uso

```html
<mupa-avatar nombre="Ana Pérez" />

<mupa-avatar nombre="Ana Pérez" src="/fotos/ana.jpg" [tamano]="48" estado="online" />

<mupa-avatar nombre="Ana Pérez" href="/perfil/ana" [tamano]="36" />
```

## Inputs

| Input    | Tipo                                        | Default | Descripción                                       |
| -------- | ------------------------------------------- | ------- | ------------------------------------------------- |
| `nombre` | `string` (requerido)                        | —       | Nombre completo para iniciales y texto accesible. |
| `src`    | `string`                                    | —       | URL de la foto. Si falla, se usan las iniciales.  |
| `tamano` | `number`                                    | `40`    | Tamaño en píxeles.                                |
| `href`   | `string`                                    | —       | Enlace de perfil: envuelve el avatar en `<a>`.    |
| `estado` | `'online' \| 'busy' \| 'away' \| 'offline'` | —       | Punto de presencia.                               |
| `anillo` | `boolean`                                   | `false` | Anillo blanco de 2 px para apilar avatares.       |

## Variantes

- **Con foto** — imagen recortada en círculo con borde `--border-default`.
- **Con iniciales** — iniciales sobre uno de los cinco tintes institucionales.
- **Con enlace** — se eleva 2 px al pasar el cursor o recibir foco.
- **Con presencia** — punto de estado en la esquina inferior derecha.

## Accesibilidad

- Sin enlace, el contenedor usa `role="img"` y `aria-label` con el nombre y el estado.
- Con enlace, el `<a>` recibe el `aria-label` y el avatar interior queda decorativo.
- Las iniciales se ocultan a lectores de pantalla con `aria-hidden`.
- El punto de presencia incluye un `title` con el estado en español.

## Design tokens

`--color-primary-50/200/700`, `--color-cyan-100/200/700`,
`--color-purple-100/200/700`, `--color-lime-100/200/700`,
`--color-coral-100/200/700`, `--color-neutral-100`, `--border-default`,
`--font-body`.

Los colores de presencia se conservan literales desde el componente original:
`#22A05A`, `#E5484D`, `#F5A400`, `#8A97A8`.
