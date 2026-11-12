# mupa-sidebar

Navegación lateral institucional. Barra expandida o compacta en escritorio y
cajón modal nativo por debajo de 768 px. Incluye ramas desplegables, badges,
panel de usuario y pie opcional.

## Alcance del componente

El sidebar **no incluye breadcrumb ni barra superior**. El texto
"Inicio > Panel de gestión" del dashboard original pertenece al componente
`Breadcrumb` dentro del layout, no al sidebar. Cuando el layout lo necesite,
debe usar `mupa-breadcrumb` de forma independiente.

`idActivo` solo marca el enlace actual con `aria-current="page"`; el título de
la página lo aporta la ruta o el layout que contiene al sidebar.

## Uso

```html
<div class="layout">
  <mupa-sidebar
    [grupos]="grupos()"
    [idActivo]="rutaActiva()"
    [usuario]="usuario()"
    [accionesUsuario]="accionesUsuario()"
    logoSrc="/assets/logo-mupa.svg"
    nombreSistema="Sistema interno"
    pie="© 2026 Alcaldía de Panamá"
    (navegar)="alNavegar($event)"
    (colapsadoCambio)="alCambiarBarra($event)"
  />

  <main>...</main>
</div>
```

```css
/* El componente no impone el layout; usa el mismo contenedor del original. */
.layout {
  display: flex;
  min-height: 100dvh;
}
```

## Inputs

| Input                     | Tipo                   | Default                  | Descripción                                   |
| ------------------------- | ---------------------- | ------------------------ | --------------------------------------------- |
| `grupos`                  | `GrupoSidebar[]`       | `[]`                     | Grupos de navegación.                         |
| `idActivo`                | `string`               | —                        | Id del enlace activo; normalmente del router. |
| `logoSrc`                 | `string`               | —                        | URL del logo institucional.                   |
| `marca`                   | `string`               | `'Alcaldía de Panamá'`   | Nombre de la marca.                           |
| `nombreSistema`           | `string`               | `'Sistema interno'`      | Nombre mostrado bajo la marca.                |
| `colapsado`               | `boolean \| undefined` | `undefined`              | Estado controlado; si se omite, es interno.   |
| `colapsadoPorDefecto`     | `boolean`              | `false`                  | Estado inicial cuando no es controlada.       |
| `idsExpandidosPorDefecto` | `string[]`             | `[]`                     | Ramas abiertas en el primer render.           |
| `mostrarControlColapso`   | `boolean`              | `true`                   | Muestra el botón de contraer en escritorio.   |
| `usuario`                 | `UsuarioSidebar`       | —                        | Usuario mostrado al pie.                      |
| `accionesUsuario`         | `EnlaceSidebar[]`      | `[]`                     | Acciones del menú de usuario.                 |
| `pie`                     | `string`               | —                        | Texto opcional del pie.                       |
| `etiqueta`                | `string`               | `'Navegación principal'` | Etiqueta accesible de la navegación.          |

## Outputs

| Output            | Payload                                         | Descripción                               |
| ----------------- | ----------------------------------------------- | ----------------------------------------- |
| `navegar`         | `{ enlace: EnlaceSidebar; evento: MouseEvent }` | Emitido al activar un enlace.             |
| `colapsadoCambio` | `boolean`                                       | Emitido al cambiar el estado de la barra. |

## Tipos

```ts
interface EnlaceSidebar {
  id: string;
  etiqueta: string;
  href: string;
  icono?: string;
  badge?: number | string;
}

interface RamaSidebar {
  id: string;
  etiqueta: string;
  icono?: string;
  hijos: EnlaceSidebar[];
}

interface GrupoSidebar {
  id?: string;
  etiqueta?: string;
  items: (EnlaceSidebar | RamaSidebar)[];
}

interface UsuarioSidebar {
  nombre: string;
  correo?: string;
  avatarSrc?: string;
}
```

## Variantes

- **Expandida** — ancho de 264 px con textos, badges y logo completo.
- **Compacta** — ancho de 72 px con iconos centrados y marca compacta.
- **Cajón móvil** — por debajo de 768 px se usa un `<dialog>` nativo con backdrop.
- **Rama desplegable** — un ítem con `hijos` muestra chevron y sublista.
- **Panel de usuario** — con `accionesUsuario`, el usuario abre un menú desplegable.

## Comportamiento

- La rama activa se abre automáticamente si no hay estado previo.
- Al pulsar una rama en modo compacto, la barra se expande y la rama se abre.
- El cajón cierra al navegar si el enlace no llama `preventDefault()`.
- El desplegable de usuario cierra al hacer clic fuera y con `Escape`.
- El scroll del documento se bloquea mientras el cajón está abierto.
- Al pasar a escritorio, el cajón se cierra automáticamente.

## Accesibilidad

- La navegación usa `<nav>` con `aria-label`.
- El enlace activo lleva `aria-current="page"`.
- Las ramas usan `aria-expanded` y `aria-controls`.
- El cajón usa `<dialog>` nativo con `aria-label`.
- Los botones de contraer y cerrar tienen etiquetas en español.
- El foco visible usa `--link`.

## Design tokens

`--bg-surface`, `--fg-default`, `--fg-strong`, `--fg-muted`,
`--border-subtle`, `--border-default`, `--color-neutral-100`,
`--color-primary-50`, `--color-primary-500`, `--color-primary-700`,
`--shadow-md`, `--font-body`, `--link`.
