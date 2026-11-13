import { booleanAttribute, Component, computed, input } from '@angular/core';

import type { ItemDistribucion, TonoDistribucion } from './distribution-bar.types';

const TONOS: readonly TonoDistribucion[] = ['primary', 'success', 'error', 'warning', 'neutral'];

interface SegmentoCalculado extends ItemDistribucion {
  porcentaje: number;
  tono: TonoDistribucion;
}

interface ResultadoDistribucion {
  error?: string;
  total: number;
  segmentos: SegmentoCalculado[];
  totalPorcentajeRedondeado: number;
  hayDiferenciaRedondeo: boolean;
}

function calcularDistribucion(
  elementos: readonly ItemDistribucion[],
  totalEsperado: number | undefined,
): ResultadoDistribucion {
  if (
    !Array.isArray(elementos) ||
    elementos.some(
      (item) =>
        !item ||
        typeof item.id !== 'string' ||
        !item.id.trim() ||
        typeof item.etiqueta !== 'string' ||
        !item.etiqueta.trim() ||
        !Number.isFinite(item.valor) ||
        item.valor < 0,
    )
  ) {
    return {
      error:
        'Revisa las categorías y cantidades: cada una necesita un identificador, una etiqueta y un número finito igual o mayor que cero.',
      total: 0,
      segmentos: [],
      totalPorcentajeRedondeado: 0,
      hayDiferenciaRedondeo: false,
    };
  }

  if (new Set(elementos.map((item) => item.id)).size !== elementos.length) {
    return {
      error: 'Cada categoría debe tener un identificador único.',
      total: 0,
      segmentos: [],
      totalPorcentajeRedondeado: 0,
      hayDiferenciaRedondeo: false,
    };
  }

  const total = elementos.reduce((suma, item) => suma + item.valor, 0);
  if (!Number.isFinite(total)) {
    return {
      error: 'La suma de las cantidades no se puede representar.',
      total: 0,
      segmentos: [],
      totalPorcentajeRedondeado: 0,
      hayDiferenciaRedondeo: false,
    };
  }

  if (totalEsperado !== undefined && (!Number.isFinite(totalEsperado) || totalEsperado < 0)) {
    return {
      error: 'El total indicado debe ser un número finito igual o mayor que cero.',
      total: 0,
      segmentos: [],
      totalPorcentajeRedondeado: 0,
      hayDiferenciaRedondeo: false,
    };
  }

  const tolerancia =
    Number.EPSILON * Math.max(1, total, totalEsperado || 0) * Math.max(8, elementos.length);

  if (totalEsperado !== undefined && Math.abs(totalEsperado - total) > tolerancia) {
    return {
      error:
        'Las cantidades no coinciden con el total indicado. Revisa los datos antes de mostrar la distribución.',
      total: 0,
      segmentos: [],
      totalPorcentajeRedondeado: 0,
      hayDiferenciaRedondeo: false,
    };
  }

  const segmentos = elementos.map((item, indice) => ({
    ...item,
    porcentaje: total > 0 ? (item.valor / total) * 100 : 0,
    tono: TONOS.includes(item.tono as TonoDistribucion)
      ? (item.tono as TonoDistribucion)
      : TONOS[indice % TONOS.length],
  }));

  const decimasRedondeadas = segmentos.reduce(
    (suma, item) => suma + Math.round(item.porcentaje * 10),
    0,
  );

  return {
    total,
    segmentos,
    totalPorcentajeRedondeado: decimasRedondeadas / 10,
    hayDiferenciaRedondeo: total > 0 && decimasRedondeadas !== 1000,
  };
}

/**
 * Barra apilada al 100 % con leyenda accesible.
 *
 * Réplica de `DistributionBar` del Lego Design System — Alcaldía de Panamá.
 */
