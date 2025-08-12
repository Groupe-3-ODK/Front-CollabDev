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

      //-------------------------- USER LINK ---------------------------------------------

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
        path: 'user/projects-views',
        loadComponent: () =>
          import('../pages/users/view-projects/view-projects').then(
            (m) => m.ViewProjectsComponent
          ),
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
      {
        path: 'user/favoris',
        loadComponent: () =>
          import('../pages/users/favoris/favoris').then((m) => m.Favoris),
      },
    ],
    //-------------------------- AUTHENTIFICATION LINK ---------------------------------------------
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
  //---------------------------------------------------------------
  {
    path: 'langing-page',
    loadComponent: () =>
      import('../components/landing-page/landing-page').then(
        (m) => m.LandingPage
      ),
  },
  {
    path: 'user/forgot-password',
    loadComponent: () =>
      import('../components/forgot-password/forgot-password').then(
        (m) => m.ForgotPasswordComponent
      ),
  },

  {
    path: 'users/view-details/:id',
    loadComponent: () =>
      import(
        '../pages/users/voir-details-projet/voir-details-projet.component'
      ).then((m) => m.VoirDetailsProjetComponent),
  },

  {
    path: 'users/add-team/:id',
    loadComponent: () =>
      import('../pages/users/ajout-equipe/ajout-equipe').then(
        (m) => m.AjoutEquipe
      ),
  },

  {
    path: 'users/configure-project/:id',
    loadComponent: () =>
      import(
        '../pages/users/configuration-du-projet/configuration-du-projet'
      ).then((m) => m.ConfigurationDuProjet),
  },

  {
    path: 'users/create-task/:id',
    loadComponent: () =>
      import('../pages/users/creer-tache/creer-tache').then(
        (m) => m.CreerTache
      ),
  },

  {
    path: 'users/project-detail/:id',
    loadComponent: () =>
      import('../pages/users/detail-projet/detail-projet.component').then(
        (m) => m.DetailProjetComponent
      ),
  },

  {
    path: 'users/project-done/:id',
    loadComponent: () =>
      import('../pages/users/project-done/project-done.component').then(
        (m) => m.ProjectDoneComponent
      ),
  },

  {
    path: 'users/project-in-progress/:id',
    loadComponent: () =>
      import(
        '../pages/users/projectinprogress/projectinprogress.component'
      ).then((m) => m.ProjectinprogressComponent),
  },

  {
    path: 'users/projects/:id',
    loadComponent: () =>
      import('../pages/users/projects/projects').then((m) => m.Projects),
  },

  {
    path: 'users/settings/:id',
    loadComponent: () =>
      import('../pages/users/settings/settings').then((m) => m.Settings),
  },

  {
    path: 'shared/project-form/:id',
    loadComponent: () =>
      import('../shared/project-form/project-form.component').then(
        (m) => m.ProjectFormComponent
      ),
  },

  {
    path: 'shared/submit-project-form/:id',
    loadComponent: () =>
      import(
        '../shared/submit-project-form/submit-project-form.component'
      ).then((m) => m.SubmitProjectFormComponent),
  },

  {
    path: 'shared/chip',
    loadComponent: () =>
      import('../shared/reusablesComponents/chip/chip.component').then(
        (m) => m.ChipComponent
      ),
  },

  {
    path: 'shared/create-task-modal',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/create-task-modal/create-task-modal'
      ).then((m) => m.CreateTaskModal),
  },

  {
    path: 'shared/manager-card',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/manager-card/manager-card.component'
      ).then((m) => m.ManagerCardComponent),
  },

  {
    path: 'shared/pop-up',
    loadComponent: () =>
      import('../shared/reusablesComponents/pop-up/pop-up').then(
        (m) => m.PopUp
      ),
  },

  {
    path: 'shared/project-card',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/project-card/project-card.component'
      ).then((m) => m.ProjectCardComponent),
  },

  {
    path: 'shared/searchbar',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/searchbar/searchbar.component'
      ).then((m) => m.SearchbarComponent),
  },

  {
    path: 'shared/sidebar',
    loadComponent: () =>
      import('../shared/reusablesComponents/sidebar/sidebar.component').then(
        (m) => m.SidebarComponent
      ),
  },

  {
    path: 'shared/snackbar',
    loadComponent: () =>
      import('../shared/reusablesComponents/snackbar/snackbar.component').then(
        (m) => m.SnackbarComponent
      ),
  },

  {
    path: 'shared/table',
    loadComponent: () =>
      import('../shared/reusablesComponents/table/table.component').then(
        (m) => m.TableComponent
      ),
  },

  {
    path: 'shared/user-sidebar',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/user-sidebar/user-sidebar.component'
      ).then((m) => m.UserSidebarComponent),
  },

  //------------------------------------------------------------------------
  {
    path: 'user/add-team',
    loadComponent: () =>
      import('../pages/users/ajout-equipe/ajout-equipe').then(
        (m) => m.AjoutEquipe
      ),
  },
  {
    path: 'shared/manager-card',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/manager-card/manager-card.component'
      ).then((m) => m.ManagerCardComponent),
  },

  {
    path: 'shared/pop-up',
    loadComponent: () =>
      import('../shared/reusablesComponents/pop-up/pop-up').then(
        (m) => m.PopUp
      ),
  },

  {
    path: 'shared/project-card',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/project-card/project-card.component'
      ).then((m) => m.ProjectCardComponent),
  },

  {
    path: 'shared/searchbar',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/searchbar/searchbar.component'
      ).then((m) => m.SearchbarComponent),
  },

  {
    path: 'shared/sidebar',
    loadComponent: () =>
      import('../shared/reusablesComponents/sidebar/sidebar.component').then(
        (m) => m.SidebarComponent
      ),
  },

  {
    path: 'shared/snackbar',
    loadComponent: () =>
      import('../shared/reusablesComponents/snackbar/snackbar.component').then(
        (m) => m.SnackbarComponent
      ),
  },

  {
    path: 'shared/table',
    loadComponent: () =>
      import('../shared/reusablesComponents/table/table.component').then(
        (m) => m.TableComponent
      ),
  },

  {
    path: 'shared/user-sidebar',
    loadComponent: () =>
      import(
        '../shared/reusablesComponents/user-sidebar/user-sidebar.component'
      ).then((m) => m.UserSidebarComponent),
  },
<<<<<<< HEAD
    {
    path: 'user/manager-submit-form',
    loadComponent: () =>
      import(
        '../pages/users/admin-form/admin-form.component'      
      ).then((m) => m.AdminFormComponent),
  },

=======
>>>>>>> 00982b1558f4d7ae8cd638f872558e6c623946f6
];
