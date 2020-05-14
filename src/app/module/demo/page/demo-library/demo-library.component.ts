import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from '@shared/component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-demo-library',
  templateUrl: './demo-library.component.html',
  styleUrls: ['./demo-library.component.scss'],
})
export class DemoLibraryComponent implements OnInit, OnDestroy {
  // checkbox
  public checked = false;
  public singleCheckbox = { name: 'test', value: 1 };
  public isChecked = true;
  public boxes: { name: string; value: number }[] = [
    { name: 'first', value: 1 },
    { name: 'second', value: 2 },
    { name: 'third', value: 3 },
    { name: 'fourth', value: 4 },
  ];
  public selectedBoxes: { name: string; value: number }[] = [];

  // end of checkboxes

  // confirmation modal
  private bsModalRef: BsModalRef;
  private modalValue$ = new Subject();
  // end of confirmation modal

  // dropdown
  public dropdownItems = [
    { name: 'first', value: 1 },
    { name: 'second', value: 2 },
    { name: 'third', value: 3 },
  ];

  public initSelection = 'first';
  public ddSelection: any;
  // end of dropdown

  // search
  public searchTerm: string;
  public predefinedVal = 'test';
  // end of search

  // dropdown search
  public selectedVal: string;

  // end of dropdown search

  // paging
  public pages = [
    { value: 1, name: '10' },
    { value: 2, name: '20' },
    { value: 3, name: '50' },
  ];
  public items: any = ['dasd', 'fsfsd', 'fsdfsdf', 'fsdfsdf', 'fsdfsdf'];
  public p = 1;
  public perPage = 10;
  public count = 100;
  // end of paging

  // loading button
  public isLoading = false;
  // end of loading button

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.modalValue$.next();
    this.modalValue$.complete();
  }

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
  openConfirmationModal(): void {
    const initialState = {
      title: 'Delete User',
      message: `Are you sure you want to delete this user?`,
      buttonLabel: 'Delete',
    };
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState,
    });

    this.bsModalRef.content.submitAction
      .pipe(takeUntil(this.modalValue$))
      .subscribe((data) => {
        if (data) {
          // add logic if user selects positive acction
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
