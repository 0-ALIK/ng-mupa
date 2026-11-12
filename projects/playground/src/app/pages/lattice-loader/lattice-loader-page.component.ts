import { Component, computed, signal } from '@angular/core';
import {
  ETIQUETAS_PATRON_LATTICE,
  MupaButton,
  MupaLatticeLoader,
  PATRONES_POR_CUADRICULA,
  type EstadoLattice,
  type FormaLattice,
  type NombrePatronLattice,
} from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface MuestraPatron {
  nombre: NombrePatronLattice;
  cuadricula: 3 | 4;
  etiqueta: string;
}

@Component({
  selector: 'pg-lattice-loader-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaLatticeLoader,
    MupaButton,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Mensajes y estados"
        titulo="Lattice loader"
        descripcion="Indicador de carga indeterminada con retícula animada, patrones, temporizador y estados de éxito o error."
      />

      <pg-demo-card
        titulo="Ejemplo interactivo"
        descripcion="Cambia la retícula, el patrón y la forma. Simula el resultado o pausa el movimiento."
        [codigo]="ejemploBasico"
      >
        <div class="pg-lattice-demo">
          <div class="pg-lattice-controles">
            <label class="pg-lattice-campo" for="lattice-cuadricula">
              Retícula
              <select
                id="lattice-cuadricula"
                [value]="cuadricula()"
                (change)="cambiarCuadricula($event)"
              >
                <option value="3" [selected]="cuadricula() === 3">3 × 3</option>
                <option value="4" [selected]="cuadricula() === 4">4 × 4</option>
              </select>
            </label>

            <label class="pg-lattice-campo" for="lattice-patron">
              Patrón
              <select id="lattice-patron" [value]="patron()" (change)="cambiarPatron($event)">
                @for (nombre of patronesDisponibles(); track nombre) {
                  <option [value]="nombre" [selected]="nombre === patron()">
                    {{ etiquetasPatron[nombre] }}
                  </option>
                }
              </select>
            </label>

            <label class="pg-lattice-campo" for="lattice-forma">
              Forma
              <select id="lattice-forma" [value]="forma()" (change)="cambiarForma($event)">
                <option value="round" [selected]="forma() === 'round'">Circular</option>
                <option value="square" [selected]="forma() === 'square'">Cuadrada</option>
              </select>
            </label>
          </div>

          <div class="pg-lattice-toggles">
            <label class="pg-lattice-toggle">
              <input
                type="checkbox"
                [checked]="mostrarTiempo()"
                (change)="cambiarMostrarTiempo($event)"
              />
              Mostrar tiempo
            </label>

            <label class="pg-lattice-toggle">
              <input
                type="checkbox"
                [checked]="resplandor()"
                (change)="cambiarResplandor($event)"
              />
              Resplandor
            </label>
          </div>

          <div class="pg-lattice-escenario">
            @for (version of versiones(); track version) {
              <mupa-lattice-loader
                etiqueta="Validando solicitud"
                [estado]="estado()"
                [patron]="patron()"
                [cuadricula]="cuadricula()"
                [forma]="forma()"
                [resplandor]="resplandor()"
                [mostrarTiempo]="mostrarTiempo()"
                [pausado]="pausado()"
                [tamanoCelda]="8"
              />
            }
            <p>{{ mensajeEstado() }}</p>
          </div>

          <div class="pg-lattice-acciones">
            <mupa-button [deshabilitado]="estado() !== 'working'" (clic)="estado.set('done')">
              Completar
            </mupa-button>

            <mupa-button
              variante="secondary"
              [deshabilitado]="estado() !== 'working'"
              (clic)="estado.set('error')"
            >
              Simular error
            </mupa-button>

            <mupa-button variante="ghost" (clic)="reiniciar()"> Reiniciar </mupa-button>

            <mupa-button variante="ghost" (clic)="alternarPausa()">
              {{ pausado() ? 'Reanudar animación' : 'Pausar animación' }}
            </mupa-button>
          </div>

          <p class="pg-lattice-pista">
            Pausar detiene el movimiento del ejemplo; el reloj sigue midiendo la operación. Con
            movimiento reducido, la retícula se muestra estática.
          </p>

          <section class="pg-lattice-seccion">
            <h3>Estados</h3>
            <div class="pg-lattice-estados">
              @for (estadoDemo of estadosDemo; track estadoDemo.clave) {
                <div class="pg-lattice-muestra">
                  <span>{{ estadoDemo.etiqueta }}</span>
                  <mupa-lattice-loader
                    [estado]="estadoDemo.clave"
                    [transcurrido]="3.2"
                    [cuadricula]="cuadricula()"
                    [forma]="forma()"
                    [pausado]="pausado()"
                    [mostrarTiempo]="false"
                  />
                </div>
              }
            </div>
          </section>

          <section class="pg-lattice-seccion">
            <h3>Patrones</h3>
            <div class="pg-lattice-patrones">
              @for (muestra of patronesDemo; track muestra.nombre) {
                <div class="pg-lattice-muestra">
                  <mupa-lattice-loader
                    [etiqueta]="muestra.etiqueta"
                    [patron]="muestra.nombre"
                    [cuadricula]="muestra.cuadricula"
                    [forma]="forma()"
                    [pausado]="pausado()"
                    [mostrarTiempo]="false"
                  />
                  <span>
                    {{ muestra.nombre }} · {{ muestra.cuadricula }} ×
                    {{ muestra.cuadricula }}
                  </span>
                </div>
              }
            </div>
          </section>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/lattice-loader/lattice-loader.md" />
      </section>
    </div>
  `,
  styleUrl: './lattice-loader-page.component.css',
})
export class LatticeLoaderPageComponent {
  protected readonly etiquetasPatron = ETIQUETAS_PATRON_LATTICE;

  protected readonly cuadricula = signal<3 | 4>(3);
  protected readonly patron = signal<NombrePatronLattice>('orbit');
  protected readonly forma = signal<FormaLattice>('round');
  protected readonly mostrarTiempo = signal(true);
  protected readonly resplandor = signal(false);
  protected readonly pausado = signal(false);
  protected readonly estado = signal<EstadoLattice>('working');
  protected readonly version = signal(0);

  protected readonly patronesDisponibles = computed(
    () => PATRONES_POR_CUADRICULA[this.cuadricula()],
  );

  protected readonly versiones = computed(() => [this.version()]);

  protected readonly estadosDemo: readonly {
    clave: EstadoLattice;
    etiqueta: string;
  }[] = [
    { clave: 'working', etiqueta: 'En curso' },
    { clave: 'done', etiqueta: 'Completado' },
    { clave: 'error', etiqueta: 'Error' },
  ];

  protected readonly patronesDemo: readonly MuestraPatron[] = (
    Object.keys(ETIQUETAS_PATRON_LATTICE) as NombrePatronLattice[]
  ).map((nombre) => ({
    nombre,
    cuadricula: PATRONES_POR_CUADRICULA[3].includes(nombre) ? 3 : 4,
    etiqueta: ETIQUETAS_PATRON_LATTICE[nombre],
  }));

  protected readonly mensajeEstado = computed(() => {
    if (this.estado() === 'working') {
      return 'La operación está en curso. Puedes simular su resultado con los controles.';
    }
    return this.estado() === 'done'
      ? 'La solicitud se validó correctamente.'
      : 'No se pudo validar la solicitud. Puedes reiniciar el ejemplo.';
  });

  protected cambiarCuadricula(evento: Event): void {
    const valor = Number((evento.target as HTMLSelectElement).value) === 4 ? 4 : 3;
    this.cuadricula.set(valor);

    if (!PATRONES_POR_CUADRICULA[valor].includes(this.patron())) {
      this.patron.set(valor === 3 ? 'orbit' : 'sweep');
    }
  }

  protected cambiarPatron(evento: Event): void {
    this.patron.set((evento.target as HTMLSelectElement).value as NombrePatronLattice);
  }

  protected cambiarForma(evento: Event): void {
    this.forma.set((evento.target as HTMLSelectElement).value as FormaLattice);
  }

  protected cambiarMostrarTiempo(evento: Event): void {
    this.mostrarTiempo.set((evento.target as HTMLInputElement).checked);
  }

  protected cambiarResplandor(evento: Event): void {
    this.resplandor.set((evento.target as HTMLInputElement).checked);
  }

  protected reiniciar(): void {
    this.estado.set('working');
    this.version.update((valor) => valor + 1);
  }

  protected alternarPausa(): void {
    this.pausado.update((valor) => !valor);
  }

  protected readonly ejemploBasico = `<mupa-lattice-loader
  etiqueta="Validando solicitud"
  estado="working"
  patron="orbit"
  [cuadricula]="3"
  [tamanoCelda]="8"
/>`;
}
