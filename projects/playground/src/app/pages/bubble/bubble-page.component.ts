import { Component, signal } from '@angular/core';
import {
  MupaBubble,
  MupaBubbleCard,
  MupaBubbleContent,
  MupaBubbleGroup,
  MupaBubbleReactions,
  MupaBubbleSuggestions,
  MupaIcon,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-bubble-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaBubble,
    MupaBubbleGroup,
    MupaBubbleContent,
    MupaBubbleSuggestions,
    MupaBubbleCard,
    MupaBubbleReactions,
    MupaIcon,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Mensajes y estados"
        titulo="Bubble de conversación"
        descripcion="Contenido conversacional: ciudadano en azul marino a la derecha, asistente con avatar y nombre a la izquierda, sugerencias y tarjetas embebidas."
      />

      <pg-demo-card
        titulo="Conversación"
        descripcion="Réplica de bubble-card.html. Incluye el saludo, las sugerencias, el mensaje del ciudadano y la tarjeta para buscar la placa."
        [codigo]="ejemploConversacion"
      >
        <div class="pg-bubble-demo">
          <span class="pg-bubble-proto">
            <mupa-icon nombre="flask-conical" [tamano]="14" />
            Prototipo · Datos ficticios, sin consultas ni pagos reales
          </span>

          <div class="pg-bubble-conversacion">
            <mupa-bubble alineacion="end" hora="8:30 a. m.">
              <mupa-bubble-content>hola</mupa-bubble-content>
            </mupa-bubble>

            <mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:30 a. m.">
              <mupa-bubble-content> ¡Hola, vecino! ¿En qué te ayudo hoy? </mupa-bubble-content>

              <mupa-bubble-suggestions
                [elementos]="sugerencias"
                (seleccionar)="alSeleccionarSugerencia($event)"
              />
            </mupa-bubble>

            <mupa-bubble alineacion="end" hora="8:31 a. m.">
              <mupa-bubble-content>quiero pagar mi placa</mupa-bubble-content>
            </mupa-bubble>

            <mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:31 a. m.">
              <mupa-bubble-content>
                Claro, te ayudo con el pago de tu placa. Para buscarla en el sistema municipal solo
                necesito tu
                <b>número de contribuyente</b>.
              </mupa-bubble-content>

              <mupa-bubble-card>
                <div class="pg-bubble-formulario">
                  <label class="pg-bubble-etiqueta" for="pg-numero-contribuyente">
                    Número de contribuyente
                  </label>

                  <input
                    id="pg-numero-contribuyente"
                    class="pg-bubble-campo"
                    inputmode="numeric"
                    placeholder="Ej.: 1234567"
                    aria-describedby="pg-numero-ayuda"
                  />

                  <span id="pg-numero-ayuda" class="pg-bubble-ayuda">
                    Solo números, como aparece en tu estado de cuenta.
                  </span>

                  <button type="button" class="pg-bubble-cta">Buscar mi placa</button>

                  <div class="pg-bubble-lock">
                    <mupa-icon nombre="lock" [tamano]="14" />
                    Para pagar la placa solo necesito este dato. Prototipo con datos ficticios.
                  </div>
                </div>
              </mupa-bubble-card>
            </mupa-bubble>
          </div>

          <div class="pg-bubble-composer">
            <div class="pg-bubble-composer__caja">
              <input
                [value]="borrador()"
                (input)="actualizarBorrador($event)"
                placeholder="Cuéntame qué necesitas…"
                aria-label="Mensaje"
              />

              <button
                type="button"
                class="pg-bubble-composer__boton pg-bubble-composer__boton--mic"
                aria-label="Dictar"
              >
                <mupa-icon nombre="mic" [tamano]="18" />
              </button>

              <button
                type="button"
                class="pg-bubble-composer__boton pg-bubble-composer__boton--enviar"
                aria-label="Enviar"
              >
                <mupa-icon nombre="arrow-up" [tamano]="18" />
              </button>
            </div>

            <div class="pg-bubble-composer__aviso">
              Hati es un asistente de IA. Revisa las fuentes oficiales de cada respuesta.
            </div>
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Grupos, reacciones y contenido colapsable"
        descripcion="El grupo oculta el avatar y el encabezado repetidos; el contenido puede recortarse y las reacciones se anuncian como una imagen."
        [codigo]="ejemploGrupo"
      >
        <div class="pg-bubble-extras">
          <div class="pg-bubble-extra">
            <h3>Mensajes agrupados</h3>

            <mupa-bubble-group>
              <mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:32 a. m.">
                <mupa-bubble-content>
                  Puedes consultar el estado de tu solicitud desde tu panel.
                </mupa-bubble-content>
              </mupa-bubble>

              <mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:33 a. m.">
                <mupa-bubble-content>
                  También puedes descargar el comprobante cuando cambie el estado.
                </mupa-bubble-content>
              </mupa-bubble>
            </mupa-bubble-group>
          </div>

          <div class="pg-bubble-extra">
            <h3>Contenido colapsable</h3>

            <mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:34 a. m.">
              <mupa-bubble-content [colapsable]="true" [maxLineas]="3">
                Para completar el trámite necesitas tu cédula, el número de contribuyente y el
                comprobante de pago. Si el sistema detecta datos faltantes, te indicará cuál debes
                corregir antes de continuar. Puedes guardar el borrador y volver más tarde.
              </mupa-bubble-content>

              <mupa-bubble-reactions etiquetaAria="Reacciones: 3 respuestas útiles">
                👍 3
              </mupa-bubble-reactions>
            </mupa-bubble>
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/bubble/bubble.md" />
      </section>
    </div>
  `,
  styleUrl: './bubble-page.component.css',
})
export class BubblePageComponent {
  protected readonly sugerencias = [
    '¿Qué necesito para tramitar mi Paz y Salvo?',
    'Consultar lo que tengo pendiente',
  ];

  protected readonly borrador = signal('');

  protected alSeleccionarSugerencia(valor: string): void {
    this.borrador.set(valor);
  }

  protected actualizarBorrador(evento: Event): void {
    this.borrador.set((evento.target as HTMLInputElement).value);
  }

  protected readonly ejemploConversacion = `<mupa-bubble alineacion="end" hora="8:30 a. m.">
  <mupa-bubble-content>hola</mupa-bubble-content>
</mupa-bubble>

<mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:30 a. m.">
  <mupa-bubble-content>¡Hola, vecino! ¿En qué te ayudo hoy?</mupa-bubble-content>

  <mupa-bubble-suggestions
    [elementos]="sugerencias"
    (seleccionar)="alSeleccionarSugerencia($event)"
  />
</mupa-bubble>`;

  protected readonly ejemploGrupo = `<mupa-bubble-group>
  <mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:32 a. m.">
    <mupa-bubble-content>Primer mensaje.</mupa-bubble-content>
  </mupa-bubble>

  <mupa-bubble autor="Hati" avatar="/hatillo-isotipo.svg" hora="8:33 a. m.">
    <mupa-bubble-content>Segundo mensaje agrupado.</mupa-bubble-content>
  </mupa-bubble>
</mupa-bubble-group>`;
}
