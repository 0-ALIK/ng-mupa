import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupaFileUpload } from './file-upload.component';

describe('MupaFileUpload', () => {
  let fixture: ComponentFixture<MupaFileUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MupaFileUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(MupaFileUpload);
    fixture.componentRef.setInput('acepta', 'image/*');
    fixture.componentRef.setInput('tamanoMaximoMb', 2);
  });

  it('renderiza la zona y el botón', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.mupa-file-upload__zona')).toBeTruthy();
    expect(host.textContent).toContain('Seleccionar archivo');
    expect(host.querySelector('input[type="file"]')).toBeTruthy();
  });

  it('emite los archivos válidos', () => {
    fixture.detectChanges();

    let emitidos: readonly File[] = [];
    fixture.componentInstance.archivosSeleccionados.subscribe((archivos) => {
      emitidos = archivos;
    });

    const archivo = new File(['contenido'], 'foto.png', { type: 'image/png' });
    const input = fixture.nativeElement.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [archivo] });
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(emitidos.length).toBe(1);
    expect(emitidos[0].name).toBe('foto.png');
  });

  it('rechaza archivos con formato no permitido', () => {
    fixture.detectChanges();

    let error = '';
    fixture.componentInstance.errorArchivo.subscribe((mensaje) => {
      error = mensaje;
    });

    const archivo = new File(['contenido'], 'documento.pdf', {
      type: 'application/pdf',
    });
    const input = fixture.nativeElement.querySelector('input[type="file"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: [archivo] });
    input.dispatchEvent(new Event('change', { bubbles: true }));
    fixture.detectChanges();

    expect(error).toContain('formato no permitido');
    expect(fixture.nativeElement.textContent).toContain('formato no permitido');
  });
});
