// login.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth, Login } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [CookieService],
})
export class LoginComponent {
  loginForm: FormGroup;
  private loginData: Login = new Login();

  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private _authService: Auth,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Ajoutez ici la logique pour envoyer les données au backend
      this.loginData.email = this.loginForm.value.email;
      this.loginData.password = this.loginForm.value.password;
      this._authService.login(this.loginData).subscribe({
        next: (response) => {
          this.cookieService.set('currentUser', JSON.stringify(response.data), {
            path: '/', // cookie disponible partout
            expires: 7, // 7 jours
          });
        },
        complete: () => {
          // Rediriger vers la page d'accueil ou une autre page après la connexion réussie
          this.router.navigate(['/redirect']);
        },
        error: (error) => {
          console.error('Erreur lors de la connexion:', error);
        },
      });
    } else {
      console.error('Formulaire invalide');
    }
  }
}
