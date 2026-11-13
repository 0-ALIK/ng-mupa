# mupa-menu

Menú con grupos e ítems que disparan acciones.

Réplica del patrón `.nav` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-menu
  ariaLabel="Navegación de la cuenta"
  [grupos]="[
    {
      etiqueta: 'Resumen',
      items: [
        { id: 'panel', etiqueta: 'Panel de control', icono: 'house', activo: true },
        { id: 'cuentas', etiqueta: 'Cuentas', icono: 'wallet' }
      ]
    },
    {
      etiqueta: 'Soporte',
      items: [
        { id: 'ayuda', etiqueta: 'Centro de ayuda', icono: 'info' }
      ]
    }
  ]"
  (seleccion)="alSeleccionar($event)"
/>
```

## Inputs

| Input       | Tipo          | Default   | Descripción                        |
| ----------- | ------------- | --------- | ---------------------------------- |
| `grupos`    | `GrupoMenu[]` | Requerido | Grupos e ítems del menú.           |
| `ariaLabel` | `string`      | `'Menú'`  | Nombre accesible de la navegación. |

## Outputs

| Output      | Payload    | Descripción                              |
| ----------- | ---------- | ---------------------------------------- |
| `seleccion` | `ItemMenu` | Ítem pulsado. El padre decide la acción. |

## Tipos

```ts
interface ItemMenu {
  id: string;
  etiqueta: string;
  icono?: string;
  activo?: boolean;
  deshabilitado?: boolean;
  href?: string;
}

interface GrupoMenu {
  etiqueta?: string;
  items: readonly ItemMenu[];
}
```

## Comportamiento

- Cada ítem es un handler: emite `seleccion` al pulsarlo.
- Si el ítem tiene `href`, se renderiza como enlace y también emite `seleccion`.
- Los ítems deshabilitados no emiten.
- El grupo sin etiqueta se muestra sin encabezado.
- El estado activo se controla con `activo` en cada ítem.

## Design tokens

`--color-neutral-50`, `--color-primary-50`, `--color-primary-700`,
`--fg-default`, `--fg-muted`, `--link`, `--radius-sm`, `--font-body`.
