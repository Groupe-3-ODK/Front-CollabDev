import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfilComponent } from '../pages/users/profil/profil.component';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';
import { ProjectDoneComponent } from '../pages/users/project-done/project-done.component';
import { ProjectinprogressComponent } from '../pages/users/projectinprogress/projectinprogress.component';

@Component({
  selector: 'app-root',
  imports: [ProjectinprogressComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
