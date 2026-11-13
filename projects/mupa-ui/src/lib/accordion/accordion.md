# mupa-accordion

Acordeón de paneles expandibles.

Réplica del patrón `.acc` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-accordion
  [items]="[
    {
      id: 'seguridad',
      titulo: '¿Cómo se protege la información?',
      contenido: 'Usamos cifrado y controles de acceso.',
      abierto: true
    },
    {
      id: 'cuentas',
      titulo: '¿Cómo vinculo otra cuenta?',
      contenido: 'Ve a Cuentas y elige la institución.'
    }
  ]"
/>
```

## Inputs

| Input              | Tipo             | Default   | Descripción                      |
| ------------------ | ---------------- | --------- | -------------------------------- |
| `items`            | `ItemAcordeon[]` | Requerido | Paneles del acordeón.            |
| `permitirMultiple` | `boolean`        | `false`   | Permite varios paneles abiertos. |

## Tipo

```ts
interface ItemAcordeon {
  id: string;
  titulo: string;
  contenido: string;
  abierto?: boolean;
  deshabilitado?: boolean;
}
```

## Comportamiento

- El botón de cada panel usa `aria-expanded` y `aria-controls`.
- La respuesta usa `role="region"` y `aria-labelledby`.
- Por defecto solo hay un panel abierto a la vez.
- El chevron rota 180° al abrir y respeta `prefers-reduced-motion`.

## Design tokens

`--bg-surface`, `--border-default`, `--border-subtle`, `--fg-strong`,
`--fg-default`, `--link`, `--font-body`.
