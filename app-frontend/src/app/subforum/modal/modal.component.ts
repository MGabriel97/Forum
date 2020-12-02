import { ModalconfirmComponentSubForum } from './modalconfirm.component';
import {Component, Type} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: ModalconfirmComponentSubForum
};
@Component({
  selector: 'app-modal-subforum',
  templateUrl: './modal.component.html',
})
export class ModalComponentSubForum  {

 

constructor(private _modalService: NgbModal) {}

open(name: string) {
this._modalService.open(MODALS[name]);
}
}

