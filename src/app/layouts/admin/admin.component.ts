import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from '../../controller/model';
import {AuthenticationService} from '../../controller/services';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser: User;
  modalRef: BsModalRef;
  constructor(private authenticationService: AuthenticationService, private modalService: BsModalService) {  this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
