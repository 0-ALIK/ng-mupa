# mupa-select

Selector simple del sistema de diseño. El disparador mantiene el mismo trazo
que los campos de texto y la lista flotante incluye grupos, marca de selección
y navegación completa por teclado.

## Uso

```html
<mupa-select
  etiqueta="Tipo de trámite"
  [opciones]="tiposTramite()"
  [(valor)]="tramiteSeleccionado"
/>

<mupa-select
  etiqueta="Servicio"
  [grupos]="gruposServicios()"
  ayuda="Selecciona el servicio que deseas consultar."
  (valorChange)="alCambiarServicio($event)"
/>

<mupa-select
  etiqueta="Documento"
  [opciones]="documentos()"
  error="Adjunta el documento para continuar."
  [deshabilitado]="!documentosCargados()"
/>
```

## Inputs

| Input           | Tipo               | Default                    | Descripción                                     |
| --------------- | ------------------ | -------------------------- | ----------------------------------------------- |
| `opciones`      | `OpcionSelect[]`   | `[]`                       | Opciones planas.                                |
| `grupos`        | `GrupoSelect[]`    | —                          | Opciones agrupadas; prioridad sobre `opciones`. |
| `etiquetaGrupo` | `string`           | —                          | Título del grupo para opciones planas.          |
| `valor`         | `string \| null`   | `null`                     | Valor seleccionado. Admite `[(valor)]`.         |
| `marcador`      | `string`           | Derivado de la opción nula | Texto cuando no hay selección.                  |
| `etiqueta`      | `string`           | —                          | Etiqueta del campo.                             |
| `ayuda`         | `string`           | —                          | Texto de ayuda bajo el campo.                   |
| `error`         | `string`           | —                          | Mensaje de error; cambia el borde y la ayuda.   |
| `deshabilitado` | `boolean`          | `false`                    | Deshabilita el selector.                        |
| `requerido`     | `boolean`          | `false`                    | Marca el selector como requerido.               |
| `ancho`         | `number \| string` | `'100%'`                   | Ancho del campo.                                |
| `nombre`        | `string`           | —                          | Nombre del campo oculto para formularios.       |
| `id`            | `string`           | Generado automáticamente   | Identificador del disparador.                   |

## Outputs

| Output        | Payload          | Descripción                        |
| ------------- | ---------------- | ---------------------------------- |
| `valorChange` | `string \| null` | Emitido al seleccionar una opción. |

## Tipos

```ts
interface OpcionSelect {
  etiqueta: string;
  valor: string | null;
  deshabilitada?: boolean;
}

interface GrupoSelect {
  etiqueta?: string;
  opciones: OpcionSelect[];
}
```

Las opciones con `valor: null` actúan como marcador y no son seleccionables.

## Variantes

- **Simple** — lista plana de opciones.
- **Agrupado** — grupos con encabezados y separador entre grupos.
- **Con ayuda o error** — texto inferior y borde de error.
- **Deshabilitado** — fondo neutro y sin interacción.

## Angular Forms

Implementa `ControlValueAccessor` con valor `string | null`:

```html
<!-- Reactive Forms -->
<mupa-select [formControl]="tramite" [opciones]="opciones" etiqueta="Trámite" />

<form [formGroup]="formulario">
  <mupa-select formControlName="tramite" [opciones]="opciones" etiqueta="Trámite" />
</form>

<!-- Template-driven -->
<mupa-select [(ngModel)]="tramite" [opciones]="opciones" etiqueta="Trámite" />

<!-- Signal Forms (a través de la capa CVA) -->
<mupa-select [formField]="formulario.tramite" [opciones]="opciones" etiqueta="Trámite" />
```

- `formControl.setValue('licencias')` actualiza el texto visible.
- Elegir una opción actualiza el control.
- `disable()` deshabilita el disparador.
- El estado tocado se marca en `blur`.
- El borde de error se activa con `error` o con `Validators.required` cuando el control está inválido.
- `focus()` enfoca el disparador.
- Con `nombre`, el valor se envía en un campo oculto para formularios HTML nativos.

## Accesibilidad

- Disparador con `role="combobox"`, `aria-haspopup="listbox"` y `aria-expanded`.
- La lista usa `role="listbox"`; cada opción usa `role="option"` y `aria-selected`.
- Las opciones deshabilitadas exponen `aria-disabled`.
- Navegación: `↑` `↓` `Inicio` `Fin` `Enter` `Espacio` `Escape` y búsqueda por teclado.
- El foco visible usa `--link` y el anillo `--shadow-focus`.
- El error se expone con `aria-invalid` y se asocia con `aria-describedby`.

## Design tokens

`--bg-surface`, `--border-control`, `--border-default`, `--border-subtle`,
`--fg-strong`, `--fg-default`, `--fg-muted`, `--action`, `--link`,
`--color-primary-50`, `--color-primary-700`, `--color-neutral-50`,
`--color-neutral-300`, `--color-error-500`, `--color-error-700`,
`--shadow-focus`, `--shadow-md`, `--z-dropdown`, `--font-body`.
