import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-user-sidebar',
  imports: [RouterModule, RouterLinkActive, LucideAngularModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
})
export class UserSidebarComponent {}
