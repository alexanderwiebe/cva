import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-testcva',
  template: `
    <div>
      <input type="text" [value]="value" (input)="onInput($event)" />
    </div>
    <div>
      <button (click)="submit()">SUBMIT</button>
    </div>
    <div>
      <pre> {{ value }} </pre>
    </div>
  `,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestCvaComponent),
      multi: true,
    },
  ],
})
export class TestCvaComponent implements ControlValueAccessor {
  value: string = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value + ' - TestCvaComponent';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if needed
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    // this.onChange(this.value);
    // this.onTouched();
  }

  submit() {
    console.log(this.value);
    this.onChange(
      this.value.substring(0, this.value.indexOf(' - TestCvaComponent'))
    );
  }
}
