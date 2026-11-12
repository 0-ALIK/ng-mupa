import { Component, inject } from '@angular/core';
import { MupaAvatarGroup, MupaToastService, type PersonaAvatar } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-avatar-group-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaAvatarGroup],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Grupo de avatares"
        descripcion="Avatares superpuestos con anillo blanco y contador +N. Se usa para representar equipos, asignaciones o participantes."
      />

      <pg-demo-card
        titulo="Grupo básico"
        descripcion="Muestra hasta cinco personas por defecto. El contador aparece cuando hay más."
        [codigo]="ejemploBasico"
      >
        <mupa-avatar-group [personas]="personas" />
      </pg-demo-card>

      <pg-demo-card
        titulo="Contador interactivo"
        descripcion="Con accionVerMas, el contador se convierte en un botón que emite verMas."
        [codigo]="ejemploInteractivo"
      >
        <div class="pg-columna">
          <mupa-avatar-group
            [personas]="personas"
            [maximo]="4"
            [total]="12"
            [accionVerMas]="true"
            (verMas)="avisarVerMas()"
          />
          <span class="pg-ayuda">El contador muestra el total de personas: 12.</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tamaños"
        descripcion="El tamaño de cada avatar y el solapamiento se calculan a partir del input tamano."
      >
        <div class="pg-columna">
          <div class="pg-fila">
            <span class="pg-ayuda" style="width: 48px">32 px</span>
            <mupa-avatar-group [personas]="personas" [maximo]="3" [tamano]="32" />
          </div>
          <div class="pg-fila">
            <span class="pg-ayuda" style="width: 48px">40 px</span>
            <mupa-avatar-group [personas]="personas" [maximo]="3" [tamano]="40" />
          </div>
          <div class="pg-fila">
            <span class="pg-ayuda" style="width: 48px">48 px</span>
            <mupa-avatar-group [personas]="personas" [maximo]="3" [tamano]="48" />
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/avatar-group/avatar-group.md" />
      </section>
    </div>
  `,
})
export class AvatarGroupPageComponent {
  private readonly notificaciones = inject(MupaToastService);

  protected readonly personas: readonly PersonaAvatar[] = [
    { nombre: 'Ana Pérez' },
    { nombre: 'Luis Gómez' },
    { nombre: 'María Díaz' },
    { nombre: 'Carlos Ruiz' },
    { nombre: 'Sofía Torres' },
    { nombre: 'Jorge Herrera' },
  ];

  protected avisarVerMas(): void {
    this.notificaciones.mostrar({
      tono: 'info',
      titulo: 'Ver más personas',
      descripcion: 'Aquí se abriría la lista completa del equipo asignado.',
    });
  }

  protected readonly ejemploBasico = `<mupa-avatar-group [personas]="equipo" />`;

  protected readonly ejemploInteractivo = `<mupa-avatar-group
  [personas]="equipo"
  [maximo]="4"
  [total]="12"
  [accionVerMas]="true"
  (verMas)="abrirEquipo()"
/>`;
}
