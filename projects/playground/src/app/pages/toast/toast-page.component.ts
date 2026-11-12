import { Component, inject } from '@angular/core';
import { MupaButton, MupaToast, MupaToastService, type TonoToast } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-toast-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaToast, MupaButton],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Notificaciones"
        descripcion="Tarjetas de notificación con cuatro tonos, acción de texto y progreso. La pila se monta una vez en el layout y se controla con MupaToastService."
      />

      <pg-demo-card
        titulo="Tonos"
        descripcion="Cada tono combina barra lateral, icono y colores semánticos. Los errores usan role alert."
        [codigo]="ejemploTonos"
      >
        <div class="pg-columna pg-ancho" style="gap: 16px">
          <mupa-toast
            tono="success"
            titulo="Cambios guardados"
            descripcion="La solicitud se actualizó correctamente."
            [descartable]="false"
          />
          <mupa-toast
            tono="info"
            titulo="Nueva actualización"
            descripcion="El sistema estará en mantenimiento a las 10:00 p. m."
            [descartable]="false"
          />
          <mupa-toast
            tono="warning"
            titulo="Documento pendiente"
            descripcion="Adjunta el comprobante para continuar con el trámite."
            [descartable]="false"
          />
          <mupa-toast
            tono="error"
            titulo="No se pudo completar"
            descripcion="Revisa tu conexión e inténtalo de nuevo."
            [descartable]="false"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Acción y progreso"
        descripcion="La acción de texto permite resolver la notificación sin cerrarla. El progreso refleja el cierre automático."
        [codigo]="ejemploAccion"
      >
        <div class="pg-columna pg-ancho" style="gap: 16px">
          <mupa-toast
            tono="info"
            titulo="Reporte enviado"
            descripcion="Tu folio es #PTY-48230."
            [accion]="{ etiqueta: 'Ver recibo' }"
            [descartable]="false"
            (accionClic)="avisarAccion()"
          />
          <mupa-toast
            tono="success"
            titulo="Guardando cambios"
            descripcion="La operación termina en unos segundos."
            [progreso]="0.65"
            [descartable]="false"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Pila de notificaciones"
        descripcion="Cada botón agrega una notificación real a la pila. Pasa el cursor o enfoca una notificación para pausar su cierre."
        [codigo]="ejemploPila"
      >
        <div class="pg-fila">
          <mupa-button variante="secondary" (clic)="mostrarDemo('success')"> Éxito </mupa-button>
          <mupa-button variante="secondary" (clic)="mostrarDemo('info')"> Información </mupa-button>
          <mupa-button variante="secondary" (clic)="mostrarDemo('warning')">
            Advertencia
          </mupa-button>
          <mupa-button variante="secondary" (clic)="mostrarDemo('error')"> Error </mupa-button>
          <mupa-button variante="tonal" (clic)="mostrarConAccion()"> Con acción </mupa-button>
          <mupa-button variante="ghost" (clic)="mostrarPersistente()"> Permanente </mupa-button>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <h2 class="pg-seccion__titulo">Toast</h2>
        <pg-markdown-view ruta="docs/toast/toast.md" />
        <h2 class="pg-seccion__titulo">Toaster y servicio</h2>
        <pg-markdown-view ruta="docs/toast/toaster.md" />
      </section>
    </div>
  `,
})
export class ToastPageComponent {
  private readonly notificaciones = inject(MupaToastService);

  private readonly demos: Record<TonoToast, { titulo: string; descripcion: string }> = {
    success: {
      titulo: 'Cambios guardados',
      descripcion: 'La solicitud se actualizó correctamente.',
    },
    info: {
      titulo: 'Nueva actualización',
      descripcion: 'El sistema estará en mantenimiento a las 10:00 p. m.',
    },
    warning: {
      titulo: 'Documento pendiente',
      descripcion: 'Adjunta el comprobante para continuar con el trámite.',
    },
    error: {
      titulo: 'No se pudo completar',
      descripcion: 'Revisa tu conexión e inténtalo de nuevo.',
    },
  };

  protected mostrarDemo(tono: TonoToast): void {
    const demo = this.demos[tono];
    this.notificaciones.mostrar({ tono, ...demo });
  }

  protected mostrarConAccion(): void {
    this.notificaciones.mostrar({
      tono: 'info',
      titulo: 'Reporte enviado',
      descripcion: 'Tu folio es #PTY-48230.',
      accion: {
        etiqueta: 'Ver recibo',
        alHacerClic: () => {
          this.notificaciones.mostrar({
            tono: 'success',
            titulo: 'Recibo abierto',
            descripcion: 'Aquí se abriría el detalle del recibo.',
          });
        },
      },
    });
  }

  protected mostrarPersistente(): void {
    this.notificaciones.mostrar({
      tono: 'warning',
      titulo: 'Notificación permanente',
      descripcion: 'Esta notificación permanece abierta hasta que se cierre.',
      duracion: 0,
    });
  }

  protected avisarAccion(): void {
    this.notificaciones.mostrar({
      tono: 'success',
      titulo: 'Acción de la notificación',
      descripcion: 'Aquí se abriría el detalle del recibo.',
    });
  }

  protected readonly ejemploTonos = `<mupa-toast
  tono="success"
  titulo="Cambios guardados"
  descripcion="La solicitud se actualizó correctamente."
/>

<mupa-toast
  tono="error"
  titulo="No se pudo completar"
  descripcion="Revisa tu conexión e inténtalo de nuevo."
/>`;

  protected readonly ejemploAccion = `<mupa-toast
  tono="info"
  titulo="Reporte enviado"
  descripcion="Tu folio es #PTY-48230."
  [accion]="{ etiqueta: 'Ver recibo' }"
/>`;

  protected readonly ejemploPila = `// El toaster se monta una vez en el layout
<mupa-toaster />

// En cualquier componente
private readonly notificaciones = inject(MupaToastService);

this.notificaciones.mostrar({
  tono: 'success',
  titulo: 'Cambios guardados',
  descripcion: 'La solicitud se actualizó correctamente.',
});`;
}
