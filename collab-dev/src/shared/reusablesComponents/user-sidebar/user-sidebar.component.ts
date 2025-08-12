import { Component, inject, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-sidebar',
  imports: [RouterModule, RouterLinkActive, LucideAngularModule],
  providers: [CookieService],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
})
export class UserSidebarComponent implements OnInit {
  private cookieService = inject(CookieService);
  public currentUser: any = null;

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
  }
}
