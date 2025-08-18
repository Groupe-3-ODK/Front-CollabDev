import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SessionService } from '../../../core/services/session-service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isLoading = true;
  profileUpdateSuccess = false;
  passwordUpdateSuccess = false;
  errorMessage = '';

  constructor(
    private usersService: UsersService,
    private sessionService: SessionService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      pseudo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  /* METHODES PRINCIPALES (avec gestion du mode test) */
  loadUserData(): void {
    const userId = this.sessionService.getUserId();
    if (userId) {
      console.log('Chargement des données utilisateur (mode réel)');
      this.callGetUserById(userId);
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      const userId = this.sessionService.getUserId();
      const updateData = {
        speudo: this.profileForm.value.pseudo,
        email: this.profileForm.value.email,
      };

      console.log('Envoi mise à jour profil:', updateData);
      this.callUpdateUserInfo(userId, updateData);
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      const userId = this.sessionService.getUserId();
      const passwordData = {
        oldPassword: this.passwordForm.value.oldPassword,
        newPassword: this.passwordForm.value.newPassword,
      };

      console.log('Envoi changement mot de passe');
      this.callChangePassword(userId, passwordData);
    }
  }

  /* APPELS API DIRECTS (pour un meilleur contrôle) */
  private callGetUserById(userId: number): void {
    this.usersService.getUserById(userId).subscribe({
      next: (response) => {
        console.log('Réponse getUserById:', response);
        this.user = response.data;
        this.profileForm.patchValue({
          pseudo: this.user.speudo,
          email: this.user.email,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur getUserById:', err);
        this.errorMessage = 'Erreur lors du chargement';
        this.isLoading = false;
      },
    });
  }

  private callUpdateUserInfo(userId: number, data: any): void {
    // DEBUG - Vérifiez que l'ID est correct avant l'envoi
    console.log('Envoi vers userId:', userId); // <-- Ajoutez ce log

    this.usersService.updateUserInfo(userId, data).subscribe({
      next: (response) => {
        console.log('Réponse updateUserInfo:', response);
        this.profileUpdateSuccess = true;
        this.user.speudo = data.speudo;
        this.user.email = data.email;
        setTimeout(() => (this.profileUpdateSuccess = false), 3000);
      },
      error: (err) => {
        console.error('Erreur updateUserInfo - Détails:', {
          status: err.status,
          url: err.url, // <-- Vérifiez l'URL complète ici
          message: err.message,
        });
        this.errorMessage = 'Échec de la mise à jour';
      },
    });
  }

  private callChangePassword(userId: number, data: any): void {
    // Ajoutez confirmPassword dans les données envoyées
    const fullData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: this.passwordForm.value.confirmPassword,
    };

    console.log('Envoi changement mot de passe vers userId:', userId, fullData);

    this.usersService.changePassword(userId, fullData).subscribe({
      next: (response) => {
        console.log('Réponse changePassword:', response);
        this.passwordUpdateSuccess = true;
        this.passwordForm.reset();
        setTimeout(() => (this.passwordUpdateSuccess = false), 3000);
      },
      error: (err) => {
        console.error('Erreur changePassword - Détails:', {
          status: err.status,
          url: err.url,
          message: err.message,
          error: err.error, // Affiche le détail de l'erreur backend
        });
        this.errorMessage = 'Échec du changement de mot de passe';
      },
    });
  }

  /* UTILITAIRES */
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  getInitials(name: string): string {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : '';
  }
}
