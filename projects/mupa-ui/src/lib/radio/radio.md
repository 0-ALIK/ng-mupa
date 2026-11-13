# mupa-radio

Grupo de radio con apariencia simple o de tarjetas seleccionables.

Réplica del patrón `.radio` del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-radio
  nombre="metodo-recepcion"
  ariaLabel="Método de recepción"
  [opciones]="[
    { valor: 'transferencia', etiqueta: 'Transferencia bancaria', descripcion: 'SWIFT / IBAN' },
    { valor: 'paypal', etiqueta: 'PayPal', descripcion: 'Desembolso inmediato' }
  ]"
  [(valor)]="metodoSeleccionado"
/>
```

Variante de tarjeta:

```html
<mupa-radio
  nombre="plan"
  variante="tarjeta"
  orientacion="horizontal"
  [opciones]="planes"
  [(valor)]="planSeleccionado"
/>
```

## Inputs

| Input           | Tipo                         | Default      | Descripción                             |
| --------------- | ---------------------------- | ------------ | --------------------------------------- |
| `opciones`      | `OpcionRadio[]`              | Requerido    | Opciones del grupo.                     |
| `nombre`        | `string`                     | Requerido    | Nombre nativo del grupo.                |
| `variante`      | `'simple' \| 'tarjeta'`      | `'simple'`   | Apariencia de las opciones.             |
| `orientacion`   | `'vertical' \| 'horizontal'` | `'vertical'` | Disposición.                            |
| `deshabilitado` | `boolean`                    | `false`      | Deshabilita todo el grupo.              |
| `ariaLabel`     | `string`                     | —            | Nombre accesible del grupo.             |
| `valor`         | `string \| null`             | `null`       | Valor seleccionado; admite `[(valor)]`. |

## Tipo

```ts
interface OpcionRadio {
  valor: string;
  etiqueta: string;
  descripcion?: string;
  icono?: string;
  deshabilitada?: boolean;
}
```

## Comportamiento

- Usa `role="radiogroup"`.
- La selección se gestiona con el modelo `valor`.
- Al usar inputs nativos con el mismo `nombre`, las flechas del teclado cambian la opción.
- La variante `tarjeta` es optativa; el comportamiento por defecto es un radio simple.

## Design tokens

`--bg-surface`, `--border-default`, `--border-strong`, `--color-primary-50`,
`--color-primary-500`, `--radius-sm`, `--radius-pill`, `--fg-strong`,
`--fg-muted`, `--link`, `--font-body`.
