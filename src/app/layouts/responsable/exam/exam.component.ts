import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import * as moment from 'moment';
import { Message } from 'primeng/api';
import {Surveillant} from '../../../controller/model/surveillant.model';
import {Salles} from '../../../controller/model/salles';
import {ToastrService} from 'ngx-toastr';
import {PrintService} from '../../../controller/services/print.service';
import {SallesService} from '../../../controller/services/salles.service';
import {ExamService} from '../../../controller/services/exam.service';
import {SurveillantService} from '../../../controller/services/surveillant.service';
import {Exam} from '../../../controller/model/exam.model';
import {Professeur} from '../../../controller/model/professeur.model';
import {Module} from '../../../controller/model/module.model';

import {ExamSalle} from '../../../controller/model/exam-salle';
import {Personnel} from '../../../controller/model/personnel.model';
import {Filiere} from '../../../controller/model/filiere';
import {FiliereService} from '../../../controller/services/filiere.service';
import {User} from '../../../controller/model';
import {AuthenticationService} from '../../../controller/services';
import {ExamEtudiant} from '../../../controller/model/exam-etudiant';
import {Etudiant} from '../../../controller/model/etudiant';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamsComponent implements OnInit {
  selectedSur = new Surveillant();
  selectedSalle = new Salles();
  modalRef: BsModalRef;
  message: string;
  item: string;
  dateDebut: Date;
  dateFin: string;
  dateF: Date;
  dateD: Date;
  msgs: Message[] = [];
  msg: Message[] = [];
  id:number;
  p = 1;
  currentUser: User ;
  constructor(private examService: ExamService, private filiereService: FiliereService, private authenticationService: AuthenticationService,
              private modalService: BsModalService, private printService: PrintService, private salleService: SallesService, private surveillantService: SurveillantService,
              private toastrService: ToastrService) {this.currentUser = authenticationService.currentUserValue; }


  ngOnInit(): void {
    this.examService.findExamByDepartementLibelle(this.currentUser.departement);
    this.examService.getSalles();
    this.examService.getPersonnel();
    this.examService.getSurveillant();
    this.filiereService.findFiliereByDepartementLibelle(this.currentUser.departement);
    this.examService.getExamSalle();
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

  get examSalle(): ExamSalle {
    return this.examService.examSalle;
  }
  get personnels(): Array<Personnel> {
    return this.examService.personnels;
  }
  get personnel(): Personnel {
    return this.examService.personnel;
  }
  get exa(): Array<Exam> {
    return this.examService.exa;
  }

  get survei(): Personnel{
    return this.examService.survei;
  }
  public deleteByReference(exam: Exam) {
    this.examService.deleteByReference(exam);
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


  public  findExamSalle(designation: string, dateDepart: string, dateFin: string ){
    this.examService.findExamSalle(designation, dateDepart, dateFin);
  }
  public  findSurveillant(nom: string, dateDepart: string, dateFin: string ){
    this.examService.findSurveillant(nom, dateDepart, dateFin);
  }
  public show() {
    this.toastrService.success('hellokdkq', 'dkdlkmldkqmlkdm');
  }
  public deleteByNomFromView(surveillant: Personnel) {
    console.log(surveillant + 'hvjf');
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

  public ajouter(value){
    if (this.exam.dateFin != null){
      this.dateD = new Date(this.exam.dateDepart);
      this.dateF = new Date(this.exam.dateFin);
      console.log(this.dateD);
      console.log(this.dateF);
      const time = this.dateF.getTime() - this.dateD.getTime();
      console.log(time);
      if (time < 0){
        this.msg.push({severity: 'error', detail: 'Date départ doit être plus petit que la date fin!!'});
      }else{
        this.msg = [];
      }
    }else{
      this.dateDebut = new Date(value);
      this.dateDebut.setHours(this.dateDebut.getHours() + 2);
      this.dateFin = moment(this.dateDebut).format('YYYY-MM-DD[T]HH:mm');
      this.exam.dateFin = this.dateFin;
    }
  }
  get examSal(): ExamSalle{
    return this.examService.examSal;
  }

  public addExamSalle(){
    console.log(this.examSalle);
    this.examService.addExamSalle(this.examSalle);

  }
  get fils(): Array<Filiere> {
    return this.filiereService.fils;
  }

  get surveillant(): Surveillant {
    return this.examService.surveillant;
  }

  public addSurve(surve: Personnel){
    console.log(surve);
    this.examService.addSurve(surve);
  }

  public findByExam(id: number){
    this.examService.findByExam(id);
  }
  public deleteExamSallesByDesignationFromView(examSalle: ExamSalle) {
    this.examService.deleteExamSallesByDesignationFromView(examSalle);
  }

  public validateExamSalle(){
    return this.examService.validateExamSalle();
  }
  public verifier(value){
    if ( this.exam.dateDepart != null)
    {
      this.dateD = new Date(this.exam.dateDepart);
      this.dateF = new Date(this.exam.dateFin);
      const time = this.dateF.getTime() - this.dateD.getTime();
      if (time < 0){
        this.msgs.push({severity: 'error', detail: 'Date fin doit être plus grand que la date départ!!'});
      }else{
        this.msgs = [];
      }
    }else{
      this.dateF = new Date(value);
      this.dateF.setHours(this.dateF.getHours() - 2);
      const dateD = moment(this.dateF).format('YYYY-MM-DD[T]HH:mm');
      this.exam.dateDepart = dateD;
    }
  }

  public validateSave(): boolean{
    return this.examService.validateSave();
  }

  public findByExamId(exam: number){
    this.id = exam;
    this.examService.findByExamId(exam);
  }

  public printDocument(exam: number){
    console.log(this.id);
    this.examService.printDocument(exam);
  }

  public exportExcel(exam: number){
    console.log(this.id);
    this.examService.exportExcel(exam);
  }
  public click(etudiant){
    console.log(etudiant.nom);
    this.examEtudiant.etudiant = etudiant;
    this.examEtudiants.push(this.clone(this.examEtudiant));
    console.log(this.examEtudiants);
  }

  public clone(examEtudiant: ExamEtudiant){
    const cloneExamEtudiant = new ExamEtudiant();
    cloneExamEtudiant.id = examEtudiant.id;
    cloneExamEtudiant.exam = examEtudiant.exam;
    cloneExamEtudiant.salle.designation = examEtudiant.salle.designation;
    cloneExamEtudiant.etudiant = examEtudiant.etudiant;
    return cloneExamEtudiant;
  }
  get examEtudiant(): ExamEtudiant{
    return this.examService.examEtudiant;
  }

  get etudiants(): Array<Etudiant>{
    return this.examService.etudiants;
  }
  public recupere(exam: Exam){
    console.log(exam);
    this.examService.exam = exam;
    this.examEtudiant.exam = exam;
    console.log(this.examEtudiant.exam);
    this.examService.findExamSalleByDate(exam.dateDepart, exam.dateFin, exam.module.libelle);
  }

  public findEtudiants(filiere: string, semestre: string){
    console.log(filiere + ' ' + semestre);
    this.examService.findEtudiants(filiere, semestre);
  }

  public aaa(examEtudiant){

    console.log(examEtudiant);
  }

  public addExamEtudiant(examEtudiant: ExamEtudiant){
    this.examService.addExamEtudiant(examEtudiant);
  }

  get examEtudiants(): Array<ExamEtudiant>{
    return this.examService.examEtudiants;
  }

  public affecter(){
    this.examService.affecter();

  }

}
