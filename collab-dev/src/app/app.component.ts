import { Component } from '@angular/core';
import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';
import { SignupComponent } from '../components/signup/signup';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password';
import { ViewProjectsComponent } from '../pages/users/view-projects/view-projects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProjectDoneComponent, SignupComponent, ForgotPasswordComponent, ViewProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
