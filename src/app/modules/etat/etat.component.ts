import {Component, OnInit, TemplateRef} from '@angular/core';

import {Etat} from '../../controller/model/etat.model';
import {EtatService} from '../../controller/services/etat.service';
import {SallesService} from '../../controller/services/salles.service';
import {Salles} from '../../controller/model/salles';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.css']
})
export class EtatComponent implements OnInit {
  modalRef: BsModalRef;
  item: string;
  p = 1;
  constructor(private etatService: EtatService,
              private salleService: SallesService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.etatService.findAll();
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
