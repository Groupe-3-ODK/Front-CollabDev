import { Component } from '@angular/core';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { ProjectFormComponent } from '../shared/project-form/project-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UserSidebarComponent,
    ProjectFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
