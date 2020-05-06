import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Input() searchInitValue = '';
  @Input() placeholder: string;

  @ViewChild('search') search: ElementRef;
  @Output() enteredTerm = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.searchTerm();
  }

  searchTerm() {
    setTimeout(() => {
      fromEvent(this.search.nativeElement, 'input')
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
