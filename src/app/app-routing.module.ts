import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { LibraryComponent } from './demo/library/library.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    data: { roles: ['Admin'] }, // pass roles which are able to access this module
    canActivate: [AuthGuard],
  },
  {
    path: 'demo',
    loadChildren: () =>
      import('./demo/demo.module').then((mod) => mod.DemoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
