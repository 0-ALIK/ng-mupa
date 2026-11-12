import { Component } from '@angular/core';
import { MupaAvatar, type EstadoAvatar } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface PersonaEstado {
  nombre: string;
  estado: EstadoAvatar;
}

@Component({
  selector: 'pg-avatar-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaAvatar],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Avatar"
        descripcion="Avatar circular con foto o iniciales sobre un tinte institucional. Incluye punto de presencia y anillo para apilar."
      />

      <pg-demo-card
        titulo="Iniciales y tamaños"
        descripcion="Las iniciales se generan con las dos primeras palabras del nombre y el tinte se elige de forma determinista."
        [codigo]="ejemploTamanos"
      >
        <div class="pg-fila pg-fila--separada">
          <div class="pg-columna" style="align-items: center">
            <mupa-avatar nombre="Ana Pérez" [tamano]="32" />
            <span class="pg-ayuda">32 px</span>
          </div>
          <div class="pg-columna" style="align-items: center">
            <mupa-avatar nombre="Luis Gómez" [tamano]="40" />
            <span class="pg-ayuda">40 px</span>
          </div>
          <div class="pg-columna" style="align-items: center">
            <mupa-avatar nombre="María Díaz" [tamano]="48" />
            <span class="pg-ayuda">48 px</span>
          </div>
          <div class="pg-columna" style="align-items: center">
            <mupa-avatar nombre="Carlos Ruiz" [tamano]="64" />
            <span class="pg-ayuda">64 px</span>
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Estados de presencia"
        descripcion="El punto de presencia se anuncia en el texto accesible del avatar."
        [codigo]="ejemploEstados"
      >
        <div class="pg-fila pg-fila--separada">
          @for (persona of personasEstado; track persona.nombre) {
            <div class="pg-columna" style="align-items: center">
              <mupa-avatar [nombre]="persona.nombre" [estado]="persona.estado" [tamano]="44" />
              <span class="pg-ayuda">{{ persona.estado }}</span>
            </div>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Foto e iniciales"
        descripcion="Si la foto falla o no se indica, el avatar usa las iniciales. La imagen se recorta en círculo."
        [codigo]="ejemploFoto"
      >
        <div class="pg-fila pg-fila--separada">
          <mupa-avatar nombre="Ana Pérez" [src]="fotoDemo" [tamano]="48" />
          <mupa-avatar nombre="Ana Pérez" [tamano]="48" />
          <mupa-avatar nombre="Ana Pérez" [src]="fotoDemo" [tamano]="48" estado="online" />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Enlace de perfil"
        descripcion="Con href, el avatar se convierte en un ancla y se eleva 2 px al pasar el cursor."
        [codigo]="ejemploEnlace"
      >
        <div class="pg-fila">
          <mupa-avatar nombre="Ana Pérez" href="#perfil-ana" [tamano]="44" />
          <mupa-avatar nombre="Luis Gómez" href="#perfil-luis" [tamano]="44" estado="busy" />
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/avatar/avatar.md" />
      </section>
    </div>
  `,
})
export class AvatarPageComponent {
  protected readonly personasEstado: readonly PersonaEstado[] = [
    { nombre: 'Ana Pérez', estado: 'online' },
    { nombre: 'Luis Gómez', estado: 'busy' },
    { nombre: 'María Díaz', estado: 'away' },
    { nombre: 'Carlos Ruiz', estado: 'offline' },
  ];

  protected readonly fotoDemo = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <rect width="160" height="160" fill="#0660FF"/>
      <circle cx="80" cy="60" r="28" fill="#D6EAFF"/>
      <path d="M20 160c0-36 27-58 60-58s60 22 60 58" fill="#D6EAFF"/>
    </svg>
  `)}`;

  protected readonly ejemploTamanos = `<mupa-avatar nombre="Ana Pérez" [tamano]="32" />
<mupa-avatar nombre="Luis Gómez" [tamano]="40" />
<mupa-avatar nombre="María Díaz" [tamano]="48" />
<mupa-avatar nombre="Carlos Ruiz" [tamano]="64" />`;

  protected readonly ejemploEstados = `<mupa-avatar nombre="Ana Pérez" estado="online" />
<mupa-avatar nombre="Luis Gómez" estado="busy" />
<mupa-avatar nombre="María Díaz" estado="away" />
<mupa-avatar nombre="Carlos Ruiz" estado="offline" />`;

  protected readonly ejemploFoto = `<mupa-avatar nombre="Ana Pérez" [src]="fotoUrl" [tamano]="48" />
<mupa-avatar nombre="Ana Pérez" [tamano]="48" />`;

  protected readonly ejemploEnlace = `<mupa-avatar nombre="Ana Pérez" href="/perfil/ana" [tamano]="44" />`;
}
