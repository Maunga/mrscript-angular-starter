import { Route } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@core/dashboard').then(m => m.DashboardComponent)
      },
    ]
  },
  {
    path: 'auth/login',
    loadComponent: () => import('@core/auth').then(m => m.AuthComponent)
  },
  
  { path: 'notfound', loadComponent: () => import('@core/dashboard').then(m => m.NotfoundComponent) },
  { path: '**', redirectTo: '/notfound' },
];
