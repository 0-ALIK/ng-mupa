# mupa-checkbox

Casilla de verificación del sistema de diseño. Permite seleccionar varios
elementos de una lista o activar y desactivar un valor.

## Uso

```html
<mupa-checkbox etiqueta="Acepto los términos" [(marcado)]="aceptado" />

<mupa-checkbox
  etiqueta="Seleccionar todos"
  [indeterminado]="seleccionParcial()"
  [marcado]="todosSeleccionados()"
  (marcadoChange)="alternarTodos($event)"
/>

<mupa-checkbox etiqueta="No disponible" [deshabilitado]="true" />
```

## Inputs

| Input           | Tipo      | Default                  | Descripción                            |
| --------------- | --------- | ------------------------ | -------------------------------------- |
| `marcado`       | `boolean` | `false`                  | Estado marcado. Admite `[(marcado)]`.  |
| `indeterminado` | `boolean` | `false`                  | Muestra un guion en lugar de la marca. |
| `deshabilitado` | `boolean` | `false`                  | Deshabilita la interacción.            |
| `requerido`     | `boolean` | `false`                  | Marca la casilla como requerida.       |
| `etiqueta`      | `string`  | —                        | Texto opcional junto a la casilla.     |
| `id`            | `string`  | Generado automáticamente | Identificador del input nativo.        |

## Outputs

| Output          | Payload   | Descripción                           |
| --------------- | --------- | ------------------------------------- |
| `marcadoChange` | `boolean` | Emitido al cambiar el estado marcado. |

## Variantes

- **Sin marcar** — borde `--border-strong` sobre `--bg-surface`.
- **Marcado** — fondo y borde `--color-primary-500` con marca SVG blanca.
- **Indeterminado** — fondo activo con guion horizontal blanco.
- **Deshabilitado** — opacidad 0.6 y colores neutros.
- **Inválido y tocado** — borde `--color-error-500` y `aria-invalid="true"`.

## Angular Forms

Implementa `ControlValueAccessor` con valor `boolean`:

```html
<!-- Reactive Forms -->
<mupa-checkbox [formControl]="acepto" etiqueta="Acepto los términos" />

<form [formGroup]="formulario">
  <mupa-checkbox formControlName="acepto" etiqueta="Acepto los términos" />
</form>

<!-- Template-driven -->
<mupa-checkbox [(ngModel)]="acepto" etiqueta="Acepto los términos" />

<!-- Signal Forms (a través de la capa CVA) -->
<mupa-checkbox [formField]="formulario.acepto" etiqueta="Acepto los términos" />
```

- `formControl.setValue(true)` marca la casilla.
- Cambiar la casilla actualiza el control.
- `disable()` deshabilita el input nativo.
- El estado tocado se marca en `blur`.
- `Validators.requiredTrue` pinta el borde de error cuando el control está inválido y tocado.
- `focus()` enfoca el input nativo.

## Accesibilidad

- Usa un `<input type="checkbox">` nativo, oculto visualmente pero accesible.
- El estado indeterminado se expone con `aria-checked="mixed"` y la propiedad nativa.
- El foco visible se dibuja sobre la caja con `:focus-visible`.
- La etiqueta se asocia al input al estar dentro del mismo `<label>`.

## Design tokens

`--color-primary-500`, `--color-neutral-100`, `--color-neutral-200`,
`--bg-surface`, `--border-strong`, `--border-default`, `--fg-default`,
`--fg-disabled`, `--fg-on-brand`, `--focus-ring`, `--text-body`.
