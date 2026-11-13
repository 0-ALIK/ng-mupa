import { Directive } from '@angular/core';

/**
 * Marca una cabecera personalizada dentro de `mupa-chart-card`.
 *
 * Permite que AreaChart y LineChart reproduzcan su cabecera exacta con
 * selectores de periodo o de serie.
 */
@Directive({
  selector: '[mupaChartHeader]',
})
export class MupaChartHeaderDirective {}
