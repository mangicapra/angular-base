import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './component/search/search.component';
import { PagingComponent } from './component/paging/paging.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { DropdownSearchComponent } from './component/dropdown-search/dropdown-search.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { ConfirmationModalComponent } from './component/confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonLoaderDirective } from './directive/button-loader.directive';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchComponent,
    PagingComponent,
    DropdownComponent,
    DropdownSearchComponent,
    CheckboxComponent,
    ButtonLoaderDirective,
    ConfirmationModalComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    ReactiveFormsModule,
    BsDropdownModule,
    NgxPaginationModule,
    ModalModule,
    SearchComponent,
    ButtonLoaderDirective,
    PagingComponent,
    DropdownComponent,
    DropdownSearchComponent,
    CheckboxComponent,
    ConfirmationModalComponent,
  ],
  entryComponents: [ConfirmationModalComponent],
})
export class SharedModule {}
