// login.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANT } from '../../core/constants/contant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importe ReactiveFormsModule pour ce composant
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  private router = inject(Router); // Injecter le Router si nécessaire

  private loginData = {
    email: '',
    password: '',
    rememberMe: false,
  };

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulaire soumis', this.loginForm.value);
      // Ajoutez ici la logique pour envoyer les données au backend
      this.loginData.email = this.loginForm.value.email;
      this.loginData.password = this.loginForm.value.password;
      this.loginData.rememberMe = this.loginForm.value.rememberMe;

      if (
        CONSTANT.CURRENT_USER.EMAIL === this.loginData.email &&
        CONSTANT.CURRENT_USER.PASSWORD === this.loginData.password
      ) {
        localStorage.setItem(
          'currentUser',
          JSON.stringify(CONSTANT.CURRENT_USER)
        );
        alert(
          'Connexion réussie ! Bienvenue ' + CONSTANT.CURRENT_USER.USERNAME
        );
        // Rediriger vers la page d'accueil oau une autre page après la connexion réussie
        this.router.navigate(['/redirect']);
      }
    } else {
      console.error('Formulaire invalide');
      alert('Veuillez remplir correctement le formulaire.');
    }
  }
}
