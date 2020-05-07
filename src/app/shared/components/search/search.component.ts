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
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SubSink } from 'subsink';

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

  private subs = new SubSink();

  constructor() {}

  ngOnInit(): void {
    this.searchTerm();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
  }

  searchTerm() {
    setTimeout(() => {
      this.subs.sink = fromEvent(this.search.nativeElement, 'input')
        .pipe(
          map((event: any) => {
            return event.target.value;
          }),
          debounceTime(1000),
          distinctUntilChanged()
        )
        .subscribe((text: string) => {
          this.searchInitValue = text;
          this.enteredTerm.emit(text);
        });
    }, 0);
  }
}
