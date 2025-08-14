import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LandingPage } from '../../components/landing-page/landing-page';
import { SidebarComponent } from '../../shared/reusablesComponents/sidebar/sidebar.component';
import { UserSidebarComponent } from '../../shared/reusablesComponents/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, UserSidebarComponent, LandingPage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  providers: [CookieService], // Fournisseur de CookieService
})
export class LayoutComponent implements OnInit {
  public role: any = '';

  private cookieService = inject(CookieService);
  private router = inject(Router);
  public currentUser: any = null;

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
    if (this.currentUser) {
      this.role = this.currentUser.role;
    }
  }

  logout() {
    // 1. Supprimer le cookie
    this.cookieService.delete('currentUser', '/');

    // 2. Nettoyer les variables
    this.currentUser = null;
    this.role = null;

    // 3. Redirection
    this.router.navigate(['/login']);
  }
}
