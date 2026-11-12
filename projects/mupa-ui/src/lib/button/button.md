# mupa-button

Botón nativo accesible con las variantes del sistema de diseño. Mantiene las
medidas, estados, foco y comportamiento táctil del botón original.

## Uso

```html
<mupa-button (clic)="guardar()">Guardar cambios</mupa-button>

<mupa-button variante="secondary" iconoInicio="x">Cancelar</mupa-button>

<mupa-button href="/tramites/nuevo" variante="tonal" iconoInicio="plus">
  Nueva solicitud
</mupa-button>

<mupa-button
  variante="tonal"
  tamano="sm"
  [cargando]="guardando()"
  [deshabilitado]="!formularioValido()"
>
  Continuar
</mupa-button>

<mupa-button soloIcono etiquetaAria="Cerrar panel" iconoInicio="x" />
```

## Inputs

| Input           | Tipo                                                           | Default     | Descripción                                     |
| --------------- | -------------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `variante`      | `'primary' \| 'secondary' \| 'ghost' \| 'tonal' \| 'elevated'` | `'primary'` | Intención visual.                               |
| `tamano`        | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Altura y padding del botón.                     |
| `tipo`          | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | Tipo nativo del botón. Se ignora con `href`.    |
| `href`          | `string`                                                       | —           | Convierte el botón en un ancla de navegación.   |
| `deshabilitado` | `boolean`                                                      | `false`     | Deshabilita la acción.                          |
| `cargando`      | `boolean`                                                      | `false`     | Marca `aria-busy` y bloquea el botón.           |
| `soloIcono`     | `boolean`                                                      | `false`     | Convierte el botón en un cuadrado de icono.     |
| `bloque`        | `boolean`                                                      | `false`     | Ocupa todo el ancho disponible.                 |
| `iconoInicio`   | `string`                                                       | —           | Nombre del icono Lucide antes de la etiqueta.   |
| `iconoFin`      | `string`                                                       | —           | Nombre del icono Lucide después de la etiqueta. |
| `etiquetaAria`  | `string`                                                       | —           | Nombre accesible para botones de solo icono.    |
| `expandidoAria` | `boolean`                                                      | —           | Estado `aria-expanded` del control.             |
| `controlaAria`  | `string`                                                       | —           | ID del elemento controlado (`aria-controls`).   |

## Outputs

| Output | Payload      | Descripción                  |
| ------ | ------------ | ---------------------------- |
| `clic` | `MouseEvent` | Emitido al activar el botón. |

## Variantes

- `primary` — Azul institucional. Acción principal de la tarea.
- `secondary` — Borde y texto en color de enlace. Alternativa visible.
- `ghost` — Sin fondo ni borde. Acción complementaria.
- `tonal` — Fondo azul suave. Énfasis intermedio.
- `elevated` — Superficie con sombra. Para fondos visualmente complejos.

## Accesibilidad

- Usa un `<button>` nativo: teclado, foco y formularios funcionan con la plataforma.
- Los botones de solo icono requieren `etiquetaAria`.
- Los iconos decorativos se marcan automáticamente con `aria-hidden`.
- El foco visible usa `:focus-visible` con el token `--link`.
- Durante una operación usa `cargando`; anuncia el resultado fuera del botón.

## Design tokens

`--action`, `--action-hover`, `--action-press`, `--action-subtle`, `--fg-on-brand`,
`--link`, `--bg-surface`, `--color-primary-100`, `--color-neutral-100`,
`--fg-disabled`, `--text-button`, `--radius-pill`, `--space-2`, `--space-4`,
`--space-5`, `--space-6`, `--shadow-sm`.
