import { Component } from '@angular/core';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UserSidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
