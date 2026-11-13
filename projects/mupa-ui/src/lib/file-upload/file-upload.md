# mupa-file-upload

Zona de carga de archivos con arrastrar y soltar.

Réplica del patrón `.dash` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-file-upload
  acepta="image/png,image/jpeg"
  [multiple]="false"
  [tamanoMaximoMb]="5"
  descripcion="Imagen de portada"
  (archivosSeleccionados)="alSeleccionarArchivos($event)"
/>
```

## Inputs

| Input            | Tipo      | Default                                     | Descripción                         |
| ---------------- | --------- | ------------------------------------------- | ----------------------------------- |
| `acepta`         | `string`  | `''`                                        | Tipos permitidos, formato `accept`. |
| `multiple`       | `boolean` | `false`                                     | Permite varios archivos.            |
| `maximoArchivos` | `number`  | —                                           | Máximo de archivos.                 |
| `tamanoMaximoMb` | `number`  | —                                           | Tamaño máximo por archivo.          |
| `etiqueta`       | `string`  | `'Arrastra un archivo aquí o selecciónalo'` | Texto principal.                    |
| `descripcion`    | `string`  | —                                           | Texto secundario.                   |
| `deshabilitado`  | `boolean` | `false`                                     | Deshabilita la carga.               |

## Outputs

| Output                  | Payload           | Descripción                              |
| ----------------------- | ----------------- | ---------------------------------------- |
| `archivosSeleccionados` | `readonly File[]` | Archivos válidos.                        |
| `errorArchivo`          | `string`          | Mensaje cuando algún archivo se rechaza. |

## Comportamiento

- Acepta clic en «Seleccionar archivo» y arrastrar/soltar en la zona.
- Valida cantidad, tipo y tamaño antes de emitir.
- Muestra los nombres y tamaños de los archivos válidos.
- No sube archivos: solo entrega los `File` al consumidor.
- Los mensajes de error usan `role="alert"`.

## Design tokens

`--bg-surface`, `--color-neutral-50`, `--color-primary-50`,
`--color-primary-500`, `--border-strong`, `--border-subtle`,
`--color-error-700`, `--fg-strong`, `--fg-default`, `--fg-muted`,
`--radius-sm`, `--font-body`.
