# mupa-toggle-button

Botón de alternancia con estado activo persistente. Generaliza el antiguo
`SavedToggle` del sistema de diseño: mismo botón, variantes, tamaños, icono
relleno, estado ocupado y bloqueo. En el playground se usa con el ejemplo
original de **Guardados**.

## Uso

```html
<!-- Ejemplo Guardados: corazón de favoritos -->
<mupa-toggle-button
  [activo]="guardado()"
  (activoChange)="guardado.set($event)"
  etiquetaElemento="este empleo"
  variante="ghost"
  icono="heart"
/>

<!-- Con texto -->
<mupa-toggle-button
  [activo]="guardado()"
  (activoChange)="guardado.set($event)"
  etiquetaElemento="Paz y salvo municipal"
  [mostrarEtiqueta]="true"
  variante="outline"
/>

<!-- Con confirmación del sistema -->
<mupa-toggle-button
  [activo]="guardado()"
  [ocupado]="guardando()"
  etiquetaElemento="Paz y salvo municipal"
  [mostrarEtiqueta]="true"
  (activoChange)="solicitarGuardado($event)"
/>
```

## Inputs

| Input              | Tipo                                           | Default                    | Descripción                                    |
| ------------------ | ---------------------------------------------- | -------------------------- | ---------------------------------------------- |
| `activo`           | `boolean`                                      | `false`                    | Estado activo. Admite `[(activo)]`.            |
| `activoPorDefecto` | `boolean`                                      | `false`                    | Estado activo inicial no controlado.           |
| `controlado`       | `boolean`                                      | `false`                    | Solo solicita el cambio, no modifica `activo`. |
| `etiquetaActiva`   | `string`                                       | `'Guardado'`               | Texto visible activo.                          |
| `etiquetaInactiva` | `string`                                       | `'Guardar'`                | Texto visible inactivo.                        |
| `etiquetaOcupado`  | `string`                                       | `'Actualizando…'`          | Texto visible mientras procesa.                |
| `etiquetaElemento` | `string`                                       | `'este elemento'`          | Nombre del elemento para aria-label y title.   |
| `ariaOcupado`      | `string`                                       | `'Actualizando'`           | Texto accesible mientras procesa.              |
| `tituloActivo`     | `string`                                       | `'Quitar de guardados'`    | Inicio del título activo.                      |
| `tituloInactivo`   | `string`                                       | `'Guardar'`                | Inicio del título inactivo.                    |
| `tituloOcupado`    | `string`                                       | `'Actualizando guardados'` | Título mientras procesa.                       |
| `variante`         | `'primary' \| 'tonal' \| 'outline' \| 'ghost'` | `'outline'`                | Variante visual.                               |
| `tamano`           | `'sm' \| 'md' \| 'lg'`                         | `'md'`                     | Tamaño del botón.                              |
| `mostrarEtiqueta`  | `boolean`                                      | `false`                    | Muestra el texto junto al icono.               |
| `deshabilitado`    | `boolean`                                      | `false`                    | Deshabilita la interacción.                    |
| `ocupado`          | `boolean`                                      | `false`                    | Marca una operación en curso y bloquea.        |
| `icono`            | `string`                                       | `'heart'`                  | Nombre del icono Lucide.                       |
| `etiquetaAria`     | `string`                                       | —                          | Nombre accesible personalizado.                |
| `id`               | `string`                                       | —                          | Identificador del botón.                       |

## Outputs

| Output            | Payload      | Descripción                                               |
| ----------------- | ------------ | --------------------------------------------------------- |
| `activoChange`    | `boolean`    | Emitido al cambiar el estado activo.                      |
| `solicitudCambio` | `boolean`    | Estado solicitado cuando `controlado` es verdadero.       |
| `clic`            | `MouseEvent` | Emitido antes de alternar. `preventDefault()` lo cancela. |

## Variantes

- `primary` — azul institucional.
- `tonal` — fondo azul suave.
- `outline` — borde y texto en color de enlace. Valor por defecto.
- `ghost` — sin fondo ni borde.

## Estados

- **Inactivo** — icono con relleno transparente.
- **Activo** — variables de fondo/borde azul suave, icono relleno con
  `currentColor` y `aria-pressed="true"`.
- **Ocupado** — `aria-busy="true"`, bloqueado y texto "Actualizando…".
- **Deshabilitado** — colores neutros y sin interacción.

## Accesibilidad

- Usa un `<button>` nativo con `aria-pressed` y `aria-busy`.
- `aria-label` incluye el elemento cuando `mostrarEtiqueta` es verdadero.
- `title` describe la acción y el elemento.
- El `clic` permite cancelar la alternancia con `preventDefault()`.
- El foco visible usa `--link`.

## Design tokens

`--action`, `--action-hover`, `--action-press`, `--action-subtle`, `--link`,
`--fg-on-brand`, `--bg-surface`, `--color-primary-100`, `--color-neutral-100`,
`--fg-disabled`, `--text-button`, `--radius-sm`, `--space-2`, `--space-4`,
`--space-5`, `--space-6`.
