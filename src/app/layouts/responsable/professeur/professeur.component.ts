import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProfesseurService} from '../../../controller/services/professeur.service';
import {PrintService} from '../../../controller/services/print.service';
import {Departement} from '../../../controller/model/departement.model';
import {Responsabilite} from '../../../controller/model/responsabilite.model';
import {Professeur} from '../../../controller/model/professeur.model';
import {User} from "../../../controller/model";
import {AuthenticationService} from "../../../controller/services";


@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseursComponent implements OnInit {


  modalRef: BsModalRef;
  message: string;
  item: string;
  p = 1;
  currentUser: User ;
  constructor(private professeurService: ProfesseurService,
              private modalService: BsModalService, private printService: PrintService,private authenticationService: AuthenticationService) {this.currentUser = authenticationService.currentUserValue }


  ngOnInit(): void {
    this.professeurService.findProfesseurByDepartementLibelle(this.currentUser.departement);
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

  public update(id: number, nom: string, prenom: string, mail: string, responsabilite: string, departement: string){
    this.professeurService.update(id, nom, prenom, mail, responsabilite, departement);
  }
  public vider(){
    this.professeurService.vider();
  }
  refresh(): void {
    window.location.reload();
  }
  public validate(): boolean{
    return this.professeurService.validate();
  }
}

