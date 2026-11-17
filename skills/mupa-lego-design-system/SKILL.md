---
name: mupa-lego-design-system
description: Consulta el catálogo, la documentación y los tokens de mupa-ui, instala y configura la librería en proyectos Angular de la Alcaldía de Panamá, y localiza templates completos en GitHub para copiarlos y pegarlos. Úsala para dejar un proyecto listo para usar mupa-ui, elegir componentes existentes, leer sus APIs, copiar una pantalla completa o crear UI coherente con los tokens cuando algo no exista en el catálogo.
license: Apache-2.0
---

# Mupa Lego Design System

## Cuándo usar esta skill

Úsala siempre que vayas a:

- Instalar o configurar `mupa-ui` en un proyecto Angular.
- Construir o modificar una interfaz con `mupa-ui`.
- Elegir un componente del Lego Design System — Alcaldía de Panamá.
- Revisar inputs, outputs, tipos o comportamiento de un componente.
- Copiar un template completo (login, dashboard, etc.) desde GitHub.
- Crear un componente nuevo que no esté en el catálogo.
- Usar logos, fuentes o tokens del sistema.

## Fuente de verdad

No inventes APIs, colores, medidas ni nombres de componentes. La fuente de
verdad es el paquete instalado:

```text
node_modules/mupa-ui/
```

En el workspace de la librería (`ng-mupa`), la fuente está en:

```text
projects/mupa-ui/          # código fuente
dist/mupa-ui/              # paquete compilado
```

Los **templates completos** no se publican en el paquete npm. Viven en el
repositorio, dentro del playground:

```text
projects/playground/src/app/templates/<template>/
```

Si trabajas en el workspace y necesitas simular al consumidor, consulta
`dist/mupa-ui/`. Si trabajas en una app consumidora, consulta
`node_modules/mupa-ui/`.

Si `node_modules/mupa-ui` no existe, instala la librería antes de continuar
(ver la sección 1).

## 1. Instalar y configurar mupa-ui

### Requisitos

- Proyecto Angular 22 (`@angular/core` y `@angular/common` `^22.2.0`).
- Node.js compatible con Angular 22.

Si el proyecto usa una versión anterior de Angular, detente y reporta el
conflicto de versiones antes de modificar archivos.

### Instalación

```bash
npm install mupa-ui
```

### Estilos globales

En `angular.json`, dentro de `projects.<app>.architect.build.options.styles`,
incluye los estilos de la librería antes de los estilos de la app:

```json
"styles": [
  "node_modules/mupa-ui/tokens.css",
  "node_modules/mupa-ui/forms.css",
  "src/styles.css"
]
```

`tokens.css` declara los `@font-face` de Montserrat y todos los tokens.
`forms.css` contiene los estilos de los controles de formulario.

### Logos y assets de marca

En `projects.<app>.architect.build.options.assets`, agrega:

```json
{
  "glob": "**/*",
  "input": "node_modules/mupa-ui/assets/branding",
  "output": "assets/branding"
}
```

### Verificación

- `npm run build` (o `ng build`) termina sin errores.
- `node_modules/mupa-ui/tokens.css` y `forms.css` están en `styles`.
- Los logos aparecen en `dist/<app>/browser/assets/branding/`.
- Un componente de prueba compila:

```ts
import { MupaButton, MupaCard } from 'mupa-ui';
```

```html
<mupa-card titulo="Reportes ciudadanos" descripcion="Últimos 30 días">
  <mupa-button iconoInicio="plus">Nuevo reporte</mupa-button>
</mupa-card>
```

Los componentes son standalone y se importan directamente desde `mupa-ui`.
La librería no requiere módulos ni providers adicionales.

## 2. Consultar el catálogo y la documentación

### Paso 1 — Catálogo completo

Lee el README del paquete:

```text
node_modules/mupa-ui/README.md
```

En el workspace:

```text
projects/mupa-ui/README.md
```

La tabla del README lista todos los selectores y la ruta de su documentación.

### Paso 2 — Documentación de un componente

Cada componente tiene un `.md` dentro de `lib`:

```text
node_modules/mupa-ui/lib/button/button.md
node_modules/mupa-ui/lib/line-chart/line-chart.md
node_modules/mupa-ui/lib/menu/menu.md
```

