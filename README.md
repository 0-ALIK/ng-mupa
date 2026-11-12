# ng-mupa

Workspace Angular del **Lego Design System — Alcaldía de Panamá**.

## Proyectos

| Proyecto     | Tipo        | Descripción                                                        |
| ------------ | ----------- | ------------------------------------------------------------------ |
| `mupa-ui`    | Librería    | Componentes Angular del sistema de diseño.                         |
| `playground` | Aplicación  | Sitio de demostración con preview, ejemplos y documentación.       |

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
