import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CONSTANT } from '../../core/constants/contant';
import { SidebarComponent } from '../../shared/reusablesComponents/sidebar/sidebar.component';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, UserSidebarComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  public role: string = CONSTANT.CURRENT_USER.ROLE;

  ngOnInit(): void {}
}
