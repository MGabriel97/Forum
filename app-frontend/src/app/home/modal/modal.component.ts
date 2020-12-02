import { ModalconfirmComponent } from './modalconfirm.component';
import {Component, Type,Input} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: ModalconfirmComponent
};
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent  {

 

constructor(private _modalService: NgbModal) {
}

open(name: string) {
this._modalService.open(MODALS[name]);
}
}

