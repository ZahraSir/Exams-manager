import {Component, OnInit, TemplateRef} from '@angular/core';
import {ModuleService} from '../../../controller/services/module.service';
import {FiliereService} from '../../../controller/services/filiere.service';
import {SemestreService} from '../../../controller/services/semestre.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ProfesseurService} from '../../../controller/services/professeur.service';
import {Module} from '../../../controller/model/module.model';
import {Filiere} from '../../../controller/model/filiere';
import {Semestre} from '../../../controller/model/semestre';
import {NiveauSemestre} from '../../../controller/model/niveau-semestre';
import {Professeur} from '../../../controller/model/professeur.model';
import {User} from '../../../controller/model';
import {AuthenticationService} from '../../../controller/services';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModulesComponent implements OnInit {
  currentUser: User ;
  constructor(private moduleService: ModuleService, private filiereService: FiliereService, private semestreService: SemestreService, private modalService: BsModalService,
              private professeurService: ProfesseurService, private authenticationService: AuthenticationService) {this.currentUser = authenticationService.currentUserValue;  }
  item: string;
  modalRef: BsModalRef;
  p = 1;
  ngOnInit(): void {
    this.moduleService.getSemestres();
    this.moduleService.findByFiliereDepartementLibelle(this.currentUser.departement);
    this.filiereService.findFiliereByDepartementLibelle(this.currentUser.departement);
  }

  get module(): Module{
    return this.moduleService.module;
  }

  get modules(): Array<Module>{
    return this.moduleService.modules;
  }

  get mods(): Array<Module>{
    return this.moduleService.mods;
  }

  public save(){
    this.moduleService.save();
  }

  get filiere(): Filiere{
    return this.filiereService.filiere;
  }


  get semestres(): Array<Semestre>{
    return this.moduleService.semestres;
  }

  public deleteById(module: Module){
    this.moduleService.deleteById(module);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  decline(): void {
    this.modalRef.hide();
  }

  get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }

  get fils(): Array<Filiere> {
    return this.filiereService.fils;
  }
  public recuperer(module: Module){
    this.moduleService.recuperer(module);
  }
  public update(module: Module){
    this.moduleService.update(module.id, module.libelle, module.semestre.libelle, module.professeur.nom);
  }
  public vider(){
    this.moduleService.vider();
  }
  get niveauSemestres(): Array<NiveauSemestre>{
    return this.moduleService.niveauSemestres;
  }
  public findByfiliereLibelle(filiere){
    console.log(filiere);
    this.moduleService.findByFiliereLibelle(filiere);
  }
  get professeurs(): Array<Professeur> {
    return this.moduleService.professeurs;
  }
  public findByDepartementLibelle(libelle){
    console.log(libelle);
    this.moduleService.findByDepartementLibelle(libelle);
  }
  public findByLibelle(libelle){
    this.moduleService.findByLibelle(libelle);
  }
  public validate(){
    return this.moduleService.validate();
  }
}
