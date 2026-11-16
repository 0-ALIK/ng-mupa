<p align="center">
  <img
    src="https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/projects/mupa-ui/src/lib/logo/assets/logo-alcaldia-navy.svg"
    alt="Alcaldía de Panamá"
    width="180"
  />
</p>

<h1 align="center">ng-mupa</h1>

<p align="center">
  <strong>Workspace Angular del Lego Design System — Alcaldía de Panamá</strong>
</p>

<p align="center">
  <img alt="Versión 1.0.0" src="https://img.shields.io/badge/version-1.0.0-0660FF?style=flat-square" />
  <img alt="Licencia Apache 2.0" src="https://img.shields.io/badge/licencia-Apache%202.0-0660FF?style=flat-square" />
  <img alt="Angular 22" src="https://img.shields.io/badge/Angular-22-DD0031?style=flat-square&logo=angular" />
  <img alt="Más de 50 componentes" src="https://img.shields.io/badge/componentes-50%2B-0660FF?style=flat-square" />
</p>

<p align="center">
  <img
    src="https://raw.githubusercontent.com/0-ALIK/ng-mupa/main/docs/showcase-galeria-de-patrones.jpg"
    alt="Galería de patrones construida con componentes de mupa-ui"
    width="100%"
  />
</p>

<p align="center">
  <em>Galería de patrones construida con componentes de mupa-ui.</em>
</p>

---

Este workspace contiene la librería **mupa-ui** y el **playground** del
**Lego Design System — Alcaldía de Panamá**.

## Proyectos

| Proyecto                                | Tipo       | Descripción                                         |
| --------------------------------------- | ---------- | --------------------------------------------------- |
| [`mupa-ui`](projects/mupa-ui/README.md) | Librería   | Componentes Angular, tokens, gráficos y branding.   |
| [`playground`](projects/playground)     | Aplicación | Sitio de demostración con ejemplos y documentación. |

## Paquete `mupa-ui`

- Versión **1.0.0**, licencia **Apache 2.0**.
- Más de **50 componentes y directivas**.
- Tokens de diseño, modo oscuro y tipografía Montserrat.
- Gráficos SVG puro: área, barras, líneas, circular, radar, radial y distribución.
- Logos institucionales empaquetados en `assets/branding`.
- Documentación `.md` por componente dentro del paquete.
- [Catálogo completo y guía de uso](projects/mupa-ui/README.md).

### Instalación

```bash
npm install mupa-ui
```

```json
"styles": [
  "node_modules/mupa-ui/tokens.css",
  "node_modules/mupa-ui/forms.css",
  "src/styles.css"
]
```

## Playground

```bash
npm start
```

Disponible en `http://localhost:4200`. Incluye una página por componente, ejemplos
originales y variantes propias.

## Skill para agentes

La skill vive en
[`skills/mupa-lego-design-system/SKILL.md`](skills/mupa-lego-design-system/SKILL.md).
Enseña a instalar y configurar `mupa-ui`, consultar el catálogo y construir
interfaces con los tokens del sistema.

### Instalar la skill

```bash
# Ver las skills disponibles en el repositorio
npx skills add 0-ALIK/ng-mupa --list

# Instalar en el agente detectado (OpenCode, Claude Code, Cursor, etc.)
npx skills add 0-ALIK/ng-mupa --skill mupa-lego-design-system --copy -y

# Instalación global para todos los proyectos
npx skills add 0-ALIK/ng-mupa --skill mupa-lego-design-system -g --copy -y
```

Si quieres elegir el agente manualmente, añade `-a <agente>` (`opencode`,
`claude-code`, `cursor`, etc.).

### Prompt para dejar un proyecto listo

Copia este bloque y pégalo en el agente que esté trabajando en tu proyecto
Angular. El agente instala la librería, configura `angular.json`, instala la
skill y verifica que todo compile.

```text
Trabaja en este proyecto Angular y déjalo listo para usar mupa-ui, la librería
del Lego Design System de la Alcaldía de Panamá. Sigue estos pasos en orden:

1. Revisa package.json y confirma que el proyecto usa Angular 22
   (@angular/core y @angular/common ^22.2.0). Si la versión es anterior,
   detente y explícame el conflicto antes de modificar archivos.
2. Instala la librería:
   npm install mupa-ui
3. Configura angular.json en el proyecto de la app:
   - En architect.build.options.styles, agrega antes de src/styles.css:
     "node_modules/mupa-ui/tokens.css",
     "node_modules/mupa-ui/forms.css"
   - En architect.build.options.assets, agrega:
     { "glob": "**/*", "input": "node_modules/mupa-ui/assets/branding", "output": "assets/branding" }
4. Instala la skill para agentes:
   npx -y skills@latest add 0-ALIK/ng-mupa --skill mupa-lego-design-system --copy -y
   Verifica que exista .agents/skills/mupa-lego-design-system/SKILL.md.
5. Verifica la instalación:
   - npm run build (o ng build) termina sin errores.
   - tokens.css y forms.css están en angular.json.
   - Los logos están en dist/<app>/browser/assets/branding/.
6. Si el proyecto tiene una página de inicio o un componente de prueba, añade
   un ejemplo mínimo con mupa-button y mupa-card y confirma que compila. Si no
   existe, no crees archivos nuevos: solo verifica el build y muéstrame el
   snippet listo para pegar.
7. Al terminar, entrega un resumen con: versión instalada, archivos
   modificados, comandos ejecutados y cómo verificar que todo quedó bien.

No inventes APIs, tokens ni nombres de componentes. La fuente de verdad es
node_modules/mupa-ui/README.md y node_modules/mupa-ui/lib/**/*.md. Usa la
skill mupa-lego-design-system para consultar el catálogo.
```

> El prompt asume que el agente puede ejecutar `npm` y `npx` en la terminal del
> proyecto. Si usas otro gestor de paquetes, sustituye `npm install` por el
> equivalente.

## Comandos

| Comando                    | Qué hace                                        |
| -------------------------- | ----------------------------------------------- |
| `npm start`                | Sirve el playground en `http://localhost:4200`. |
| `npm run build`            | Compila la librería en `dist/mupa-ui`.          |
| `npm run build:playground` | Compila el playground.                          |
| `npm test`                 | Ejecuta las pruebas de la librería.             |
| `npm run test:playground`  | Ejecuta las pruebas del playground.             |

## Estructura

```text
projects/
├── mupa-ui/       Librería de componentes, tokens y branding
│   └── src/
│       ├── theme/       tokens.css + fuentes Montserrat
│       └── lib/         componentes, tipos, specs y documentación
└── playground/    Aplicación de demostración
    └── src/app/
        ├── pages/       una página por componente
        └── shared/      tarjetas de demo y visor de documentación

skills/
└── mupa-lego-design-system/   Skill para agentes
```

## Documentación

- [Catálogo y guía de la librería](projects/mupa-ui/README.md)
- [Convenciones de desarrollo](projects/mupa-ui/AGENTS.md)
- [Tokens de diseño](projects/mupa-ui/src/theme/tokens.md)
- [Skill para agentes](skills/mupa-lego-design-system/SKILL.md)

## Licencia

Distribuido bajo **Apache License 2.0**. Consulta [LICENSE](LICENSE) y
[NOTICE](NOTICE).

Copyright 2026 **Flavio Sánchez (Alik)**.

---

<p align="center">
  Hecho para la <strong>Alcaldía de Panamá</strong>.
</p>
