import { ModalconfirmComponentEdit } from './modalconfirm.component';
import {Component, Type} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: ModalconfirmComponentEdit
};
@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal.component.html',
})
export class ModalComponentEdit  {

 

constructor(private _modalService: NgbModal) {}

open(name: string) {
this._modalService.open(MODALS[name]);
}
}

