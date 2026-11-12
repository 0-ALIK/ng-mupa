import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormField, form } from '@angular/forms/signals';
import { MupaButton, MupaInputDirective } from 'mupa-ui';

import { DemoCardComponent } from '../../shared/demo-card.component';
import { MarkdownViewComponent } from '../../shared/markdown-view.component';
import { PageHeaderComponent } from '../../shared/page-header.component';

@Component({
  selector: 'pg-field-page',
  imports: [
    PageHeaderComponent,
    DemoCardComponent,
    MarkdownViewComponent,
    MupaButton,
    MupaInputDirective,
    ReactiveFormsModule,
    FormsModule,
    FormField,
  ],
  template: `
    <div class="pg-pagina">
      <pg-page-header
        categoria="Formularios"
        titulo="Campos de texto"
        descripcion="Campos nativos con los estilos oficiales del sistema. La directiva mupaInput añade la clase visual; el control sigue siendo nativo y se integra con Reactive Forms, Template-driven, Signal Forms o HTML vanilla."
      />

      <pg-demo-card
        titulo="HTML vanilla"
        descripcion="El primer campo usa las clases directamente. El segundo usa la directiva. Al enviar, FormData recoge los valores y el navegador aplica su validación nativa."
        [codigo]="ejemploVanilla"
      >
        <form class="pg-formulario" (submit)="enviarVanilla($event)">
          <div class="mupa-field">
            <label class="mupa-field__label" for="v-nombre">Nombre</label>
            <input
              id="v-nombre"
              class="mupa-field__input"
              name="nombre"
              placeholder="Ana Pérez"
              required
              aria-describedby="v-nombre-hint"
            />
            <p class="mupa-field__hint" id="v-nombre-hint">Campo con clases, sin directiva.</p>
          </div>

          <div class="mupa-field">
            <label class="mupa-field__label" for="v-correo">Correo electrónico</label>
            <input
              id="v-correo"
              mupaInput
              type="email"
              name="correo"
              placeholder="ana@mupa.gob.pa"
              required
            />
            <p class="mupa-field__hint">Campo con la directiva mupaInput.</p>
          </div>

          <mupa-button tipo="submit">Enviar vanilla</mupa-button>
        </form>

        @if (resultadoVanilla()) {
          <pre class="pg-json">{{ resultadoVanilla() }}</pre>
        }
      </pg-demo-card>

      <pg-demo-card
        titulo="Reactive Forms"
        descripcion="FormControl sobre el input nativo. Los errores usan el estado del control y el CSS reconoce ng-invalid.ng-touched."
        [codigo]="ejemploReactivo"
      >
        <form
          class="pg-formulario"
          [formGroup]="formulario"
          (ngSubmit)="enviarReactivo()"
          novalidate
        >
          <div class="mupa-field">
            <label class="mupa-field__label" for="r-nombre">Nombre</label>
            <input
              id="r-nombre"
              mupaInput
              formControlName="nombre"
              [attr.aria-invalid]="
                formulario.controls.nombre.invalid && formulario.controls.nombre.touched
                  ? 'true'
                  : null
              "
              aria-describedby="r-nombre-error"
            />
            @if (formulario.controls.nombre.invalid && formulario.controls.nombre.touched) {
              <p class="mupa-field__error" id="r-nombre-error">Escribe tu nombre.</p>
            }
          </div>

          <div class="mupa-field">
            <label class="mupa-field__label" for="r-correo">Correo electrónico</label>
            <input
              id="r-correo"
              mupaInput
              type="email"
              formControlName="correo"
              [attr.aria-invalid]="
                formulario.controls.correo.invalid && formulario.controls.correo.touched
                  ? 'true'
                  : null
              "
              aria-describedby="r-correo-error"
            />
            @if (formulario.controls.correo.invalid && formulario.controls.correo.touched) {
              <p class="mupa-field__error" id="r-correo-error">
                @if (formulario.controls.correo.hasError('required')) {
                  Escribe tu correo.
                } @else {
                  Escribe un correo válido.
                }
              </p>
            }
          </div>

          <mupa-button tipo="submit">Enviar reactivo</mupa-button>
        </form>

        @if (resultadoReactivo()) {
          <pre class="pg-json">{{ resultadoReactivo() }}</pre>
        }
      </pg-demo-card>

      <pg-demo-card
        titulo="Template-driven"
        descripcion="ngModel sobre el mismo input nativo. La validación de Angular se refleja con ng-invalid.ng-touched."
        [codigo]="ejemploTemplate"
      >
        <form
          class="pg-formulario"
          #formularioNg="ngForm"
          (ngSubmit)="enviarTemplate(formularioNg)"
        >
          <div class="mupa-field">
            <label class="mupa-field__label" for="t-correo">Correo electrónico</label>
            <input
              id="t-correo"
              mupaInput
              type="email"
              name="correo"
              [(ngModel)]="modeloNg.correo"
              required
              email
              #correoNg="ngModel"
              [attr.aria-invalid]="correoNg.invalid && correoNg.touched ? 'true' : null"
              aria-describedby="t-correo-error"
            />
            @if (correoNg.invalid && correoNg.touched) {
              <p class="mupa-field__error" id="t-correo-error">Escribe un correo válido.</p>
            }
          </div>

          <mupa-button tipo="submit">Enviar template</mupa-button>
        </form>

        @if (resultadoTemplate()) {
          <pre class="pg-json">{{ resultadoTemplate() }}</pre>
        }
      </pg-demo-card>

      <pg-demo-card
        titulo="Signal Forms"
        descripcion="El input nativo se enlaza con el directivo formField de Angular 22. El modelo signal se actualiza al escribir."
        [codigo]="ejemploSignal"
      >
        <div class="mupa-field">
          <label class="mupa-field__label" for="s-correo">Correo electrónico</label>
          <input
            id="s-correo"
            mupaInput
            type="email"
            [formField]="formularioSignal.correo"
            aria-describedby="s-correo-hint"
          />
          <p class="mupa-field__hint" id="s-correo-hint">
            Valor actual: {{ modeloSignal().correo || '(vacío)' }}
          </p>
        </div>
      </pg-demo-card>

      <section class="pg-docs">
        <pg-markdown-view ruta="docs/input/input.md" />
      </section>
    </div>
  `,
  styleUrl: './field-page.component.css',
})
export class FieldPageComponent {
  protected readonly resultadoVanilla = signal('');

