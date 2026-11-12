# Convenciones de `mupa-ui`

Librería de componentes Angular del sistema de diseño **Lego Design System — Alcaldía de Panamá**.
El objetivo es mantener un clon exacto del Lego Design System — Alcaldía de Panamá.

## Idioma

- Todo el código, nombres de variables, tipos, comentarios y documentación se escriben en **español**.
- Los nombres de API pública (inputs, outputs, tipos) también van en español.
- Los textos de interfaz y mensajes de accesibilidad van en español.

## Estructura de cada componente

Cada componente vive en su propia carpeta dentro de `src/lib/<nombre>/`:

```
<nombre>/
├── <nombre>.component.ts       Componente standalone con template inline
├── <nombre>.component.css      Estilos del componente (solo design tokens)
├── <nombre>.component.spec.ts  Pruebas unitarias
├── <nombre>.types.ts           Tipos, interfaces y constantes públicas
└── <nombre>.md                 Documentación del componente
```

Reglas:

- **No** se usa archivo `.html` separado: el template va inline en el decorador `@Component`.
- El CSS sí va en archivo aparte y se referencia con `styleUrl`.
- La documentación va en `<nombre>.md`, no en `README.md` por componente.
- Todo componente se exporta desde `src/public-api.ts`.

## Angular

- Componentes **standalone** (no se declara `standalone: true`; es el valor por defecto en Angular v22+).
- No se declara `changeDetection: OnPush`; es el valor por defecto en Angular v22+.
- Estado con **signals**: `signal()`, `computed()`, `input()`, `output()`, `model()`.
- No se usan `@HostBinding` ni `@HostListener`; los bindings del host van en la propiedad `host`.
- No se usa `ngClass` ni `ngStyle`; se usan bindings `[class]` y `[style]`.
- Flujo de control nativo: `@if`, `@for`, `@switch`.
- Nombres de selectores con prefijo `mupa-` (ej. `<mupa-button>`).
- Clases CSS con prefijo `mupa-` y convención BEM (ej. `mupa-button__icono`).

## Design tokens

- Los estilos usan **exclusivamente** las variables definidas en `src/theme/tokens.css`.
- No se inventan colores, radios, sombras, espacios ni tipografías.
- Cuando el componente original usa un valor literal (por ejemplo, una sombra específica o un ancho fijo), se copia tal cual y se documenta el motivo.
- El archivo `tokens.css` es una copia fiel de los tokens del Lego Design System — Alcaldía de Panamá. No se modifica sin actualizar también el sistema original.

## Documentación (`<nombre>.md`)

Cada archivo debe incluir, en este orden:

1. Título `# mupa-<nombre>` y descripción breve.
2. **Uso**: ejemplo mínimo en HTML.
3. **Inputs**: tabla con nombre, tipo, valor por defecto y descripción.
4. **Outputs**: tabla con nombre, payload y descripción.
5. **Variantes** (si aplica).
6. **Slots / proyección de contenido** (si aplica).
7. **Accesibilidad**: notas de teclado, ARIA y foco.
8. **Design tokens**: tokens consumidos por el componente.

La documentación debe ser breve y precisa; no repetir el código fuente.

## Pruebas

- Cada componente incluye un archivo `.component.spec.ts` con pruebas de creación, inputs principales y comportamiento accesible.
- Se ejecutan con `ng test mupa-ui`.

## Formularios

- Los inputs nativos usan la directiva `mupaInput` y las clases de `forms.css`.
- Los controles personalizados (`mupa-checkbox`, `mupa-select`, `mupa-date-picker`) implementan `ControlValueAccessor` mediante `MupaFormControlBase`.
- No se implementa `ControlValueAccessor` en la directiva `mupaInput`: el control sigue siendo nativo.
- Los estilos de formulario viven en `src/theme/forms.css`, no en componentes.
- La integración con Signal Forms se realiza a través de la capa de compatibilidad CVA de Angular.
- El autocompletado no forma parte de la librería por decisión de alcance.

## Fidelidad al sistema original

- La referencia visual y de comportamiento es el Lego Design System — Alcaldía de Panamá.
- Los valores de tamaños, colores, estados y animaciones se copian del código original.
- Si el original usa React, se traduce la lógica a Angular sin alterar el resultado visual.
