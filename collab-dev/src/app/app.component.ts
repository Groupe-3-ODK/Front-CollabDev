import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';

@Component({
  selector: 'app-root',
  imports: [ProjectDoneComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
