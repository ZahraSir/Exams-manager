import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PrintService} from '../../controller/services/print.service';
import {Professeur} from '../../controller/model/professeur.model';
import {ExamService} from '../../controller/services/exam.service';
import {Exam} from '../../controller/model/exam.model';
import {Surveillant} from '../../controller/model/surveillant.model';
import {Module} from '../../controller/model/module.model';
import {Salles} from '../../controller/model/salles';
import {ExamSurveillant} from '../../controller/model/exam-surveillant';
import {ExamSalle} from '../../controller/model/exam-salle';
import {SallesService} from '../../controller/services/salles.service';
import {Personnel} from '../../controller/model/personnel.model';
import {SurveillantService} from '../../controller/services/surveillant.service';
import {ToastrService} from 'ngx-toastr';
import {Filiere} from '../../controller/model/filiere';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  selectedSur = new Surveillant();
  selectedSalle = new Salles();
  modalRef: BsModalRef;
  message: string;
  item: string;
  p = 1;

  constructor(private examService: ExamService,
              private modalService: BsModalService, private printService: PrintService, private salleService: SallesService, private surveillantService: SurveillantService,
              private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.examService.findAll();
    this.examService.getSalles();
    this.examService.getPersonnel();
    this.examService.getSurveillant();
    this.examService.getExamSurveillant();
    this.examService.getExamSalle();
    this.examService.getFiliere();
  }
  public save() {

    this.examService.save();
  }
  get exams(): Array<Exam> {
    return this.examService.exams;
  }
  get surveillants(): Array<Surveillant> {
    return this.examService.surveillants;
  }
  get professeurs(): Array<Professeur> {
    return this.examService.professeurs;
  }
  get modules(): Array<Module> {
    return this.examService.modules;
  }
  get salles(): Array<Salles> {
    return this.examService.salles;
  }
  get exam(): Exam {
    return this.examService.exam;
  }
  get examSurves(): Array<ExamSurveillant> {
    return this.examService.examSurves;
  }
  get examSurve(): ExamSurveillant {
    return this.examService.examSurve;
  }
  get examSalles(): Array<ExamSalle> {
    return this.examService.examSalles;
  }
  get personnels(): Array<Personnel> {
    return this.examService.personnels;
  }
  get personnel(): Personnel {
    return this.examService.personnel;
  }
  public deleteByReference(exam: Exam) {
    this.examService.deleteByReference(exam);
  }
  public findSurveillantByExamReference(exam: Exam){
    this.examService.findSurveillantByExamReference(exam);
  }
  public findSalleByExamReference(exam: Exam){
    this.examService.findSalleByExamReference(exam);
  }
  public recuperer(exam: Exam, id: number) {
    this.examService.recuperer(exam, id);
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  get filieres(): Array<Filiere>{
    return this.examService.filieres;
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  public update(id: number, reference: string, dateDepart: Date, dateFin: Date, module: Module, prof: Professeur, filiere: Filiere){
    this.examService.update(id, reference, dateDepart, dateFin, module, prof, filiere);
  }
 public addSurveillant(surveillant: Surveillant){
    this.examService.addSurveillant(surveillant);
  }
  public addSalle(salle: Salles){
    this.examService.addSalle(salle);
  }

  public selectedChangeHandler(event: any) {
  //  this.selectedSur = event.target.valu;
    console.log(event);
  }
  public vider(){
    this.examService.vider();
  }
  recupererSurv( surveillant) {
    console.log(surveillant);
    this.examService.findBySurveillantNom(surveillant);
  }
  recupererSalle( sal) {
    console.log(sal);
    console.log(this.exam.dateDepart);
    this.examService.findBySallesDesignation(sal);
  }
  recupererPerso(perso) {
    console.log(perso);
    this.examService.findByPersonnelNom(perso);
  }
  get surveill(): Surveillant {
    return this.examService.surveill;
  }
  get sal(): Salles {
    return this.examService.sal;
  }
  get perso(): Personnel {
    return this.examService.perso;
  }
  refresh(): void {
    window.location.reload();
  }
  public deleteExamBySalleDesignation(salle: Salles) {
    this.examService.deleteExamBySalleDesignation(salle);
  }

  public findEtatPrevue() {
    this.salleService.findEtatPrevue();
  }
  public addPersonnel(personnel: Personnel){
    this.examService.addPersonnel(personnel);
  }
  public saveSurveillant() {
    this.surveillantService.save();
  }
  public  findExamSalle(designation: string, dateDepart: Date, dateFin: Date ){
    console.log(dateFin);
    console.log(designation);
    console.log(dateDepart);
    this.examService.findExamSalle(designation, dateDepart, dateFin);
  }
  public findExamSurveillant(nom: string, dateDepart: Date, dateFin: Date ){
    this.examService.findExamSurveillant(nom, dateDepart, dateFin);
  }

  public show() {
    this.toastrService.success('hellokdkq', 'dkdlkmldkqmlkdm');
  }
  public deleteByNomFromView(surveillant: Personnel) {
    console.log(surveillant+'hvjf');
    this.examService.deleteByNomFromView(surveillant);
  }
  public deleteByDesignationFromView(salle: Salles) {
    this.examService.deleteByDesignationFromView(salle);
  }
  public findModuleByFiliereLibelle(libelle: string) {
    this.examService.findModuleByFiliereLibelle(libelle);
  }
  public findByModuleLibelle(libelle: string ) {
    this.examService.findByModuleLibelle(libelle);
  }
  public validate(): boolean{
    return this.examService.validate();
  }

  public validateSurveillant(): boolean{
    return this.examService.validateSurveillant();
  }

    public deleteExamBySurveillantId(surveillant: Surveillant) {
    this.examService.deleteExamBySurveillantId(surveillant);
  }
}
