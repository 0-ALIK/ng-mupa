# mupaInput

Directiva que aplica los estilos oficiales de los campos de texto a un
`<input>` o `<textarea>` nativo. No gestiona valores ni implementa
`ControlValueAccessor`: el control sigue siendo nativo.

## Uso

### HTML vanilla con clases

```html
<div class="mupa-field">
  <label class="mupa-field__label" for="correo">Correo electrónico</label>

  <input
    id="correo"
    class="mupa-field__input"
    type="email"
    name="correo"
    required
    aria-describedby="correo-hint"
  />

  <p class="mupa-field__hint" id="correo-hint">Usaremos este correo para notificaciones.</p>
  <p class="mupa-field__error">Escribe un correo válido.</p>
</div>
```

### Con la directiva

```html
<div class="mupa-field">
  <label class="mupa-field__label" for="correo">Correo electrónico</label>

  <input
    id="correo"
    mupaInput
    type="email"
    formControlName="correo"
    required
    aria-describedby="correo-hint"
  />

  <p class="mupa-field__hint" id="correo-hint">Usaremos este correo para notificaciones.</p>
</div>
```

### Reactive Forms

```html
<input mupaInput [formControl]="correo" />
```

### Template-driven

```html
<input mupaInput [(ngModel)]="correo" name="correo" />
```

### Signal Forms

```html
<input mupaInput [formField]="form.correo" />
```

### Vanilla

```html
<input mupaInput name="correo" required />
```

## Requisito de estilos

La directiva solo añade la clase `mupa-field__input`. Los estilos están en
`mupa-ui/forms.css` y deben cargarse globalmente junto con `tokens.css`:

```json
"styles": [
  "node_modules/mupa-ui/tokens.css",
  "node_modules/mupa-ui/forms.css"
]
```

## Clases disponibles

| Clase               | Uso                                      |
| ------------------- | ---------------------------------------- |
| `mupa-field`        | Contenedor vertical del campo.           |
| `mupa-field__label` | Etiqueta del campo.                      |
| `mupa-field__input` | Input o textarea. La añade la directiva. |
| `mupa-field__hint`  | Texto de ayuda.                          |
| `mupa-field__error` | Texto de error.                          |
| `mupa-field__check` | Fila de checkbox nativo.                 |

## Estados

- **Foco**: `outline: 3px solid var(--link); outline-offset: 3px`.
- **Error**:
  - `aria-invalid="true"`.
  - `.ng-invalid.ng-touched` (Angular Forms).
  - `:user-invalid` (validación nativa del navegador).
- **Deshabilitado**: fondo `--color-neutral-100`, texto `--fg-disabled`.
- **Solo lectura**: fondo `--bg-base`.

## Accesibilidad

- El control sigue siendo nativo: teclado, autocompletado del navegador,
  validación y `FormData` funcionan sin capas adicionales.
- La directiva no modifica el valor ni los atributos ARIA; el desarrollador
  controla `required`, `aria-invalid`, `aria-describedby`, etc.
- El estado de error visual de Angular Forms se activa automáticamente con
  `.ng-invalid.ng-touched`.

## Design tokens

`--border-control`, `--radius-sm`, `--bg-surface`, `--bg-base`, `--fg-strong`,
`--fg-muted`, `--fg-disabled`, `--color-neutral-100`, `--color-error-700`,
`--link`, `--action`, `--font-body`.
