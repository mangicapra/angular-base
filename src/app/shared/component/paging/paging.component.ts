import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagingComponent implements OnInit {
  isOpen = false;

  @Input() selectedPages: string;
  @Input() pages: { value: number; name: string }[];
  @Input() parts: string;

  @Output() pageSelected = new EventEmitter();
  @Output() perPageSelected = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectOption(ev): void {
    this.selectedPages = ev.name;
    this.perPageSelected.emit(ev);
  }

  handlePageChange(ev): void {
    this.pageSelected.emit(ev);
  }

  toShow(part: string): boolean {
    const matcher = new RegExp(part);
    return !!this.parts && matcher.test(this.parts);
  }
}
