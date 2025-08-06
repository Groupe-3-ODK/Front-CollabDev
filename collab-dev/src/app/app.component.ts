import { Component } from '@angular/core';
import { ProjectinprogressComponent } from '../pages/users/projectinprogress/projectinprogress.component';

@Component({
  selector: 'app-root',
  imports: [ProjectinprogressComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
