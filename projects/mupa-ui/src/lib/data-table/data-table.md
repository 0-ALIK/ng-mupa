# mupa-data-table

Tabla de datos con ordenación, paginación local o remota, chips de estado,
acciones por fila y celdas personalizadas mediante plantillas.

## Uso

```html
<mupa-data-table
  [columnas]="columnas"
  [filas]="filas"
  [acciones]="acciones"
  [tamanoPagina]="4"
  leyenda="Inventario de armas"
  [(pagina)]="paginaActual"
/>
```

### Plantillas personalizadas

```html
<mupa-data-table [columnas]="columnas" [filas]="filas">
  <ng-template mupaTemplate="estado" let-fila let-indice="indice">
    <mupa-pill
      [etiqueta]="fila['estado']"
      [color]="fila['estado'] === 'Activo' ? 'success' : 'warning'"
    />
  </ng-template>

  <ng-template mupaTemplate="acciones" let-fila>
    <mupa-button tamano="sm" (clic)="editar(fila)">Editar</mupa-button>
  </ng-template>
</mupa-data-table>
```

La columna correspondiente usa `plantilla: 'estado'` o `plantilla: 'acciones'`.
El contexto expone:

| Variable                 | Descripción                             |
| ------------------------ | --------------------------------------- |
| `$implicit` / `let-fila` | Fila completa.                          |
| `let-columna="columna"`  | Definición de la columna.               |
| `let-indice="indice"`    | Índice de la fila en la página visible. |

## Inputs

| Input          | Tipo                              | Default                            | Descripción                                       |
| -------------- | --------------------------------- | ---------------------------------- | ------------------------------------------------- |
| `columnas`     | `ColumnaTabla[]`                  | `[]`                               | Definición de columnas.                           |
| `filas`        | `RegistroTabla[]`                 | `[]`                               | Filas de la tabla.                                |
| `claveFila`    | `string`                          | `'id'`                             | Campo único de la fila.                           |
| `acciones`     | `AccionTabla[]`                   | `[]`                               | Acciones por fila.                                |
| `tamanoPagina` | `number`                          | `4`                                | Filas por página; 0 desactiva la paginación.      |
| `total`        | `number`                          | —                                  | Total remoto; si existe, no se pagina localmente. |
| `pagina`       | `number`                          | `1`                                | Página actual; admite `[(pagina)]`.               |
| `tonosEstado`  | `Record<string, TonoEstadoTabla>` | `{}`                               | Tonos adicionales de estado.                      |
| `textoVacio`   | `string`                          | `'No hay registros para mostrar.'` | Mensaje vacío.                                    |
| `leyenda`      | `string`                          | —                                  | Caption y nombre accesible.                       |

## Outputs

| Output         | Payload  | Descripción                   |
| -------------- | -------- | ----------------------------- |
| `paginaChange` | `number` | Emitido al cambiar de página. |

## Tipos

```ts
interface ColumnaTabla {
  clave: string;
  encabezado: string;
  tipo?: 'texto' | 'mono' | 'estado' | 'atenuado';
  ancho?: number | string;
  alineacion?: 'left' | 'right' | 'center';
  ordenable?: boolean;
  plantilla?: string;
}

interface AccionTabla {
  icono: string;
  etiqueta: string;
  tono?: 'default' | 'danger';
  alHacerClic?: (fila: RegistroTabla) => void;
}
```

## Ordenación

- Las columnas con `ordenable: true` alternan `asc` → `desc` → sin orden.
- La tabla aplica `aria-sort` en el `th`.
- El orden usa `localeCompare('es', { numeric: true })`.

## Paginación

- Local: pagina `filas` según `tamanoPagina`.
- Remota: si `total` es un número, no se cortan las filas; el consumidor
  entrega la página actual y escucha `paginaChange`.
- El paginador incluye primera, anterior, números, siguiente y última.

## Accesibilidad

- Región desplazable con `role="region"` y `aria-label`.
- Caption visualmente oculto con la leyenda.
- `aria-sort` en columnas ordenables.
- `aria-current="page"` en la página actual del paginador.
- Acciones con `aria-label` que incluye la fila.
- Las filas se resaltan al recibir foco dentro.

## Design tokens

`--bg-surface`, `--bg-base`, `--border-default`, `--border-subtle`,
`--fg-strong`, `--fg-default`, `--fg-muted`, `--color-primary-50`,
`--color-primary-500`, `--color-primary-700`, `--color-neutral-50`,
`--color-neutral-100`, `--color-neutral-200`, `--color-neutral-300`,
`--color-success-*`, `--color-warning-*`, `--color-error-*`,
`--color-info-100`, `--color-secondary-300`, `--focus-ring`, `--link`,
`--font-body`.
