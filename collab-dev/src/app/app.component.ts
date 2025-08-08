import { Component } from '@angular/core';
import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';
import { Parameter } from '../pages/users/parameter/parameter';

@Component({
  selector: 'app-root',
  imports: [Parameter],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
