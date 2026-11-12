import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MupaButton, MupaDatePicker, type RangoFechas } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-date-picker-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaDatePicker,
    MupaButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="DatePicker"
        descripcion="Calendario mensual para elegir una fecha o un rango. Incluye navegación por teclado, día actual y días de meses vecinos atenuados."
      />

      <pg-demo-card
        titulo="Fecha única"
        descripcion="Selecciona un día con clic o con Enter/Espacio. El estado de la selección se anuncia en la parte inferior."
        [codigo]="ejemploFecha"
      >
        <div class="pg-columna">
          <mupa-date-picker [fecha]="fecha()" (fechaChange)="fecha.set($event)" />
          <span class="pg-ayuda">Seleccionada: {{ fechaTexto() }}</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Rango de fechas"
        descripcion="El primer clic define el inicio y el segundo el fin. Si eliges una fecha anterior al inicio, el rango se invierte."
        [codigo]="ejemploRango"
      >
        <div class="pg-columna">
          <mupa-date-picker modo="range" [rango]="rango()" (rangoChange)="rango.set($event)" />
          <span class="pg-ayuda">{{ rangoTexto() }}</span>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Ancho"
        descripcion="El calendario se adapta al ancho indicado y nunca supera el contenedor."
        [codigo]="ejemploAncho"
      >
        <mupa-date-picker [ancho]="280" />
      </pg-demo-card>

      <pg-demo-card
        titulo="Reactive Forms"
        descripcion="El calendario implementa ControlValueAccessor. En modo simple el FormControl contiene un Date; en modo rango, un objeto RangoFechas."
        [codigo]="ejemploFormControl"
      >
        <div class="pg-columna">
          <mupa-date-picker [formControl]="controlFecha" />

          <span class="pg-ayuda">
            Valor: {{ controlFecha.value?.toLocaleDateString('es-PA') ?? 'ninguno' }} · Tocado:
            {{ controlFecha.touched }} · Válido: {{ controlFecha.valid }}
          </span>

          <div class="pg-fila">
            <mupa-button variante="secondary" tamano="sm" (clic)="controlFecha.markAsTouched()">
              Marcar como tocado
            </mupa-button>
            <mupa-button variante="ghost" tamano="sm" (clic)="seleccionarManana()">
              Seleccionar mañana
            </mupa-button>
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/date-picker/date-picker.md" />
      </section>
    </div>
  `,
})
export class DatePickerPageComponent {
  protected readonly fecha = signal<Date | null>(null);
  protected readonly rango = signal<RangoFechas>({ inicio: null, fin: null });

  protected readonly fechaTexto = computed(
    () => this.fecha()?.toLocaleDateString('es-PA') ?? 'ninguna',
  );

  protected readonly rangoTexto = computed(() => {
    const rango = this.rango();
    if (!rango.inicio) return 'Selecciona una fecha inicial y una final.';
    if (!rango.fin) {
      return `Inicio: ${rango.inicio.toLocaleDateString('es-PA')}. Selecciona la fecha final.`;
    }
    return `Del ${rango.inicio.toLocaleDateString('es-PA')} al ${rango.fin.toLocaleDateString('es-PA')}`;
  });

  protected readonly ejemploFecha = `<mupa-date-picker
  [fecha]="fechaSeleccionada()"
  (fechaChange)="fechaSeleccionada.set($event)"
/>`;

  protected readonly ejemploRango = `<mupa-date-picker
  modo="range"
  [rango]="rangoSeleccionado()"
  (rangoChange)="rangoSeleccionado.set($event)"
/>`;

  protected readonly ejemploAncho = `<mupa-date-picker [ancho]="280" />`;

  protected readonly controlFecha = new FormControl<Date | null>(new Date(2026, 0, 15));

  protected seleccionarManana(): void {
    const actual = this.controlFecha.value ?? new Date();
    const manana = new Date(actual);
    manana.setDate(manana.getDate() + 1);
    this.controlFecha.setValue(manana);
  }

  protected readonly ejemploFormControl = `// Componente
controlFecha = new FormControl<Date | null>(new Date(2026, 0, 15));

// Template
<mupa-date-picker [formControl]="controlFecha" />`;
}
