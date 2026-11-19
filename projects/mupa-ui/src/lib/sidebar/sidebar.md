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
la página lo aporta la ruta o el contenido proyectado.

El componente **sí impone el layout de dos columnas**: la navegación a la
izquierda y el contenido de la página a la derecha.

## Uso

```html
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
>
  <main class="contenido">...</main>
</mupa-sidebar>
```

```css
/* El sidebar impone el layout; el contenido ocupa el área principal. */
.contenido {
  flex: 1;
  min-width: 0;
  padding: 24px;
}
```

## Slot de contenido

El contenido de la página se proyecta dentro de `<mupa-sidebar>` mediante
`<ng-content>`. El componente se encarga de:

- Renderizar la navegación lateral.
- Crear el contenedor flex de dos columnas.
- Reservar el área principal para el contenido proyectado.
- Renderizar el botón "Menú" en móvil, dentro del contenido o flotante según
  `posicionDisparador`.

No necesitas un contenedor `.layout` externo. Si el sidebar se incrusta en un
contenedor de altura fija (por ejemplo, una demo), sobrescribe `min-height` en
el host:

```css
.mi-demo mupa-sidebar {
  min-height: 0;
}
```

## Inputs

| Input                     | Tipo                        | Default                  | Descripción                                   |
| ------------------------- | --------------------------- | ------------------------ | --------------------------------------------- |
| `grupos`                  | `GrupoSidebar[]`            | `[]`                     | Grupos de navegación.                         |
| `idActivo`                | `string`                    | —                        | Id del enlace activo; normalmente del router. |
| `logoSrc`                 | `string`                    | —                        | URL del logo institucional.                   |
| `marca`                   | `string`                    | `'Alcaldía de Panamá'`   | Nombre de la marca.                           |
| `nombreSistema`           | `string`                    | `'Sistema interno'`      | Nombre mostrado bajo la marca.                |
| `colapsado`               | `boolean \| undefined`      | `undefined`              | Estado controlado; si se omite, es interno.   |
| `colapsadoPorDefecto`     | `boolean`                   | `false`                  | Estado inicial cuando no es controlada.       |
| `idsExpandidosPorDefecto` | `string[]`                  | `[]`                     | Ramas abiertas en el primer render.           |
| `mostrarControlColapso`   | `boolean`                   | `true`                   | Muestra el botón de contraer en escritorio.   |
| `usuario`                 | `UsuarioSidebar`            | —                        | Usuario mostrado al pie.                      |
| `accionesUsuario`         | `EnlaceSidebar[]`           | `[]`                     | Acciones del menú de usuario.                 |
| `pie`                     | `string`                    | —                        | Texto opcional del pie.                       |
| `etiqueta`                | `string`                    | `'Navegación principal'` | Etiqueta accesible de la navegación.          |
| `posicionDisparador`      | `PosicionDisparadorSidebar` | `'contenido'`            | Ubicación del disparador móvil.               |

`posicionDisparador` acepta:

- `'contenido'` — el botón se renderiza al inicio del área de contenido (default).
- `'flotante'` — el botón se fija sobre la página. Ajusta su posición con
  `--mupa-sidebar-disparador-top` y `--mupa-sidebar-disparador-left`.
- `'oculto'` — no se renderiza; abre el cajón con `abrir()` o `alternar()`.

## Outputs

| Output               | Payload                                         | Descripción                               |
| -------------------- | ----------------------------------------------- | ----------------------------------------- |
| `navegar`            | `{ enlace: EnlaceSidebar; evento: MouseEvent }` | Emitido al activar un enlace.             |
| `colapsadoCambio`    | `boolean`                                       | Emitido al cambiar el estado de la barra. |
| `movilAbiertoCambio` | `boolean`                                       | Emitido al abrir o cerrar el cajón móvil. |

## API pública

El componente se puede referenciar con `#sidebar="mupaSidebar"` y controlar el
cajón móvil desde fuera. Es útil junto con `posicionDisparador="oculto"`.

```html
<mupa-sidebar #sidebar="mupaSidebar" posicionDisparador="oculto" ...>
  <header>
    <button type="button" (click)="sidebar.abrir()">Abrir menú</button>
  </header>
  <main>...</main>
</mupa-sidebar>
```

| Método       | Descripción                   |
| ------------ | ----------------------------- |
| `abrir()`    | Abre el cajón móvil.          |
| `cerrar()`   | Cierra el cajón móvil.        |
| `alternar()` | Abre o cierra el cajón móvil. |

`abrir()` y `alternar()` no hacen nada por encima de 768 px, donde la
navegación ya está visible.

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

type PosicionDisparadorSidebar = 'contenido' | 'flotante' | 'oculto';
```

## Variantes

- **Expandida** — ancho de 264 px con textos, badges y logo completo.
- **Compacta** — ancho de 72 px con iconos centrados y marca compacta.
- **Cajón móvil** — por debajo de 768 px se usa un `<dialog>` nativo con backdrop.
- **Disparador móvil** — `contenido` (por defecto), `flotante` u `oculto` para controlarlo con la API.
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
