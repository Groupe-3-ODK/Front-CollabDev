import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type LevelKey = 'beginner' | 'intermediate' | 'advanced';

interface Badge {
  name: string;
  active: boolean;
  icon: string;
}

@Component({
  imports:[FormsModule],
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  // Coin values
  beginnerUnlock = 10;
  beginnerEarn = 10;
  intermediateUnlock = 25;
  intermediateEarn = 25;
  advancedUnlock = 35;
  advancedEarn = 35;

  // Badges data (typé)
  badges: Record<LevelKey, Badge> = {
    beginner: {
      name: 'Badge niveau débutant',
      active: true,
      icon: 'streamline-flex-color_star-badge-flat.png'
    },
    intermediate: {
      name: 'Badge niveau intermediaire',
      active: true,
      icon: 'streamline-flex-color_star-badge-flat (1).png'
    },
    advanced: {
      name: 'Badge niveau Avancé',
      active: true,
      icon: 'Group 571.png'
    }
  };

  // Coin methods
  increment(level: LevelKey, type: string): void {
    switch(level) {
      case 'beginner':
        if (type === 'unlock') this.beginnerUnlock++;
        else if (type === 'earn') this.beginnerEarn++;
        break;
      case 'intermediate':
        if (type === 'unlock') this.intermediateUnlock++;
        else if (type === 'earn') this.intermediateEarn++;
        break;
      case 'advanced':
        if (type === 'unlock') this.advancedUnlock++;
        else if (type === 'earn') this.advancedEarn++;
        break;
    }
  }

  decrement(level: LevelKey, type: string): void {
    switch(level) {
      case 'beginner':
        if (type === 'unlock' && this.beginnerUnlock > 0) this.beginnerUnlock--;
        else if (type === 'earn' && this.beginnerEarn > 0) this.beginnerEarn--;
        break;
      case 'intermediate':
        if (type === 'unlock' && this.intermediateUnlock > 0) this.intermediateUnlock--;
        else if (type === 'earn' && this.intermediateEarn > 0) this.intermediateEarn--;
        break;
      case 'advanced':
        if (type === 'unlock' && this.advancedUnlock > 0) this.advancedUnlock--;
        else if (type === 'earn' && this.advancedEarn > 0) this.advancedEarn--;
        break;
    }
  }

  // Badge methods
  modifyBadge(level: LevelKey): void {
    const newName = prompt('Entrez le nouveau nom du badge:', this.badges[level].name);
    if (newName) {
      this.badges[level].name = newName;
      console.log(`Badge ${level} modifié: ${newName}`);
    }
  }

  deleteBadge(level: LevelKey): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le ${this.badges[level].name}?`)) {
      console.log(`Badge ${level} supprimé: ${this.badges[level].name}`);
      this.badges[level].active = false;
    }
  }

  toggleBadge(level: LevelKey): void {
    this.badges[level].active = !this.badges[level].active;
    console.log(`Badge ${level} ${this.badges[level].active ? 'activé' : 'désactivé'}`);
  }
}
