import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LandingPage } from '../../components/landing-page/landing-page';
import { SidebarComponent } from '../../shared/reusablesComponents/sidebar/sidebar.component';
import { UserSidebarComponent } from '../../shared/reusablesComponents/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, UserSidebarComponent, SidebarComponent, LandingPage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  providers: [CookieService], // Fournisseur de CookieService
})
export class LayoutComponent implements OnInit {
  public role: string = '';

  private cookieService = inject(CookieService);
  public currentUser: any = null;

  ngOnInit(): void {
    this.currentUser = JSON.parse(
      this.cookieService.get('currentUser') || '{}'
    );
    if (this.currentUser) {
      this.role = this.currentUser.role;
    }
  }
}
