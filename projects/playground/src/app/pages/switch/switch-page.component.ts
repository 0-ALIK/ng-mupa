import { Component, signal } from '@angular/core';
import { MupaSwitch } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-switch-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaSwitch],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Switch"
        descripcion="Interruptor binario con etiqueta, descripción y estado accesible."
      />

      <pg-demo-card
        titulo="Notificaciones"
        descripcion="Ejemplo original del patrón .sw: una opción que se activa o desactiva."
        [codigo]="ejemploBasico"
      >
        <div class="pg-ancho pg-switch-demo">
          <mupa-switch
            etiqueta="Notificaciones"
            descripcion="Recibe avisos de actividad y seguridad por correo."
            [(activo)]="notificaciones"
          />
          <p class="pg-switch-estado">
            Estado: <strong>{{ notificaciones() ? 'Activadas' : 'Desactivadas' }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Preferencias"
        descripcion="Variante propia con varios interruptores y una opción deshabilitada."
        [codigo]="ejemploLista"
      >
        <div class="pg-ancho pg-switch-lista">
          <mupa-switch
            etiqueta="Resumen semanal"
            descripcion="Un correo con el resumen de la semana."
            [(activo)]="resumenSemanal"
          />
          <mupa-switch
            etiqueta="Alertas de seguridad"
            descripcion="Inicios de sesión y cambios sensibles."
            [(activo)]="alertasSeguridad"
          />
          <mupa-switch
            etiqueta="Novedades del producto"
            descripcion="Esta opción está deshabilitada."
            [activo]="false"
            [deshabilitado]="true"
          />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/switch/switch.md" />
      </section>
    </div>
  `,
  styleUrl: './switch-page.component.css',
})
export class SwitchPageComponent {
  protected readonly notificaciones = signal(true);
  protected readonly resumenSemanal = signal(true);
  protected readonly alertasSeguridad = signal(false);

  protected readonly ejemploBasico = `<mupa-switch
  etiqueta="Notificaciones"
  descripcion="Recibe avisos de actividad y seguridad por correo."
  [(activo)]="notificaciones"
/>`;

  protected readonly ejemploLista = `<mupa-switch
  etiqueta="Resumen semanal"
  descripcion="Un correo con el resumen de la semana."
  [(activo)]="resumenSemanal"
/>

<mupa-switch
  etiqueta="Alertas de seguridad"
  [(activo)]="alertasSeguridad"
/>

<mupa-switch
  etiqueta="Novedades del producto"
  [deshabilitado]="true"
/>`;
}
