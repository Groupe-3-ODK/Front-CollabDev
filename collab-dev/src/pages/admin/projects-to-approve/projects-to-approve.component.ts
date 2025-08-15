
import { Component } from '@angular/core';
import { ProjectCardComponent } from '../../../shared/reusablesComponents/project-card/project-card.component';

@Component({
  selector: 'app-projects-to-approve',
  imports: [ProjectCardComponent],
  templateUrl: './projects-to-approve.component.html',
  styleUrl: './projects-to-approve.component.css',
})
export class ProjectsToApproveComponent {
  projects = [
    {
      title: 'Nom du projet 2',
      createdDate: '12/12/2025',
      submittedDate: '12/12/2025',
      user: 'User1',
      manager: 'Manager1',
      github: 'https://github.com/monprojet',
      contributors: 3,
    },
    
  ];
}
