import { Component, computed, signal } from '@angular/core';
import {
  MupaCheckbox,
  MupaVoicePill,
  type EventoDetencionVoz,
  type EventoErrorVoz,
  type EventoInicioVoz,
  type FormaVoicePill,
  type FuenteVoz,
  type ModoVoicePill,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-voice-pill-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaVoicePill,
    MupaCheckbox,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Acciones"
        titulo="Voice pill"
        descripcion="Control compacto de entrada de voz con onda reactiva, tiempo y cancelación por deslizamiento. No graba ni transcribe audio."
      />

      <pg-demo-card
        titulo="Compositor"
        descripcion="Configura el origen de la onda, la interacción y la forma. En modo simulación no se solicita micrófono."
        [codigo]="ejemploCompositor"
      >
        <div class="pg-columna pg-ancho">
          <div class="pg-grid pg-grid--auto">
            <label class="pg-columna" style="gap: 5px">
              <span class="pg-etiqueta">Origen de la onda</span>
              <select
                class="pg-campo"
                [value]="reactivo()"
                (change)="cambiarReactivo($any($event.target).value)"
              >
                <option value="simulated">Simulación</option>
                <option value="mic">Micrófono real</option>
              </select>
            </label>

            <label class="pg-columna" style="gap: 5px">
              <span class="pg-etiqueta">Interacción</span>
              <select
                class="pg-campo"
                [value]="modo()"
                (change)="modo.set($any($event.target).value)"
              >
                <option value="auto">Automática</option>
                <option value="toggle">Toque</option>
                <option value="hold">Mantener pulsado</option>
              </select>
            </label>

            <label class="pg-columna" style="gap: 5px">
              <span class="pg-etiqueta">Forma</span>
              <select
                class="pg-campo"
                [value]="forma()"
                (change)="forma.set($any($event.target).value)"
              >
                <option value="pill">Cápsula</option>
                <option value="rounded">Redondeada</option>
              </select>
            </label>
          </div>

          <div class="pg-fila">
            <mupa-checkbox
              etiqueta="Mostrar onda"
              [marcado]="onda()"
              (marcadoChange)="onda.set($event)"
            />
            <mupa-checkbox
              etiqueta="Mostrar tiempo"
              [marcado]="tiempo()"
              (marcadoChange)="tiempo.set($event)"
            />
            <mupa-checkbox
              etiqueta="Deshabilitado"
              [marcado]="deshabilitado()"
              (marcadoChange)="deshabilitado.set($event)"
            />
          </div>

          <div class="pg-compositor">
            <label class="pg-etiqueta" for="voice-message">Tu consulta</label>
            <textarea
              id="voice-message"
              class="pg-campo pg-area"
              rows="3"
              placeholder="Describe la consulta que deseas realizar."
            ></textarea>

            <div class="pg-compositor__footer">
              <span class="pg-ayuda">Ejemplo de campo con entrada de voz</span>
              <mupa-voice-pill
                [reactivo]="reactivo()"
                [modo]="modo()"
                [forma]="forma()"
                [mostrarOnda]="onda()"
                [mostrarTiempo]="tiempo()"
                [deshabilitado]="deshabilitado()"
                descritoPor="voice-hint"
                (iniciar)="alIniciar($event)"
                (detener)="alDetener($event)"
                (errorMicrofono)="alError($event)"
              />
            </div>
          </div>

          <p class="pg-ayuda" id="voice-hint">{{ ayuda() }}</p>
          <p
            class="pg-resultado"
            [class.pg-resultado--error]="error()"
            role="status"
            aria-live="polite"
          >
            {{ resultado() }}
          </p>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Variantes"
        descripcion="Azul institucional, neutra, redondeada de 40 px y deshabilitada."
        [codigo]="ejemploVariantes"
      >
        <div class="pg-grid pg-grid--auto pg-ancho">
          <div class="pg-muestra-voz">
            <span class="pg-ayuda">Azul institucional</span>
            <mupa-voice-pill [mostrarTiempo]="false" etiquetaAria="Probar variante azul" />
          </div>

          <div class="pg-muestra-voz">
            <span class="pg-ayuda">Neutra</span>
            <mupa-voice-pill
              fondo="var(--color-neutral-100)"
              colorAcento="var(--fg-strong)"
              [mostrarTiempo]="false"
              etiquetaAria="Probar variante neutra"
            />
          </div>

          <div class="pg-muestra-voz">
            <span class="pg-ayuda">Redondeada · 40 px</span>
            <mupa-voice-pill
              forma="rounded"
              [tamano]="40"
              [mostrarTiempo]="false"
              etiquetaAria="Probar variante redondeada"
            />
          </div>

          <div class="pg-muestra-voz">
            <span class="pg-ayuda">Deshabilitada</span>
            <mupa-voice-pill [deshabilitado]="true" etiquetaAria="Entrada de voz deshabilitada" />
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Solo onda y sin tiempo"
        descripcion="Todos los extras son opcionales: onda, tiempo y cancelación por deslizamiento."
        [codigo]="ejemploMinimo"
      >
        <mupa-voice-pill
          [mostrarTiempo]="false"
          [deslizarParaCancelar]="false"
          [tamano]="36"
          etiquetaAria="Probar variante mínima"
        />
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/voice-pill/voice-pill.md" />
      </section>
    </div>
  `,
  styleUrl: './voice-pill-page.component.css',
})
export class VoicePillPageComponent {
  protected readonly reactivo = signal<FuenteVoz>('simulated');
  protected readonly modo = signal<ModoVoicePill>('auto');
  protected readonly forma = signal<FormaVoicePill>('pill');
  protected readonly onda = signal(true);
  protected readonly tiempo = signal(true);
  protected readonly deshabilitado = signal(false);

  protected readonly resultado = signal('Activa el control para probar la interacción.');
  protected readonly error = signal(false);

  protected readonly ayuda = computed(() => {
    if (this.modo() === 'hold') return 'Mantén pulsado y suelta para terminar.';
    if (this.modo() === 'toggle') return 'Pulsa una vez para iniciar y otra para detener.';
    return 'Un toque inicia o detiene. Si mantienes pulsado, termina al soltar.';
  });

  protected cambiarReactivo(valor: string): void {
    this.reactivo.set(valor === 'mic' ? 'mic' : 'simulated');
  }

  protected alIniciar(evento: EventoInicioVoz): void {
    this.error.set(false);
    this.resultado.set(
      evento.fuente === 'mic'
        ? 'Micrófono activo. La onda responde al sonido.'
        : 'Simulación activa. No se utiliza el micrófono.',
    );
  }

  protected alDetener(evento: EventoDetencionVoz): void {
    this.error.set(false);
    this.resultado.set(
      evento.cancelada
        ? 'Sesión cancelada.'
        : `Sesión terminada: ${(evento.duracion / 1000).toFixed(1)} s. El ejemplo no guarda audio.`,
    );
  }

  protected alError(evento: EventoErrorVoz): void {
    this.error.set(true);
    this.resultado.set(evento.mensaje);
  }

  protected readonly ejemploCompositor = `<mupa-voice-pill
  [reactivo]="'simulated'"
  [modo]="'auto'"
  [forma]="'pill'"
  [mostrarOnda]="true"
  [mostrarTiempo]="true"
  aria-describedby="voice-hint"
  (iniciar)="alIniciar($event)"
  (detener)="alDetener($event)"
  (errorMicrofono)="alError($event)"
/>`;

  protected readonly ejemploVariantes = `<mupa-voice-pill [mostrarTiempo]="false" etiquetaAria="Probar variante azul" />

<mupa-voice-pill
  fondo="var(--color-neutral-100)"
  colorAcento="var(--fg-strong)"
  [mostrarTiempo]="false"
  etiquetaAria="Probar variante neutra"
/>

<mupa-voice-pill forma="rounded" [tamano]="40" [mostrarTiempo]="false" />

<mupa-voice-pill [deshabilitado]="true" etiquetaAria="Entrada de voz deshabilitada" />`;

  protected readonly ejemploMinimo = `<mupa-voice-pill
  [mostrarTiempo]="false"
  [deslizarParaCancelar]="false"
  [tamano]="36"
  etiquetaAria="Probar variante mínima"
/>`;
}
