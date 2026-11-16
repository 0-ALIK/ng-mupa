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

Las rutas de documentación son relativas al paquete (`node_modules/mupa-ui`).
En el repositorio están bajo `projects/mupa-ui/src/`.

| Componente             | Selector                                                                  | Documentación                                |
| ---------------------- | ------------------------------------------------------------------------- | -------------------------------------------- |
| Icono                  | `mupa-icon`                                                               | `lib/icon/icon.md`                           |
| Botón                  | `mupa-button`                                                             | `lib/button/button.md`                       |
| Toggle button          | `mupa-toggle-button`                                                      | `lib/toggle-button/toggle-button.md`         |
| Chip / etiqueta        | `mupa-pill`                                                               | `lib/pill/pill.md`                           |
| Voice pill             | `mupa-voice-pill`                                                         | `lib/voice-pill/voice-pill.md`               |
| Casilla                | `mupa-checkbox`                                                           | `lib/checkbox/checkbox.md`                   |
| Directiva de campo     | `mupaInput`                                                               | `lib/input/input.md`                         |
| Selector               | `mupa-select`                                                             | `lib/select/select.md`                       |
| Selector de fecha      | `mupa-date-picker`                                                        | `lib/date-picker/date-picker.md`             |
| Avatar                 | `mupa-avatar`                                                             | `lib/avatar/avatar.md`                       |
| Grupo de avatares      | `mupa-avatar-group`                                                       | `lib/avatar-group/avatar-group.md`           |
| Tarjeta                | `mupa-card`                                                               | `lib/card/card.md`                           |
| Ranuras de tarjeta     | `mupaCardMedia` · `mupaCardHeader` · `mupaCardFooter` · `mupaCardActions` | `lib/card/card.md`                           |
| Cabecera de página     | `mupa-page-header`                                                        | `lib/page-header/page-header.md`             |
| Tabla de datos         | `mupa-data-table`                                                         | `lib/data-table/data-table.md`               |
| Plantilla de tabla     | `mupaTemplate`                                                            | `lib/data-table/data-table.md`               |
| Gráfico de área        | `mupa-area-chart`                                                         | `lib/area-chart/area-chart.md`               |
| Gráfico de barras      | `mupa-bar-chart`                                                          | `lib/bar-chart/bar-chart.md`                 |
| Bar list               | `mupa-bar-list`                                                           | `lib/bar-list/bar-list.md`                   |
| Gráfico de líneas      | `mupa-line-chart`                                                         | `lib/line-chart/line-chart.md`               |
| Líneas con etiquetas   | `mupa-line-chart-label`                                                   | `lib/line-chart/line-chart-label.md`         |
| Gráfico circular       | `mupa-pie-chart`                                                          | `lib/pie-chart/pie-chart.md`                 |
| Gráfico de radar       | `mupa-radar-chart`                                                        | `lib/radar-chart/radar-chart.md`             |
| Gráfico radial         | `mupa-radial-chart`                                                       | `lib/radial-chart/radial-chart.md`           |
| Barra de distribución  | `mupa-distribution-bar`                                                   | `lib/distribution-bar/distribution-bar.md`   |
| Aviso informativo      | `mupa-banner`                                                             | `lib/banner/banner.md`                       |
| Lattice loader         | `mupa-lattice-loader`                                                     | `lib/lattice-loader/lattice-loader.md`       |
| Burbuja                | `mupa-bubble`                                                             | `lib/bubble/bubble.md`                       |
| Contenido de burbuja   | `mupa-bubble-content`                                                     | `lib/bubble/bubble.md`                       |
| Sugerencias            | `mupa-bubble-suggestions`                                                 | `lib/bubble/bubble.md`                       |
| Tarjeta de burbuja     | `mupa-bubble-card`                                                        | `lib/bubble/bubble.md`                       |
| Grupo de burbujas      | `mupa-bubble-group`                                                       | `lib/bubble/bubble.md`                       |
| Reacciones de burbuja  | `mupa-bubble-reactions`                                                   | `lib/bubble/bubble.md`                       |
| Notificación           | `mupa-toast`                                                              | `lib/toast/toast.md`                         |
| Pila de notificaciones | `mupa-toaster`                                                            | `lib/toast/toaster.md`                       |
| Navegación lateral     | `mupa-sidebar`                                                            | `lib/sidebar/sidebar.md`                     |
| Ruta de navegación     | `mupa-breadcrumb`                                                         | `lib/breadcrumb/breadcrumb.md`               |
| Menú de landing        | `mupa-landing-nav`                                                        | `lib/landing-nav/landing-nav.md`             |
| Espécimen de enlace    | `mupa-nav-link`                                                           | `lib/nav-link/nav-link.md`                   |
| Paginación             | `mupa-pagination`                                                         | `lib/pagination/pagination.md`               |
| Tabs                   | `mupa-tabs`                                                               | `lib/tabs/tabs.md`                           |
| Switch                 | `mupa-switch`                                                             | `lib/switch/switch.md`                       |
| Segmented              | `mupa-segmented`                                                          | `lib/segmented/segmented.md`                 |
| Radio                  | `mupa-radio`                                                              | `lib/radio/radio.md`                         |
| Acordeón               | `mupa-accordion`                                                          | `lib/accordion/accordion.md`                 |
| Menú                   | `mupa-menu`                                                               | `lib/menu/menu.md`                           |
| Progreso               | `mupa-progress`                                                           | `lib/progress/progress.md`                   |
| Carga de archivos      | `mupa-file-upload`                                                        | `lib/file-upload/file-upload.md`             |
| Range                  | `mupa-range`                                                              | `lib/range/range.md`                         |
| Logo institucional     | `mupa-logo`                                                               | `lib/logo/logo.md`                           |
| Confetti               | `mupa-confetti`                                                           | `lib/confetti/confetti.md`                   |
| Botón de confeti       | `mupa-boton-confeti`                                                      | `lib/confetti/confetti.md`                   |
| Marquee                | `mupa-marquee`                                                            | `lib/marquee/marquee.md`                     |
| Testimonio             | `mupa-testimonio`                                                         | `lib/marquee/marquee.md`                     |
| Contador numérico      | `mupa-contador-numerico`                                                  | `lib/contador-numerico/contador-numerico.md` |
| Logo loop              | `mupa-logo-loop`                                                          | `lib/logo-loop/logo-loop.md`                 |

## Uso

```ts
import { MupaButton, MupaIcon, MupaCheckbox } from 'mupa-ui';
```

```html
<mupa-button iconoInicio="save" (clic)="guardar()">Guardar cambios</mupa-button>

<mupa-checkbox etiqueta="Acepto los términos" [(marcado)]="aceptado" />
```

## Assets de marca

Los logos institucionales se publican en `node_modules/mupa-ui/assets/branding`.
Para usarlos con `mupa-logo`, copia esa carpeta en los assets de tu aplicación:

```json
{
  "glob": "**/*",
  "input": "node_modules/mupa-ui/assets/branding",
  "output": "assets/branding"
}
```

Si prefieres otra ubicación, pasa `src` a `mupa-logo` con la URL correspondiente.

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
