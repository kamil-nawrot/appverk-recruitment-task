import { Component } from '@angular/core';
import { InputControlComponent } from '../../shared/components/input-control/input-control.component';

@Component({
  selector: 'app-login',
  imports: [
    InputControlComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
