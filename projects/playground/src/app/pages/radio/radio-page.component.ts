import { Component, signal } from '@angular/core';
import { MupaRadio } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-radio-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaRadio],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Interacción"
        titulo="Radio"
        descripcion="Grupo de radio simple por defecto, con variante de tarjeta opcional."
      />

      <pg-demo-card
        titulo="Método de recepción"
        descripcion="Ejemplo original del patrón .radio con la apariencia simple."
        [codigo]="ejemploSimple"
      >
        <div class="pg-ancho pg-radio-demo">
          <mupa-radio
            nombre="metodo-recepcion"
            ariaLabel="Método de recepción"
            [opciones]="metodos"
            [(valor)]="metodo"
          />
          <p class="pg-radio-estado">
            Seleccionado: <strong>{{ metodo() }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Planes con tarjeta"
        descripcion="Variante propia: la tarjeta es opcional y no el comportamiento por defecto."
        [codigo]="ejemploTarjeta"
      >
        <div class="pg-ancho pg-radio-demo">
          <mupa-radio
            nombre="plan"
            ariaLabel="Plan"
            variante="tarjeta"
            orientacion="horizontal"
            [opciones]="planes"
            [(valor)]="plan"
          />
          <p class="pg-radio-estado">
            Plan seleccionado: <strong>{{ plan() }}</strong>
          </p>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/radio/radio.md" />
      </section>
    </div>
  `,
  styleUrl: './radio-page.component.css',
})
export class RadioPageComponent {
  protected readonly metodo = signal('transferencia');
  protected readonly plan = signal('profesional');

  protected readonly metodos = [
    {
      valor: 'transferencia',
      etiqueta: 'Transferencia bancaria',
      descripcion: 'SWIFT / IBAN',
    },
    {
      valor: 'paypal',
      etiqueta: 'PayPal',
      descripcion: 'Desembolso inmediato',
    },
  ];

  protected readonly planes = [
    {
      valor: 'basico',
      etiqueta: 'Básico',
      descripcion: 'Para una cuenta personal.',
    },
    {
      valor: 'profesional',
      etiqueta: 'Profesional',
      descripcion: 'Para equipos pequeños.',
    },
    {
      valor: 'institucional',
      etiqueta: 'Institucional',
      descripcion: 'Para toda la institución.',
    },
  ];

  protected readonly ejemploSimple = `<mupa-radio
  nombre="metodo-recepcion"
  ariaLabel="Método de recepción"
  [opciones]="[
    {
      valor: 'transferencia',
      etiqueta: 'Transferencia bancaria',
      descripcion: 'SWIFT / IBAN'
    },
    {
      valor: 'paypal',
      etiqueta: 'PayPal',
      descripcion: 'Desembolso inmediato'
    }
  ]"
  [(valor)]="metodo"
/>`;

  protected readonly ejemploTarjeta = `<mupa-radio
  nombre="plan"
  ariaLabel="Plan"
  variante="tarjeta"
  orientacion="horizontal"
  [opciones]="planes"
  [(valor)]="plan"
/>`;
}
