import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from '../../../controller/model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthenticationService} from '../../../controller/services';

@Component({
  selector: 'app-acceui',
  templateUrl: './acceui.component.html',
  styleUrls: ['./acceui.component.css']
})
export class AcceuiComponent implements OnInit {

  currentUser: User;
  modalRef: BsModalRef;
  constructor(private authenticationService: AuthenticationService, private modalService: BsModalService) {  this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
