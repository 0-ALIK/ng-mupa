import { Directive, TemplateRef, input } from '@angular/core';

/**
 * Registra una plantilla de celda personalizada para `mupa-data-table`.
 *
 * Uso:
 * ```html
 * <mupa-data-table [columnas]="columnas" [filas]="filas">
 *   <ng-template mupaTemplate="acciones" let-fila let-indice="indice">
 *     <button>{{ fila['nombre'] }}</button>
 *   </ng-template>
 * </mupa-data-table>
 * ```
 *
 * La columna debe declarar `plantilla: 'acciones'`.
 */
@Directive({
  selector: 'ng-template[mupaTemplate]',
})
export class MupaTemplateDirective {
  /** Nombre de la plantilla. */
  readonly nombre = input.required<string>({ alias: 'mupaTemplate' });

  /** Referencia a la plantilla registrada. */
  readonly template: TemplateRef<unknown>;

  constructor(template: TemplateRef<unknown>) {
    this.template = template;
  }
}
