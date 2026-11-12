import { Component, signal } from '@angular/core';
import {
  MupaButton,
  MupaCheckbox,
  MupaIcon,
  MupaToggleButton,
  type TamanoToggleButton,
  type VarianteToggleButton,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-toggle-button-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaToggleButton,
    MupaButton,
    MupaCheckbox,
    MupaIcon,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Acciones"
        titulo="Toggle button"
        descripcion="Botón de alternancia con estado activo persistente. Generaliza el antiguo SavedToggle y conserva el ejemplo original de Guardados."
      />

      <pg-demo-card
        titulo="Guardados · ejemplo original"
        descripcion="El corazón de favoritos dentro de una tarjeta de empleo. Pulsa para rellenarlo y vuelve a pulsar para quitar el empleo."
        [codigo]="ejemploGuardados"
      >
        <article class="job-card" aria-labelledby="job-title">
          <div class="job-card-header">
            <div class="job-employer">
              <span class="job-employer-symbol" aria-hidden="true">
                <mupa-icon nombre="briefcase" [tamano]="22" />
              </span>
              <div>
                <span class="job-eyebrow">Empresa de ejemplo</span>
                <span class="job-tag">Bolsa de empleo</span>
              </div>
            </div>

            <mupa-toggle-button
              [activo]="guardadoTrabajo()"
              (activoChange)="guardadoTrabajo.set($event)"
              etiquetaElemento="el empleo de Asistente administrativo"
              variante="ghost"
            />
          </div>

          <h2 id="job-title" class="job-title">Asistente administrativo</h2>
          <p class="job-description">
            Apoya la organización de documentos, el seguimiento de solicitudes y la atención a
            personas.
          </p>

          <div class="job-meta">
            <span><mupa-icon nombre="map-pin" [tamano]="15" />Ciudad de Panamá</span>
            <span><mupa-icon nombre="clock" [tamano]="15" />Jornada completa</span>
          </div>

          <div class="job-card-footer">
            <span class="job-modality">Presencial</span>
            <mupa-button
              tamano="sm"
              [expandidoAria]="detallesTrabajo()"
              controlaAria="job-details"
              (clic)="detallesTrabajo.set(!detallesTrabajo())"
            >
              {{ detallesTrabajo() ? 'Ocultar detalles' : 'Ver oferta' }}
            </mupa-button>
          </div>

          @if (detallesTrabajo()) {
            <div id="job-details" class="job-details">
              <strong>Detalle de demostración</strong>
              <p>
                Requisitos de ejemplo: organización, comunicación clara y manejo básico de
                herramientas de oficina. Esta tarjeta no corresponde a una vacante real.
              </p>
            </div>
          }

          <p class="job-saved-status" role="status" aria-live="polite">
            {{ guardadoTrabajo() ? 'Empleo añadido a favoritos.' : 'Empleo sin guardar.' }}
          </p>
        </article>
      </pg-demo-card>

      <pg-demo-card
        titulo="Configura el corazón"
        descripcion="El toggle admite las cuatro variantes del botón, tres tamaños, etiqueta visible y estado deshabilitado."
        [codigo]="ejemploVariantes"
      >
        <div class="pg-columna pg-ancho">
          <div class="pg-grid pg-grid--auto">
            <label class="pg-columna" style="gap: 5px">
              <span class="pg-etiqueta">Variante</span>
              <select
                class="pg-campo"
                [value]="variante()"
                (change)="variante.set($any($event.target).value)"
              >
                <option value="outline">Contorno</option>
                <option value="primary">Primario</option>
                <option value="tonal">Tonal</option>
                <option value="ghost">Discreto</option>
              </select>
            </label>

            <label class="pg-columna" style="gap: 5px">
              <span class="pg-etiqueta">Tamaño</span>
              <select
                class="pg-campo"
                [value]="tamano()"
                (change)="tamano.set($any($event.target).value)"
              >
                <option value="sm">Pequeño · 40 px</option>
                <option value="md">Mediano · 44 px</option>
                <option value="lg">Grande · 48 px</option>
              </select>
            </label>
          </div>

          <div class="pg-fila">
            <mupa-checkbox
              etiqueta="Mostrar texto"
              [marcado]="mostrarEtiqueta()"
              (marcadoChange)="mostrarEtiqueta.set($event)"
            />
            <mupa-checkbox
              etiqueta="Deshabilitado"
              [marcado]="deshabilitado()"
              (marcadoChange)="deshabilitado.set($event)"
            />
          </div>

          <div class="pg-escenario-toggle">
            <mupa-toggle-button
              [activo]="guardado()"
              (activoChange)="guardado.set($event)"
              etiquetaElemento="este empleo"
              [variante]="variante()"
              [tamano]="tamano()"
              [mostrarEtiqueta]="mostrarEtiqueta()"
              [deshabilitado]="deshabilitado()"
            />
          </div>

          <p class="pg-ayuda" role="status">
            {{ guardado() ? 'Estado: guardado.' : 'Estado: sin guardar.' }}
          </p>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Estados y favoritos"
        descripcion="Ejemplos de los cuatro estados del original: sin guardar, guardado con y sin texto, y deshabilitado."
        [codigo]="ejemploEstados"
      >
        <div class="pg-fila pg-fila--separada">
          <mupa-toggle-button etiquetaElemento="un empleo" [mostrarEtiqueta]="true" />
          <mupa-toggle-button
            etiquetaElemento="otro empleo"
            [mostrarEtiqueta]="true"
            [activo]="true"
          />
          <mupa-toggle-button etiquetaElemento="un servicio favorito" [activo]="true" />
          <mupa-toggle-button
            etiquetaElemento="un empleo no disponible"
            [mostrarEtiqueta]="true"
            [activo]="true"
            [deshabilitado]="true"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Guardado con confirmación del sistema"
        descripcion="Modo controlado: el toggle solo solicita el cambio y la aplicación confirma después. Mientras tanto queda ocupado y bloqueado."
        [codigo]="ejemploConfirmacion"
      >
        <div class="pg-columna pg-ancho">
          <mupa-checkbox
            etiqueta="Simular un error"
            [marcado]="fallo()"
            (marcadoChange)="fallo.set($event)"
          />

          <div class="pg-servicio">
            <div>
              <strong>Paz y salvo municipal</strong>
              <p>Acceso frecuente para consultar después.</p>
            </div>

            <mupa-toggle-button
              [activo]="guardadoRemoto()"
              [controlado]="true"
              [ocupado]="guardando()"
              etiquetaElemento="Paz y salvo municipal"
              [mostrarEtiqueta]="true"
              (solicitudCambio)="simularGuardado($event)"
            />
          </div>

          <p class="pg-ayuda" role="status" aria-live="polite">{{ mensajeRemoto() }}</p>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/toggle-button/toggle-button.md" />
      </section>
    </div>
  `,
  styleUrl: './toggle-button-page.component.css',
})
export class ToggleButtonPageComponent {
  protected readonly guardadoTrabajo = signal(false);
  protected readonly detallesTrabajo = signal(false);

  protected readonly guardado = signal(false);
  protected readonly variante = signal<VarianteToggleButton>('outline');
  protected readonly tamano = signal<TamanoToggleButton>('md');
  protected readonly mostrarEtiqueta = signal(true);
  protected readonly deshabilitado = signal(false);

  protected readonly guardadoRemoto = signal(false);
  protected readonly guardando = signal(false);
  protected readonly fallo = signal(false);
  protected readonly mensajeRemoto = signal('Demostración local. No se almacenan datos.');

  private pendiente = false;

  protected simularGuardado(siguiente: boolean): void {
    if (this.pendiente) return;

    this.pendiente = true;
    this.guardando.set(true);
    this.mensajeRemoto.set('Actualizando guardados…');

    setTimeout(() => {
      this.pendiente = false;
      this.guardando.set(false);

      if (this.fallo()) {
        this.mensajeRemoto.set(
          'No se pudo actualizar. El estado anterior se conserva; puedes volver a intentar.',
        );
        return;
      }

      this.guardadoRemoto.set(siguiente);
      this.mensajeRemoto.set(
        siguiente
          ? 'Elemento añadido a guardados (simulación).'
          : 'Elemento quitado de guardados (simulación).',
      );
    }, 700);
  }

  protected readonly ejemploGuardados = `<mupa-toggle-button
  [activo]="guardado()"
  (activoChange)="guardado.set($event)"
  etiquetaElemento="el empleo de Asistente administrativo"
  variante="ghost"
/>`;

  protected readonly ejemploVariantes = `<mupa-toggle-button
  [activo]="guardado()"
  (activoChange)="guardado.set($event)"
  etiquetaElemento="este empleo"
  variante="outline"
  tamano="md"
  [mostrarEtiqueta]="true"
  [deshabilitado]="false"
/>`;

  protected readonly ejemploEstados = `<mupa-toggle-button etiquetaElemento="un empleo" [mostrarEtiqueta]="true" />

<mupa-toggle-button etiquetaElemento="otro empleo" [mostrarEtiqueta]="true" [activo]="true" />

<mupa-toggle-button etiquetaElemento="un servicio favorito" [activo]="true" />

<mupa-toggle-button
  etiquetaElemento="un empleo no disponible"
  [mostrarEtiqueta]="true"
  [activo]="true"
  [deshabilitado]="true"
/>`;

  protected readonly ejemploConfirmacion = `<mupa-toggle-button
  [activo]="guardadoRemoto()"
  [controlado]="true"
  [ocupado]="guardando()"
  etiquetaElemento="Paz y salvo municipal"
  [mostrarEtiqueta]="true"
  (solicitudCambio)="simularGuardado($event)"
/>`;
}
