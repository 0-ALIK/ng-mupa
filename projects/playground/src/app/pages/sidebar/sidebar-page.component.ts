import { Component, signal } from '@angular/core';
import {
  MupaButton,
  MupaSidebar,
  type EnlaceSidebar,
  type EventoNavegacionSidebar,
  type GrupoSidebar,
  type UsuarioSidebar,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-sidebar-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaSidebar, MupaButton],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Sidebar"
        descripcion="Navegación lateral expandida o compacta en escritorio y cajón modal nativo por debajo de 768 px. Incluye ramas, badges y panel de usuario."
      />

      <pg-demo-card
        titulo="Navegación completa"
        descripcion="El sidebar del propio playground está construido con este componente. El contenido se proyecta en su slot y el disparador móvil se controla con posicionDisparador. Aquí se muestra en un contenedor para probar el estado activo, las ramas y el panel de usuario."
        [codigo]="ejemploBasico"
      >
        <div class="pg-columna pg-ancho">
          <div class="pg-fila">
            <mupa-button
              variante="secondary"
              tamano="sm"
              (clic)="colapsadoDemo.set(!colapsadoDemo())"
            >
              {{ colapsadoDemo() ? 'Expandir sidebar' : 'Contraer sidebar' }}
            </mupa-button>
            <span class="pg-ayuda">Enlace activo: {{ idActivoDemo() }}</span>
          </div>

          <div class="pg-sidebar-demo">
            <mupa-sidebar
              [grupos]="gruposDemo"
              [idActivo]="idActivoDemo()"
              [colapsado]="colapsadoDemo()"
              [idsExpandidosPorDefecto]="idsExpandidosDemo"
              [usuario]="usuarioDemo"
              [accionesUsuario]="accionesDemo"
              nombreSistema="Sistema interno"
              etiqueta="Navegación de demostración"
              pie="© 2026 Alcaldía de Panamá"
              (navegar)="alNavegarDemo($event)"
              (colapsadoCambio)="colapsadoDemo.set($event)"
            >
              <div class="pg-sidebar-demo__contenido">
                <h3>Contenido del sistema</h3>
                <p>
                  El contenido se proyecta dentro del sidebar, que impone el layout de dos columnas.
                  Pulsa los enlaces para cambiar el estado activo o contrae la barra para ver la
                  versión de solo iconos.
                </p>
              </div>
            </mupa-sidebar>
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Estado inicial colapsado"
        descripcion="Con colapsadoPorDefecto, el sidebar inicia en modo de solo iconos. El control interno permite expandirlo porque no está controlado desde fuera."
        [codigo]="ejemploColapsado"
      >
        <div class="pg-sidebar-demo" style="height: 420px">
          <mupa-sidebar
            [grupos]="gruposDemo"
            [idActivo]="idActivoDemo()"
            [colapsadoPorDefecto]="true"
            [mostrarControlColapso]="true"
            [usuario]="usuarioDemo"
            nombreSistema="Sistema interno"
            etiqueta="Navegación colapsada de ejemplo"
            pie="Estado inicial colapsado"
            (navegar)="alNavegarDemo($event)"
          >
            <div class="pg-sidebar-demo__contenido">
              <h3>Modo compacto</h3>
              <p>
                La barra inicia con 72 px de ancho. El botón interno de la esquina superior expande
                la navegación sin intervención del layout.
              </p>
            </div>
          </mupa-sidebar>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Ramas, badges y usuario"
        descripcion="Los ítems con hijos se despliegan, los badges muestran conteos y el usuario abre un menú de acciones."
      >
        <div class="pg-columna">
          <span class="pg-etiqueta">Estructura de ejemplo</span>
          <ul class="pg-columna" style="margin: 0; padding-left: 20px">
            <li>Grupo Principal: Inicio, Trámites (con Licencias, Permisos y Pagos).</li>
            <li>Grupo Sistema: Reportes y Configuración.</li>
            <li>Badge de 3 elementos en Permisos.</li>
            <li>Panel de usuario con Mi perfil, Preferencias y Cerrar sesión.</li>
          </ul>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/sidebar/sidebar.md" />
      </section>
    </div>
  `,
})
export class SidebarPageComponent {
  protected readonly colapsadoDemo = signal(false);
  protected readonly idActivoDemo = signal('inicio');
  protected readonly idsExpandidosDemo = ['tramites'];

  protected readonly gruposDemo: readonly GrupoSidebar[] = [
    {
      id: 'principal',
      etiqueta: 'Principal',
      items: [
        { id: 'inicio', etiqueta: 'Inicio', href: '#inicio', icono: 'house' },
        {
          id: 'tramites',
          etiqueta: 'Trámites',
          icono: 'folder',
          hijos: [
            { id: 'licencias', etiqueta: 'Licencias', href: '#licencias', icono: 'file-text' },
            {
              id: 'permisos',
              etiqueta: 'Permisos',
              href: '#permisos',
              icono: 'file-check',
              badge: 3,
            },
            { id: 'pagos', etiqueta: 'Pagos', href: '#pagos', icono: 'credit-card' },
          ],
        },
        { id: 'reportes', etiqueta: 'Reportes', href: '#reportes', icono: 'chart-column' },
      ],
    },
    {
      id: 'sistema',
      etiqueta: 'Sistema',
      items: [
        {
          id: 'configuracion',
          etiqueta: 'Configuración',
          href: '#configuracion',
          icono: 'settings',
        },
      ],
    },
  ];

  protected readonly usuarioDemo: UsuarioSidebar = {
    nombre: 'Ana Pérez',
    correo: 'ana.perez@mupa.gob.pa',
  };

  protected readonly accionesDemo: readonly EnlaceSidebar[] = [
    { id: 'perfil', etiqueta: 'Mi perfil', href: '#perfil', icono: 'user' },
    { id: 'preferencias', etiqueta: 'Preferencias', href: '#preferencias', icono: 'settings' },
    { id: 'salir', etiqueta: 'Cerrar sesión', href: '#salir', icono: 'log-out' },
  ];

  protected alNavegarDemo({ enlace, evento }: EventoNavegacionSidebar): void {
    evento.preventDefault();
    this.idActivoDemo.set(enlace.id);
  }

  protected readonly ejemploBasico = `<mupa-sidebar
  [grupos]="grupos"
  [idActivo]="rutaActiva()"
  [usuario]="usuario"
  [accionesUsuario]="accionesUsuario"
  nombreSistema="Sistema interno"
  pie="© 2026 Alcaldía de Panamá"
  (navegar)="alNavegar($event)"
  (colapsadoCambio)="alCambiarBarra($event)"
>
  <main class="contenido">...</main>
</mupa-sidebar>

/* El sidebar impone el layout; el contenido va en el slot */
.contenido {
  flex: 1;
  min-width: 0;
  padding: 24px;
}`;

  protected readonly ejemploColapsado = `<mupa-sidebar
  [grupos]="grupos"
  idActivo="inicio"
  [colapsadoPorDefecto]="true"
  [mostrarControlColapso]="true"
  etiqueta="Navegación colapsada de ejemplo"
>
  <main class="contenido">...</main>
</mupa-sidebar>`;
}
