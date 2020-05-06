import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LibraryComponent } from './library/library.component';
import { ApiExampleComponent } from './api-example/api-example.component';
import { AuthorComponent } from './author/author.component';

@NgModule({
  declarations: [DemoComponent, LibraryComponent, ApiExampleComponent, AuthorComponent],
  imports: [CommonModule, DemoRoutingModule, SharedModule],
})
export class DemoModule {}
