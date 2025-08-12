import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { ProfilComponent } from '../pages/users/profil/profil.component';
import { DashboardComponent } from '../pages/users/dashboard/dashboard.component';
import { DetailProjetComponent } from '../pages/users/detail-projet/detail-projet.component';
import { GestionUserCoteAdminComponent } from '../pages/admin/gestion-user-cote-admin/gestion-user-cote-admin.component';
import { AccepterManager } from '../pages/admin/accepter-manager/accepter-manager';

@Component({
  selector: 'app-root',
  imports: [DetailProjetComponent,GestionUserCoteAdminComponent,AccepterManager],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'collab-dev';
}
