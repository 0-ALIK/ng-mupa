import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MupaBanner, MupaCard } from 'mupa-ui';

import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-templates-page',
  imports: [PageHeaderComponent, MupaBanner, MupaCard],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Templates"
        titulo="Templates completos"
        descripcion="Pantallas completas listas para copiar y pegar. Cada template se abre sin el layout del playground."
      />

      <mupa-banner tono="info" titulo="Pantallas independientes">
        Cada template se abre en pantalla completa, sin sidebar ni barra del playground. El código
        fuente vive en
        <code>projects/playground/src/app/templates/</code>.
      </mupa-banner>

      <div class="pg-templates">
        <mupa-card
          etiqueta="Template"
          titulo="Login interno"
          descripcion="Acceso institucional con panel navy, inicio de sesión y recuperación de contraseña."
          etiquetaAria="Abrir template Login interno"
          [interactiva]="true"
          (clic)="abrirLogin()"
        />
      </div>
    </div>
  `,
  styleUrl: './templates-page.component.css',
})
export class TemplatesPageComponent {
  private readonly router = inject(Router);

  protected abrirLogin(): void {
    void this.router.navigateByUrl('/templates/login');
  }
}