@Component({
  selector: 'mupa-distribution-bar',
  template: `
    <figure class="mupa-distribution" [attr.aria-labelledby]="idTitulo">
      <figcaption class="mupa-distribution__cabecera">
        <div class="mupa-distribution__encabezado">
          <h3 [id]="idTitulo">{{ titulo() }}</h3>
          @if (descripcion()) {
            <p>{{ descripcion() }}</p>
          }
        </div>

        <div class="mupa-distribution__total">
          <span>{{ etiquetaTotal() }}</span>
          <strong>{{ error() ? '—' : numero(totalCalculado()) }}</strong>
        </div>
      </figcaption>

      @if (error()) {
        <p class="mupa-distribution__error" role="status">{{ error() }}</p>
      } @else {
        <div
          class="mupa-distribution__barra"
          [class.mupa-distribution__barra--vacia]="totalCalculado() === 0"
          aria-hidden="true"
        >
          @for (segmento of segmentosVisibles(); track segmento.id) {
            <div
              [class]="'mupa-distribution__segmento mupa-distribution__tono--' + segmento.tono"
              [style.width.%]="segmento.porcentaje"
            >
              @if (mostrarPorcentajes()) {
                <span class="mupa-distribution__segmento-etiqueta">
                  {{ porcentaje(segmento.porcentaje) }}
                </span>
              }
            </div>
          }
        </div>

        @if (totalCalculado() === 0) {
          <p class="mupa-distribution__vacio" role="status">No hay registros para este periodo.</p>
        }

        @if (segmentos().length > 0) {
          <ul
            class="mupa-distribution__leyenda"
            aria-label="Cantidades y porcentajes por categoría"
          >
            @for (segmento of segmentos(); track segmento.id) {
              <li>
                <span
                  [class]="'mupa-distribution__muestra mupa-distribution__tono--' + segmento.tono"
                  aria-hidden="true"
                ></span>
                <span class="mupa-distribution__categoria">
                  {{ segmento.etiqueta }}
                </span>
                <strong class="mupa-distribution__valor">
                  {{ numero(segmento.valor) }}
                </strong>
                <span class="mupa-distribution__porcentaje">
                  {{ totalCalculado() > 0 ? porcentaje(segmento.porcentaje) : '—' }}
                </span>
              </li>
            }
          </ul>
        }

        @if (hayDiferenciaRedondeo()) {
          <p class="mupa-distribution__redondeo">
            Los porcentajes redondeados suman
            {{ porcentaje(totalPorcentajeRedondeado()) }}. La barra representa el 100 % exacto.
          </p>
        }
      }

      @if (notaAlPie()) {
        <div class="mupa-distribution__nota">{{ notaAlPie() }}</div>
      }
    </figure>
  `,
  styleUrl: './distribution-bar.component.css',
})
export class MupaDistributionBar {
  private static secuencia = 0;

  readonly titulo = input('Distribución del total');
  readonly descripcion = input<string>();
  readonly elementos = input<readonly ItemDistribucion[]>([]);
  readonly total = input<number>();
  readonly etiquetaTotal = input('Total');
  readonly notaAlPie = input<string>();
  readonly locale = input('es-PA');
  readonly mostrarPorcentajes = input(true, {
    transform: booleanAttribute,
  });

  protected readonly idTitulo = `mupa-distribution-${++MupaDistributionBar.secuencia}`;

  protected readonly resultado = computed(() =>
    calcularDistribucion(this.elementos(), this.total()),
  );

  protected readonly error = computed(() => this.resultado().error);
  protected readonly totalCalculado = computed(() => this.resultado().total);
  protected readonly segmentos = computed(() => this.resultado().segmentos);
  protected readonly segmentosVisibles = computed(() =>
    this.segmentos().filter((segmento) => segmento.valor > 0),
  );
  protected readonly totalPorcentajeRedondeado = computed(
    () => this.resultado().totalPorcentajeRedondeado,
  );
  protected readonly hayDiferenciaRedondeo = computed(() => this.resultado().hayDiferenciaRedondeo);

  private readonly formatoNumero = computed(
    () =>
      new Intl.NumberFormat(this.locale(), {
        maximumFractionDigits: 2,
      }),
  );

  private readonly formatoPorcentaje = computed(
    () =>
      new Intl.NumberFormat(this.locale(), {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
  );

  protected numero(valor: number): string {
    return this.formatoNumero().format(valor);
  }

  protected porcentaje(valor: number): string {
    return this.formatoPorcentaje().format(valor / 100);
  }
}
