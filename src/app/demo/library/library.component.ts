import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubSink } from 'subsink';
import { ConfirmationModalComponent } from '../../util/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  // checkbox
  checked = false;
  singleCheckbox = { name: 'test', value: 1 };
  isChecked = true;
  boxes: { name: string; value: number }[] = [
    { name: 'first', value: 1 },
    { name: 'second', value: 2 },
    { name: 'third', value: 3 },
    { name: 'fourth', value: 4 },
  ];
  selectedBoxes: { name: string; value: number }[] = [];

  // end of checkboxes

  // confirmation modal
  bsModalRef: BsModalRef;
  subs = new SubSink();
  // end of confirmation modal

  // dropdown
  dropdownItems = [
    { name: 'first', value: 1 },
    { name: 'second', value: 2 },
    { name: 'third', value: 3 },
  ];

  initSelection = 'first';
  ddSelection: any;
  // end of dropdown

  // search
  searchTerm: string;
  predefinedVal = 'test';
  // end of search

  // dropdown search
  selectedVal: string;

  // end of dropdown search

  // paging
  items: any = ['dasd', 'fsfsd', 'fsdfsdf', 'fsdfsdf', 'fsdfsdf'];
  p = 1;
  perPage = 10;
  count = 100; // this is total number of items, it's used to display pages and it should be set after you get list
  // end of paging

  // loading button
  isLoading = false;
  // end of loading button

  constructor(
    private modalService: BsModalService // for modal
  ) {}

  ngOnInit(): void {}

  // checkbox
  handleSingleCheckbox(ev: {
    checked: boolean;
    checkBox: { name: string; value: number };
  }): void {
    this.checked = ev.checked;
  }

  handleMultiCheckbox(ev: {
    checked: boolean;
    checkBox: { name: string; value: number };
  }): void {
    if (ev.checked) {
      this.selectedBoxes = [...this.selectedBoxes, ev.checkBox];
    } else {
      this.selectedBoxes = this.selectedBoxes.filter(
        (item) => item.value !== ev.checkBox.value
      );
    }
  }
  // end of checkboxes

  // Confirmation Modal
  /**
   * Opening modal
   */
  openConfirmationModal(): void {
    const initialState = {
      title: 'Delete User',
      message: `Are you sure you want to delete this user?`,
      buttonLabel: 'Delete',
    };
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState,
    });

    this.subs.sink = this.bsModalRef.content.submitAction.subscribe((data) => {
      if (data) {
        // add logic if user selects positive acction
        console.log(data);
      }
    });
  }

  // end of confirmation modal

  // dropdown
  handleSelect(ev): void {
    // ev will be whole object that you sent via => `dropdownItems`
    this.ddSelection = ev;
  }
  // end of dropdown

  // search
  handleSearch(term: string): void {
    // if you have api call with search param trigger it here
    // also if you have paging set it to 1
    this.searchTerm = term;
  }

  handlePredefined(term: string): void {
    // if you have api call with search param trigger it here
    // also if you have paging set it to 1
    this.predefinedVal = term;
  }
  // end of search

  // Dropdown search
  handleDropdownSearchSelect(ev): void {
    // if you have api call with search param trigger it here
    // also if you have paging set it to 1
    // ev will be whole object that you received from search result and selection
    this.selectedVal = ev.name;
  }
  // end of dropdown search

  // paging
  handlePerPageChange(ev): void {
    // trigger api call with new perPage param
    this.perPage = Number(ev.name);
  }

  handlePageChange(ev): void {
    // trigger api call with new nage
    this.p = ev === '' ? 1 : ev;
  }
  // end of paging

  // load button
  load() {
    // change value to true
    this.isLoading = !this.isLoading;

    // here should go API call and after success or error return it to false
    setTimeout(() => {
      this.isLoading = !this.isLoading;
    }, 3000);
  }
  // end of load button
}
