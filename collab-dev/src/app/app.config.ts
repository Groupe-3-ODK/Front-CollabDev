import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  Bookmark,
  BookMarked,
  ChartNoAxesCombined,
  CircleCheckBig,
  CircleUserRound,
  Cog,
  CopyPlus,
  FolderOpenDot,
  HandCoins,
  House,
  Layers,
  Lightbulb,
  LogIn,
  LucideAngularModule,
  MonitorCog,
  ScanSearch,
  ScrollText,
  Settings,
  User,
  UserCheck,
  UserRoundPen,
} from 'lucide-angular';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        House,
        Settings,
        ChartNoAxesCombined,
        Lightbulb,
        CircleCheckBig,
        CircleUserRound,
        MonitorCog,
        Cog,
        User,
        BookMarked,
        ScrollText,
        UserCheck,
        FolderOpenDot,
        CopyPlus,
        HandCoins,
        Layers,
        LogIn,
        UserRoundPen,
        ScanSearch,
        Bookmark,
      })
    ),
    provideHttpClient(withFetch()),
  ],
};