  protected readonly formulario = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    correo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  protected readonly resultadoReactivo = signal('');

  protected readonly modeloNg = { correo: '' };
  protected readonly resultadoTemplate = signal('');

  protected readonly modeloSignal = signal({ correo: '' });
  protected readonly formularioSignal = form(this.modeloSignal);

  protected enviarVanilla(evento: SubmitEvent): void {
    evento.preventDefault();

    const formulario = evento.target as HTMLFormElement;
    const datos = new FormData(formulario);
    const valores = Object.fromEntries(datos.entries());

    this.resultadoVanilla.set(JSON.stringify(valores, null, 2));
  }

  protected enviarReactivo(): void {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) return;

    this.resultadoReactivo.set(JSON.stringify(this.formulario.getRawValue(), null, 2));
  }

  protected enviarTemplate(formulario: NgForm): void {
    formulario.form.markAllAsTouched();

    if (formulario.invalid) return;

    this.resultadoTemplate.set(JSON.stringify(formulario.value, null, 2));
  }

  protected readonly ejemploVanilla = `<form (submit)="enviarVanilla($event)">
  <div class="mupa-field">
    <label class="mupa-field__label" for="nombre">Nombre</label>
    <input id="nombre" class="mupa-field__input" name="nombre" required />
    <p class="mupa-field__hint">Texto de ayuda.</p>
  </div>

  <div class="mupa-field">
    <label class="mupa-field__label" for="correo">Correo</label>
    <input id="correo" mupaInput type="email" name="correo" required />
  </div>

  <button type="submit" class="mupa-button">Enviar</button>
</form>`;

  protected readonly ejemploReactivo = `// Componente
formulario = new FormGroup({
  correo: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),
});

// Template
<form [formGroup]="formulario" (ngSubmit)="enviar()">
  <div class="mupa-field">
    <label class="mupa-field__label" for="correo">Correo</label>
    <input id="correo" mupaInput type="email" formControlName="correo" />
    <p class="mupa-field__error" *ngIf="formulario.controls.correo.invalid">
      Escribe un correo válido.
    </p>
  </div>
</form>`;

  protected readonly ejemploTemplate = `<form #formulario="ngForm" (ngSubmit)="enviar(formulario)">
  <div class="mupa-field">
    <label class="mupa-field__label" for="correo">Correo</label>
    <input
      id="correo"
      mupaInput
      type="email"
      name="correo"
      [(ngModel)]="modelo.correo"
      required
      email
    />
  </div>
</form>`;

  protected readonly ejemploSignal = `modelo = signal({ correo: '' });
formulario = form(this.modelo);

<input
  mupaInput
  type="email"
  [formField]="formulario.correo"
/>`;
}
