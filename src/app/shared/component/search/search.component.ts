import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() searchInitValue = '';
  @Input() placeholder: string;

  @ViewChild('search') search: ElementRef;
  @Output() enteredTerm = new EventEmitter<string>();

  private term$ = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.searchTerm();
  }

  ngOnDestroy(): void {
    this.term$.next();
    this.term$.complete();
  }

  searchTerm() {
    setTimeout(() => {
      fromEvent(this.search.nativeElement, 'input')
        .pipe(
          map((event: any) => {
            return event.target.value;
          }),
          debounceTime(1000),
          distinctUntilChanged(),
          takeUntil(this.term$)
        )
        .subscribe((text: string) => {
          this.searchInitValue = text;
          this.enteredTerm.emit(text);
        });
    }, 0);
  }
}
