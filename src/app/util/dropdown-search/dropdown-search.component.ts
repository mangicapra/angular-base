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
import { SubSink } from 'subsink';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  showSearchData = false;
  isOpen = false;
  values: any[];
  subs = new SubSink();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
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
            distinctUntilChanged()
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
      // this.subs.sink = this.datastore
      //   .findAll(Post, {
      //     filter: {
      //       term,
      //     },
      //   })
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
