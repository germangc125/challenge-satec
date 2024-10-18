import { Component, OnInit } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private readonly _modalReference: ModalReference<any>) { }

  ngOnInit() {
  }

  confirmDelete() {
    this._modalReference.closeSuccess("ok");
  }

  cancel() {
    this._modalReference.cancel();
  }
}
