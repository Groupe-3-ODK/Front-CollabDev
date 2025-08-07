import { Component } from '@angular/core';

import { SignupComponent } from '../components/signup/signup';
import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectDoneComponent, SignupComponent],


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPage],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
