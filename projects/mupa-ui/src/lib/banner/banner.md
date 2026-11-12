# mupa-banner

Aviso informativo con tono semántico, barra izquierda de color, icono de
contorno y contenido libre.

Réplica de los avisos informativos del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-banner tono="info" titulo="Próximos pasos">
  <strong>Reporte recibido:</strong>
  una cuadrilla lo revisará en un plazo de 48 horas.
</mupa-banner>
```

```html
<mupa-banner
  tono="error"
  titulo="Trámite rechazado"
  mensaje="El documento adjunto no es legible."
/>
```

## Inputs

| Input     | Tipo                                          | Default        | Descripción                                                  |
| --------- | --------------------------------------------- | -------------- | ------------------------------------------------------------ |
| `tono`    | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'`       | Tono semántico.                                              |
| `titulo`  | `string`                                      | —              | Título en negrita.                                           |
| `icono`   | `string`                                      | Icono del tono | Icono Lucide personalizado.                                  |
| `mensaje` | `string`                                      | —              | Texto de conveniencia. También se puede proyectar contenido. |

## Tonos

| Tono      | Fondo                 | Acento                | Texto                 | Icono          |
| --------- | --------------------- | --------------------- | --------------------- | -------------- |
| `info`    | `--color-info-100`    | `--color-primary-500` | `--color-primary-800` | `info`         |
| `success` | `--color-success-100` | `--color-success-500` | `--color-success-700` | `circle-check` |
| `warning` | `--color-warning-100` | `--color-warning-500` | `--color-warning-700` | `circle-alert` |
| `error`   | `--color-error-100`   | `--color-error-500`   | `--color-error-700`   | `circle-x`     |

## Contenido

La proyección por defecto ocupa el cuerpo del aviso. Usa contenido en línea
para destacar la primera frase:

```html
<mupa-banner tono="success" titulo="Pago completado">
  <strong>Tasa de aseo abril 2026:</strong>
  tu comprobante #PTY-48213 ya está disponible.
</mupa-banner>
```

Si se indican `mensaje` y contenido, el texto del input se muestra antes del
contenido proyectado.

## Accesibilidad

- El icono es decorativo; el título y el mensaje comunican el estado.
- El color no es el único indicador: cada tono incluye un icono y un texto.
- Mantén el aviso cerca del contenido al que se refiere.
- Para avisos que aparecen dinámicamente, envuelve el componente en una región
  con `role="status"` o `role="alert"` según la urgencia.

## Design tokens

`--color-info-100`, `--color-primary-500`, `--color-primary-800`,
`--color-success-100`, `--color-success-500`, `--color-success-700`,
`--color-warning-100`, `--color-warning-500`, `--color-warning-700`,
`--color-error-100`, `--color-error-500`, `--color-error-700`,
`--radius-md`, `--font-body`, `--text-label`.
