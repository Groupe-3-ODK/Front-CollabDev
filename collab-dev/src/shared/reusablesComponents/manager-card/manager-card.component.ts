import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manager-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-card.component.html',
  styleUrl: './manager-card.component.css',
})
export class ManagerCardComponent {
  @Input() status!: string;
  @Input() level!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() stack!: string[];
  @Input() progress!: number;
  @Input() collaborators!: number;
  @Input() author!: string;

  copy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      console.log('Copied to clipboard');
    });
  }
}
