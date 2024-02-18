import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Output() onChange = new EventEmitter<string>();
  @Input() textAtChild: string = "";

  updateValue(event: Event): void {
    const textFromUser = (event.target as HTMLInputElement).value;

    this.onChange.emit(textFromUser);
  }

  logValue(): void {
    console.log(this.textAtChild);
  }
}
