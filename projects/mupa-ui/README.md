# mupa-ui

Librería Angular del **Lego Design System — Alcaldía de Panamá**.
Es un port fiel de la implementación original del sistema.

## Fundamentos

Los tokens del sistema están en `src/theme/tokens.css` y son una copia exacta
de los tokens del Lego Design System — Alcaldía de Panamá. La documentación de
los fundamentos está en `src/theme/tokens.md`.

- Colores primarios, secundarios, neutros, complementarios y semánticos.
- Tipografía Montserrat con todos sus pesos.
- Escala tipográfica, radios, espaciado y elevación.
- Modo oscuro con `data-theme="dark"`.
- Variante de sidebar blanca con `data-sidebar="white"`.

Las fuentes Montserrat se incluyen en `src/theme/fonts` y se copian al paquete
como `fonts/`.

### Consumo de estilos

En la aplicación consumidora, agrega el CSS de tokens y formularios a los estilos globales:

```json
// angular.json
"styles": [
  "node_modules/mupa-ui/tokens.css",
  "node_modules/mupa-ui/forms.css",
  "src/styles.css"
]
```

En este workspace, durante el desarrollo de la librería:

```json
"styles": [
  "projects/mupa-ui/src/theme/tokens.css"
]
```

## Componentes disponibles

| Componente             | Selector                                                                  | Documentación                              |
| ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| Icono                  | `mupa-icon`                                                               | `src/lib/icon/icon.md`                     |
| Botón                  | `mupa-button`                                                             | `src/lib/button/button.md`                 |
| Toggle button          | `mupa-toggle-button`                                                      | `src/lib/toggle-button/toggle-button.md`   |
| Chip / etiqueta        | `mupa-pill`                                                               | `src/lib/pill/pill.md`                     |
| Voice pill             | `mupa-voice-pill`                                                         | `src/lib/voice-pill/voice-pill.md`         |
| Casilla                | `mupa-checkbox`                                                           | `src/lib/checkbox/checkbox.md`             |
| Directiva de campo     | `mupaInput`                                                               | `src/lib/input/input.md`                   |
| Selector               | `mupa-select`                                                             | `src/lib/select/select.md`                 |
| Selector de fecha      | `mupa-date-picker`                                                        | `src/lib/date-picker/date-picker.md`       |
| Avatar                 | `mupa-avatar`                                                             | `src/lib/avatar/avatar.md`                 |
| Grupo de avatares      | `mupa-avatar-group`                                                       | `src/lib/avatar-group/avatar-group.md`     |
| Tarjeta                | `mupa-card`                                                               | `src/lib/card/card.md`                     |
| Ranuras de tarjeta     | `mupaCardMedia` · `mupaCardHeader` · `mupaCardFooter` · `mupaCardActions` | `src/lib/card/card.md`                     |
| Cabecera de página     | `mupa-page-header`                                                        | `src/lib/page-header/page-header.md`       |
| Tabla de datos         | `mupa-data-table`                                                         | `src/lib/data-table/data-table.md`         |
| Plantilla de tabla     | `mupaTemplate`                                                            | `src/lib/data-table/data-table.md`         |
| Aviso informativo      | `mupa-banner`                                                             | `src/lib/banner/banner.md`                 |
| Lattice loader         | `mupa-lattice-loader`                                                     | `src/lib/lattice-loader/lattice-loader.md` |
| Burbuja                | `mupa-bubble`                                                             | `src/lib/bubble/bubble.md`                 |
| Contenido de burbuja   | `mupa-bubble-content`                                                     | `src/lib/bubble/bubble.md`                 |
| Sugerencias            | `mupa-bubble-suggestions`                                                 | `src/lib/bubble/bubble.md`                 |
| Tarjeta de burbuja     | `mupa-bubble-card`                                                        | `src/lib/bubble/bubble.md`                 |
| Grupo de burbujas      | `mupa-bubble-group`                                                       | `src/lib/bubble/bubble.md`                 |
| Reacciones de burbuja  | `mupa-bubble-reactions`                                                   | `src/lib/bubble/bubble.md`                 |
| Notificación           | `mupa-toast`                                                              | `src/lib/toast/toast.md`                   |
| Pila de notificaciones | `mupa-toaster`                                                            | `src/lib/toast/toaster.md`                 |
| Navegación lateral     | `mupa-sidebar`                                                            | `src/lib/sidebar/sidebar.md`               |
| Ruta de navegación     | `mupa-breadcrumb`                                                         | `src/lib/breadcrumb/breadcrumb.md`         |
| Menú de landing        | `mupa-landing-nav`                                                        | `src/lib/landing-nav/landing-nav.md`       |
| Espécimen de enlace    | `mupa-nav-link`                                                           | `src/lib/nav-link/nav-link.md`             |
| Paginación             | `mupa-pagination`                                                         | `src/lib/pagination/pagination.md`         |

## Uso

```ts
import { MupaButton, MupaIcon, MupaCheckbox } from 'mupa-ui';
```

```html
<mupa-button iconoInicio="save" (clic)="guardar()">Guardar cambios</mupa-button>

<mupa-checkbox etiqueta="Acepto los términos" [(marcado)]="aceptado" />
```

## Convenciones

Las reglas de estructura, idioma y estilo están en [`AGENTS.md`](./AGENTS.md).

Cada componente incluye:

- `<nombre>.component.ts` con template inline.
- `<nombre>.component.css` con design tokens.
- `<nombre>.component.spec.ts` con pruebas.
- `<nombre>.types.ts` con tipos públicos.
- `<nombre>.md` con documentación.

## Desarrollo

```bash
# Compilar la librería
ng build mupa-ui

# Ejecutar pruebas
ng test mupa-ui

# Servir el playground
ng serve playground
```