En el workspace:

```text
projects/mupa-ui/src/lib/button/button.md
```

La documentación incluye, según el componente:

- Uso mínimo.
- Inputs y outputs.
- Tipos públicos.
- Variantes y comportamiento.
- Accesibilidad.
- Design tokens consumidos.

### Paso 3 — Listar componentes

Lista los directorios dentro de:

```text
node_modules/mupa-ui/lib/
```

Cada carpeta corresponde a un componente o directiva.

### Paso 4 — Buscar un patrón en toda la documentación

Usa la búsqueda de archivos de tu entorno (por ejemplo `rg` o la herramienta de
búsqueda del agente) sobre `node_modules/mupa-ui/lib/**/*.md`. Patrones útiles:

- `aria-`
- `tokens`
- `ControlValueAccessor`
- `data-theme`

### Paso 5 — Tipos públicos

Las declaraciones están centralizadas en:

```text
node_modules/mupa-ui/types/mupa-ui.d.ts
```

Busca allí interfaces como `OpcionRadio`, `GrupoMenu`, `ItemMenu`,
`DatoLineChart`, `PorcionPieChart`, etc.

## 3. Componentes disponibles

| Categoría          | Selectores                                                                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fundamentos        | `mupa-icon`                                                                                                                                                                                           |
| Acciones           | `mupa-button`, `mupa-toggle-button`, `mupa-pill`, `mupa-voice-pill`                                                                                                                                   |
| Formularios        | `mupa-checkbox`, `mupaInput`, `mupa-select`, `mupa-date-picker`, `mupa-radio`, `mupa-switch`, `mupa-range`, `mupa-file-upload`                                                                        |
| Avatares           | `mupa-avatar`, `mupa-avatar-group`                                                                                                                                                                    |
| Navegación         | `mupa-sidebar`, `mupa-breadcrumb`, `mupa-landing-nav`, `mupa-nav-link`, `mupa-pagination`, `mupa-menu`                                                                                                |
| Contenido          | `mupa-card`, `mupa-page-header`, `mupa-data-table`                                                                                                                                                    |
| Mensajes y estados | `mupa-banner`, `mupa-lattice-loader`, `mupa-bubble`, `mupa-bubble-content`, `mupa-bubble-suggestions`, `mupa-bubble-card`, `mupa-bubble-group`, `mupa-bubble-reactions`, `mupa-toast`, `mupa-toaster` |
| Interacción        | `mupa-tabs`, `mupa-segmented`, `mupa-accordion`, `mupa-progress`                                                                                                                                      |
| Gráficos           | `mupa-area-chart`, `mupa-bar-chart`, `mupa-bar-list`, `mupa-line-chart`, `mupa-line-chart-label`, `mupa-pie-chart`, `mupa-radar-chart`, `mupa-radial-chart`, `mupa-distribution-bar`                  |
| Marca              | `mupa-logo`                                                                                                                                                                                           |
| Recursos visuales  | `mupa-confetti`, `mupa-boton-confeti`, `mupa-marquee`, `mupa-testimonio`, `mupa-contador-numerico`, `mupa-logo-loop`                                                                                  |

Para la lista exacta y actualizada, usa siempre el README del paquete.

## 4. Usar los tokens de diseño

Archivo:

```text
node_modules/mupa-ui/tokens.css
```

En el workspace:

```text
projects/mupa-ui/src/theme/tokens.css
```

### Reglas obligatorias

- Usa `var(--token)` siempre. No escribas colores, sombras ni radios literales.
- No inventes una paleta paralela.
- No uses `#0660FF` directamente; usa `var(--color-primary-500)` o `var(--action)`.
- No uses `font-family: Montserrat` directamente; usa `var(--font-body)`.
- No uses `border-radius: 12px` si el token existente es `--radius-sm` o `16px`
  para tarjetas.
- Respeta el modo oscuro: prueba con `data-theme="dark"` en un ancestro.

### Categorías principales

