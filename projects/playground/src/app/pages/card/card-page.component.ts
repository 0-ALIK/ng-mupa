import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  MupaCard,
  MupaCardActionsDirective,
  MupaCardFooterDirective,
  MupaCardHeaderDirective,
  MupaCardMediaDirective,
  MupaIcon,
  MupaPill,
  type EstadoVisualCard,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface TramiteDemo {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface EstadoTramiteDemo {
  clave: 'normal' | 'hover' | 'pressed' | 'focus' | 'disabled';
  etiqueta: string;
  visual: EstadoVisualCard;
}

interface ServicioDemo {
  etiqueta: string;
  categoria: 'cyan' | 'lime';
  icono: string;
  titulo: string;
  descripcion: string;
  metaIcono: string;
  meta: string;
}

interface OpcionSeleccionDemo {
  clave: 'licencia' | 'permiso';
  etiqueta: string;
  color: 'blue' | 'purple';
  titulo: string;
  descripcion: string;
  meta: string;
}

@Component({
  selector: 'pg-card-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    NgOptimizedImage,
    MupaCard,
    MupaCardMediaDirective,
    MupaCardHeaderDirective,
    MupaCardFooterDirective,
    MupaCardActionsDirective,
    MupaIcon,
    MupaPill,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Contenido"
        titulo="Card"
        descripcion="Tarjeta genérica y composable: superficie, layout, interacción, selección, estados e imágenes. Sin variantes semánticas; el contenido se arma con inputs o ranuras."
      />

      <pg-demo-card
        titulo="Tarjeta de trámite · estados"
        descripcion="Réplica de tramite-card-card.html: normal, hover, pressed, foco con teclado y disabled."
        [codigo]="ejemploEstadoTramite"
      >
        <div class="pg-muestra-tramite">
          <div class="pg-tramite-estados">
            @for (estado of estadosTramite; track estado.clave) {
              <div class="pg-estado">
                <span class="pg-estado__etiqueta">{{ estado.etiqueta }}</span>

                <mupa-card
                  class="pg-tramite"
                  [class.pg-tramite--hover]="estado.clave === 'hover'"
                  [class.pg-tramite--pressed]="estado.clave === 'pressed'"
                  [class.pg-tramite--off]="estado.clave === 'disabled'"
                  direccion="horizontal"
                  radio="sm"
                  espaciado="md"
                  borde="grueso"
                  sombra="sutil"
                  [tinteHover]="estado.clave === 'hover' || estado.clave === 'pressed'"
                  [escalaPresionada]="estado.clave === 'hover' || estado.clave === 'pressed'"
                  [estadoVisual]="estado.visual"
                  [deshabilitada]="estado.clave === 'disabled'"
                  titulo="Consultar Placa"
                  descripcion="Verifica el estado de tu vehículo."
                >
                  <span
                    mupaCardMedia
                    class="pg-tramite__icono"
                    [class.pg-tramite__icono--off]="estado.clave === 'disabled'"
                  >
                    <mupa-icon nombre="car" [tamano]="20" />
                  </span>

                  <span
                    mupaCardActions
                    class="pg-tramite__flecha"
                    [class.pg-tramite__flecha--off]="estado.clave === 'disabled'"
                    aria-hidden="true"
                  >
                    <span class="pg-tramite__flecha-icono">
                      <mupa-icon nombre="arrow-right" [tamano]="18" />
                    </span>
                  </span>
                </mupa-card>
              </div>
            }
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tarjeta de trámite · en uso"
        descripcion="Los seis trámites más populares del sistema original. Prueba hover, clic y teclado."
        [codigo]="ejemploTramite"
      >
        <div class="pg-muestra-tramite">
          <div class="pg-tramite-grid">
            @for (tramite of tramites; track tramite.titulo) {
              <mupa-card
                class="pg-tramite"
                direccion="horizontal"
                radio="sm"
                espaciado="md"
                borde="grueso"
                sombra="sutil"
                href="#"
                [tinteHover]="true"
                [escalaPresionada]="true"
                [titulo]="tramite.titulo"
                [descripcion]="tramite.descripcion"
                (clic)="alUsarTramite($event, tramite.titulo)"
              >
                <span mupaCardMedia class="pg-tramite__icono">
                  <mupa-icon [nombre]="tramite.icono" [tamano]="20" />
                </span>

                <span mupaCardActions class="pg-tramite__flecha" aria-hidden="true">
                  <span class="pg-tramite__flecha-icono">
                    <mupa-icon nombre="arrow-right" [tamano]="18" />
                  </span>
                </span>
              </mupa-card>
            }
          </div>

          @if (ultimoTramite()) {
            <span class="pg-ayuda" role="status">
              Trámite seleccionado: {{ ultimoTramite() }}
            </span>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tarjetas de servicio"
        descripcion="Réplica de preview/comp-cards.html: categoría, imagen, título, descripción y meta."
        [codigo]="ejemploServicio"
      >
        <div class="pg-servicios">
          @for (servicio of servicios; track servicio.titulo) {
            <mupa-card
              class="pg-servicio"
              radio="card"
              espaciado="sm"
              borde="ninguno"
              sombra="sm"
              [mediaCompleta]="true"
            >
              <div
                mupaCardMedia
                [class]="'pg-servicio__media pg-servicio__media--' + servicio.categoria"
              >
                <mupa-icon [nombre]="servicio.icono" [tamano]="30" />
              </div>

              <div class="pg-servicio__cuerpo">
                <span
                  [class]="'pg-servicio__etiqueta pg-servicio__etiqueta--' + servicio.categoria"
                >
                  {{ servicio.etiqueta }}
                </span>

                <p class="pg-servicio__titulo">{{ servicio.titulo }}</p>
                <p class="pg-servicio__descripcion">
                  {{ servicio.descripcion }}
                </p>

                <div class="pg-servicio__meta">
                  <mupa-icon [nombre]="servicio.metaIcono" [tamano]="13" />
                  {{ servicio.meta }}
                </div>
              </div>
            </mupa-card>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Card con imagen"
        descripcion="La ranura mupaCardMedia acepta imágenes. Ejemplos de imagen completa, seleccionable y lateral."
        [codigo]="ejemploImagen"
      >
        <div class="pg-muestra-imagenes">
          <div class="pg-imagenes">
            <mupa-card
              class="pg-imagen-card"
              href="#"
              radio="card"
              espaciado="sm"
              borde="ninguno"
              sombra="sm"
              [mediaCompleta]="true"
              [tinteHover]="true"
              [escalaPresionada]="true"
              titulo="Cascadas y senderos para explorar"
              descripcion="Descubre rutas naturales, miradores y espacios al aire libre para toda la familia."
              (clic)="alUsarImagen($event, 'Cascadas y senderos')"
            >
              <div mupaCardMedia class="pg-imagen__media">
                <img
                  ngSrc="/example.jpg"
                  width="7952"
                  height="5304"
                  alt="Cascada rodeada de montañas verdes"
                  class="pg-imagen__img"
                />
              </div>

              <mupa-pill mupaCardHeader etiqueta="Naturaleza" color="lime" />

              <span mupaCardFooter class="pg-imagen__meta">
                <mupa-icon nombre="map-pin" [tamano]="13" />
                Parque natural · Ciudad de Panamá
              </span>
            </mupa-card>

            <mupa-card
              class="pg-imagen-card"
              [seleccionable]="true"
              [seleccionada]="imagenSeleccionada()"
              (seleccionadaChange)="imagenSeleccionada.set($event)"
              [tinteHover]="true"
              [escalaPresionada]="true"
              radio="card"
              espaciado="sm"
              borde="fino"
              sombra="sm"
              [mediaCompleta]="true"
              titulo="Mirador de la cascada"
              descripcion="Guarda este lugar para tu próxima visita."
            >
              <div mupaCardMedia class="pg-imagen__media">
                <img
                  ngSrc="/example.jpg"
                  width="7952"
                  height="5304"
                  alt=""
                  class="pg-imagen__img"
                />
              </div>

              <mupa-pill mupaCardHeader etiqueta="Favorito" color="blue" />

              <span mupaCardFooter class="pg-imagen__meta">
                <mupa-icon nombre="map-pin" [tamano]="13" />
                Sendero norte · 1.2 km
              </span>

              @if (imagenSeleccionada()) {
                <span mupaCardActions class="pg-imagen__check" aria-hidden="true">
                  <mupa-icon nombre="circle-check" [tamano]="22" />
                </span>
              }
            </mupa-card>

            <mupa-card
              class="pg-imagen-card pg-imagen-card--lateral"
              direccion="horizontal"
              radio="card"
              espaciado="sm"
              borde="fino"
              sombra="sm"
              href="#"
              [tinteHover]="true"
              [escalaPresionada]="true"
              titulo="Ruta de las cascadas"
              descripcion="Un recorrido de 2 km entre vegetación y agua."
              (clic)="alUsarImagen($event, 'Ruta de las cascadas')"
            >
              <div mupaCardMedia class="pg-imagen__media pg-imagen__media--lateral">
                <img
                  ngSrc="/example.jpg"
                  width="7952"
                  height="5304"
                  alt=""
                  class="pg-imagen__img"
                />
              </div>

              <span mupaCardFooter class="pg-imagen__meta">
                <mupa-icon nombre="clock" [tamano]="13" />
                2 h · Dificultad baja
              </span>

              <span mupaCardActions class="pg-imagen__flecha" aria-hidden="true">
                <span class="pg-imagen__flecha-icono">
                  <mupa-icon nombre="arrow-right" [tamano]="18" />
                </span>
              </span>
            </mupa-card>
          </div>

          @if (ultimaTarjetaImagen()) {
            <span class="pg-ayuda" role="status"> Clic en: {{ ultimaTarjetaImagen() }} </span>
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Selección"
        descripcion="La tarjeta seleccionable usa aria-pressed, borde y fondo primario. El check lo dibuja el consumidor en una ranura."
        [codigo]="ejemploSeleccion"
      >
        <div class="pg-seleccion">
          @for (opcion of opcionesSeleccion; track opcion.clave) {
            <mupa-card
              [seleccionable]="true"
              [seleccionada]="seleccionServicio() === opcion.clave"
              (seleccionadaChange)="alSeleccionar(opcion.clave, $event)"
              [tinteHover]="true"
              [escalaPresionada]="true"
              [titulo]="opcion.titulo"
              [descripcion]="opcion.descripcion"
            >
              <mupa-pill mupaCardHeader [etiqueta]="opcion.etiqueta" [color]="opcion.color" />

              <span mupaCardFooter class="pg-seleccion__meta">
                <mupa-icon nombre="clock" [tamano]="13" />
                {{ opcion.meta }}
              </span>

              @if (seleccionServicio() === opcion.clave) {
                <span mupaCardActions class="pg-seleccion__check" aria-hidden="true">
                  <mupa-icon nombre="circle-check" [tamano]="22" />
                </span>
              }
            </mupa-card>
          }
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/card/card.md" />
      </section>
    </div>
  `,
  styleUrl: './card-page.component.css',
})
export class CardPageComponent {
  protected readonly ultimoTramite = signal('');
  protected readonly ultimaTarjetaImagen = signal('');
  protected readonly imagenSeleccionada = signal(false);
  protected readonly seleccionServicio = signal<'licencia' | 'permiso' | null>('licencia');

  protected readonly estadosTramite: readonly EstadoTramiteDemo[] = [
    { clave: 'normal', etiqueta: 'Normal', visual: 'auto' },
    { clave: 'hover', etiqueta: 'Hover', visual: 'hover' },
    { clave: 'pressed', etiqueta: 'Pressed', visual: 'pressed' },
    { clave: 'focus', etiqueta: 'Foco con teclado', visual: 'focus' },
    { clave: 'disabled', etiqueta: 'Disabled', visual: 'auto' },
  ];

  protected readonly tramites: readonly TramiteDemo[] = [
    {
      icono: 'car',
      titulo: 'Consultar Placa',
      descripcion: 'Verifica el estado de tu vehículo.',
    },
    {
      icono: 'wallet',
      titulo: 'Pagar Online',
      descripcion: 'Consulta y paga tus trámites con Yappy, Tarjeta Débito o Crédito.',
    },
    {
      icono: 'user-search',
      titulo: 'Consultar Número de Contribuyente',
      descripcion: 'Ubica tu número de contribuyente.',
    },
    {
      icono: 'file-text',
      titulo: 'Consultar el Estado de tu Trámite',
      descripcion: 'Ingresa el número de trámite o de placa.',
    },
    {
      icono: 'shield-check',
      titulo: 'Validar Documento',
      descripcion: 'Confirma la autenticidad de un documento.',
    },
    {
      icono: 'user-plus',
      titulo: 'Solicitud de Nuevo Contribuyente',
      descripcion: 'Regístrate por primera vez.',
    },
  ];

  protected readonly servicios: readonly ServicioDemo[] = [
    {
      etiqueta: 'Servicios digitales',
      categoria: 'cyan',
      icono: 'map',
      titulo: 'Mapa de obras en tu corregimiento',
      descripcion: 'Consulta proyectos de infraestructura activos cerca de ti.',
      metaIcono: 'map-pin',
      meta: 'Calidonia · 4 obras',
    },
    {
      etiqueta: 'Deportes',
      categoria: 'lime',
      icono: 'volleyball',
      titulo: 'Reserva de canchas municipales',
      descripcion: 'Disponibilidad en tiempo real para tu equipo de barrio.',
      metaIcono: 'circle-check',
      meta: '12 canchas disponibles',
    },
  ];

  protected readonly opcionesSeleccion: readonly OpcionSeleccionDemo[] = [
    {
      clave: 'licencia',
      etiqueta: 'Licencia',
      color: 'blue',
      titulo: 'Licencia de funcionamiento',
      descripcion: 'Solicita la licencia comercial de tu negocio.',
      meta: '5 días hábiles',
    },
    {
      clave: 'permiso',
      etiqueta: 'Permiso',
      color: 'purple',
      titulo: 'Permiso de construcción',
      descripcion: 'Gestiona la revisión de planos y obra menor.',
      meta: '10 días hábiles',
    },
  ];

  protected alUsarTramite(evento: MouseEvent, titulo: string): void {
    evento.preventDefault();
    this.ultimoTramite.set(titulo);
  }

  protected alUsarImagen(evento: MouseEvent, titulo: string): void {
    evento.preventDefault();
    this.ultimaTarjetaImagen.set(titulo);
  }

  protected alSeleccionar(clave: 'licencia' | 'permiso', seleccionada: boolean): void {
    this.seleccionServicio.set(seleccionada ? clave : null);
  }

  protected readonly ejemploEstadoTramite = `<mupa-card
  direccion="horizontal"
  radio="sm"
  espaciado="md"
  borde="grueso"
  sombra="sutil"
  estadoVisual="hover"
  [tinteHover]="true"
  [escalaPresionada]="true"
  titulo="Consultar Placa"
  descripcion="Verifica el estado de tu vehículo."
>
  <span mupaCardMedia class="icono">
    <mupa-icon nombre="car" [tamano]="20" />
  </span>
  <span mupaCardActions class="flecha" aria-hidden="true">
    <mupa-icon nombre="arrow-right" [tamano]="18" />
  </span>
</mupa-card>`;

  protected readonly ejemploTramite = `<mupa-card
  direccion="horizontal"
  radio="sm"
  espaciado="md"
  borde="grueso"
  sombra="sutil"
  href="#"
  [tinteHover]="true"
  [escalaPresionada]="true"
  titulo="Consultar Placa"
  descripcion="Verifica el estado de tu vehículo."
  (clic)="alUsarTramite($event, 'Consultar Placa')"
>
  <span mupaCardMedia class="icono">
    <mupa-icon nombre="car" [tamano]="20" />
  </span>
  <span mupaCardActions class="flecha" aria-hidden="true">
    <mupa-icon nombre="arrow-right" [tamano]="18" />
  </span>
</mupa-card>`;

  protected readonly ejemploServicio = `<mupa-card
  radio="card"
  espaciado="sm"
  borde="ninguno"
  sombra="sm"
  [mediaCompleta]="true"
>
  <div mupaCardMedia class="media">
    <mupa-icon nombre="map" [tamano]="30" />
  </div>

  <div class="cuerpo">
    <span class="categoria">Servicios digitales</span>
    <p class="titulo">Mapa de obras en tu corregimiento</p>
    <p class="descripcion">Consulta proyectos de infraestructura activos cerca de ti.</p>
    <div class="meta">
      <mupa-icon nombre="map-pin" [tamano]="13" />
      Calidonia · 4 obras
    </div>
  </div>
</mupa-card>`;

  protected readonly ejemploImagen = `<mupa-card
  href="#"
  radio="card"
  espaciado="sm"
  borde="ninguno"
  sombra="sm"
  [mediaCompleta]="true"
  [tinteHover]="true"
  [escalaPresionada]="true"
  titulo="Cascadas y senderos para explorar"
  descripcion="Descubre rutas naturales, miradores y espacios al aire libre."
  (clic)="alUsarImagen($event, 'Cascadas y senderos')"
>
  <div mupaCardMedia class="media">
    <img
      ngSrc="/example.jpg"
      width="7952"
      height="5304"
      alt="Cascada rodeada de montañas verdes"
    />
  </div>

  <mupa-pill mupaCardHeader etiqueta="Naturaleza" color="lime" />

  <span mupaCardFooter>
    <mupa-icon nombre="map-pin" [tamano]="13" />
    Parque natural · Ciudad de Panamá
  </span>
</mupa-card>`;

  protected readonly ejemploSeleccion = `<mupa-card
  [seleccionable]="true"
  [(seleccionada)]="seleccionada"
  [tinteHover]="true"
  [escalaPresionada]="true"
  titulo="Licencia de funcionamiento"
  descripcion="Solicita la licencia comercial de tu negocio."
>
  <mupa-pill mupaCardHeader etiqueta="Licencia" color="blue" />

  <span mupaCardFooter>
    <mupa-icon nombre="clock" [tamano]="13" />
    5 días hábiles
  </span>

  @if (seleccionada) {
    <span mupaCardActions aria-hidden="true">
      <mupa-icon nombre="circle-check" [tamano]="22" />
    </span>
  }
</mupa-card>`;
}
