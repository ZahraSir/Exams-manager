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
import * as moment from 'moment';
import {DatePipe} from '@angular/common';


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
  dateDebut: Date;
  dateFin: string;
  dateFIn: Date;
  diffDate: any;
  difTime: any;
  p = 1;
  dateDep: string;

  constructor(private examService: ExamService, public datepipe: DatePipe,
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
  get examSalle(): ExamSalle {
    return this.examService.examSalle;
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

  public update(id: number, reference: string, dateDepart: string, dateFin: string, module: Module, prof: Professeur, filiere: Filiere){
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
    this.examService.findBySallesDesignation(sal);
  }
  recupererPerso(perso) {
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

  public  findExamSalle(designation: string, dateDepart: string, dateFin: string ){
    this.examService.findExamSalle(designation, dateDepart, dateFin);
  }
  public findExamSurveillant(nom: string, dateDepart: string, dateFin: string ){
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
  public ajouter(value){
    this.dateDebut = new Date(value);
    this.dateDebut.setHours(this.dateDebut.getHours() + 2);
    this.dateFin = moment(this.dateDebut).format("YYYY-MM-DD[T]HH:mm");
    /*this.dateDep = this.datepipe.transform(this.dateDebut, 'dd/MM/yyyy');*/
    this.exam.dateFin = this.dateFin;

  }
  get examSa(): Array<ExamSalle>{
    return this.examService.examSa;
  }

  public addExamSalle(){
    console.log(this.examSalle);
    this.examService.addExamSalle(this.examSalle);

  }

  get surveillant(): Surveillant {
    return this.examService.surveillant;
  }

  public addSurve(surve: Personnel){
    console.log(surve)
    this.examService.addSurve(surve);
  }

  public findByExam(id : number){
    this.examService.findByExam(id);
  }
  public deleteExamSallesByDesignationFromView(examSalle: ExamSalle) {
    this.examService.deleteExamSallesByDesignationFromView(examSalle);
  }
  /*
  public valide(value) {
    this.dateDebut = new Date(value);
    this.dateFIn = this.dateDebut.setHours(this.dateDebut.getHours() + 2);
    this.diffDate =  this.dateDebut.getHours() - this.dateFin.getH;
    this.difTime = this.diffDate / (1000 * 3600 * 24);
    if (this.difTime < 0) {
      console.log(this.diffDate);
      console.log(this.difTime);
      this.toastrService.success(  ' a été ajouté avec succés ', 'Ajout réussi!');
    }
    else {
      console.log(this.diffDate);
      console.log(this.difTime);
      this.toastrService.error( ' errrii ', 'llf;dl!');
    }
  }*/

}
