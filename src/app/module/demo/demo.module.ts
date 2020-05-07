import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from '@shared';
import { DemoLibraryComponent } from './pages/demo-library/demo-library.component';
import { DemoApiExampleComponent } from './pages/demo-api-example/demo-api-example.component';
import { DemoAuthorComponent } from './pages/demo-author/demo-author.component';

@NgModule({
  declarations: [
    DemoComponent,
    DemoLibraryComponent,
    DemoApiExampleComponent,
    DemoAuthorComponent,
  ],
  imports: [CommonModule, DemoRoutingModule, SharedModule],
})
export class DemoModule {}
