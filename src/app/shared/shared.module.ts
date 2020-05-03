import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../util/search/search.component';
import { PagingComponent } from '../util/paging/paging.component';
import { DropdownComponent } from '../util/dropdown/dropdown.component';
import { DropdownSearchComponent } from '../util/dropdown-search/dropdown-search.component';
import { CheckboxComponent } from '../util/checkbox/checkbox.component';
import { ConfirmationModalComponent } from '../util/confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    SearchComponent,
    PagingComponent,
    DropdownComponent,
    DropdownSearchComponent,
    CheckboxComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
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
    PagingComponent,
    DropdownComponent,
    DropdownSearchComponent,
    CheckboxComponent,
    ConfirmationModalComponent,
  ],
  entryComponents: [ConfirmationModalComponent],
})
export class SharedModule {}
