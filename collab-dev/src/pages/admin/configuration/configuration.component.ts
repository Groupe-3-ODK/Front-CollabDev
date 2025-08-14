import { Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  // Beginner values
  beginnerUnlock: number = 10;
  beginnerEarn: number = 10;

  // Intermediate values
  intermediateUnlock: number = 25;
  intermediateEarn: number = 25;

  // Advanced values
  advancedUnlock: number = 35;
  advancedEarn: number = 35;

  increment(level: string, type: string): void {
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

  decrement(level: string, type: string): void {
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
}