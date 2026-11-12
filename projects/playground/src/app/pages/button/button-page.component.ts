import { Component, signal } from '@angular/core';
import { MupaButton } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-button-page',
  imports: [PageHeaderComponent, DemoCardComponent, MarkdownViewComponent, MupaButton],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Componentes"
        titulo="Botón"
        descripcion="Botón nativo con las cinco variantes del sistema, tres tamaños, iconos, estado de carga y soporte de navegación."
      />

      <pg-demo-card
        titulo="Variantes"
        descripcion="La jerarquía visual indica qué acción tiene más peso dentro de la tarea."
        [codigo]="ejemploVariantes"
      >
        <div class="pg-fila">
          <mupa-button>Guardar cambios</mupa-button>
          <mupa-button variante="tonal">Continuar</mupa-button>
          <mupa-button variante="secondary">Cancelar</mupa-button>
          <mupa-button variante="ghost">Ver detalles</mupa-button>
          <mupa-button variante="elevated">Abrir mapa</mupa-button>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Tamaños"
        descripcion="Pequeño para espacios compactos, mediano como base y grande para acciones principales."
        [codigo]="ejemploTamanos"
      >
        <div class="pg-fila pg-fila--separada">
          <mupa-button tamano="sm">Pequeño</mupa-button>
          <mupa-button tamano="md">Mediano</mupa-button>
          <mupa-button tamano="lg">Grande</mupa-button>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Iconos"
        descripcion="El icono se coloca antes de la etiqueta; una flecha de avance puede ir después."
        [codigo]="ejemploIconos"
      >
        <div class="pg-fila">
          <mupa-button iconoInicio="save">Guardar cambios</mupa-button>
          <mupa-button variante="secondary" iconoInicio="plus">Nueva solicitud</mupa-button>
          <mupa-button variante="ghost" iconoFin="arrow-right">Siguiente paso</mupa-button>
          <mupa-button
            variante="secondary"
            soloIcono
            etiquetaAria="Descargar informe"
            iconoInicio="download"
          />
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Estados"
        descripcion="Durante una operación el botón se marca como ocupado y se bloquea para evitar envíos duplicados."
        [codigo]="ejemploEstados"
      >
        <div class="pg-fila">
          <mupa-button [cargando]="cargando()" (clic)="simularCarga()">
            {{ cargando() ? 'Guardando…' : 'Guardar cambios' }}
          </mupa-button>
          <mupa-button [deshabilitado]="true">Deshabilitado</mupa-button>
          <mupa-button variante="secondary" (clic)="bloqueado.set(!bloqueado())">
            {{ bloqueado() ? 'Habilitar' : 'Bloquear' }}
          </mupa-button>
          <mupa-button variante="ghost" [deshabilitado]="bloqueado()">
            Acción secundaria
          </mupa-button>
        </div>
      </pg-demo-card>

      <pg-demo-card
        titulo="Ancho completo y navegación"
        descripcion="Usa bloque para ocupar el ancho disponible y href para navegar manteniendo la apariencia del botón."
        [codigo]="ejemploAncho"
      >
        <div class="pg-columna pg-ancho">
          <div class="pg-bloque pg-bloque--angosto">
            <mupa-button bloque tamano="lg">Enviar solicitud</mupa-button>
          </div>
          <div class="pg-fila">
            <mupa-button href="#enlace-demo" variante="secondary" iconoFin="arrow-right">
              Ir a otra ruta
            </mupa-button>
          </div>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/button/button.md" />
      </section>
    </div>
  `,
})
export class ButtonPageComponent {
  protected readonly cargando = signal(false);
  protected readonly bloqueado = signal(false);

  protected readonly ejemploVariantes = `<mupa-button>Guardar cambios</mupa-button>
<mupa-button variante="tonal">Continuar</mupa-button>
<mupa-button variante="secondary">Cancelar</mupa-button>
<mupa-button variante="ghost">Ver detalles</mupa-button>
<mupa-button variante="elevated">Abrir mapa</mupa-button>`;

  protected readonly ejemploTamanos = `<mupa-button tamano="sm">Pequeño</mupa-button>
<mupa-button tamano="md">Mediano</mupa-button>
<mupa-button tamano="lg">Grande</mupa-button>`;

  protected readonly ejemploIconos = `<mupa-button iconoInicio="save">Guardar cambios</mupa-button>
<mupa-button variante="secondary" iconoInicio="plus">Nueva solicitud</mupa-button>
<mupa-button variante="ghost" iconoFin="arrow-right">Siguiente paso</mupa-button>
<mupa-button
  variante="secondary"
  soloIcono
  etiquetaAria="Descargar informe"
  iconoInicio="download"
/>`;

  protected readonly ejemploEstados = `<mupa-button [cargando]="guardando()">
  {{ guardando() ? 'Guardando…' : 'Guardar cambios' }}
</mupa-button>

<mupa-button [deshabilitado]="true">Deshabilitado</mupa-button>`;

  protected readonly ejemploAncho = `<mupa-button bloque tamano="lg">Enviar solicitud</mupa-button>

<mupa-button href="/tramites/nuevo" variante="secondary" iconoFin="arrow-right">
  Ir a otra ruta
</mupa-button>`;

  protected simularCarga(): void {
    if (this.cargando()) return;

    this.cargando.set(true);
    setTimeout(() => this.cargando.set(false), 1600);
  }
}
