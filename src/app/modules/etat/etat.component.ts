import {Component, OnInit, TemplateRef} from '@angular/core';

import {Etat} from '../../controller/model/etat.model';
import {EtatService} from '../../controller/services/etat.service';
import {SallesService} from '../../controller/services/salles.service';
import {Salles} from '../../controller/model/salles';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {User} from '../../controller/model';
import {AuthenticationService} from '../../controller/services';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent implements OnInit {
  modalRef: BsModalRef;
  item: string;
  p = 1;
  currentUser: User;
  users = [];
  constructor(private etatService: EtatService,
              private salleService: SallesService,
              private modalService: BsModalService, private authenticationService: AuthenticationService)
  { this.currentUser = this.authenticationService.currentUserValue; }




  ngOnInit() {
    this.etatService.findAll();
    this.loadAllUsers();
  }
  get etats(): Array<Etat> {
    return this.etatService.etats;
  }
  get etat(): Etat {
    return  this.etatService.etat;
  }
  get salle(): Salles {
    return this.salleService.salle;
  }
  private loadAllUsers() {
    this.authenticationService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