| Categoría          | Tokens                                                                                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Azul institucional | `--color-primary-50` … `--color-primary-900`, `--action`, `--action-hover`, `--action-press`, `--link`                                                                                                         |
| Texto              | `--fg-strong`, `--fg-default`, `--fg-muted`, `--fg-disabled`, `--fg-on-brand`                                                                                                                                  |
| Superficies        | `--bg-base`, `--bg-surface`, `--bg-subtle`, `--bg-inverse`                                                                                                                                                     |
| Bordes             | `--border-subtle`, `--border-default`, `--border-strong`, `--border-control`                                                                                                                                   |
| Semánticos         | `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*`                                                                                                                                  |
| Categorías         | `--color-purple-*`, `--color-cyan-*`, `--color-brown-*`, `--color-lime-*`, `--color-coral-*`                                                                                                                   |
| Tipografía         | `--font-body`, `--font-display`, `--font-brand`, `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-title`, `--text-body`, `--text-body-sm`, `--text-label`, `--text-caption`, `--text-overline` |
| Radios             | `--radius-sm`, `--radius-pill`; tarjetas: `16px`                                                                                                                                                               |
| Sombras            | `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`                                                                                                                                                     |
| Z-index            | `--z-sticky`, `--z-dropdown`, `--z-modal`, `--z-toast`                                                                                                                                                         |

### Medidas base

- Espaciado en múltiplos de 4 px: `4, 8, 12, 16, 20, 24, 32, 48`.
- Controles: mínimo 44 px de alto, borde 1.5 px, radio `--radius-sm`.
- Tarjetas: radio 16 px, borde 1 px `--border-default`, fondo `--bg-surface`.
- Foco: `outline: 3px solid var(--link); outline-offset: 2px/3px`.
- Texto normal: 15 px / 1.55; texto pequeño: 13 px / 1.5.

## 5. Assets de marca y fuentes

### Logos

```text
node_modules/mupa-ui/assets/branding/
├── logo-alcaldia-navy.svg
├── logo-alcaldia-navy.png
├── logo-horizontal-white.png
├── logo-alcaldia-vertical-blue.png
├── logo-vertical-white.png
├── logo-escudo-blue.png
└── hatillo-isotipo.svg
```

Componente:

```html
<mupa-logo variante="horizontal" tema="color" tamano="md" />
```

Variantes: `horizontal`, `vertical`, `escudo`, `isotipo`.
Temas: `color`, `blanco`.
Tamaños: `sm`, `md`, `lg`.

Para copiar los assets en una app Angular, usa la configuración de `assets`
mostrada en la sección 1.

### Fuentes

```text
node_modules/mupa-ui/fonts/Montserrat-*.ttf
```

La app debe incluir `node_modules/mupa-ui/tokens.css` en `angular.json`, porque
ese archivo declara los `@font-face` y los tokens.

## 6. Si el componente no existe en el catálogo

Sigue este orden:

1. **Busca** en el README y en `lib/**/*.md`.
2. **Compón** con componentes existentes si es posible.
3. **Crea** un componente nuevo solo si no hay una composición razonable.

Al crear:

- Standalone, sin `standalone: true`.
- Signals: `input()`, `output()`, `model()`, `computed()`.
- CSS en archivo aparte, solo tokens.
- BEM con prefijo `mupa-`.
- Spec, documentación `.md` y página de playground.
- Accesibilidad: HTML semántico, roles, `aria-*`, teclado y foco visible.
- Modo oscuro verificado.
- No uses valores literales de color, tipografía, radios o sombras.

### Ejemplo de decisión

Si necesitas un “tooltip” y no está en el catálogo:

1. Verifica si `mupa-chart-tooltip` es interno (no se exporta).
2. Si no hay componente público, crea uno nuevo.
3. Usa:
   - `background: var(--bg-surface)`
   - `border: 1px solid var(--border-default)`
   - `border-radius: 12px`
   - `box-shadow: var(--shadow-md)`
   - `color: var(--fg-strong)`
   - `font: 500 12px/1.2 var(--font-body)`
4. Añade `role="tooltip"`, foco y cierre con Escape si es interactivo.

## 7. Templates completos

Los templates son pantallas completas ya construidas con `mupa-ui`. No llevan
sidebar ni barra del playground: el archivo es la pantalla entera y se copia y
pega en la app consumidora.

### Dónde buscarlos

Fuente de verdad en GitHub (rama `main`):

```text
https://github.com/0-ALIK/ng-mupa/tree/main/projects/playground/src/app/templates
```

