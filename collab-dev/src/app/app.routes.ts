import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin/statistics',
      },
      {
        path: 'admin/statistics',
        loadComponent: () =>
          import('../pages/admin/statistics/statistics.component').then(
            (m) => m.StatisticsComponent
          ),
      },
      {
        path: 'admin/projects',
        loadComponent: () =>
          import('../pages/admin/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      {
        path: 'admin/managers',
        loadComponent: () =>
          import('../pages/admin/managers/managers.component').then(
            (m) => m.ManagersComponent
          ),
      },
      {
        path: 'admin/projects-to-approve',
        loadComponent: () =>
          import(
            '../pages/admin/projects-to-approve/projects-to-approve.component'
          ).then((m) => m.ProjectsToApproveComponent),
      },
      {
        path: 'admin/users',
        loadComponent: () =>
          import('../pages/admin/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: 'admin/configuration',
        loadComponent: () =>
          import('../pages/admin/configuration/configuration.component').then(
            (m) => m.ConfigurationComponent
          ),
      },
      {
        path: 'admin/settings',
        loadComponent: () =>
          import('../pages/admin/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'admin/teams-and-roles',
        loadComponent: () =>
          import(
            '../pages/admin/teams-permissions/teams-permissions.component'
          ).then((m) => m.TeamsPermissionsComponent),
      },
      {
        path: 'admin/support',
        loadComponent: () =>
          import('../pages/admin/support/support.component').then(
            (m) => m.SupportComponent
          ),
      },
      {
        path: 'admin/confidentiality-policy',
        loadComponent: () =>
          import(
            '../pages/admin/confidentiality-policy/confidentiality-policy.component'
          ).then((m) => m.ConfidentialityPolicyComponent),
      },
      //-----------------------------------------------------------------------
    ],
  },
];
