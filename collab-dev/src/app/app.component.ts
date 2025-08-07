import { Component } from '@angular/core';

import { SignupComponent } from '../components/signup/signup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignupComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
