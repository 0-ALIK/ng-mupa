# mupa-tabs

Pestañas horizontales tipo píldora para alternar contenido.

Réplica del patrón `.tabs` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-tabs
  [pestanas]="[
    { id: 'general', etiqueta: 'General' },
    { id: 'facturacion', etiqueta: 'Facturación' },
    { id: 'metas', etiqueta: 'Metas' }
  ]"
  [(activa)]="pestanaActiva"
  panelId="panel-cuenta"
/>

<section id="panel-cuenta" role="tabpanel" [attr.aria-labelledby]="pestanaActiva">...</section>
```

## Inputs

| Input       | Tipo        | Default      | Descripción                                              |
| ----------- | ----------- | ------------ | -------------------------------------------------------- |
| `pestanas`  | `Pestana[]` | Requerido    | Pestañas disponibles.                                    |
| `activa`    | `string`    | `''`         | Identificador de la pestaña activa; admite `[(activa)]`. |
| `ariaLabel` | `string`    | `'Pestañas'` | Nombre accesible del tablist.                            |
| `panelId`   | `string`    | —            | Identificador del panel controlado.                      |

## Tipo

```ts
interface Pestana {
  id: string;
  etiqueta: string;
  icono?: string;
  deshabilitada?: boolean;
}
```

## Comportamiento

- Usa `role="tablist"` y `role="tab"` con `aria-selected`.
- El foco se mueve con flechas izquierda/derecha, Inicio y Fin.
- La pestaña activa tiene `tabindex="0"`; las demás, `-1`.
- El panel debe renderizarse fuera del componente y actualizarse con `activa`.

## Design tokens

`--color-neutral-50`, `--color-primary-500`, `--color-primary-700`,
`--bg-surface`, `--border-subtle`, `--fg-muted`, `--link`,
`--radius-pill`, `--font-body`.
