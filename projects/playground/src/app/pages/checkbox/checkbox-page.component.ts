import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MupaButton, MupaCheckbox } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

interface OpcionCheckbox {
  id: string;
  etiqueta: string;
}

@Component({
  selector: 'pg-checkbox-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaCheckbox,
    MupaButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Checkbox"
        descripcion="Casilla de verificación nativa para seleccionar varios elementos o activar un valor. Incluye estado indeterminado."
      />

      <pg-demo-card
        titulo="Estados"
        descripcion="Sin marcar, marcado, indeterminado y deshabilitado. El estado indeterminado se anuncia como mixto."
        [codigo]="ejemploEstados"
      >
        <div class="pg-columna">
          <mupa-checkbox
            etiqueta="Sin marcar"
            [marcado]="marcado()"
            (marcadoChange)="marcado.set($event)"
          />
          <mupa-checkbox
            etiqueta="Marcado"
            [marcado]="marcadoFijo()"
            (marcadoChange)="marcadoFijo.set($event)"
          />
          <mupa-checkbox etiqueta="Indeterminado" [indeterminado]="true" />
          <mupa-checkbox etiqueta="Deshabilitado" [deshabilitado]="true" />
          <mupa-checkbox
            etiqueta="Marcado y deshabilitado"
            [marcado]="true"
            [deshabilitado]="true"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Lista de selección múltiple"
        descripcion="Cada casilla controla su propio estado. La selección se conserva en un conjunto de identificadores."
        [codigo]="ejemploLista"
      >
        <div class="pg-columna">
          @for (opcion of opciones; track opcion.id) {
            <mupa-checkbox
              [etiqueta]="opcion.etiqueta"
              [marcado]="seleccionadas().has(opcion.id)"
              (marcadoChange)="alternar(opcion.id, $event)"
            />
          }
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Selección total"
        descripcion="El patrón habitual: una casilla maestra indeterminada cuando solo hay una parte seleccionada."
        [codigo]="ejemploMaestro"
      >
        <div class="pg-columna">
          <mupa-checkbox
            etiqueta="Seleccionar todos los servicios"
            [marcado]="todos()"
            [indeterminado]="seleccionParcial()"
            (marcadoChange)="alternarTodos($event)"
          />
          <div class="pg-columna" style="margin-left: 30px">
            @for (opcion of opciones; track opcion.id) {
              <mupa-checkbox
                [etiqueta]="opcion.etiqueta"
                [marcado]="seleccionadas().has(opcion.id)"
                (marcadoChange)="alternar(opcion.id, $event)"
              />
            }
          </div>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Reactive Forms"
        descripcion="Las casillas implementan ControlValueAccessor. El FormControl controla el valor, el estado deshabilitado y el estado tocado."
        [codigo]="ejemploFormControl"
      >
        <div class="pg-columna">
          <mupa-checkbox
            [formControl]="controlAcepto"
            etiqueta="Acepto los términos y condiciones"
            [requerido]="true"
          />
          <mupa-checkbox
            [formControl]="controlNotificaciones"
            etiqueta="Recibir notificaciones por correo"
          />

          <span class="pg-ayuda">
            Acepto: {{ controlAcepto.value }} · Tocado: {{ controlAcepto.touched }} · Válido:
            {{ controlAcepto.valid }}
          </span>

          <div class="pg-fila">
            <mupa-button variante="secondary" tamano="sm" (clic)="marcarTocado()">
              Marcar como tocado
            </mupa-button>
            <mupa-button
              variante="ghost"
              tamano="sm"
              (clic)="controlAcepto.setValue(!controlAcepto.value)"
            >
              Alternar desde el control
            </mupa-button>
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/checkbox/checkbox.md" />
      </section>
    </div>
  `,
})
export class CheckboxPageComponent {
  protected readonly marcado = signal(false);
  protected readonly marcadoFijo = signal(true);

  protected readonly opciones: readonly OpcionCheckbox[] = [
    { id: 'baches', etiqueta: 'Reportes de baches' },
    { id: 'alumbrado', etiqueta: 'Alumbrado público' },
    { id: 'aseo', etiqueta: 'Aseo y recolección' },
    { id: 'areas-verdes', etiqueta: 'Áreas verdes' },
  ];

  protected readonly seleccionadas = signal<ReadonlySet<string>>(new Set(['baches', 'alumbrado']));

  protected readonly todos = computed(() => this.seleccionadas().size === this.opciones.length);

  protected readonly seleccionParcial = computed(
    () => this.seleccionadas().size > 0 && !this.todos(),
  );

  protected alternar(id: string, marcado: boolean): void {
    this.seleccionadas.update((actual) => {
      const nuevo = new Set(actual);
      if (marcado) {
        nuevo.add(id);
      } else {
        nuevo.delete(id);
      }
      return nuevo;
    });
  }

  protected alternarTodos(marcado: boolean): void {
    this.seleccionadas.set(marcado ? new Set(this.opciones.map((opcion) => opcion.id)) : new Set());
  }

  protected readonly ejemploEstados = `<mupa-checkbox
  etiqueta="Sin marcar"
  [(marcado)]="marcado"
/>

<mupa-checkbox etiqueta="Indeterminado" [indeterminado]="true" />

<mupa-checkbox etiqueta="Deshabilitado" [deshabilitado]="true" />`;

  protected readonly ejemploLista = `<mupa-checkbox
  etiqueta="Reportes de baches"
  [marcado]="seleccionadas().has('baches')"
  (marcadoChange)="alternar('baches', $event)"
/>`;

  protected readonly ejemploMaestro = `<mupa-checkbox
  etiqueta="Seleccionar todos los servicios"
  [marcado]="todos()"
  [indeterminado]="seleccionParcial()"
  (marcadoChange)="alternarTodos($event)"
/>`;

  protected readonly controlAcepto = new FormControl(false, {
    nonNullable: true,
    validators: [Validators.requiredTrue],
  });

  protected readonly controlNotificaciones = new FormControl(true, {
    nonNullable: true,
  });

  protected marcarTocado(): void {
    this.controlAcepto.markAsTouched();
    this.controlAcepto.updateValueAndValidity();
  }

  protected readonly ejemploFormControl = `// Componente
controlAcepto = new FormControl(false, {
  nonNullable: true,
  validators: [Validators.requiredTrue],
});

// Template
<mupa-checkbox
  [formControl]="controlAcepto"
  etiqueta="Acepto los términos y condiciones"
  [requerido]="true"
/>

<mupa-checkbox
  [formControl]="controlNotificaciones"
  etiqueta="Recibir notificaciones por correo"
/>`;
}
