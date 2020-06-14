import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PersonnelService} from '../../controller/services/personnel.service';
import {Personnel} from '../../controller/model/personnel.model';
import {Departement} from '../../controller/model/departement.model';
import {Responsabilite} from '../../controller/model/responsabilite.model';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  modalRef: BsModalRef;
  item: string;
  p = 1;
  constructor( private modalService: BsModalService, private personnelService: PersonnelService) { }

  ngOnInit(): void {
    this.personnelService.findAll();
    this.personnelService.getDepartement();
    this.personnelService.getResponsabilite();
  }
  get personnel(): Personnel {
    return  this.personnelService.personnel;
  }
  get personnels(): Array<Personnel> {
    return this.personnelService.personnels;
  }
  get departements(): Array<Departement> {
    return this.personnelService.departements;
  }
  get responsabilites(): Array<Responsabilite> {
    return this.personnelService.responsabilites;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  public save() {
    this.personnelService.save();
  }
  public deleteByNom(personnel: Personnel) {
    this.personnelService.deleteByNom(personnel);
  }
  public vider(){
    this.personnelService.vider();
  }
  refresh(): void {
    window.location.reload();
  }
  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
  public update(id: number, nom: string, prenom: string, mail: string, fonction: string){
    this.personnelService.update(id, nom, prenom, mail, fonction);
  }
  public recuperer(personnel: Personnel, id: number) {
    this.personnelService.recuperer(personnel, id);
  }

}
