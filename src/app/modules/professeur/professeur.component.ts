import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PrintService} from "../../controller/services/print.service";
import {Responsabilite} from "../../controller/model/responsabilite.model";
import {Departement} from "../../controller/model/departement.model";
import {ProfesseurService} from "../../controller/services/professeur.service";
import {Professeur} from "../../controller/model/professeur.model";

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit {


  modalRef: BsModalRef;
  message: string;
  item: string;
  p: number =1;
  constructor(private professeurService: ProfesseurService,
              private modalService: BsModalService, private printService: PrintService) { }


  ngOnInit(): void {
    this.professeurService.findAll();
    this.professeurService.getResponsabilite();
    this.professeurService.getDepartement();

  }
  public save() {
    this.professeurService.save();
  }
  get professeurs(): Array<Professeur> {
    return this.professeurService.professeurs;
  }
  get departements(): Array<Departement> {
    return this.professeurService.departements;
  }
  get responsabilites(): Array<Responsabilite> {
    return this.professeurService.responsabilites;
  }
  get professeur(): Professeur {
    return this.professeurService.professeur;
  }
  public deleteByNom(professeur: Professeur) {
    this.professeurService.deleteByNom(professeur);
  }
  public recuperer(professeur: Professeur, id: number) {
    this.professeurService.recuperer(professeur, id);
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
    return this.professeurService.display;
  }

  public update(id: number, nom: string, prenom: string, mail: string, responsabilite: Responsabilite, departement: Departement){
    this.professeurService.update(id,nom, prenom, mail, responsabilite, departement);
  }
}

