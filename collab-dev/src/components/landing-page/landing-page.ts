import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    // Initialization logic can go here
  }
  showLogin() {
    this.router.navigate(['/login']);
  }
  showSignup() {
    this.router.navigate(['/signup']);
  }
}
