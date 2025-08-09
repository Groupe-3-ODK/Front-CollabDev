// signup.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User, UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Importe ReactiveFormsModule pour ce composant
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  private user: User = new User();

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        pseudo: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        telephone: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{8,10}$')],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validateur personnalisé pour vérifier que les mots de passe correspondent
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      (this.user.speudo = this.signupForm.value.pseudo),
        (this.user.email = this.signupForm.value.email),
        (this.user.password = this.signupForm.value.password),
        this._userService.createUser(this.user).subscribe({
          next: (response) => {
            console.log('Utilisateur créé avec succès:', response);
            // Vous pouvez rediriger l'utilisateur ou afficher un message de succès ici
          },
          complete: () => {
            alert("Création de l'utilisateur terminée");
            // Redirige vers la page de connexion après la création
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error(
              "Erreur lors de la création de l'utilisateur:",
              error
            );
            // Vous pouvez afficher un message d'erreur à l'utilisateur ici
          },
        });
      // Logique pour envoyer l'utilisateur au service de création d'utilisateur
      console.log('Utilisateur créé:', this.user);
      // Vous pouvez appeler le service ici pour créer l'utilisateur
    } else {
      console.error('Formulaire invalide');
    }
  }
}
