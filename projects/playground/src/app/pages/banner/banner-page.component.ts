import { Component } from '@angular/core';
import { MupaBanner } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-banner-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaBanner],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Mensajes y estados"
        titulo="Avisos informativos"
        descripcion="Comunica información, advertencias o resultados dentro del contexto de una tarea. Cada tono combina color, icono y texto."
      />

      <pg-demo-card
        titulo="Tonos semánticos"
        descripcion="Réplica de preview/comp-banners.html: fondo tintado, barra izquierda e icono de contorno."
        [codigo]="ejemploInfo"
      >
        <div class="pg-banners">
          <mupa-banner tono="info" titulo="Próximos pasos">
            <strong>Reporte recibido:</strong> una cuadrilla lo revisará en un plazo de 48 horas. Te
            avisaremos en cada cambio de estado.
          </mupa-banner>

          <mupa-banner tono="success" titulo="Pago completado">
            <strong>Tasa de aseo abril 2026:</strong> tu comprobante #PTY-48213 ya está disponible
            para descargar.
          </mupa-banner>

          <mupa-banner tono="warning" titulo="Aviso importante">
            <strong>Prórroga de impuestos:</strong> el plazo para el pago de anualidades 2026 se
            extendió hasta el 31 de marzo de 2026.
          </mupa-banner>

          <mupa-banner tono="error" titulo="Trámite rechazado">
            <strong>Cédula inválida:</strong> el documento adjunto no es legible. Vuelve a cargarlo
            para continuar.
          </mupa-banner>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Mensaje de conveniencia"
        descripcion="El input mensaje cubre avisos de una sola frase; el contenido proyectado permite resaltar la primera idea."
        [codigo]="ejemploMensaje"
      >
        <div class="pg-banners">
          <mupa-banner
            tono="success"
            titulo="Solicitud enviada"
            mensaje="Recibirás la confirmación en tu correo institucional."
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/banner/banner.md" />
      </section>
    </div>
  `,
  styleUrl: './banner-page.component.css',
})
export class BannerPageComponent {
  protected readonly ejemploInfo = `<mupa-banner tono="info" titulo="Próximos pasos">
  <strong>Reporte recibido:</strong>
  una cuadrilla lo revisará en un plazo de 48 horas.
</mupa-banner>`;

  protected readonly ejemploMensaje = `<mupa-banner
  tono="success"
  titulo="Solicitud enviada"
  mensaje="Recibirás la confirmación en tu correo institucional."
/>`;
}
