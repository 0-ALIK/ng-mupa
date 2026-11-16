# ng-mupa

Workspace Angular del **Lego Design System — Alcaldía de Panamá**.

## Proyectos

| Proyecto     | Tipo       | Descripción                                                  |
| ------------ | ---------- | ------------------------------------------------------------ |
| `mupa-ui`    | Librería   | Componentes Angular del sistema de diseño.                   |
| `playground` | Aplicación | Sitio de demostración con preview, ejemplos y documentación. |

## Paquete `mupa-ui`

- Versión: **1.0.0**
- Licencia: **Apache 2.0** (`LICENSE` y `NOTICE`)
- El build publica en `dist/mupa-ui`:
  - Componentes, tipos y documentación `.md` de cada componente.
  - `tokens.css` y `forms.css`.
  - Fuentes Montserrat.
  - Logos institucionales en `assets/branding`.
  - `README.md`, `LICENSE` y `NOTICE`.

## Skill para agentes

El instructivo del sistema de diseño está en:

```
.opencode/skills/mupa-lego-design-system/SKILL.md
```

Enseña a consultar el catálogo y la documentación desde `node_modules/mupa-ui`
y a construir interfaces nuevas con los tokens del sistema.

## Comandos

```bash
# Servir el playground en http://localhost:4200
npm start

# Compilar la librería
npm run build

# Compilar el playground
npm run build:playground

# Pruebas de la librería
npm test

# Pruebas del playground
npm run test:playground
```

## Documentación

- Convenciones de la librería: `projects/mupa-ui/AGENTS.md`
- Fundamentos y componentes: `projects/mupa-ui/README.md`
- Tokens: `projects/mupa-ui/src/theme/tokens.md`

## Estructura

```
projects/
├── mupa-ui/       Librería de componentes y tokens
│   └── src/
│       ├── theme/       tokens.css + fuentes Montserrat
│       └── lib/         componentes, tipos, specs y documentación
└── playground/    Aplicación de demostración
    └── src/app/
        ├── pages/       una página por componente
        └── shared/      tarjetas de demo y visor de documentación
```
