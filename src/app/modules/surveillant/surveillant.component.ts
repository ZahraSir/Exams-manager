import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

import {PrintService} from "../../controller/services/print.service";

import {Surveillant} from "../../controller/model/surveillant.model";
import {SurveillantService} from "../../controller/services/surveillant.service";

@Component({
  selector: 'app-surveillant',
  templateUrl: './surveillant.component.html',
  styleUrls: ['./surveillant.component.css']
})
export class SurveillantComponent implements OnInit {


  modalRef: BsModalRef;
  message: string;
  item: string;
  p: number =1;
  constructor(private surveillantService: SurveillantService,
              private modalService: BsModalService, private printService: PrintService) { }


  ngOnInit(): void {
    this.surveillantService.findAll();
  }
  public save() {
    this.surveillantService.save();
  }
  get surveillants(): Array<Surveillant> {
    return this.surveillantService.surveillants;
  }
  get surveillant(): Surveillant {
    return this.surveillantService.surveillant;
  }
  public deleteByNom(surveillant: Surveillant) {
    this.surveillantService.deleteByNom(surveillant);
  }
  public recuperer(surveillant: Surveillant, id: number) {
    this.surveillantService.recuperer(surveillant, id);
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  get display(): number{
    return this.surveillantService.display;
  }


  public update(id: number, nom: string, prenom: string, mail: string){
    this.surveillantService.update(id, nom, prenom, mail);
  }
}

