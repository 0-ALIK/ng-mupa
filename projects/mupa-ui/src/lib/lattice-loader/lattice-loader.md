# mupa-lattice-loader

Indicador de carga indeterminada con retícula animada, temporizador opcional y
estados de éxito o error.

Réplica del Lattice Loader del Lego Design System — Alcaldía de Panamá.

## Uso

```html
<mupa-lattice-loader
  estado="working"
  etiqueta="Validando solicitud"
  [cuadricula]="3"
  patron="orbit"
  [tamanoCelda]="8"
/>
```

```html
<mupa-lattice-loader estado="done" etiquetaExito="Solicitud validada" [transcurrido]="3.2" />
```

```html
<mupa-lattice-loader estado="error" etiquetaError="No se pudo validar" [mostrarTiempo]="false" />
```

## Inputs

| Input              | Tipo                                             | Default                                   | Descripción                                                    |
| ------------------ | ------------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------- |
| `etiqueta`         | `string`                                         | `'Procesando'`                            | Texto de la operación en curso.                                |
| `etiquetaExito`    | `string`                                         | `'Completado en'` / `'Completado'`        | Texto al completar.                                            |
| `etiquetaError`    | `string`                                         | `'Falló tras'` / `'No se pudo completar'` | Texto al fallar.                                               |
| `estado`           | `'working' \| 'done' \| 'error'`                 | `'working'`                               | Fase del indicador.                                            |
| `patron`           | `NombrePatronLattice \| DefinicionPatronLattice` | `'orbit'`                                 | Patrón animado o definición propia.                            |
| `cuadricula`       | `3 \| 4`                                         | `3`                                       | Tamaño de la retícula.                                         |
| `forma`            | `'round' \| 'square'`                            | `'round'`                                 | Forma de las celdas.                                           |
| `color`            | `string`                                         | `var(--action)`                           | Color de la retícula en movimiento.                            |
| `colorExito`       | `string`                                         | `var(--color-success-700)`                | Color de la marca de éxito.                                    |
| `colorError`       | `string`                                         | `var(--color-error-700)`                  | Color de la marca de error.                                    |
| `tamanoCelda`      | `number`                                         | `6`                                       | Tamaño de celda en píxeles (2–24).                             |
| `espacio`          | `number`                                         | `2`                                       | Separación entre celdas (0–16).                                |
| `tamanoFuente`     | `number`                                         | `14`                                      | Tamaño de la etiqueta (12–32).                                 |
| `paso`             | `number`                                         | `90`                                      | Paso de animación en milisegundos (60–1000).                   |
| `opacidadInactiva` | `number`                                         | `0.15`                                    | Opacidad de celdas inactivas (0.05–0.8).                       |
| `resplandor`       | `boolean`                                        | `false`                                   | Añade resplandor a la retícula.                                |
| `colorResplandor`  | `string`                                         | —                                         | Color del resplandor.                                          |
| `mostrarTiempo`    | `boolean`                                        | `true`                                    | Muestra el temporizador.                                       |
| `transcurrido`     | `number`                                         | —                                         | Tiempo externo en segundos; si se omite, se mide internamente. |
| `pausado`          | `boolean`                                        | `false`                                   | Pausa solo la animación; el reloj continúa.                    |

## Patrones

| Patrón   | Retícula      | Etiqueta  |
| -------- | ------------- | --------- |
| `arrow`  | 3 × 3         | Flecha    |
| `dots`   | 3 × 3         | Puntos    |
| `ripple` | 3 × 3         | Onda      |
| `spiral` | 3 × 3         | Espiral   |
| `orbit`  | 3 × 3 y 4 × 4 | Órbita    |
| `snake`  | 3 × 3 y 4 × 4 | Serpiente |
| `sweep`  | 4 × 4         | Barrido   |
| `spin`   | 4 × 4         | Giro      |
| `rain`   | 4 × 4         | Lluvia    |
| `pulse`  | 4 × 4         | Pulso     |

Si el patrón no existe para la retícula elegida, se usa `orbit` en 3 × 3 y
`sweep` en 4 × 4.

Para crear un patrón propio:

```ts
const patron = {
  cells: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  loop: 4,
  scale: 1,
  lit: 0.4,
};
```

`cells` es el retraso de cada celda; `null` crea un hueco. `loop`, `scale` y
`lit` ajustan el ciclo, la velocidad y el tiempo encendido.

## Accesibilidad

- El componente usa `role="status"`, `aria-live="polite"` y `aria-atomic`.
- El texto visible de la retícula, la etiqueta y el reloj quedan ocultos para
  lectores de pantalla; se anuncia solo el resumen en español.
- Con `prefers-reduced-motion` la retícula queda estática.
- Los estados se distinguen por texto y por la marca, no solo por color.
- No inventa porcentajes: es un indicador indeterminado.

## Design tokens

`--action`, `--color-success-700`, `--color-error-700`, `--fg-default`,
`--fg-muted`, `--font-body`, y las variables de color que recibe por inputs.
