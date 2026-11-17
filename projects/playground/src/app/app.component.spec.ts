import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

describe('AppComponent · templates', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('oculta el layout del playground en una pantalla de template', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/templates/login');
    await fixture.whenStable();
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('pg-login-template')).toBeTruthy();
    expect(elemento.querySelector('mupa-sidebar')).toBeNull();
    expect(elemento.querySelector('.playground__barra')).toBeNull();
    expect(elemento.querySelector('.playground__pagina--template')).toBeTruthy();
  });

  it('muestra la galería de templates con el layout normal', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/templates');
    await fixture.whenStable();
    fixture.detectChanges();

    const elemento = fixture.nativeElement as HTMLElement;
    expect(elemento.querySelector('pg-templates-page')).toBeTruthy();
    expect(elemento.querySelector('mupa-sidebar')).toBeTruthy();
    expect(elemento.querySelector('.playground__barra')).toBeTruthy();
    expect(elemento.textContent).toContain('Login interno');
  });
});
