import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  message: string;
  title: string;
  buttonLabel: string;
  @Input() submitAction = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  triggerAction() {
    this.submitAction.emit(true);
    this.bsModalRef.hide();
  }
}
