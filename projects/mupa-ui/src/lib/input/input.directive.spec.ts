import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MupaInputDirective } from './input.directive';

@Component({
  imports: [MupaInputDirective],
  template: `<input mupaInput type="email" /> <textarea mupaInput></textarea>`,
})
class HostComponent {}

describe('MupaInputDirective', () => {
  it('aplica la clase oficial a inputs y textareas', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;

    expect(input.classList.contains('mupa-field__input')).toBe(true);
    expect(textarea.classList.contains('mupa-field__input')).toBe(true);
  });
});
