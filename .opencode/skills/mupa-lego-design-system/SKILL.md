---
name: Mupa Lego Design System
description: Consulta el catálogo, la documentación y los tokens de mupa-ui antes de construir interfaces de la Alcaldía de Panamá. Úsala para elegir componentes existentes, leer sus APIs o crear UI coherente con los tokens cuando algo no exista en el catálogo.
---

# Mupa Lego Design System

## Cuándo usar esta skill

Úsala siempre que vayas a:

- Construir o modificar una interfaz con `mupa-ui`.
- Elegir un componente del Lego Design System — Alcaldía de Panamá.
- Revisar inputs, outputs, tipos o comportamiento de un componente.
- Crear un componente nuevo que no esté en el catálogo.
- Usar logos, fuentes o tokens del sistema.

## Fuente de verdad

No inventes APIs, colores, medidas ni nombres de componentes. La fuente de
verdad es el paquete instalado:

```
node_modules/mupa-ui/
```

En este workspace de la librería, la fuente está en:

```
projects/mupa-ui/          # código fuente
dist/mupa-ui/              # paquete compilado
```

Si trabajas en el workspace y necesitas simular al consumidor, consulta
`dist/mupa-ui/`. Si trabajas en una app consumidora, consulta
`node_modules/mupa-ui/`.

## 1. Consultar el catálogo y la documentación

### Paso 1 — Catálogo completo

Lee el README del paquete:

```powershell
Get-Content node_modules/mupa-ui/README.md
```

En el workspace:

```powershell
Get-Content projects/mupa-ui/README.md
```

La tabla del README lista todos los selectores y la ruta de su documentación.

### Paso 2 — Documentación de un componente

Cada componente tiene un `.md` dentro de `lib`:

```powershell
Get-Content node_modules/mupa-ui/lib/button/button.md
Get-Content node_modules/mupa-ui/lib/line-chart/line-chart.md
Get-Content node_modules/mupa-ui/lib/menu/menu.md
```

En el workspace:

```powershell
Get-Content projects/mupa-ui/src/lib/button/button.md
```

La documentación incluye, según el componente:

- Uso mínimo.
- Inputs y outputs.
- Tipos públicos.
- Variantes y comportamiento.
- Accesibilidad.
- Design tokens consumidos.

### Paso 3 — Listar componentes

```powershell
Get-ChildItem node_modules/mupa-ui/lib -Directory | Select-Object Name
```

### Paso 4 — Buscar un patrón en toda la documentación

```powershell
Select-String -Path node_modules/mupa-ui/lib/**/*.md -Pattern "aria-"
Select-String -Path node_modules/mupa-ui/lib/**/*.md -Pattern "tokens"
```

### Paso 5 — Tipos públicos

Las declaraciones están centralizadas en:

```powershell
Get-Content node_modules/mupa-ui/types/mupa-ui.d.ts
```

Busca allí interfaces como `OpcionRadio`, `GrupoMenu`, `ItemMenu`,
`DatoLineChart`, `PorcionPieChart`, etc.

## 2. Componentes disponibles

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

## 3. Usar los tokens de diseño

Archivo:

```powershell
Get-Content node_modules/mupa-ui/tokens.css
```

En el workspace:

```powershell
Get-Content projects/mupa-ui/src/theme/tokens.css
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

## 4. Assets de marca y fuentes

### Logos

```
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

Para copiar los assets en una app Angular:

```json
{
  "glob": "**/*",
  "input": "node_modules/mupa-ui/assets/branding",
  "output": "assets/branding"
}
```

### Fuentes

```
node_modules/mupa-ui/fonts/Montserrat-*.ttf
```

La app debe incluir `node_modules/mupa-ui/tokens.css` en `angular.json`, porque
ese archivo declara los `@font-face` y los tokens.

## 5. Si el componente no existe en el catálogo

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

## 6. Checklist antes de entregar

- [ ] Leí el `.md` del componente que voy a usar.
- [ ] Verifiqué los inputs/outputs reales; no inventé nombres.
- [ ] Usé tokens para todo color, tipografía, radio, sombra y borde.
- [ ] Probé claro y oscuro.
- [ ] Probé teclado y foco visible.
- [ ] Ejecuté las pruebas y axe cuando corresponda.
- [ ] Si creé un componente, actualicé README, docs, playground y `public-api.ts`.

## 7. Comandos rápidos

```powershell
# Catálogo
Get-Content node_modules/mupa-ui/README.md

# Documentación de un componente
Get-Content node_modules/mupa-ui/lib/menu/menu.md

# Tokens
Get-Content node_modules/mupa-ui/tokens.css

# Buscar en todos los docs
Select-String -Path node_modules/mupa-ui/lib/**/*.md -Pattern "aria-expanded"

# Assets
Get-ChildItem node_modules/mupa-ui/assets/branding
```
