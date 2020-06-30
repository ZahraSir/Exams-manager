import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EtudiantService} from '../../../controller/services/etudiant.service';
import {FiliereService} from '../../../controller/services/filiere.service';
import {ModuleService} from '../../../controller/services/module.service';
import {Filiere} from '../../../controller/model/filiere';
import {Semestre} from '../../../controller/model/semestre';
import {Etudiant} from '../../../controller/model/etudiant';
import {NiveauSemestre} from '../../../controller/model/niveau-semestre';
import {AuthenticationService, UserService} from '../../../controller/services';
import {User} from '../../../controller/model';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantsComponent implements OnInit {

  item: string;
  modalRef: BsModalRef;
  p = 1;
  currentUser: User ;
  constructor(private etudiantService: EtudiantService, private modalService: BsModalService,private authenticationService: AuthenticationService, private filiereService: FiliereService, private moduleService: ModuleService,   private userService: UserService)
  {this.currentUser = authenticationService.currentUserValue }

  ngOnInit(): void {
    this.filiereService.findFiliereByDepartementLibelle(this.currentUser.departement);
    this.etudiantService.getSemestres();
    this.etudiantService.findEtudiantByDepartementLibelle(this.currentUser.departement);
  }

  get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }

  get semestres(): Array<Semestre>{
    return this.etudiantService.semestres;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
  get etudiant(): Etudiant{
    return this.etudiantService.etudiant;
  }

  get etudiants(): Array<Etudiant>{
    return this.etudiantService.etudiants;
  }
  get fils(): Array<Filiere> {
    return this.filiereService.fils;
  }
  public save(){
    this.etudiantService.save();
  }

  public vider(){
    this.etudiantService.vider();
  }

  public recuperer(etudiant: Etudiant){
    this.etudiantService.recuperer(etudiant);
  }

  public updateE(id: number, nom: string, prenom: string, cne: string, mail: string, Filiere: string, idSemestre: number){
    this.etudiantService.update(id, nom, prenom, cne, mail, Filiere, idSemestre);
  }


  public deleteByCne(etudiant: Etudiant){
    this.etudiantService.deleteByCne(etudiant);
  }

  public findByFiliereLibelle(filiere){
    console.log(filiere);
    this.etudiantService.findByFiliereLibelle(filiere);

  }

  get niveauSemestres(): Array<NiveauSemestre>{
    return this.etudiantService.niveauSemestres;
  }
  public validate(): boolean{
    return this.etudiantService.validate();
  }

}
