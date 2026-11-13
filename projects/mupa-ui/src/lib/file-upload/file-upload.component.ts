import {
  booleanAttribute,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { MupaButton } from '../button/button.component';
import { MupaIcon } from '../icon/icon.component';

/**
 * Zona de carga de archivos con arrastrar y soltar.
 *
 * Réplica del patrón `.dash` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-file-upload',
  imports: [MupaButton, MupaIcon],
  template: `
    <div class="mupa-file-upload">
      <div
        class="mupa-file-upload__zona"
        [class.mupa-file-upload__zona--arrastrando]="arrastrando()"
        [class.mupa-file-upload__zona--deshabilitada]="deshabilitado()"
        (dragover)="alArrastrar($event)"
        (dragleave)="alSalir($event)"
        (drop)="alSoltar($event)"
      >
        <mupa-icon nombre="upload" [tamano]="28" />
        <span class="mupa-file-upload__etiqueta">{{ etiqueta() }}</span>

        @if (descripcion()) {
          <span class="mupa-file-upload__descripcion">{{ descripcion() }}</span>
        }

        @if (ayuda()) {
          <span class="mupa-file-upload__ayuda">{{ ayuda() }}</span>
        }
      </div>

      <mupa-button
        variante="secondary"
        tamano="sm"
        [bloque]="true"
        [deshabilitado]="deshabilitado()"
        (clic)="abrirSelector()"
      >
        Seleccionar archivo
      </mupa-button>

      <input
        #inputArchivo
        class="mupa-file-upload__input"
        type="file"
        [accept]="acepta()"
        [multiple]="multiple()"
        [disabled]="deshabilitado()"
        (change)="alSeleccionar($event)"
      />

      @if (archivos().length) {
        <ul class="mupa-file-upload__lista" aria-label="Archivos seleccionados">
          @for (archivo of archivos(); track archivo.name + archivo.size) {
            <li>
              <mupa-icon nombre="file-text" [tamano]="16" />
              <span class="mupa-file-upload__nombre">{{ archivo.name }}</span>
              <span class="mupa-file-upload__tamano">{{ tamano(archivo) }}</span>
            </li>
          }
        </ul>
      }

      @if (mensajeError()) {
        <p class="mupa-file-upload__error" role="alert">{{ mensajeError() }}</p>
      }
    </div>
  `,
  styleUrl: './file-upload.component.css',
})
export class MupaFileUpload {
  /** Tipos aceptados, con el mismo formato del atributo `accept`. */
  readonly acepta = input('');

  /** Permite seleccionar varios archivos. */
  readonly multiple = input(false, { transform: booleanAttribute });

  /** Máximo de archivos permitidos. */
  readonly maximoArchivos = input<number>();

  /** Tamaño máximo por archivo, en MB. */
  readonly tamanoMaximoMb = input<number>();

  /** Texto principal de la zona. */
  readonly etiqueta = input('Arrastra un archivo aquí o selecciónalo');

  /** Texto secundario. */
  readonly descripcion = input<string>();

  /** Deshabilita la carga. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Emite los archivos válidos. */
  readonly archivosSeleccionados = output<readonly File[]>();

  /** Emite el mensaje cuando algún archivo es rechazado. */
  readonly errorArchivo = output<string>();

  protected readonly arrastrando = signal(false);
  protected readonly archivos = signal<readonly File[]>([]);
  protected readonly mensajeError = signal<string | null>(null);

  private readonly inputArchivo = viewChild<ElementRef<HTMLInputElement>>('inputArchivo');

  protected readonly ayuda = () => {
    const partes: string[] = [];
    if (this.acepta()) partes.push(`Formatos: ${this.acepta()}`);
    if (this.tamanoMaximoMb()) partes.push(`Máximo ${this.tamanoMaximoMb()} MB`);
    if (this.maximoArchivos()) partes.push(`Hasta ${this.maximoArchivos()} archivos`);
    return partes.join(' · ');
  };

  protected abrirSelector(): void {
    if (this.deshabilitado()) return;
    this.inputArchivo()?.nativeElement.click();
  }

  protected alSeleccionar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const archivos = Array.from(input.files ?? []);
    input.value = '';
    this.procesar(archivos);
  }

  protected alArrastrar(evento: DragEvent): void {
    evento.preventDefault();
    if (this.deshabilitado()) return;
    this.arrastrando.set(true);
  }

  protected alSalir(evento: DragEvent): void {
    evento.preventDefault();
    this.arrastrando.set(false);
  }

  protected alSoltar(evento: DragEvent): void {
    evento.preventDefault();
    this.arrastrando.set(false);
    if (this.deshabilitado()) return;
    this.procesar(Array.from(evento.dataTransfer?.files ?? []));
  }

  protected tamano(archivo: File): string {
    if (archivo.size < 1024 * 1024) {
      return `${Math.max(1, Math.round(archivo.size / 1024))} KB`;
    }
    return `${(archivo.size / (1024 * 1024)).toFixed(1)} MB`;
  }

  private procesar(archivos: readonly File[]): void {
    if (!archivos.length) return;

    if (!this.multiple() && archivos.length > 1) {
      this.rechazar('Selecciona un solo archivo.');
      return;
    }

    if (this.maximoArchivos() && archivos.length > this.maximoArchivos()!) {
      this.rechazar(`Puedes seleccionar hasta ${this.maximoArchivos()} archivos.`);
      return;
    }

    const aceptados: File[] = [];
    const rechazados: string[] = [];

    for (const archivo of archivos) {
      if (!this.tipoAceptado(archivo)) {
        rechazados.push(`${archivo.name}: formato no permitido`);
        continue;
      }

      if (this.tamanoMaximoMb() && archivo.size > this.tamanoMaximoMb()! * 1024 * 1024) {
        rechazados.push(`${archivo.name}: supera ${this.tamanoMaximoMb()} MB`);
        continue;
      }

      aceptados.push(archivo);
    }

    if (!aceptados.length) {
      this.rechazar(rechazados.join('. ') || 'No se pudo cargar el archivo.');
      return;
    }

    this.archivos.set(aceptados);
    this.mensajeError.set(
      rechazados.length ? `Algunos archivos no se cargaron: ${rechazados.join('. ')}` : null,
    );
    this.archivosSeleccionados.emit(aceptados);

    if (rechazados.length) {
      this.errorArchivo.emit(this.mensajeError() ?? '');
    }
  }

  private rechazar(mensaje: string): void {
    this.archivos.set([]);
    this.mensajeError.set(mensaje);
    this.errorArchivo.emit(mensaje);
  }

  private tipoAceptado(archivo: File): boolean {
    const acepta = this.acepta().trim();
    if (!acepta) return true;

    return acepta.split(',').some((token) => {
      const tipo = token.trim().toLowerCase();
      if (!tipo || tipo === '*/*') return true;
      if (tipo.endsWith('/*')) {
        return archivo.type.toLowerCase().startsWith(tipo.slice(0, -1));
      }
      if (tipo.startsWith('.')) {
        return archivo.name.toLowerCase().endsWith(tipo);
      }
      return archivo.type.toLowerCase() === tipo;
    });
  }
}
