import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import {
  MupaIcon,
  MupaSidebar,
  MupaToastService,
  MupaToaster,
  type EnlaceSidebar,
  type EventoNavegacionSidebar,
  type GrupoSidebar,
  type UsuarioSidebar,
} from 'mupa-ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MupaSidebar, MupaToaster, MupaIcon],
  template: `
    <div class="playground">
      <mupa-sidebar
        [grupos]="grupos"
        [idActivo]="idActivo()"
        [usuario]="usuario"
        [accionesUsuario]="accionesUsuario"
        [colapsado]="colapsadoApp()"
        [idsExpandidosPorDefecto]="idsExpandidos"
        [logoSrc]="'/logo-mupa.png'"
        marca="Alcaldía de Panamá"
        nombreSistema="Playground · mupa-ui"
        etiqueta="Navegación del playground"
        pie="Sistema de diseño Lego · Alcaldía de Panamá"
        [mostrarControlColapso]="false"
        (navegar)="alNavegar($event)"
        (colapsadoCambio)="colapsadoApp.set($event)"
      />

      <div class="playground__contenido">
        <header class="playground__barra">
          <button
            type="button"
            class="playground__burger"
            [attr.aria-label]="colapsadoApp() ? 'Expandir menú lateral' : 'Contraer menú lateral'"
            (click)="colapsadoApp.set(!colapsadoApp())"
          >
            <mupa-icon
              [nombre]="colapsadoApp() ? 'panel-left-open' : 'panel-left-close'"
              [tamano]="20"
            />
          </button>

          <div class="playground__contexto">
            <p class="playground__overline">Sistema de diseño · Lego</p>
            <p class="playground__subtitulo">Componentes porteados a Angular</p>
          </div>

          <button
            type="button"
            class="playground__tema"
            [attr.aria-pressed]="modoOscuro()"
            [attr.aria-label]="modoOscuro() ? 'Activar modo claro' : 'Activar modo oscuro'"
            (click)="alternarTema()"
          >
            <mupa-icon [nombre]="modoOscuro() ? 'sun' : 'moon'" [tamano]="18" />
            {{ modoOscuro() ? 'Modo claro' : 'Modo oscuro' }}
          </button>
        </header>

        <main class="playground__pagina">
          <router-outlet />
        </main>
      </div>
    </div>

    <mupa-toaster />
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly notificaciones = inject(MupaToastService);

  private readonly rutaActual = signal(this.router.url);
  protected readonly colapsadoApp = signal(false);

  protected readonly modoOscuro = signal(
    typeof document !== 'undefined' && document.documentElement.dataset['theme'] === 'dark',
  );

  protected readonly idActivo = computed(() => {
    const partes = this.rutaActual().split('/').filter(Boolean);
    return partes[partes.length - 1] ?? '';
  });

  protected readonly idsExpandidos = [
    'acciones',
    'elementos',
    'formularios',
    'navegacion',
    'contenido',
    'mensajes',
    'graficos',
    'recursos-visuales',
  ];

  protected readonly grupos: readonly GrupoSidebar[] = [
    {
      id: 'general',
      etiqueta: 'General',
      items: [
        {
          id: 'fundamentos',
          etiqueta: 'Tokens',
          href: '/fundamentos',
          icono: 'sliders-horizontal',
        },
      ],
    },
    {
      id: 'componentes',
      etiqueta: 'Componentes',
      items: [
        {
          id: 'acciones',
          etiqueta: 'Acciones',
          icono: 'plus',
          hijos: [
            {
              id: 'button',
              etiqueta: 'Botón',
              href: '/componentes/button',
              icono: 'plus',
            },
            {
              id: 'toggle-button',
              etiqueta: 'Toggle button',
              href: '/componentes/toggle-button',
              icono: 'heart',
            },
            {
              id: 'pill',
              etiqueta: 'Chip / etiqueta',
              href: '/componentes/pill',
              icono: 'star',
            },
            {
              id: 'voice-pill',
              etiqueta: 'Voice pill',
              href: '/componentes/voice-pill',
              icono: 'mic',
            },
          ],
        },
        {
          id: 'elementos',
          etiqueta: 'Elementos',
          icono: 'star',
          hijos: [
            { id: 'icono', etiqueta: 'Icono', href: '/componentes/icono', icono: 'star' },
            { id: 'avatar', etiqueta: 'Avatar', href: '/componentes/avatar', icono: 'user' },
            {
              id: 'avatar-group',
              etiqueta: 'Grupo de avatares',
              href: '/componentes/avatar-group',
              icono: 'users',
            },
          ],
        },
        {
          id: 'formularios',
          etiqueta: 'Formularios',
          icono: 'file-check',
          hijos: [
            {
              id: 'field',
              etiqueta: 'Campos de texto',
              href: '/componentes/field',
              icono: 'file-text',
            },
            {
              id: 'checkbox',
              etiqueta: 'Checkbox',
              href: '/componentes/checkbox',
              icono: 'check',
            },
            {
              id: 'select',
              etiqueta: 'Select',
              href: '/componentes/select',
              icono: 'sliders-horizontal',
            },
            {
              id: 'date-picker',
              etiqueta: 'DatePicker',
              href: '/componentes/date-picker',
              icono: 'calendar',
            },
          ],
        },
        {
          id: 'mensajes',
          etiqueta: 'Mensajes y estados',
          icono: 'message-circle',
          hijos: [
            {
              id: 'banner',
              etiqueta: 'Avisos informativos',
              href: '/componentes/banner',
              icono: 'megaphone',
            },
            {
              id: 'lattice-loader',
              etiqueta: 'Lattice loader',
              href: '/componentes/lattice-loader',
              icono: 'loader-circle',
            },
            {
              id: 'bubble',
              etiqueta: 'Bubble',
              href: '/componentes/bubble',
              icono: 'message-circle',
            },
            {
              id: 'toast',
              etiqueta: 'Notificaciones',
              href: '/componentes/toast',
              icono: 'bell',
              badge: 3,
            },
          ],
        },
        {
          id: 'navegacion',
          etiqueta: 'Navegación',
          icono: 'navigation',
          hijos: [
            {
              id: 'breadcrumb',
              etiqueta: 'Breadcrumb',
              href: '/componentes/breadcrumb',
              icono: 'chevron-right',
            },
            {
              id: 'landing-nav',
              etiqueta: 'Menú de landing',
              href: '/componentes/landing-nav',
              icono: 'menu',
            },
            {
              id: 'pagination',
              etiqueta: 'Paginación',
              href: '/componentes/pagination',
              icono: 'chevrons-right',
            },
            {
              id: 'sidebar',
              etiqueta: 'Sidebar',
              href: '/componentes/sidebar',
              icono: 'layout-dashboard',
            },
          ],
        },
        {
          id: 'contenido',
          etiqueta: 'Contenido',
          icono: 'file-text',
          hijos: [
            {
              id: 'card',
              etiqueta: 'Card',
              href: '/componentes/card',
              icono: 'credit-card',
            },
            {
              id: 'page-header',
              etiqueta: 'Page header',
              href: '/componentes/page-header',
              icono: 'file-text',
            },
            {
              id: 'data-table',
              etiqueta: 'Data table',
              href: '/componentes/data-table',
              icono: 'clipboard-list',
            },
          ],
        },
        {
          id: 'graficos',
          etiqueta: 'Gráficos',
          icono: 'chart-column',
          hijos: [
            {
              id: 'area-chart',
              etiqueta: 'Área',
              href: '/componentes/area-chart',
              icono: 'chart-area',
            },
            {
              id: 'bar-chart',
              etiqueta: 'Barras',
              href: '/componentes/bar-chart',
              icono: 'chart-column',
            },
            {
              id: 'bar-list',
              etiqueta: 'Bar list',
              href: '/componentes/bar-list',
              icono: 'list',
            },
            {
              id: 'line-chart',
              etiqueta: 'Líneas',
              href: '/componentes/line-chart',
              icono: 'chart-line',
            },
            {
              id: 'pie-chart',
              etiqueta: 'Circular',
              href: '/componentes/pie-chart',
              icono: 'chart-pie',
            },
            {
              id: 'radar-chart',
              etiqueta: 'Radar',
              href: '/componentes/radar-chart',
              icono: 'radar',
            },
            {
              id: 'radial-chart',
              etiqueta: 'Radial',
              href: '/componentes/radial-chart',
              icono: 'gauge',
            },
            {
              id: 'distribution-bar',
              etiqueta: 'Distribución',
              href: '/componentes/distribution-bar',
              icono: 'chart-column',
            },
          ],
        },
        {
          id: 'recursos-visuales',
          etiqueta: 'Recursos visuales',
          icono: 'star',
          hijos: [
            {
              id: 'confetti',
              etiqueta: 'Confetti',
              href: '/componentes/confetti',
              icono: 'party-popper',
            },
            {
              id: 'marquee',
              etiqueta: 'Marquee',
              href: '/componentes/marquee',
              icono: 'arrow-right',
            },
            {
              id: 'contador-numerico',
              etiqueta: 'Contador numérico',
              href: '/componentes/contador-numerico',
              icono: 'arrow-up-down',
            },
            {
              id: 'logo-loop',
              etiqueta: 'Logo loop',
              href: '/componentes/logo-loop',
              icono: 'building-2',
            },
          ],
        },
      ],
    },
  ];

  protected readonly usuario: UsuarioSidebar = {
    nombre: 'Ana Pérez',
    correo: 'ana.perez@mupa.gob.pa',
  };

  protected readonly accionesUsuario: readonly EnlaceSidebar[] = [
    { id: 'perfil', etiqueta: 'Mi perfil', href: '/perfil', icono: 'user' },
    { id: 'preferencias', etiqueta: 'Preferencias', href: '/preferencias', icono: 'settings' },
    { id: 'salir', etiqueta: 'Cerrar sesión', href: '#salir', icono: 'log-out' },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((evento) => this.rutaActual.set(evento.urlAfterRedirects));
  }

  protected alNavegar({ enlace, evento }: EventoNavegacionSidebar): void {
    evento.preventDefault();

    if (enlace.id === 'salir') {
      this.notificaciones.mostrar({
        tono: 'info',
        titulo: 'Sesión de demostración',
        descripcion: 'Este playground no cierra sesiones reales.',
      });
      return;
    }

    void this.router.navigateByUrl(enlace.href);
  }

  protected alternarTema(): void {
    const nuevoModo = !this.modoOscuro();
    this.modoOscuro.set(nuevoModo);

    if (typeof document === 'undefined') return;

    if (nuevoModo) {
      document.documentElement.dataset['theme'] = 'dark';
    } else {
      delete document.documentElement.dataset['theme'];
    }
  }
}
