import { Component } from '@angular/core';
import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';
import { SignupComponent } from '../components/signup/signup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectDoneComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
