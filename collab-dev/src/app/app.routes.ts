import { Routes } from '@angular/router';
import { CONSTANT } from '../core/constants/contant';
import { LayoutComponent } from './layout/layout.component';
import { Redirect } from './redirect/redirect';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'redirect',
      },
      {
        path: 'redirect',
        component: Redirect,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo:
              CONSTANT.CURRENT_USER.ROLE === 'ADMIN'
                ? 'admin/statistics'
                : 'user/dashboard',
          },
          {
            path: 'admin/statistics',
            loadComponent: () =>
              import('../pages/admin/statistics/statistics.component').then(
                (m) => m.StatisticsComponent
              ),
          },
          {
            path: 'user/dashboard',
            loadComponent: () =>
              import('../pages/users/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
              ),
          },
        ],
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

      {
        path: 'user/dashboard',
        loadComponent: () =>
          import('../pages/users/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'user/profil',
        loadComponent: () =>
          import('../pages/users/profil/profil.component').then(
            (m) => m.ProfilComponent
          ),
      },
      {
        path: 'user/projects',
        loadComponent: () =>
          import('../pages/users/projects/projects').then((m) => m.Projects),
      },
      {
        path: 'user/contribution-ask',
        loadComponent: () =>
          import('../pages/users/contribution-ask/contribution-ask').then(
            (m) => m.ContributionAsk
          ),
      },
      {
        path: 'user/my-contributions',
        loadComponent: () =>
          import('../pages/users/my-contributions/my-contributions').then(
            (m) => m.MyContributions
          ),
      },
      {
        path: 'user/settings',
        loadComponent: () =>
          import('../pages/users/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('../components/signup/signup').then((m) => m.SignupComponent),
  },
  {
    path: 'langing-page',
    loadComponent: () =>
      import('../components/landing-page/landing-page').then(
        (m) => m.LandingPage
      ),
  },
];
