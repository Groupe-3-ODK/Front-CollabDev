import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input() title = 'Nom du projet';
  @Input() createdDate = '12/12/2025';
  @Input() submittedDate = '12/12/2025';
  @Input() user = 'User1';
  @Input() manager = 'Manager1';
  @Input() github = 'https://github.com/monprojet';
  @Input() contributors = 3;
}
