import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPage } from '../../components/landing-page/landing-page';
import { CONSTANT } from '../../core/constants/contant';
import { SidebarComponent } from '../../shared/reusablesComponents/sidebar/sidebar.component';
import { UserSidebarComponent } from '../../shared/reusablesComponents/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, UserSidebarComponent, SidebarComponent, LandingPage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  public role: string = CONSTANT.CURRENT_USER.ROLE;

  public currentUser: any = null;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      this.currentUser = user ? JSON.parse(user) : null;
    }
  }
}
