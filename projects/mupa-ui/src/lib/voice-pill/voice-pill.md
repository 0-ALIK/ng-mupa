# mupa-voice-pill

Control compacto de entrada de voz con onda reactiva, tiempo y cancelación por
deslizamiento. Puede usar una simulación o el micrófono real.

> **No graba, no transcribe y no envía audio.** Solo visualiza la entrada.
> El modo micrófono requiere HTTPS o `localhost`.

## Uso

```html
<mupa-voice-pill
  [reactivo]="'simulated'"
  [modo]="'auto'"
  aria-describedby="voice-hint"
  (iniciar)="alIniciar($event)"
  (detener)="alDetener($event)"
  (errorMicrofono)="alError($event)"
/>

<mupa-voice-pill
  [reactivo]="'mic'"
  [modo]="'toggle'"
  [mostrarTiempo]="false"
  [mostrarOnda]="true"
/>

<mupa-voice-pill forma="rounded" [tamano]="40" [mostrarTiempo]="false" />
```

## Inputs

| Input                  | Tipo                           | Default                    | Descripción                            |
| ---------------------- | ------------------------------ | -------------------------- | -------------------------------------- |
| `colorAcento`          | `string`                       | `--color-primary-700`      | Color de la cápsula y la onda.         |
| `colorIcono`           | `string`                       | `--fg-muted`               | Color del micrófono.                   |
| `fondo`                | `string`                       | `--color-primary-50`       | Fondo de la cápsula.                   |
| `tamano`               | `number`                       | `28`                       | Tamaño visual entre 24 y 64 px.        |
| `forma`                | `'pill' \| 'rounded'`          | `'pill'`                   | Forma de la cápsula.                   |
| `alcance`              | `number`                       | `8`                        | Separación de onda/tiempo.             |
| `mostrarTiempo`        | `boolean`                      | `true`                     | Muestra el tiempo transcurrido.        |
| `mostrarOnda`          | `boolean`                      | `true`                     | Muestra la onda.                       |
| `deslizarParaCancelar` | `boolean`                      | `true`                     | Permite cancelar deslizando.           |
| `distanciaCancelar`    | `number`                       | `64`                       | Distancia de cancelación.              |
| `ataque`               | `number`                       | `40`                       | Ataque del envelope.                   |
| `liberacion`           | `number`                       | `240`                      | Liberación del envelope.               |
| `sensibilidad`         | `number`                       | `1`                        | Sensibilidad de la onda.               |
| `piso`                 | `number`                       | `0.1`                      | Piso mínimo de las barras.             |
| `duracionApertura`     | `number`                       | `180`                      | Duración de la transición de apertura. |
| `escalaPresion`        | `number`                       | `0.95`                     | Escala al presionar.                   |
| `modo`                 | `'auto' \| 'hold' \| 'toggle'` | `'auto'`                   | Forma de interacción.                  |
| `esperaMantener`       | `number`                       | `300`                      | ms para distinguir toque de pulsación. |
| `reactivo`             | `'simulated' \| 'mic'`         | `'simulated'`              | Origen de la onda.                     |
| `deshabilitado`        | `boolean`                      | `false`                    | Deshabilita el control.                |
| `etiquetaAria`         | `string`                       | `'Iniciar entrada de voz'` | Nombre accesible para iniciar.         |
| `etiquetaDetener`      | `string`                       | `'Detener entrada de voz'` | Nombre accesible para detener.         |
| `id`                   | `string`                       | —                          | Identificador del botón.               |
| `descritoPor`          | `string`                       | —                          | ID del texto descriptivo.              |

## Outputs

| Output           | Payload              | Descripción                    |
| ---------------- | -------------------- | ------------------------------ |
| `iniciar`        | `EventoInicioVoz`    | Emitido al iniciar la sesión.  |
| `detener`        | `EventoDetencionVoz` | Emitido al detener o cancelar. |
| `errorMicrofono` | `EventoErrorVoz`     | Emitido si el micrófono falla. |

## Tipos

```ts
type FuenteVoz = 'simulated' | 'mic';
type ModoVoicePill = 'auto' | 'hold' | 'toggle';
type FormaVoicePill = 'pill' | 'rounded';

interface EventoDetencionVoz {
  razon: RazonDetencionVoz;
  duracion: number;
  fuente: FuenteVoz;
  iniciada: boolean;
  cancelada: boolean;
}
```

## Modos

- **auto** — un toque inicia o detiene; mantener pulsado termina al soltar.
- **hold** — termina al soltar.
- **toggle** — un toque inicia y otro detiene.

## Estados

- `idle` — micrófono visible.
- `requesting` — solicita permiso de micrófono.
- `listening` — onda/tiempo visibles y botón de parada.
- `error` — cápsula y micrófono en color de error.

## Accesibilidad

- `<button>` nativo con `aria-pressed` y `aria-label` que cambia entre iniciar
  y detener.
- Mensaje de estado con `role="status"` y `aria-live="polite"`.
- Teclado: `Enter`/`Espacio` inician o detienen; `Escape` cancela.
- Deslizar a la izquierda cancela en dispositivos táctiles.
- Respeta `prefers-reduced-motion` mostrando una onda estática.
- El foco visible usa `--focus-ring`.

## Design tokens

`--color-primary-700`, `--color-primary-200`, `--color-primary-50`,
`--fg-muted`, `--action`, `--focus-ring`, `--color-error-700`,
`--color-error-100`, `--font-body`.
