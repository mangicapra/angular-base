import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'app-dropdown-search',
  templateUrl: './dropdown-search.component.html',
  styleUrls: ['./dropdown-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSearchComponent implements OnInit, OnDestroy {
  @ViewChild('search') search: ElementRef;
  @Input() selectedVal = '';
  @Input() placeholder = '';
  @Output() choosedVal = new EventEmitter<any>();

  public showSearchData = false;
  public isOpen = false;
  public values: any[];

  private searchData$ = new Subject();
  private event$ = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.event$.next();
    this.event$.complete();
    this.searchData$.next();
    this.searchData$.complete();
  }

  /**
   * Focus on input to show search bar
   * Also in this method we prepare everything for search
   */
  showSearchBar(state: boolean): void {
    this.isOpen = state;
    if (state) {
      setTimeout(() => {
        this.search.nativeElement.focus();
        fromEvent(this.search.nativeElement, 'input')
          .pipe(
            map((event: any) => {
              return event.target.value;
            }),
            debounceTime(1000),
            distinctUntilChanged(),
            takeUntil(this.event$)
          )
          .subscribe((text: string) => {
            this.doSearch(text);
          });
      }, 0);
    }
  }

  /**
   * Method that doing search
   * @param term is value that user write into input
   */
  doSearch(term: string): void {
    if (term.length < 3) {
      this.showSearchData = false;
    } else {
      // here goes API call
      // this is example how it should be done, this might vary
      // this.datastore
      //   .findAll(Post, {
      //     filter: {
      //       term,
      //     },
      //   })
      //   .pipe(takeUntil(this.searchData$))
      //   .subscribe(
      //     (posts: JsonApiQueryData<Post>) => (this.values = posts.getModels())
      //   );
    }
  }

  /**
   * On click chose value form the list and set that value to input
   * @param data value form list
   * @param setValue valeu that we need to set to getValue
   */
  chooseValue(val: any): void {
    this.selectedVal = val.name;
    this.choosedVal.emit(val);

    this.values = [];
    this.showSearchData = false;
  }
}
