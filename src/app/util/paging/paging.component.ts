import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagingComponent implements OnInit {
  selectedItem: string = '10';
  isOpen: boolean = false;

  @Output() pageSelected = new EventEmitter();
  @Output() perPageSelected = new EventEmitter();

  // change these values to fit your needs
  pages: { value: number; name: string }[] = [
    { value: 1, name: '10' },
    { value: 2, name: '20' },
    { value: 3, name: '50' },
  ];

  constructor() {}

  ngOnInit(): void {}

  /**
   * Select ammout of items to be displayed per page
   */
  selectOption(ev): void {
    this.selectedItem = ev.name;
    this.perPageSelected.emit(ev);
  }

  /**
   * Change page
   */
  handlePageChange(ev): void {
    this.pageSelected.emit(ev);
  }
}
