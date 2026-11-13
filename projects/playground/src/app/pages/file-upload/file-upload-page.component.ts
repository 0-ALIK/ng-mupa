import { Component, signal } from '@angular/core';
import { MupaFileUpload } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-file-upload-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaFileUpload],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Carga de archivos"
        descripcion="Zona de arrastrar y soltar con validación de tipo, tamaño y cantidad."
      />

      <pg-demo-card
        titulo="Imagen de portada"
        descripcion="Ejemplo original del patrón .dash: una imagen JPEG o PNG de hasta 2 MB."
        [codigo]="ejemploImagen"
      >
        <div class="pg-ancho pg-upload-demo">
          <mupa-file-upload
            acepta="image/png,image/jpeg"
            descripcion="Imagen de portada"
            [tamanoMaximoMb]="2"
            (archivosSeleccionados)="archivos.set($event)"
          />
          <p class="pg-upload-estado">
            Archivo: <strong>{{ nombres(archivos()) }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Varios documentos"
        descripcion="Variante propia con carga múltiple, máximo 3 PDF y 5 MB por archivo."
        [codigo]="ejemploMultiple"
      >
        <div class="pg-ancho pg-upload-demo">
          <mupa-file-upload
            acepta="application/pdf"
            [multiple]="true"
            [maximoArchivos]="3"
            [tamanoMaximoMb]="5"
            descripcion="Documentos de soporte"
            (archivosSeleccionados)="documentos.set($event)"
          />
          <p class="pg-upload-estado">
            Documentos: <strong>{{ nombres(documentos()) }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/file-upload/file-upload.md" />
      </section>
    </div>
  `,
  styleUrl: './file-upload-page.component.css',
})
export class FileUploadPageComponent {
  protected readonly archivos = signal<readonly File[]>([]);
  protected readonly documentos = signal<readonly File[]>([]);

  protected nombres(archivos: readonly File[]): string {
    return archivos.length ? archivos.map((archivo) => archivo.name).join(', ') : 'Ninguno';
  }

  protected readonly ejemploImagen = `<mupa-file-upload
  acepta="image/png,image/jpeg"
  descripcion="Imagen de portada"
  [tamanoMaximoMb]="2"
  (archivosSeleccionados)="archivos.set($event)"
/>`;

  protected readonly ejemploMultiple = `<mupa-file-upload
  acepta="application/pdf"
  [multiple]="true"
  [maximoArchivos]="3"
  [tamanoMaximoMb]="5"
  descripcion="Documentos de soporte"
  (archivosSeleccionados)="documentos.set($event)"
/>`;
}
