# Formularios nativos

`forms.css` es una copia fiel de los estilos de campo del Lego Design System —
Alcaldía de Panamá, con las clases renombradas de `lego-field*` a `mupa-field*`
y selectores adicionales para Angular Forms.

## Carga

```json
"styles": [
  "node_modules/mupa-ui/tokens.css",
  "node_modules/mupa-ui/forms.css"
]
```

## Estructura

```html
<div class="mupa-field">
  <label class="mupa-field__label" for="correo">Correo electrónico</label>
  <input id="correo" class="mupa-field__input" type="email" />
  <p class="mupa-field__hint">Texto de ayuda.</p>
  <p class="mupa-field__error">Texto de error.</p>
</div>
```

## Integración

- **Vanilla**: clases directamente, sin directivas.
- **Directiva**: `input mupaInput` añade `mupa-field__input`.
- **Reactive Forms**: `[formControl]` o `formControlName` sobre el input nativo.
- **Template-driven**: `[(ngModel)]`.
- **Signal Forms**: `[formField]`.
- **Errores Angular**: `.mupa-field__input.ng-invalid.ng-touched`.
- **Errores nativos**: `.mupa-field__input:user-invalid`.
- **ARIA**: `aria-invalid="true"`.

La directiva `mupaInput` no gestiona el valor; el control sigue siendo nativo.
