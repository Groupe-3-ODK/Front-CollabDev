import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/reusablesComponents/sidebar/sidebar.component';
import { UserSidebarComponent } from "../user-sidebar/user-sidebar.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,UserSidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
