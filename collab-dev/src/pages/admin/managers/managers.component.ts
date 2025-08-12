import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  id: number;
  pseudo: string;
  badge: 'green' | 'red' | 'yellow';
  profile: 'DESIGNNEUR' | 'DEVELOPPEUR';
}
@Component({
  selector: 'app-managers',

  standalone: true,
  imports: [CommonModule,
    //ManagerCardComponent, 
    //TableComponent,
    
    //SearchbarComponent,
  ],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css',
})
export class ManagersComponent {}
