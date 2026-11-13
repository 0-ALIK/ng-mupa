import { afterNextRender, DestroyRef, Directive, ElementRef, inject, output } from '@angular/core';

/**
 * Observa el ancho disponible del contenedor de un gráfico.
 *
 * Emite el ancho inicial y cada cambio de tamaño. Es infraestructura interna de
 * los gráficos del sistema.
 */
@Directive({
  selector: '[mupaChartResize]',
})
export class MupaChartResizeDirective {
  private readonly elemento = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly destruir = inject(DestroyRef);

  /** Emite el ancho medido en píxeles. */
  readonly anchoCambio = output<number>();

  constructor() {
    afterNextRender(() => {
      const nodo = this.elemento.nativeElement;
      this.emitir(nodo.getBoundingClientRect().width);

      if (typeof ResizeObserver === 'undefined') return;

      const observador = new ResizeObserver(([entrada]) => {
        this.emitir(entrada.contentRect.width);
      });
      observador.observe(nodo);
      this.destruir.onDestroy(() => observador.disconnect());
    });
  }

  private emitir(ancho: number): void {
    this.anchoCambio.emit(Math.max(1, ancho));
  }
}
