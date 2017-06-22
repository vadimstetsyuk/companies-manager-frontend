import { Component, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-dialog',
  templateUrl: './add-dialog.component.html'
})
export class AddCompanyComponent {
  @ViewChild('childModal') public childModal: ModalDirective;

  constructor() {
  }

  show() {
    this.childModal.show();
  }
  
  hide() {
    this.childModal.hide();
  }
}