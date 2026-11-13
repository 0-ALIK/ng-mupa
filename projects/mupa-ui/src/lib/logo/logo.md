# mupa-logo

Logo institucional de la Alcaldía de Panamá.

Usa los assets empaquetados en `assets/branding` y permite reemplazarlos con
`src` cuando el consumidor los publique en otra ruta.

## Uso

```html
<mupa-logo variante="horizontal" tema="color" tamano="md" alt="Alcaldía de Panamá" />
```

Con enlace:

```html
<mupa-logo variante="horizontal" href="/inicio" alt="Alcaldía de Panamá, ir al inicio" />
```

## Inputs

| Input      | Tipo                                                  | Default                | Descripción                                    |
| ---------- | ----------------------------------------------------- | ---------------------- | ---------------------------------------------- |
| `variante` | `'horizontal' \| 'vertical' \| 'escudo' \| 'isotipo'` | `'horizontal'`         | Composición del logo.                          |
| `tema`     | `'color' \| 'blanco'`                                 | `'color'`              | Versión cromática.                             |
| `tamano`   | `'sm' \| 'md' \| 'lg'`                                | `'md'`                 | Tamaño relativo.                               |
| `src`      | `string`                                              | —                      | Archivo propio; tiene prioridad sobre el mapa. |
| `alt`      | `string`                                              | `'Alcaldía de Panamá'` | Texto alternativo.                             |
| `href`     | `string`                                              | —                      | Envuelve el logo en un enlace.                 |

## Assets

| Variante     | Color                             | Blanco                      |
| ------------ | --------------------------------- | --------------------------- |
| `horizontal` | `logo-alcaldia-navy.svg`          | `logo-horizontal-white.png` |
| `vertical`   | `logo-alcaldia-vertical-blue.png` | `logo-vertical-white.png`   |
| `escudo`     | `logo-escudo-blue.png`            | No disponible; usa color.   |
| `isotipo`    | `hatillo-isotipo.svg`             | No disponible; usa color.   |

### Copiar los assets

La librería publica los archivos en `node_modules/mupa-ui/assets/branding`.
Para servirlos, agrega esta entrada en `angular.json`:

```json
{
  "glob": "**/*",
  "input": "node_modules/mupa-ui/assets/branding",
  "output": "assets/branding"
}
```

Si prefieres otra ruta, pasa `src` con la URL correspondiente.

## Tamaños

| Variante     | `sm`  | `md`  | `lg`  |
| ------------ | ----- | ----- | ----- |
| `horizontal` | 24 px | 32 px | 48 px |
| `vertical`   | 56 px | 72 px | 96 px |
| `escudo`     | 32 px | 44 px | 60 px |
| `isotipo`    | 24 px | 32 px | 48 px |

## Reglas de marca

- Usa la versión horizontal como opción principal.
- Reserva la versión blanca para fondos azul institucional o navy.
- No deformes, rotes, recoloques ni cambies la proporción del logo.
- No lo uses sobre fondos con bajo contraste.
- Mantén un espacio libre mínimo equivalente a la altura de la letra «A» del logo.
- Para el menú lateral, `mupa-sidebar` acepta `logoSrc`, `marca` y `nombreSistema`.

## Design tokens

El logo no consume tokens de color; los assets son archivos oficiales. El foco
del enlace usa `--link`.