Cada template tiene su carpeta y estos archivos:

```text
projects/playground/src/app/templates/<template>/
├── <template>.component.html   # estructura completa
├── <template>.component.css    # estilos exactos
└── <template>.component.ts     # comportamiento Angular
```

No reconstruyas el template de memoria. Lee directamente el archivo del
template en GitHub; si el nombre exacto no coincide, lista la carpeta del
template en el repositorio y usa el `.component.html` que encuentres.

### Cómo copiarlo

1. Abre la carpeta del template en GitHub.
2. Lee el `.component.html`, el `.component.css` y el `.component.ts`.
3. Copia los tres archivos en la app consumidora.
4. Ajusta solo los imports y las rutas de assets; conserva la estructura, los
   textos, las clases CSS, los estados y el comportamiento.
5. No añadas sidebar, barra de playground ni contenedores extra: el template
   ya es la pantalla completa.
6. Usa los componentes de `mupa-ui` que aparecen en el template. Si el
   template usa un icono, verifica que exista en `mupa-icon` antes de
   reemplazarlo.

### Catálogo

| Template      | Carpeta                                        | Pantalla completa  |
| ------------- | ---------------------------------------------- | ------------------ |
| Login interno | `projects/playground/src/app/templates/login/` | `/templates/login` |

URLs raw del login:

```text
https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/projects/playground/src/app/templates/login/login-template.component.html
https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/projects/playground/src/app/templates/login/login-template.component.css
https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/projects/playground/src/app/templates/login/login-template.component.ts
```

El template de login usa `mupa-button` y `mupa-icon`, y conserva el tema claro
del diseño original con tokens locales. No lo cambies a modo oscuro. También
usa `assets/branding/logo-alcaldia-navy.svg` y
`assets/branding/hatillo-isotipo.svg`; asegúrate de tener los assets de marca
configurados (sección 1).

### Agregar un template nuevo

Cuando agregues un template al repositorio:

1. Créalo en `projects/playground/src/app/templates/<nombre>/`.
2. Mantén un `.component.html`, `.component.css` y `.component.ts` standalone.
3. Añade su ruta full-screen en `projects/playground/src/app/app.routes.ts`.
4. Añade el enlace en la galería `/templates` y en el sidebar del playground.
5. Actualiza esta skill con la carpeta y las URLs raw.

## 8. Checklist antes de entregar

- [ ] Verifiqué que `mupa-ui` está instalado y en la versión esperada.
- [ ] `tokens.css` y `forms.css` están en `angular.json`.
- [ ] Los assets de marca están copiados.
- [ ] Leí el `.md` del componente que voy a usar.
- [ ] Verifiqué los inputs/outputs reales; no inventé nombres.
- [ ] Usé tokens para todo color, tipografía, radio, sombra y borde.
- [ ] Probé claro y oscuro.
- [ ] Probé teclado y foco visible.
- [ ] Ejecuté las pruebas y axe cuando corresponda.
- [ ] Si copié un template, usé la versión de GitHub y no le añadí layout.
- [ ] Si creé un componente, actualicé README, docs, playground y `public-api.ts`.

## 9. Rutas y comandos útiles

```bash
# Instalar la librería
npm install mupa-ui

# Buscar un patrón en toda la documentación (si tienes ripgrep)
rg "aria-expanded" node_modules/mupa-ui/lib

# Ver los assets de marca
# (lista node_modules/mupa-ui/assets/branding con tu herramienta de archivos)
```

Rutas que puedes leer directamente con la herramienta de archivos del agente:

```text
node_modules/mupa-ui/README.md
node_modules/mupa-ui/tokens.css
node_modules/mupa-ui/forms.css
node_modules/mupa-ui/types/mupa-ui.d.ts
node_modules/mupa-ui/lib/<componente>/<componente>.md
node_modules/mupa-ui/assets/branding/
```

Templates completos en GitHub:

```text
https://github.com/0-ALIK/ng-mupa/tree/main/projects/playground/src/app/templates
https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/projects/playground/src/app/templates/login/login-template.component.html
https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/projects/playground/src/app/templates/login/login-template.component.css
https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/projects/playground/src/app/templates/login/login-template.component.ts
```
