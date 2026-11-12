# mupa-page-header

Cabecera de página con breadcrumbs, título, descripción, acciones, búsqueda y
filtros. Los filtros pasan de chips a un select cuando el contenedor mide
menos de 560 px.

## Uso

```html
<mupa-page-header
  titulo="Inventario"
  descripcion="Consulta y administra los bienes registrados de la Alcaldía."
  [divisor]="false"
/>

<mupa-page-header
  [migas]="migas"
  titulo="Pistola Glock 17 · Serie AB-20481"
  descripcion="Asignada a Policía municipal · Corregimiento de Calidonia"
  [acciones]="acciones"
/>

<mupa-page-header
  [migas]="migas"
  titulo="Armas"
  [acciones]="acciones"
  [mostrarBusqueda]="true"
  marcadorBusqueda="Buscar por serie, modelo o responsable"
  [(textoBusqueda)]="busqueda"
  etiquetaFiltro="Disponibilidad"
  [filtros]="filtros"
  [(filtroActivo)]="filtro"
/>
```

## Inputs

| Input              | Tipo                   | Default         | Descripción                                    |
| ------------------ | ---------------------- | --------------- | ---------------------------------------------- |
| `titulo`           | `string` (requerido)   | —               | Título de la página.                           |
| `descripcion`      | `string`               | —               | Texto bajo el título.                          |
| `migas`            | `ElementoBreadcrumb[]` | `[]`            | Ruta de navegación.                            |
| `acciones`         | `AccionPageHeader[]`   | `[]`            | Botones de la cabecera.                        |
| `mostrarBusqueda`  | `boolean`              | `false`         | Muestra el campo de búsqueda.                  |
| `marcadorBusqueda` | `string`               | `'Buscar…'`     | Placeholder y nombre accesible.                |
| `textoBusqueda`    | `string`               | `''`            | Texto de búsqueda. Admite `[(textoBusqueda)]`. |
| `filtros`          | `FiltroPageHeader[]`   | `[]`            | Filtros tipo chip.                             |
| `etiquetaFiltro`   | `string`               | `'Filtrar por'` | Etiqueta visible y accesible.                  |
| `filtroActivo`     | `string`               | —               | Clave activa. Admite `[(filtroActivo)]`.       |
| `divisor`          | `boolean`              | `true`          | Divisor inferior.                              |

## Outputs

| Output                | Payload               | Descripción                     |
| --------------------- | --------------------- | ------------------------------- |
| `textoBusquedaChange` | `string`              | Emitido al cambiar la búsqueda. |
| `filtroActivoChange`  | `string \| undefined` | Emitido al cambiar el filtro.   |

## Tipos

```ts
interface AccionPageHeader {
  etiqueta: string;
  icono?: string;
  variante?: 'primary' | 'secondary';
  alHacerClic?: () => void;
}

interface FiltroPageHeader {
  clave: string;
  etiqueta: string;
  conteo?: number;
}
```

## Comportamiento

- Las migas usan `mupa-breadcrumb`.
- La primera acción con `variante: 'primary'` debe ser la acción principal.
- La búsqueda se limpia con el botón de la x.
- El filtro activo por defecto es el primero de la lista.
- En contenedores menores de 560 px los chips se sustituyen por un select.
- El divisor inferior se puede ocultar con `[divisor]="false"`.

## Accesibilidad

- Título en `<h1>`.
- Búsqueda con `aria-label` y botón de limpiar con nombre accesible.
- Filtros con `aria-pressed` y grupo `role="group"` con `aria-label`.
- Select móvil asociado a su etiqueta.
- Foco visible con `outline` de 3 px.

## Design tokens

`--border-subtle`, `--border-control`, `--border-default`, `--bg-surface`,
`--fg-strong`, `--fg-muted`, `--fg-default`, `--color-primary-50`,
`--color-primary-500`, `--color-primary-700`, `--color-neutral-100`,
`--action-hover`, `--shadow-focus`, `--link`, `--font-body`,
`--font-display`.
