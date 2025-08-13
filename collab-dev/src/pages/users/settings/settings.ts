import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  userInitials = 'AC';
  isLightTheme = true;

  userData = {
    pseudo: 'Coulibaly',
    email: 'Coulibaly@gmail.com',
  };

  password = {
    current: '',
    new: '',
    confirm: '',
  };

  languages = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'Anglais' },
  ];

  selectedLanguage = 'fr';

  // Variables pour le popup
  showConfirmation = false;
  confirmationMessage = '';
  showCancelButton = false;
  pendingAction: () => void = () => {};

  // Méthodes pour le popup
  showConfirmationDialog(
    message: string,
    action: () => void,
    showCancel = false
  ) {
    this.confirmationMessage = message;
    this.pendingAction = action;
    this.showCancelButton = showCancel;
    this.showConfirmation = true;
  }

  confirmAction() {
    this.pendingAction();
    this.showConfirmation = false;
  }

  cancelAction() {
    this.showConfirmation = false;
  }

  // Méthodes existantes améliorées
  updateProfile() {
    if (!this.userData.pseudo || !this.userData.email) {
      this.showConfirmationDialog(
        'Veuillez remplir tous les champs du profil',
        () => {},
        false
      );
      return;
    }

    if (!this.validateEmail(this.userData.email)) {
      this.showConfirmationDialog(
        'Veuillez entrer une adresse email valide',
        () => {},
        false
      );
      return;
    }

    this.showConfirmationDialog(
      'Voulez-vous vraiment mettre à jour votre profil?',
      () => {
        console.log('Profil mis à jour', this.userData);
        // Ici vous ajouterez l'appel API
        this.showConfirmationDialog(
          'Profil mis à jour avec succès!',
          () => {},
          false
        );
      },
      true
    );
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.showConfirmationDialog(
      `Langue changée en ${lang === 'fr' ? 'Français' : 'Anglais'}`,
      () => {},
      false
    );
  }

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    const themeMessage = this.isLightTheme
      ? 'Thème clair activé'
      : 'Thème sombre activé';
    this.showConfirmationDialog(themeMessage, () => {}, false);
  }

  changePassword() {
    if (
      !this.password.current ||
      !this.password.new ||
      !this.password.confirm
    ) {
      this.showConfirmationDialog(
        'Veuillez remplir tous les champs du mot de passe',
        () => {},
        false
      );
      return;
    }

    if (this.password.new.length < 8) {
      this.showConfirmationDialog(
        'Le mot de passe doit contenir au moins 8 caractères',
        () => {},
        false
      );
      return;
    }

    if (this.password.new !== this.password.confirm) {
      this.showConfirmationDialog(
        'Les mots de passe ne correspondent pas',
        () => {},
        false
      );
      return;
    }

    this.showConfirmationDialog(
      'Voulez-vous vraiment changer votre mot de passe?',
      () => {
        console.log('Mot de passe changé', this.password);
        // Ici vous ajouterez l'appel API

        // Réinitialisation
        this.password = { current: '', new: '', confirm: '' };
        this.showConfirmationDialog(
          'Mot de passe changé avec succès!',
          () => {},
          false
        );
      },
      true
    );
  }

  // Méthode utilitaire
  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Méthode pour le menu profil (à implémenter)
  openProfileMenu() {
    console.log('Ouvrir le menu profil');
    // Implémentez la logique pour ouvrir un menu profil si nécessaire
  }

  //   this.userService.changePassword(5, {
  //   oldPassword: 'ancien123',
  //   newPassword: 'nouveau456'
  // }).subscribe({
  //   next: res => console.log('Mot de passe changé', res),
  //   error: err => console.error('Erreur changement mdp', err)
  // });

  // // Mettre à jour les infos
  // this.userService.updateUserInfo(5, {
  //   firstname: 'Jean',
  //   lastname: 'Dupont',
  //   email: 'jean.dupont@example.com'
  // }).subscribe({
  //   next: res => console.log('Infos mises à jour', res),
  //   error: err => console.error('Erreur mise à jour infos', err)
  // });
}
