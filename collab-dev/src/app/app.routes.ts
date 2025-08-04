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
        redirectTo: 'statistics',
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('../pages/admin/statistics/statistics.component').then(
            (m) => m.StatisticsComponent
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('../pages/admin/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      {
        path: 'managers',
        loadComponent: () =>
          import('../pages/admin/managers/managers.component').then(
            (m) => m.ManagersComponent
          ),
      },
      {
        path: 'projects-to-approve',
        loadComponent: () =>
          import(
            '../pages/admin/projects-to-approve/projects-to-approve.component'
          ).then((m) => m.ProjectsToApproveComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../pages/admin/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('../pages/admin/configuration/configuration.component').then(
            (m) => m.ConfigurationComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../pages/admin/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'teams-and-roles',
        loadComponent: () =>
          import(
            '../pages/admin/teams-permissions/teams-permissions.component'
          ).then((m) => m.TeamsPermissionsComponent),
      },
      {
        path: 'support',
        loadComponent: () =>
          import('../pages/admin/support/support.component').then(
            (m) => m.SupportComponent
          ),
      },
      {
        path: 'confidentiality-policy',
        loadComponent: () =>
          import(
            '../pages/admin/confidentiality-policy/confidentiality-policy.component'
          ).then((m) => m.ConfidentialityPolicyComponent),
      },
    ],
  },
];
