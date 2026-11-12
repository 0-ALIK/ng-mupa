import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { MupaFormControlBase } from '../forms/form-control-base';
import { MupaIcon } from '../icon/icon.component';
import type { CeldaCalendario, ModoDatePicker, RangoFechas } from './date-picker.types';

const NOMBRES_DIAS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const DIAS_SEMANA = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

let secuenciaDatePicker = 0;

/**
 * Calendario de selección de fecha o rango.
 *
 * Réplica del Lego Design System — Alcaldía de Panamá: grilla mensual que
 * comienza en lunes, día actual marcado, rango resaltado y navegación completa
 * por teclado.
 */
@Component({
  selector: 'mupa-date-picker',
  imports: [MupaIcon],
  template: `
    <div
      class="mupa-datepicker"
      role="group"
      [class.mupa-datepicker--deshabilitado]="estaDeshabilitado()"
      [class.mupa-datepicker--error]="mostrarError()"
      [attr.aria-label]="modo() === 'range' ? 'Elegir un rango de fechas' : 'Elegir una fecha'"
      [attr.aria-describedby]="error() ? idAyuda + ' ' + idError : idAyuda"
      [attr.aria-disabled]="estaDeshabilitado() ? 'true' : null"
      [attr.aria-required]="requerido() || requeridoFormulario() ? 'true' : null"
      [attr.aria-invalid]="invalido() ? 'true' : null"
      [style.width.px]="ancho()"
    >
      <div class="mupa-datepicker__cabecera">
        <button
          type="button"
          class="mupa-datepicker__nav"
          aria-label="Mes anterior"
          [disabled]="estaDeshabilitado()"
          (click)="moverMes(-1)"
        >
          <mupa-icon nombre="chevron-left" [tamano]="18" color="var(--fg-strong)" />
        </button>

        <div class="mupa-datepicker__mes" [id]="idMes" aria-live="polite">{{ nombreMes() }}</div>

        <button
          type="button"
          class="mupa-datepicker__nav"
          aria-label="Mes siguiente"
          [disabled]="estaDeshabilitado()"
          (click)="moverMes(1)"
        >
          <mupa-icon nombre="chevron-right" [tamano]="18" color="var(--fg-strong)" />
        </button>
      </div>

      <div #grilla class="mupa-datepicker__grilla" role="grid" [attr.aria-labelledby]="idMes">
        <div role="row" class="mupa-datepicker__semana mupa-datepicker__semana--cabecera">
          @for (dia of diasSemana; track $index; let i = $index) {
            <div
              role="columnheader"
              class="mupa-datepicker__dia-semana"
              [attr.aria-label]="nombresDias[i]"
            >
              {{ dia }}
            </div>
          }
        </div>

        @for (semana of semanas(); track $index) {
          <div role="row" class="mupa-datepicker__semana">
            @for (celda of semana; track celda.fecha.getTime()) {
              <div
                role="gridcell"
                class="mupa-datepicker__celda"
                [attr.aria-selected]="esSeleccionada(celda)"
              >
                <button
                  type="button"
                  class="mupa-datepicker__dia"
                  [class.mupa-datepicker__dia--hoy]="
                    esHoy(celda) && !esExtremo(celda) && !esEntre(celda)
                  "
                  [class.mupa-datepicker__dia--seleccionado]="esExtremo(celda)"
                  [class.mupa-datepicker__dia--rango]="esEntre(celda)"
                  [disabled]="celda.atenuada || estaDeshabilitado()"
                  [attr.tabindex]="celda.atenuada ? -1 : esFoco(celda) ? 0 : -1"
                  [attr.data-date]="celda.fecha.getTime()"
                  [attr.aria-current]="esHoy(celda) ? 'date' : null"
                  [attr.aria-label]="etiquetaDia(celda.fecha)"
                  (focus)="foco.set(celda.fecha)"
                  (keydown)="alPresionarTeclaDia($event, celda.fecha)"
                  (click)="elegirDia(celda.fecha)"
                >
                  {{ celda.dia }}
                </button>
              </div>
            }
          </div>
        }
      </div>

      <p class="mupa-datepicker__ayuda" [id]="idAyuda">
        Usa las flechas para recorrer los días. Inicio y Fin recorren la semana; Re Pág y Av Pág
        cambian el mes. Con Mayús cambian el año.
      </p>

      <p class="mupa-datepicker__estado" role="status">{{ textoEstado() }}</p>

      @if (error()) {
        <p class="mupa-datepicker__error" [id]="idError" role="alert">{{ error() }}</p>
      }
    </div>
  `,
  styleUrl: './date-picker.component.css',
})
export class MupaDatePicker
  extends MupaFormControlBase<Date | RangoFechas | null>
  implements OnInit
{
  private readonly uid = `mupa-datepicker-${++secuenciaDatePicker}`;

  protected readonly idMes = `${this.uid}-mes`;
  protected readonly idAyuda = `${this.uid}-ayuda`;
  protected readonly idError = `${this.uid}-error`;
  protected readonly diasSemana = DIAS_SEMANA;
  protected readonly nombresDias = NOMBRES_DIAS;
  protected readonly hoy = inicioDelDia(new Date());

  protected readonly vista = signal(this.hoy);
  protected readonly foco = signal(this.hoy);
  private readonly pendienteEnfocar = signal(false);

  private readonly grilla = viewChild<ElementRef<HTMLElement>>('grilla');

  /** Modo de selección: una fecha o un rango. */
  readonly modo = input<ModoDatePicker>('single');

  /** Fecha seleccionada en modo simple. Admite `[(fecha)]`. */
  readonly fecha = model<Date | null>(null);

  /** Rango seleccionado en modo rango. Admite `[(rango)]`. */
  readonly rango = model<RangoFechas>({ inicio: null, fin: null });

  /** Ancho del calendario en píxeles. */
  readonly ancho = input(344);

  /** Deshabilita la selección y la navegación. */
  readonly deshabilitado = input(false, { transform: booleanAttribute });

  /** Marca el calendario como requerido. */
  readonly requerido = input(false, { transform: booleanAttribute });

  /** Mensaje de error del formulario. */
  readonly error = input<string>();

  /** Emitido con la fecha o el rango al elegir un día. */
  readonly seleccion = output<Date | RangoFechas>();

  protected readonly estaDeshabilitado = computed(
    () => this.deshabilitado() || this.deshabilitadoEfectivo(),
  );

  protected readonly invalido = computed(() => Boolean(this.error()) || this.invalidoFormulario());

  protected readonly mostrarError = computed(
    () => Boolean(this.error()) || (this.invalidoFormulario() && this.tocadoFormulario()),
  );

  protected readonly anio = computed(() => this.vista().getFullYear());
  protected readonly mes = computed(() => this.vista().getMonth());
  protected readonly celdas = computed(() => construirGrillaMes(this.anio(), this.mes()));

  protected readonly semanas = computed(() => {
    const celdas = this.celdas();
    const semanas: CeldaCalendario[][] = [];

    for (let indice = 0; indice < celdas.length; indice += 7) {
      semanas.push(celdas.slice(indice, indice + 7));
    }

    return semanas;
  });

  protected readonly nombreMes = computed(() => `${MESES[this.mes()]} ${this.anio()}`);

  protected readonly textoEstado = computed(() => {
    if (this.modo() === 'single') {
      const fecha = this.fecha();
      return fecha
        ? `Fecha seleccionada: ${fecha.toLocaleDateString('es-PA')}`
        : 'Selecciona una fecha.';
    }

    const rango = this.rango();
    if (!rango.inicio) {
      return 'Selecciona la fecha inicial y luego la final.';
    }
    if (!rango.fin) {
      return `Inicio: ${rango.inicio.toLocaleDateString('es-PA')}. Selecciona la fecha final.`;
    }
    return `Del ${rango.inicio.toLocaleDateString('es-PA')} al ${rango.fin.toLocaleDateString('es-PA')}`;
  });

  constructor() {
    super();

    effect(() => {
      if (!this.pendienteEnfocar()) return;

      const fecha = this.foco();
      if (typeof requestAnimationFrame === 'undefined') {
        this.pendienteEnfocar.set(false);
        return;
      }

      requestAnimationFrame(() => {
        const grilla = this.grilla()?.nativeElement;
        const boton = grilla?.querySelector<HTMLButtonElement>(
          `[data-date="${inicioDelDia(fecha).getTime()}"]`,
        );

        if (boton) {
          this.pendienteEnfocar.set(false);
          boton.focus();
        }
      });
    });
  }

  ngOnInit(): void {
    const inicial =
      this.modo() === 'single' ? (this.fecha() ?? this.hoy) : (this.rango().inicio ?? this.hoy);
    const fecha = inicioDelDia(inicial);

    this.vista.set(fecha);
    this.foco.set(fecha);
  }

  protected moverMes(delta: number): void {
    if (this.estaDeshabilitado()) return;
    const siguiente = desplazarMes(this.foco(), delta);
    this.vista.set(siguiente);
    this.foco.set(siguiente);
  }

  protected alPresionarTeclaDia(evento: KeyboardEvent, fecha: Date): void {
    if (this.estaDeshabilitado()) return;
    let siguiente = new Date(fecha);
    const diaSemana = (fecha.getDay() + 6) % 7;

    if (evento.key === 'ArrowLeft') {
      siguiente.setDate(siguiente.getDate() - 1);
    } else if (evento.key === 'ArrowRight') {
      siguiente.setDate(siguiente.getDate() + 1);
    } else if (evento.key === 'ArrowUp') {
      siguiente.setDate(siguiente.getDate() - 7);
    } else if (evento.key === 'ArrowDown') {
      siguiente.setDate(siguiente.getDate() + 7);
    } else if (evento.key === 'Home') {
      siguiente.setDate(siguiente.getDate() - diaSemana);
    } else if (evento.key === 'End') {
      siguiente.setDate(siguiente.getDate() + 6 - diaSemana);
    } else if (evento.key === 'PageUp') {
      siguiente = desplazarMes(fecha, evento.shiftKey ? -12 : -1);
    } else if (evento.key === 'PageDown') {
      siguiente = desplazarMes(fecha, evento.shiftKey ? 12 : 1);
    } else {
      return;
    }

    evento.preventDefault();
    evento.stopPropagation();
    this.pendienteEnfocar.set(true);
    this.vista.set(siguiente);
    this.foco.set(siguiente);
  }

  protected elegirDia(fecha: Date): void {
    if (this.estaDeshabilitado()) return;
    this.foco.set(fecha);

    if (this.modo() === 'single') {
      this.fecha.set(fecha);
      this.notificarCambio(fecha);
      this.notificarTocado();
      this.seleccion.emit(fecha);
      return;
    }

    const actual = this.rango();
    let siguiente: RangoFechas;

    if (!actual.inicio || (actual.inicio && actual.fin)) {
      siguiente = { inicio: fecha, fin: null };
    } else if (fecha < actual.inicio) {
      siguiente = { inicio: fecha, fin: actual.inicio };
    } else {
      siguiente = { inicio: actual.inicio, fin: fecha };
    }

    this.rango.set(siguiente);
    this.notificarCambio(siguiente);
    this.notificarTocado();
    this.seleccion.emit(siguiente);
  }

  protected esHoy(celda: CeldaCalendario): boolean {
    return mismoDia(celda.fecha, this.hoy);
  }

  protected esFoco(celda: CeldaCalendario): boolean {
    return mismoDia(celda.fecha, this.foco());
  }

  protected esExtremo(celda: CeldaCalendario): boolean {
    if (this.modo() === 'single') {
      return mismoDia(celda.fecha, this.fecha());
    }

    const rango = this.rango();
    return mismoDia(celda.fecha, rango.inicio) || mismoDia(celda.fecha, rango.fin);
  }

  protected esEntre(celda: CeldaCalendario): boolean {
    if (this.modo() !== 'range') return false;
    const rango = this.rango();
    return enRango(celda.fecha, rango.inicio, rango.fin);
  }

  protected esSeleccionada(celda: CeldaCalendario): boolean {
    return this.esExtremo(celda) || this.esEntre(celda);
  }

  protected etiquetaDia(fecha: Date): string {
    return fecha.toLocaleDateString('es-PA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  protected escribirValor(valor: Date | RangoFechas | null): void {
    if (this.modo() === 'single') {
      this.fecha.set(valor instanceof Date ? valor : null);
      if (valor instanceof Date) this.enfocarValor(valor);
      return;
    }

    if (valor && !(valor instanceof Date)) {
      this.rango.set({ inicio: valor.inicio ?? null, fin: valor.fin ?? null });
      if (valor.inicio) this.enfocarValor(valor.inicio);
      return;
    }

    this.rango.set({ inicio: null, fin: null });
  }

  focus(): void {
    const grilla = this.grilla()?.nativeElement;
    grilla?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  }

  private enfocarValor(fecha: Date): void {
    const valor = inicioDelDia(fecha);
    this.vista.set(valor);
    this.foco.set(valor);
  }
}

function inicioDelDia(fecha: Date): Date {
  const resultado = new Date(fecha);
  resultado.setHours(0, 0, 0, 0);
  return resultado;
}

function mismoDia(a: Date | null, b: Date | null): boolean {
  return Boolean(a && b && inicioDelDia(a).getTime() === inicioDelDia(b).getTime());
}

function enRango(fecha: Date, inicio: Date | null, fin: Date | null): boolean {
  if (!inicio || !fin) return false;

  const objetivo = inicioDelDia(fecha).getTime();
  return objetivo > inicioDelDia(inicio).getTime() && objetivo < inicioDelDia(fin).getTime();
}

function desplazarMes(fecha: Date, delta: number): Date {
  const siguiente = new Date(fecha.getFullYear(), fecha.getMonth() + delta, 1);
  const ultimoDia = new Date(siguiente.getFullYear(), siguiente.getMonth() + 1, 0).getDate();
  siguiente.setDate(Math.min(fecha.getDate(), ultimoDia));
  return siguiente;
}

function construirGrillaMes(anio: number, mes: number): CeldaCalendario[] {
  const primero = new Date(anio, mes, 1);
  const primerDiaSemana = (primero.getDay() + 6) % 7;
  const diasDelMes = new Date(anio, mes + 1, 0).getDate();
  const diasDelMesAnterior = new Date(anio, mes, 0).getDate();
  const celdas: CeldaCalendario[] = [];

  for (let indice = 0; indice < primerDiaSemana; indice++) {
    const dia = diasDelMesAnterior - primerDiaSemana + 1 + indice;
    celdas.push({ dia, atenuada: true, fecha: new Date(anio, mes - 1, dia) });
  }

  for (let dia = 1; dia <= diasDelMes; dia++) {
    celdas.push({ dia, atenuada: false, fecha: new Date(anio, mes, dia) });
  }

  let siguiente = 1;
  while (celdas.length % 7 !== 0) {
    celdas.push({
      dia: siguiente,
      atenuada: true,
      fecha: new Date(anio, mes + 1, siguiente++),
    });
  }

  return celdas;
}
