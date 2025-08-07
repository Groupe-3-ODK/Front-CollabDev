import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPage } from '../components/landing-page/landing-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
