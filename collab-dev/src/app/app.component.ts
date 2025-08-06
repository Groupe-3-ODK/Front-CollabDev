import { Component } from '@angular/core';
import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';

@Component({
  selector: 'app-root',
  imports: [ProjectDoneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
