import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'pg-markdown-view',
  template: `
    @if (error()) {
      <p class="pg-markdown__error">{{ error() }}</p>
    } @else if (contenido()) {
      <div class="markdown-body" [innerHTML]="contenido()"></div>
    } @else {
      <p class="pg-markdown__estado">Cargando documentación…</p>
    }
  `,
  styleUrl: './markdown-view.component.css',
})
export class MarkdownViewComponent {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly destruir = inject(DestroyRef);

  readonly ruta = input.required<string>();

  protected readonly contenido = signal<SafeHtml | null>(null);
  protected readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const ruta = this.ruta();
      this.contenido.set(null);
      this.error.set(null);

      this.http
        .get(ruta, { responseType: 'text' })
        .pipe(takeUntilDestroyed(this.destruir))
        .subscribe({
          next: (texto) => {
            const sinTitulo = texto.replace(/^#\s+.+\r?\n+/, '');
            const html = marked.parse(sinTitulo, { async: false }) as string;
            this.contenido.set(this.sanitizer.bypassSecurityTrustHtml(html));
          },
          error: () => {
            this.error.set('No se pudo cargar la documentación del componente.');
          },
        });
    });
  }
}
