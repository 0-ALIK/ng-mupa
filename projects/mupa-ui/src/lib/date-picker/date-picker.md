# mupa-date-picker

Calendario mensual para seleccionar una fecha o un rango. La semana comienza
en lunes, el día actual se marca con borde y el rango usa el azul institucional.

## Uso

```html
<mupa-date-picker [fecha]="fechaSeleccionada()" (fechaChange)="fechaSeleccionada.set($event)" />

<mupa-date-picker
  modo="range"
  [rango]="rangoSeleccionado()"
  (rangoChange)="rangoSeleccionado.set($event)"
/>

<mupa-date-picker [ancho]="280" />
```

## Inputs

| Input           | Tipo                  | Default                       | Descripción                             |
| --------------- | --------------------- | ----------------------------- | --------------------------------------- |
| `modo`          | `'single' \| 'range'` | `'single'`                    | Selección de una fecha o un rango.      |
| `fecha`         | `Date \| null`        | `null`                        | Fecha seleccionada. Admite `[(fecha)]`. |
| `rango`         | `RangoFechas`         | `{ inicio: null, fin: null }` | Rango seleccionado. Admite `[(rango)]`. |
| `ancho`         | `number`              | `344`                         | Ancho del calendario en píxeles.        |
| `deshabilitado` | `boolean`             | `false`                       | Deshabilita la selección y navegación.  |
| `requerido`     | `boolean`             | `false`                       | Marca el calendario como requerido.     |
| `error`         | `string`              | —                             | Mensaje de error del formulario.        |

## Outputs

| Output        | Payload               | Descripción                                 |
| ------------- | --------------------- | ------------------------------------------- |
| `fechaChange` | `Date \| null`        | Emitido al elegir una fecha en modo simple. |
| `rangoChange` | `RangoFechas`         | Emitido al elegir un rango.                 |
| `seleccion`   | `Date \| RangoFechas` | Emitido con la selección completa.          |

## Tipos

```ts
type ModoDatePicker = 'single' | 'range';

interface RangoFechas {
  inicio: Date | null;
  fin: Date | null;
}
```

## Variantes

- **Fecha única** — un solo día seleccionado.
- **Rango** — inicio y fin resaltados; los días intermedios usan `--color-primary-50`.
- **Día actual** — borde de 1.5 px en azul institucional.
- **Días atenuados** — días de meses vecinos, deshabilitados y con opacidad 0.4.
- **Deshabilitado** — opacidad 0.6 y sin interacción.
- **Inválido** — borde de error y `aria-invalid="true"`.

## Angular Forms

Implementa `ControlValueAccessor`. El valor depende del modo:

- `modo="single"` → `Date | null`.
- `modo="range"` → `RangoFechas`.

```html
<!-- Reactive Forms -->
<mupa-date-picker [formControl]="fecha" />

<form [formGroup]="formulario">
  <mupa-date-picker formControlName="fecha" />
</form>

<!-- Template-driven -->
<mupa-date-picker [(ngModel)]="fecha" />

<!-- Signal Forms (a través de la capa CVA) -->
<mupa-date-picker [formField]="formulario.fecha" />
```

- `formControl.setValue(new Date(...))` actualiza el mes y la selección.
- Elegir un día actualiza el control y marca el estado tocado.
- `disable()` deshabilita la navegación y los días.
- El borde de error se activa con `error` o con el estado inválido del control.
- `focus()` enfoca el día activo del calendario.

## Accesibilidad

- Contenedor con `role="group"` y etiqueta según el modo.
- Grilla con `role="grid"`, filas, encabezados de columna y celdas.
- El día actual usa `aria-current="date"`.
- Los días del rango usan `aria-selected`.
- Un solo día es enfocable (`tabindex="0"`); el resto usa `tabindex="-1"`.
- Teclado: flechas para días, Inicio/Fin para la semana, Re Pág/Av Pág para el mes y Mayús + Re Pág/Av Pág para el año.
- El foco visible usa `--focus-ring`.

## Design tokens

`--bg-surface`, `--border-subtle`, `--border-default`, `--fg-strong`,
`--fg-muted`, `--fg-disabled`, `--fg-default`, `--color-primary-500`,
`--color-primary-600`, `--color-primary-700`, `--color-primary-50`,
`--radius-card`, `--shadow-sm`, `--focus-ring`, `--font-body`, `--font-display`.
