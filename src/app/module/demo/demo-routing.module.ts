import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';
import { DemoLibraryComponent } from './pages/demo-library/demo-library.component';
import { DemoApiExampleComponent } from './pages/demo-api-example/demo-api-example.component';
import { DemoAuthorComponent } from './pages/demo-author/demo-author.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: 'library',
        component: DemoLibraryComponent,
      },
      {
        path: 'json-api',
        component: DemoApiExampleComponent,
      },
      {
        path: 'authors/:id',
        component: DemoAuthorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
