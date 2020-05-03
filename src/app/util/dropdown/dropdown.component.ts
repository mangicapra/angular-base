import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  @Input('items') items: any; // since structure can be unknown this is set to any
  @Input('placeholder') placeholder: string;
  @Input('initSelection') initSelection;
  selectionInput;

  isOpen = false;

  @Output() selectValue = new EventEmitter<{ name: string; id: number }>();

  constructor() {}

  ngOnInit(): void {}

  selectOption(opt): void {
    this.selectionInput = opt.id;
    this.initSelection = opt.name;
    this.selectValue.emit(opt);
  }
}
