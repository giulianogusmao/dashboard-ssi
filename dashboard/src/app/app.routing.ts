import { Routes, RouterModule } from '@angular/router';
import { AuthenticateGuard } from './_guards/index';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthenticateGuard],
    canActivate: [AuthenticateGuard],
  },
  {
    path: '**',
    redirectTo: 'account',
    pathMatch: 'full',
  },
];

export const AppRouting = RouterModule.forRoot(appRoutes, { useHash: false });
