import { Component, input } from '@angular/core';

@Component({
  selector: 'app-input-control',
  imports: [],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.scss'
})
export class InputControlComponent {
  label = input('');
  type = input<'text' | 'password'>('text');
}
