import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MupaButton, MupaSelect, type GrupoSelect, type OpcionSelect } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-select-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaSelect,
    MupaButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Select"
        descripcion="Selector simple con lista flotante, grupos, estado de error y navegación completa por teclado."
      />

      <pg-demo-card
        titulo="Selección simple"
        descripcion="Las opciones con valor nulo actúan como marcador y no son seleccionables."
        [codigo]="ejemploBasico"
      >
        <div class="pg-columna pg-ancho">
          <mupa-select
            etiqueta="Tipo de trámite"
            ayuda="Selecciona el trámite que deseas iniciar."
            [opciones]="opcionesTramites"
            [valor]="tramite()"
            (valorChange)="tramite.set($event)"
          />
          <span class="pg-ayuda">Valor seleccionado: {{ tramite() ?? 'ninguno' }}</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Opciones agrupadas"
        descripcion="Los grupos muestran un encabezado y un separador entre bloques."
        [codigo]="ejemploGrupos"
      >
        <div class="pg-columna pg-ancho">
          <mupa-select
            etiqueta="Servicio municipal"
            [grupos]="gruposServicios"
            [valor]="servicio()"
            (valorChange)="servicio.set($event)"
          />
          <span class="pg-ayuda">Valor seleccionado: {{ servicio() ?? 'ninguno' }}</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Ayuda, error y deshabilitado"
        descripcion="El error cambia el borde y reemplaza el texto de ayuda. El estado deshabilitado evita la interacción."
        [codigo]="ejemploEstados"
      >
        <div class="pg-columna pg-ancho">
          <mupa-select
            etiqueta="Documento"
            [opciones]="opcionesDocumentos"
            [valor]="documento()"
            (valorChange)="documento.set($event)"
          />

          <mupa-select
            etiqueta="Documento obligatorio"
            error="Adjunta el documento para continuar."
            [opciones]="opcionesDocumentos"
          />

          <mupa-select
            etiqueta="Servicio bloqueado"
            [opciones]="opcionesDocumentos"
            [deshabilitado]="true"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Ancho y campo de formulario"
        descripcion="El ancho se controla con el input ancho. Con nombre, el valor se envía en un campo oculto."
        [codigo]="ejemploAncho"
      >
        <div class="pg-columna pg-ancho">
          <mupa-select etiqueta="Ancho de 280 px" [ancho]="280" [opciones]="opcionesTramites" />
          <mupa-select
            etiqueta="Con nombre de formulario"
            nombre="tramite"
            [opciones]="opcionesTramites"
            [valor]="tramite()"
            (valorChange)="tramite.set($event)"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Reactive Forms"
        descripcion="El selector implementa ControlValueAccessor. El FormControl controla el valor, el estado deshabilitado y el estado tocado."
        [codigo]="ejemploFormControl"
      >
        <div class="pg-columna pg-ancho">
          <mupa-select
            [formControl]="controlTramite"
            [opciones]="opcionesTramites"
            etiqueta="Trámite con FormControl"
            ayuda="Selecciona el trámite que deseas iniciar."
          />

          <span class="pg-ayuda">
            Valor: {{ controlTramite.value ?? 'ninguno' }} · Tocado: {{ controlTramite.touched }} ·
            Válido: {{ controlTramite.valid }}
          </span>

          <div class="pg-fila">
            <mupa-button variante="secondary" tamano="sm" (clic)="controlTramite.markAsTouched()">
              Marcar como tocado
            </mupa-button>
            <mupa-button variante="ghost" tamano="sm" (clic)="controlTramite.setValue('permisos')">
              Seleccionar desde el control
            </mupa-button>
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/select/select.md" />
      </section>
    </div>
  `,
})
export class SelectPageComponent {
  protected readonly opcionesTramites: readonly OpcionSelect[] = [
    { etiqueta: 'Selecciona una opción', valor: null },
    { etiqueta: 'Licencias de funcionamiento', valor: 'licencias' },
    { etiqueta: 'Permisos de construcción', valor: 'permisos' },
    { etiqueta: 'Pago de tasas', valor: 'tasas' },
    { etiqueta: 'Reporte ciudadano', valor: 'reporte' },
  ];

  protected readonly gruposServicios: readonly GrupoSelect[] = [
    {
      etiqueta: 'Servicios digitales',
      opciones: [
        { etiqueta: 'Licencias', valor: 'licencias' },
        { etiqueta: 'Permisos', valor: 'permisos' },
      ],
    },
    {
      etiqueta: 'Pagos',
      opciones: [
        { etiqueta: 'Tasas municipales', valor: 'tasas' },
        { etiqueta: 'Impuesto de inmueble', valor: 'inmueble' },
        { etiqueta: 'Recolección de basura', valor: 'aseo' },
      ],
    },
    {
      etiqueta: 'Atención ciudadana',
      opciones: [
        { etiqueta: 'Reportes', valor: 'reportes' },
        { etiqueta: 'Consultas', valor: 'consultas' },
      ],
    },
  ];

  protected readonly opcionesDocumentos: readonly OpcionSelect[] = [
    { etiqueta: 'Selecciona un documento', valor: null },
    { etiqueta: 'Cédula de identidad', valor: 'cedula' },
    { etiqueta: 'Pasaporte', valor: 'pasaporte' },
    { etiqueta: 'Certificado de residencia', valor: 'residencia' },
  ];

  protected readonly tramite = signal<string | null>(null);
  protected readonly servicio = signal<string | null>('licencias');
  protected readonly documento = signal<string | null>(null);

  protected readonly ejemploBasico = `<mupa-select
  etiqueta="Tipo de trámite"
  ayuda="Selecciona el trámite que deseas iniciar."
  [opciones]="opcionesTramites"
  [(valor)]="tramiteSeleccionado"
/>`;

  protected readonly ejemploGrupos = `<mupa-select
  etiqueta="Servicio municipal"
  [grupos]="gruposServicios"
  [(valor)]="servicioSeleccionado"
/>`;

  protected readonly ejemploEstados = `<mupa-select
  etiqueta="Documento obligatorio"
  error="Adjunta el documento para continuar."
  [opciones]="documentos"
/>

<mupa-select
  etiqueta="Servicio bloqueado"
  [opciones]="servicios"
  [deshabilitado]="true"
/>`;

  protected readonly ejemploAncho = `<mupa-select
  etiqueta="Ancho de 280 px"
  [ancho]="280"
  [opciones]="opciones"
  nombre="tramite"
/>`;

  protected readonly controlTramite = new FormControl<string | null>('licencias');

  protected readonly ejemploFormControl = `// Componente
controlTramite = new FormControl<string | null>('licencias');

// Template
<mupa-select
  [formControl]="controlTramite"
  [opciones]="opcionesTramites"
  etiqueta="Trámite con FormControl"
  ayuda="Selecciona el trámite que deseas iniciar."
/>`;
}
