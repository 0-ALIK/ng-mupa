import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { MupaButton, MupaIcon } from 'mupa-ui';

type VistaLogin = 'login' | 'recuperacion';

@Component({
  selector: 'pg-login-template',
  imports: [MupaButton, MupaIcon],
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.css',
})
export class LoginTemplateComponent {
  protected readonly vista = signal<VistaLogin>('login');
  protected readonly correo = signal('');
  protected readonly contrasena = signal('');
  protected readonly correoRecuperacion = signal('');
  protected readonly mostrarContrasena = signal(false);
  protected readonly errorCorreo = signal(false);
  protected readonly errorRecuperacion = signal(false);
  protected readonly enlaceEnviado = signal(false);

  protected readonly puedeIngresar = computed(
    () => this.correo().trim().length > 0 && this.contrasena().length > 0,
  );

  protected readonly puedeEnviar = computed(
    () => this.correoRecuperacion().trim().length > 0 && !this.enlaceEnviado(),
  );

  private readonly correoInput = viewChild<ElementRef<HTMLInputElement>>('correoInput');
  private readonly recuperacionInput = viewChild<ElementRef<HTMLInputElement>>('recuperacionInput');

  protected actualizarCorreo(evento: Event): void {
    this.correo.set((evento.target as HTMLInputElement).value);
    this.errorCorreo.set(false);
  }

  protected actualizarContrasena(evento: Event): void {
    this.contrasena.set((evento.target as HTMLInputElement).value);
  }

  protected actualizarCorreoRecuperacion(evento: Event): void {
    this.correoRecuperacion.set((evento.target as HTMLInputElement).value);
    this.errorRecuperacion.set(false);
    this.enlaceEnviado.set(false);
  }

  protected validarCorreo(): void {
    if (this.correo().trim() && !this.correoValido(this.correo())) {
      this.errorCorreo.set(true);
    }
  }

  protected ingresar(evento: Event): void {
    evento.preventDefault();

    if (!this.correoValido(this.correo())) {
      this.errorCorreo.set(true);
      this.correoInput()?.nativeElement.focus();
    }
  }

  protected solicitarRecuperacion(evento: Event): void {
    evento.preventDefault();

    if (!this.correoValido(this.correoRecuperacion())) {
      this.errorRecuperacion.set(true);
      this.recuperacionInput()?.nativeElement.focus();
      return;
    }

    this.enlaceEnviado.set(true);
  }

  protected irARecuperacion(evento: Event): void {
    evento.preventDefault();
    this.vista.set('recuperacion');
    this.correoRecuperacion.set(this.correo());
    this.errorRecuperacion.set(false);
    this.enlaceEnviado.set(false);
    setTimeout(() => this.recuperacionInput()?.nativeElement.focus());
  }

  protected volverAIniciar(evento: Event): void {
    evento.preventDefault();
    this.vista.set('login');
    this.enlaceEnviado.set(false);
    setTimeout(() => this.correoInput()?.nativeElement.focus());
  }

  protected alternarContrasena(): void {
    this.mostrarContrasena.update((valor) => !valor);
  }

  private correoValido(valor: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
  }
}
