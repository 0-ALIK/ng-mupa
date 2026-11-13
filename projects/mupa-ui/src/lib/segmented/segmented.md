# mupa-segmented

Control segmentado compacto para elegir un valor entre pocas opciones.

Réplica del patrón `.seg` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-segmented
  ariaLabel="Apertura de la persiana"
  [opciones]="[
    { valor: 'abrir', etiqueta: 'Abrir' },
    { valor: 'mitad', etiqueta: 'A la mitad' },
    { valor: 'cerrar', etiqueta: 'Cerrada' }
  ]"
  [(valor)]="apertura"
/>
```

## Inputs

| Input       | Tipo                 | Default      | Descripción                             |
| ----------- | -------------------- | ------------ | --------------------------------------- |
| `opciones`  | `OpcionSegmentada[]` | Requerido    | Opciones del control.                   |
| `valor`     | `string`             | `''`         | Valor seleccionado; admite `[(valor)]`. |
| `ariaLabel` | `string`             | `'Opciones'` | Nombre accesible del grupo.             |

## Tipo

```ts
interface OpcionSegmentada {
  valor: string;
  etiqueta: string;
  icono?: string;
  deshabilitada?: boolean;
}
```

## Comportamiento

- Usa `role="group"` y `aria-pressed` en cada opción.
- Selección exclusiva mediante el modelo `valor`.
- En anchos estrechos las opciones se envuelven.

## Design tokens

`--bg-surface`, `--color-primary-50`, `--color-primary-500`,
`--color-primary-700`, `--border-default`, `--fg-default`, `--link`,
`--radius-pill`, `--font-body`.
