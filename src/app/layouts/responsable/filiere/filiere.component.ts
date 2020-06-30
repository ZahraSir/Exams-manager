import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FiliereService} from '../../../controller/services/filiere.service';
import {ModuleService} from '../../../controller/services/module.service';
import {EtudiantService} from '../../../controller/services/etudiant.service';
import {SemestreService} from '../../../controller/services/semestre.service';
import {Filiere} from '../../../controller/model/filiere';
import {Module} from '../../../controller/model/module.model';
import {Departement} from '../../../controller/model/departement.model';
import {Niveau} from '../../../controller/model/niveau';
import {NiveauSemestre} from '../../../controller/model/niveau-semestre';
import {Semestre} from '../../../controller/model/semestre';
import {Professeur} from '../../../controller/model/professeur.model';
import {User} from '../../../controller/model';
import {AuthenticationService} from '../../../controller/services';
import {DepartementService} from '../../../controller/services/departement.service';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FilieresComponent implements OnInit {

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  message: string;
  item: string;
  selected: string;
  selectedNiveau: string;
  p = 1;
currentUser: User;

  constructor(private modalService: BsModalService, private departementService: DepartementService, private filiereService: FiliereService, private authenticationService: AuthenticationService, private moduleService: ModuleService, private etudiantService: EtudiantService, private semestreService: SemestreService) {
   this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.filiereService.findFiliereByDepartementLibelle(this.currentUser.departement);
    this.filiereService.getNiveaux();
    this.filiereService.findByLibelle(this.currentUser.departement);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  recupereF(filiere: Filiere){
    this.filiereService.recupererF(filiere);
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  openModalD(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  get filiere(): Filiere{
    return this.filiereService.filiere;
  }

  get module(): Module{
    return this.filiereService.module;
  }

  get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }
  get departements(): Array<Departement>{
    return this.filiereService.departements;
  }
  get niveaux(): Array<Niveau>{
    return this.filiereService.niveaux;
  }
  get fils(): Array<Filiere> {
    return this.filiereService.fils;
  }
  get modules(): Array<Module>{
    return this.filiereService.modules;
  }

  get niveauSemestres(): Array<NiveauSemestre>{
    return this.filiereService.niveauSemestres;
  }

  public validateSave(): boolean{
    return this.filiereService.validateSave();
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }

  public save(selectedNiveau: string){
    this.filiereService.save(selectedNiveau);
  }

  public recupererF(filiere: Filiere){
    this.filiereService.recupererF(filiere);
  }

  public addModules(){
    this.filiereService.addModules();
  }

  public saveFM(){
    this.filiereService.saveFM();
  }

  public deleteByDesignation(filiere: Filiere){
    this.filiereService.deleteByDesignation(filiere);
  }

  public findByFiliereLibelle(filiere: Filiere){
    this.filiereService.findByFiliereLibelle(filiere);
    console.log(filiere.niveau.libelle);
  }

  get display(): number{
    return this.filiereService.display;
  }

  public recupererM(module: Module){
    this.moduleService.recuperer(module);
  }

  public recupereMo(module: Module){
    this.module.id = module.id;
    this.module.libelle = module.libelle;
    this.module.semestre = module.semestre;
    this.module.filiere = this.filiere;
    return this.module;
  }

  public saveM(module: Module){
    this.filiereService.saveM(this.recupereMo(module));
  }

  public deleteByLibelle(module: Module){
    this.filiereService.deleteByLibelle(module);
  }

  get semestres(): Array<Semestre>{
    return this.etudiantService.semestres;
  }
  get semestre(): Semestre{
    return this.semestreService.semestre;
  }

  public vider(){
    this.filiereService.vider();
  }

  public findByNiveauLibelle(niveau){
    console.log(niveau);
    this.filiereService.findByNiveauLibelle(niveau);

  }
  get professeurs(): Array<Professeur> {
    return this.filiereService.professeurs;
  }
  public findByDepartementLibelle(libelle){
    console.log(libelle);
    this.filiereService.findByDepartementLibelle(libelle);
  }
  public validate(): boolean{
    return this.filiereService.validate();
  }
}
