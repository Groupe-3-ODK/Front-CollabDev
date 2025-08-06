import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component'; // Importez le composant
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
