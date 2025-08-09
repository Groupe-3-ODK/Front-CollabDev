import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';
import { AdminFormComponent } from '../pages/admin/admin-form/admin-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AdminFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
