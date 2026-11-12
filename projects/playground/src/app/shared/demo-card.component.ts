import { Component, input } from '@angular/core';

@Component({
  selector: 'pg-demo-card',
  template: `
    <section class="pg-demo">
      <header class="pg-demo__cabecera">
        <h2>{{ titulo() }}</h2>
        @if (descripcion()) {
          <p>{{ descripcion() }}</p>
        }
      </header>

      <div class="pg-demo__muestra">
        <ng-content />
      </div>

      @if (codigo()) {
        <details class="pg-demo__codigo">
          <summary>Ver código</summary>
          <pre><code>{{ codigo() }}</code></pre>
        </details>
      }
    </section>
  `,
  styleUrl: './demo-card.component.css',
})
export class DemoCardComponent {
  readonly titulo = input.required<string>();
  readonly descripcion = input<string>();
  readonly codigo = input<string>();
}
