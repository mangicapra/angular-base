import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit {
  @Input('checkBox') checkBox: { name: string; value: number };
  @Input('isChecked') isChecked: boolean;
  @Output() checked = new EventEmitter<{
    checked: boolean;
    checkBox: { name: string; value: number };
  }>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Handle checkbox change
   */
  onCheckboxChange(ev, checkBox): void {
    this.checked.emit({ checked: ev.target.checked, checkBox });
  }
}