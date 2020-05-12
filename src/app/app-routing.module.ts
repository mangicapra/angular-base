import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoginGuard } from '@core/guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./module/auth/auth.module').then((mod) => mod.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./module/admin/admin.module').then((mod) => mod.AdminModule),
    data: { roles: ['Admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'demo',
    loadChildren: () =>
      import('./module/demo/demo.module').then((mod) => mod.DemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
