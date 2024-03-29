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
  @Input() searchList: any[];
  @Output() enteredTerm = new EventEmitter<string>();
  @Output() choosedVal = new EventEmitter<any>();

  public isOpen = false;

  private searchData$ = new Subject();
  private event$ = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.event$.next();
    this.event$.complete();
    this.searchData$.next();
    this.searchData$.complete();
  }

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

  doSearch(term: string): void {
    if (term.length > 3) {
      this.enteredTerm.emit(term);
    }
  }

  chooseValue(val: any): void {
    this.selectedVal = val.name;
    this.choosedVal.emit(val);

    this.searchList = null;
  }
}
