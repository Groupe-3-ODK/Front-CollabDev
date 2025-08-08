import { Component } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  imports: [],
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css'
})
export class PopUp {
  
  selectedRole: string = '';

  onRoleSelect(role: string) {
    this.selectedRole = role;
  }

  isSelected(role: string): boolean {
    return this.selectedRole === role;
  }

  closePopup() {
    this.selectedRole = '';
    // Ajoutez ici la logique pour fermer le pop-up, par exemple en émettant un événement ou en modifiant une propriété visible
    alert('Popup fermé');
    
  }

  confirmRole() {
    if (this.selectedRole) {
      // Ajoutez ici la logique pour confirmer le rôle sélectionné
      console.log(`Rôle confirmé : ${this.selectedRole}`);
    }
  }

}
