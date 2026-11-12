import { Component, input } from '@angular/core';

@Component({
  selector: 'pg-page-header',
  template: `
    <header class="pg-cabecera">
      <p class="pg-cabecera__categoria">{{ categoria() }}</p>
      <h1 class="pg-cabecera__titulo">{{ titulo() }}</h1>
      <p class="pg-cabecera__descripcion">{{ descripcion() }}</p>
    </header>
  `,
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  readonly categoria = input.required<string>();
  readonly titulo = input.required<string>();
  readonly descripcion = input.required<string>();
}
