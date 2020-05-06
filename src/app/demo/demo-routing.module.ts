import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';
import { LibraryComponent } from './library/library.component';
import { ApiExampleComponent } from './api-example/api-example.component';
import { AuthorComponent } from './author/author.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: 'library',
        component: LibraryComponent,
      },
      {
        path: 'json-api',
        component: ApiExampleComponent,
      },
      {
        path: 'authors/:id',
        component: AuthorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
