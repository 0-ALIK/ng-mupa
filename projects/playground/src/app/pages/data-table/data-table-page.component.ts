import { Component, signal } from '@angular/core';
import {
  MupaButton,
  MupaDataTable,
  MupaPill,
  MupaTemplateDirective,
  type AccionTabla,
  type ColumnaTabla,
  type ColorPill,
  type RegistroTabla,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

const MODELOS: readonly (readonly [string, string | null, string])[] = [
  ['Glock 17 · 9mm', 'Sgto. J. Pérez', 'Activo'],
  ['Taser X26 · Eléctrica', 'Cabo M. Soto', 'Pendiente'],
  ['Beretta M9 · 9mm', null, 'Dañado'],
  ['Sig Sauer P226', 'Tte. L. Vega', 'Legal'],
  ['Glock 19 · 9mm', 'Agte. R. Díaz', 'Activo'],
  ['Taser 7 · Eléctrica', 'Cabo A. Ríos', 'Activo'],
  ['CZ P-10 C', null, 'Pendiente'],
  ['Smith & Wesson M&P9', 'Sgto. K. Núñez', 'Activo'],
];

@Component({
  selector: 'pg-data-table-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaDataTable,
    MupaTemplateDirective,
    MupaPill,
    MupaButton,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Contenido"
        titulo="Data table"
        descripcion="Tabla de datos con ordenación, paginación, chips de estado, acciones por fila y celdas personalizadas con plantillas mupaTemplate."
      />

      <pg-demo-card
        titulo="Inventario de armas"
        descripcion="Ejemplo original del sistema: columnas mono, texto atenuado, estados semánticos, acciones y paginación local."
        [codigo]="ejemploInventario"
      >
        <div class="pg-columna pg-ancho">
          <mupa-data-table
            [columnas]="columnasInventario"
            [filas]="filasInventario"
            [acciones]="accionesInventario"
            [tamanoPagina]="4"
            leyenda="Inventario de armas"
            [(pagina)]="pagina"
          />
          <span class="pg-ayuda" role="status">{{ ultimaAccion() }}</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Celdas personalizadas con let"
        descripcion="Las columnas con plantilla usan el contexto de mupaTemplate: let-fila, let-columna y let-indice."
        [codigo]="ejemploPlantillas"
      >
        <div class="pg-columna pg-ancho">
          <mupa-data-table
            [columnas]="columnasPersonalizadas"
            [filas]="filasPersonalizadas"
            [tamanoPagina]="0"
            leyenda="Tabla con celdas personalizadas"
          >
            <ng-template mupaTemplate="estado" let-fila let-indice="indice">
              <mupa-pill [etiqueta]="texto(fila['estado'])" [color]="colorEstado(fila['estado'])" />
            </ng-template>

            <ng-template mupaTemplate="acciones" let-fila>
              <mupa-button variante="secondary" tamano="sm" (clic)="verPersonalizado(fila)">
                Ver
              </mupa-button>
            </ng-template>
          </mupa-data-table>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/data-table/data-table.md" />
      </section>
    </div>
  `,
})
export class DataTablePageComponent {
  protected readonly pagina = signal(1);
  protected readonly ultimaAccion = signal('Ninguna acción ejecutada.');

  protected readonly columnasInventario: readonly ColumnaTabla[] = [
    { clave: 'id', encabezado: 'Código', tipo: 'mono', ancho: 150, ordenable: true },
    { clave: 'desc', encabezado: 'Descripción', ordenable: true },
    { clave: 'who', encabezado: 'Asignado a', tipo: 'atenuado' },
    { clave: 'status', encabezado: 'Estado', tipo: 'estado', ancho: 170 },
  ];

  protected readonly filasInventario: readonly RegistroTabla[] = Array.from(
    { length: 32 },
    (_, indice) => {
      const modelo = MODELOS[indice % MODELOS.length];
      return {
        id: 'ARM-' + String(421 + indice).padStart(4, '0'),
        desc: modelo[0],
        who: modelo[1],
        status: modelo[2],
      };
    },
  );

  protected readonly accionesInventario: readonly AccionTabla[] = [
    {
      icono: 'eye',
      etiqueta: 'Ver detalle',
      alHacerClic: (fila) => this.registrarAccion('Ver detalle', fila),
    },
    {
      icono: 'pencil',
      etiqueta: 'Editar',
      alHacerClic: (fila) => this.registrarAccion('Editar', fila),
    },
    {
      icono: 'trash-2',
      etiqueta: 'Eliminar',
      tono: 'danger',
      alHacerClic: (fila) => this.registrarAccion('Eliminar', fila),
    },
  ];

  protected readonly columnasPersonalizadas: readonly ColumnaTabla[] = [
    { clave: 'codigo', encabezado: 'Código', tipo: 'mono' },
    { clave: 'nombre', encabezado: 'Nombre' },
    { clave: 'estado', encabezado: 'Estado', plantilla: 'estado' },
    {
      clave: 'acciones',
      encabezado: 'Acciones',
      plantilla: 'acciones',
      alineacion: 'right',
    },
  ];

  protected readonly filasPersonalizadas: readonly RegistroTabla[] = [
    { id: '1', codigo: 'TR-001', nombre: 'Licencia de funcionamiento', estado: 'Activo' },
    { id: '2', codigo: 'TR-002', nombre: 'Permiso de construcción', estado: 'Pendiente' },
    { id: '3', codigo: 'TR-003', nombre: 'Pago de tasas', estado: 'Rechazado' },
    { id: '4', codigo: 'TR-004', nombre: 'Reporte ciudadano', estado: 'En proceso' },
  ];

  protected texto(valor: unknown): string {
    return valor === null || valor === undefined ? '' : String(valor);
  }

  protected colorEstado(valor: unknown): ColorPill {
    const estado = this.texto(valor);
    if (estado === 'Activo') return 'success';
    if (estado === 'Pendiente') return 'warning';
    if (estado === 'Rechazado') return 'error';
    if (estado === 'En proceso') return 'info';
    return 'slate';
  }

  protected verPersonalizado(fila: RegistroTabla): void {
    this.registrarAccion('Ver', fila);
  }

  private registrarAccion(accion: string, fila: RegistroTabla): void {
    const codigo = fila['id'] ?? fila['codigo'] ?? '';
    this.ultimaAccion.set(`${accion}: ${codigo}`);
  }

  protected readonly ejemploInventario = `<mupa-data-table
  [columnas]="columnas"
  [filas]="filas"
  [acciones]="acciones"
  [tamanoPagina]="4"
  leyenda="Inventario de armas"
  [(pagina)]="pagina"
/>`;

  protected readonly ejemploPlantillas = `<mupa-data-table
  [columnas]="columnas"
  [filas]="filas"
  [tamanoPagina]="0"
>
  <ng-template mupaTemplate="estado" let-fila let-indice="indice">
    <mupa-pill
      [etiqueta]="fila['estado']"
      [color]="colorEstado(fila['estado'])"
    />
  </ng-template>

  <ng-template mupaTemplate="acciones" let-fila>
    <mupa-button tamano="sm" (clic)="ver(fila)">Ver</mupa-button>
  </ng-template>
</mupa-data-table>`;
}
