import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
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

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
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
      })
    ),
    provideHttpClient(),
  ],
};
