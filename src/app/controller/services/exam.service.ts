import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Salles} from '../model/salles';
import {Exam} from '../model/exam.model';
import {Surveillant} from '../model/surveillant.model';
import {Professeur} from '../model/professeur.model';
import {Module} from '../model/module.model';
import {ExamSalle} from '../model/exam-salle';
import {ExamSurveillant} from '../model/exam-surveillant';
import {Filiere} from '../model/filiere';
import {Personnel} from '../model/personnel.model';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private _http: HttpClient, private router: Router,private toastr: ToastrService) { }
  private _surveill: Surveillant;
  private _sal: Salles;
  private _perso:Personnel;
  private _module: Module;
  private _exam: Exam;
  private _exams: Array<Exam>;
  private _urlexam = 'http://localhost:8090/exam-api/exams/';
  private _surveillant: Surveillant;
  private _surveillants: Array<Surveillant>;
  private _urlsurve = 'http://localhost:8090/exam-api/surveillants/';
  private _professeurs: Array<Professeur>;
  private _urlprof = 'http://localhost:8090/exam-api/professeurs/';
  private _salle: Salles;
  private _salles: Array<Salles>;
  private _urlsalle = 'http://localhost:8090/exam-api/salles/';
  private _modules: Array<Module>;
  private _urlmodule = 'http://localhost:8090/exam-api/modules/';
  private _examSurve: ExamSurveillant;
  private _examSurves: Array<ExamSurveillant>;
  private _examSalle: ExamSalle;
  private _examSalles: Array<ExamSalle>;
  private _urlExSu = 'http://localhost:8090/exam-api/exams-surve/';
  private _urlExSa = 'http://localhost:8090/exam-api/exams-salle/';
  private _personnel: Personnel;
  private _personnels: Array<Personnel>;
  private _urlperso = 'http://localhost:8090/exam-api/personnels/';
  private _urlFiliere = 'http://localhost:8090/exam-api/filieres/';
  private _examSa : Array<ExamSalle>;
  private _filieres: Array<Filiere>;
  private _survei : Personnel;
  public display : number;
  public surve : number;
  public examS = new ExamSalle();
  private _examSal: ExamSalle;
  public event= [];
  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get perso(): Personnel {
    if(this._perso == null){
      this._perso = new Personnel();
    }
    return this._perso;
  }

  set perso(value: Personnel) {
    this._perso = value;
  }
  get survei(): Personnel {
    if(this._survei == null){
      this._survei = new Personnel();
    }
    return this._survei;
  }

  set survei(value: Personnel) {
    this._survei = value;
  }

  get exams(): Array<Exam> {
    if (this._exams == null) {
      this._exams = new Array<Exam>();
    }
    return this._exams;
  }

  set exams(value: Array<Exam>) {
    this._exams = value;
  }

  get exam(): Exam {
    if (this._exam == null) {
      this._exam = new Exam();
    }
    return this._exam;
  }

  set exam(value: Exam) {
    this._exam = value;
  }
  get personnels(): Array<Personnel> {
    if (this._personnels == null) {
      this._personnels = new Array<Personnel>();
    }
    return this._personnels;
  }

  set personnels(value: Array<Personnel>) {
    this._personnels = value;
  }

  get personnel(): Personnel {
    if (this._personnel == null) {
      this._personnel = new Personnel();
    }
    return this._personnel;
  }

  set personnel(value: Personnel) {
    this._personnel = value;
  }
  get surveillant(): Surveillant {
    if(this._surveillant == null){
      this._surveillant = new Surveillant();
    }
    return this._surveillant;
  }

  set surveillant(value: Surveillant) {
    this._surveillant = value;
  }

  get salles(): Array<Salles> {
    if (this._salles == null) {
      this._salles = new Array<Salles>();
    }
    return this._salles;
  }

  set salles(value: Array<Salles>) {
    this._salles = value;
  }

  get surveillants(): Array<Surveillant> {
    if (this._surveillants == null) {
      this._surveillants = new Array<Surveillant>();
    }
    return this._surveillants;
  }

  set surveillants(value: Array<Surveillant>) {
    this._surveillants = value;
  }

  get professeurs(): Array<Professeur> {
    if (this._professeurs == null) {
      this._professeurs = new Array<Professeur>();
    }
    return this._professeurs;
  }

  set professeurs(value: Array<Professeur>) {
    this._professeurs = value;
  }

  get salle(): Salles {
    if(this._salle == null){
      this._salle = new Salles();
    }
    return this._salle;
  }

  set salle(value: Salles) {
    this._salle = value;
  }

  get modules(): Array<Module> {
    if (this._modules == null) {
      this._modules = new Array<Module>();
    }
    return this._modules;
  }

  set modules(value: Array<Module>) {
    this._modules = value;
  }

  get filieres(): Array<Filiere>{
    if (this._filieres == null){
      this._filieres = new Array<Filiere>();
    }
    return this._filieres;
  }

  set filieres(filieres: Array<Filiere>){
    this._filieres = filieres;
  }

  get examSal(): ExamSalle {
    if(this._examSal == null){
      this._examSal = new ExamSalle()
    }
    return this._examSal;
  }

  set examSal(value: ExamSalle) {
    this._examSal = value;
  }
  get examSalle(): ExamSalle {
    if(this._examSalle == null){
      this._examSalle = new ExamSalle()
    }
    return this._examSalle;
  }

  set examSalle(value: ExamSalle) {
    this._examSalle = value;
  }
  get examSurve(): ExamSurveillant {
    return this._examSurve;
  }

  set examSurve(value: ExamSurveillant) {
    this._examSurve = value;
  }

  get examSurves(): Array<ExamSurveillant> {
    return this._examSurves;
  }

  set examSurves(value: Array<ExamSurveillant>) {
    this._examSurves = value;
  }
  get examSalles(): Array<ExamSalle> {
    if(this._examSalles == null){
      this._examSalles = new Array<ExamSalle>();
    }
    return this._examSalles;
  }

  set examSa(value: Array<ExamSalle>) {
    this._examSa = value;
  }

  get examSa(): Array<ExamSalle> {
    if(this._examSa == null){
      this._examSa= new Array<ExamSalle>();
    }
    return this._examSa;
  }

  set examSalles(value: Array<ExamSalle>) {
    this._examSalles = value;
  }
  get surveill(): Surveillant {
    return this._surveill;
  }

  set surveill(value: Surveillant) {
    this._surveill = value;
  }

  get sal(): Salles {
    return this._sal;
  }

  set sal(value: Salles) {
    this._sal = value;
  }

  get module(): Module {
    return this._module;
  }

  set module(value: Module) {
    this._module = value;
  }
  public getSurveillant() {
    this.http.get<Array<Surveillant>>(this._urlsurve + 'find-all').subscribe(
      data => {
        this._surveillants = data;

      }
    );
  }
  public getFiliere() {
    this.http.get<Array<Filiere>>(this._urlFiliere + 'find-all').subscribe(
      data => {
        this._filieres = data;

      }
    );
  }
  public getModule() {
    this.http.get<Array<Module>>(this._urlmodule + 'find-all').subscribe(
      data => {
        this._modules = data;
      }
    );
  }  public getSalles() {
    this.http.get<Array<Salles>>(this._urlsalle + 'prevue').subscribe(
      data => {
        this._salles = data;
      }
    );
  }
  public getProfesseur() {
    this.http.get<Array<Professeur>>(this._urlprof + 'find-all').subscribe(
      data => {
        this._professeurs = data;
      }
    );
  }
  public getPersonnel() {
    this.http.get<Array<Personnel>>(this._urlperso + 'find-all').subscribe(
      data => {
        this._personnels = data;
      }
    );
  }
  public getExamSurveillant() {
    this.http.get<Array<ExamSurveillant>>(this._urlExSu + 'find-all').subscribe(
      data => {
        this._examSurves = data;
      }
    );
  }
  public getExamSalle() {
    this.http.get<Array<ExamSalle>>(this._urlExSa + 'find-all').subscribe(
      data => {
        this._examSalles = data;
      }
    );
  }
  public findAll() {
    this.http.get<Array<Exam>>(this._urlexam + 'find-all').subscribe(
      data => {
        this._exams = data;
  
      }
    );
  }
  public save() {
    console.log('haa salle ' + this.exam);
    this.http.post<number>(this._urlexam + 'save', this.exam).subscribe(
      data => {
        if (data === 1) {
          this.exams.push(this.cloneExam(this.exam));
          this.toastr.success(this.exam.reference + ' a été ajouté avec succés ', 'Ajout réussi!');
          this.exam = null;
          console.log(this.exam);
        }else if (data === -1){
          this.toastr.error(this.exam.reference + ' existe déja ', 'Attention!');
        }
      }, error => {
        console.log(error);
      }
    );
  }

  private cloneExam(exam: Exam) {
    const myClone = new Exam();
    myClone.reference = exam.reference;
    myClone.dateDepart = exam.dateDepart;
    myClone.dateFin = exam.dateFin;
    myClone.module = exam.module;
    myClone.prof = exam.prof;
    myClone.filiere = exam.filiere;
    return myClone;
  }

  public deleteByReference(exam: Exam) {
    this.http.delete<number>(this._urlexam + 'delete-by-id/' + exam.id).subscribe(
      data => {
        if(data == -1)
        this.toastr.error(exam.reference + ' non passé', 'Suppression impossible!');
        else{
          this.deleteByidFromView(exam);
      }
      }
    );
  }

  private deleteByidFromView(exam: Exam) {
    const index = this.exams.findIndex(e => e.id === exam.id);
    if (index !== -1) {
      this.exams.splice(index, 1);
    }
  }


  public recuperer(exam: Exam, id: number) {

    this.exam.id = exam.id;
    this.exam.reference = exam.reference;
    this.exam.dateFin =  moment(exam.dateFin).format("YYYY-MM-DD[T]HH:mm");;
    this.exam.dateDepart = moment(exam.dateDepart).format("YYYY-MM-DD[T]HH:mm");;
    this.exam.prof.nom = exam.prof.nom;
    this.exam.examSalles = exam.examSalles;
    this.exam.module.libelle = exam.module.libelle;
    this.exam.filiere.libelle = exam.filiere.libelle;
    
  }

  public update(id: number, reference: string, dateDepart: string, dateFin: string, module: Module, prof: Professeur, filiere: Filiere){
    this.http.put(this._urlexam + id + '/' + reference  + '/' + dateDepart + '/' + dateFin + '/' + module + '/' + prof + '/' + filiere , this.exam).subscribe(
      data => {
        if (data > 0) {
          this.toastr.success(reference + ' a été modifié avec succés', 'Modification réussi!');
        }
       
      });
  }


 public addSurveillant(surveillant: Surveillant){
    this.exam.examSurveillants.push(this.clone(surveillant));
    console.log('haaaa' + surveillant);
    this.surveillant = null;
  }
  public addPersonnel(personnel: Personnel){
    this.exam.examSurveillants.push(this.clonePerso(personnel));
    console.log('haaaa' + personnel);
    this.personnel = null;
  }
  public addSalle(salle: Salles){
    this.exam.examSalles.push(this.cloneSalle(salle));
    this.salle = null;
  }
  public clone(examSurveillant: Surveillant) {
    const surve = new ExamSurveillant();
    surve.surveillant.nom = examSurveillant.nom;
    surve.surveillant.prenom = examSurveillant.prenom;
    surve.surveillant.mail = examSurveillant.mail;
    return surve;
  }
  public clonePerso(examSurveillant: Personnel) {
    const surve = new ExamSurveillant();
    surve.surveillant.nom = examSurveillant.nom;
    surve.surveillant.prenom = examSurveillant.prenom;
    surve.surveillant.mail = examSurveillant.mail;
    return surve;
  }


  public cloneSalle(examSalle: Salles) {
    const sall = new ExamSalle();
    sall.salle.designation = examSalle.designation;
    sall.salle.capacite = examSalle.capacite;
    sall.salle.type = examSalle.type;
    sall.salle.etat = examSalle.etat;
    return sall;
  }

  public findBySurveillantNom(surveillant) {
    this.http.get<Surveillant>(this._urlsurve + 'find-by-nom/' + surveillant).subscribe(
      data => {
        this.surveill = data;
        console.log(data);
      }
    );
  }
  public findByPersonnelNom(personnel) {
    this.http.get<Personnel>(this._urlperso + 'find-by-nom/' + personnel).subscribe(
      data => {
        this.perso = data; 
      }
    );
  }

  cloneSurveillant(perso: Personnel){
    const personnel = new Personnel();
    personnel.nom = perso.nom;
    personnel.prenom = perso.prenom;
    personnel.mail = perso.mail;
    return personnel;
  }
  public findBySallesDesignation(sal) {
    this.http.get<Salles>(this._urlsalle + 'find-by-designation/' + sal).subscribe(
      data => {
        this.sal = data;
        this.examSalle.salle = data;
        console.log(this.examSalle)
      }
    );
  }
  public findSalleByExamReference(exam: Exam){
    this.http.get<Array<ExamSalle>>(this._urlExSa + 'exam/find-by-reference/' + exam.reference).subscribe(
      data => {
        this.exam.examSalles = data;
        console.log(this.exam.examSalles)
      }
    );
    return this.exam.examSalles;
  }

  public findBySalleDesignationDatedepartDateFin(designation: string, dateDepart: string, dateFin: string){
    this.http.get<Array<Surveillant>>( 'http://localhost:8090/exam-api/surveillants/' + designation + '/' + moment(dateDepart).format("YYYY-MM-DD[T]HH:mm") + '/' + moment(dateFin).format("YYYY-MM-DD[T]HH:mm")).subscribe(
      data => {
         this.examS.surveillants = data;
      }
    );
    console.log(this.examS.surveillants)
    
  }
  public findSurveillantByExamReference(exam: Exam){
    this.http.get<Array<ExamSurveillant>>(this._urlExSu + 'exam/find-by-reference/' + exam.reference).subscribe(
      data => {
        this.exam.examSurveillants = data;
        console.log(data + 'hani');
      }
    );
  }


  public  findExamSalle(designation: string, dateDepart: string, dateFin: string ){
    this.http.get<Array<ExamSalle>>(this._urlExSa + 'designation/' + designation + '/dateDepart/' + dateDepart + '/dateFin/' + dateFin ).subscribe(
      data => {
         if (data.length == 0){
          this.display = 1;
          console.log('display = ' + this.display);
          console.log(data + 'hadi khawya');
         }
         else{
          this.display = -1
           this.toastr.error(' la salle ' + designation + ' n\'est pas disponible a ce moment', 'Alert!');
           console.log(data + 'hadi 3amra matsvihach');
         }

      }
    );
  }
  public  findSurveillant(nom: string, dateDepart: string, dateFin: string ){
    this.http.get<Array<Surveillant>>('http://localhost:8090/exam-api/surveillants/nom/' + nom + '/dateDepart/' + dateDepart + '/dateFin/' + dateFin ).subscribe(
      data => {
         if (data.length == 0){
        this.surve = 1;
          console.log(data + 'hada msali');
         }
         else{
          this.surve = -1;
           this.toastr.error(' la salle ' + nom + ' n\'est pas disponible a ce moment', 'Alert!');
          
           console.log(data + 'hada mamsalich');
         }

      }
    );
  }

  public findModuleByFiliereLibelle(libelle: string) {
    this.http.get<Array<Module>>(this._urlmodule + 'find-by-filiere/' + libelle).subscribe(
      data => {
        this.modules = data;
        console.log(data);
      }
    );
  }
  public findByModuleLibelle(libelle: string ) {
    this.http.get<Module>(this._urlmodule + 'find-by-libelle/' + libelle).subscribe(
      data => {
        this.module = data;
        this.exam.prof = this.module.professeur;
        console.log(this.exam.prof);
        console.log(data);
      }
    );
  }
  public deleteExamSallesByDesignationFromView(examSalle: ExamSalle) {
    const index = this.examSalles.findIndex(s => s.salle.designation === examSalle.salle.designation);
    if (index !== -1) {
      this.examSalles.splice(index, 1);
      console.log('non');
    }
    this.examSalles.splice(index, 1);
    console.log('oui');
  }
  public deleteByDesignationFromView(salle: Salles) {
    const index = this.salles.findIndex(s => s.designation === salle.designation);
    if (index !== -1) {
      this.salles.splice(index, 1);
    }
    this.salles.splice(index, 1);
    console.log('oui');
  }
  public deleteExamBySalleDesignation(salle: Salles) {
    this.http.delete<number>(this._urlExSa + 'delete-by-designation/' + salle.designation).subscribe(
      data => {
        this.deleteByDesignationFromView(salle);
      }
    );
  }
  public  deleteByNomFromView(surveillant: Personnel) {
    const index = this.personnels.findIndex(e => e.nom === surveillant.nom);
    if (index !== -1) {
      this.personnels.splice(index, 1);
    }
  }


  public deleteBySurveillantIdFromView(surveillant: Surveillant) {
    const index = this.surveillants.findIndex(s => s.id === surveillant.id);
    console.log('lalalalalal');
    if (index !== -1) {
      console.log('tmasshat');
      this.salles.splice(index, 1);
    }
  }
  public deleteExamBySurveillantId(surveillant: Surveillant) {
    this.http.delete<number>(this._urlExSu + 'delete-by-id/' + surveillant.id).subscribe(
      data => {
        this.deleteBySurveillantIdFromView(surveillant);
      }
    );
  }
  public validate(): boolean{
    return this.display == 1 && this.surve == 1;
  }

 
  public vider(){
    this.exam = null;
  }

  public addExamSalle(examSalle: ExamSalle){
    this.exam.examSalles.push(this.cloneExamSalle(this.examSalle));
    this.examSalle = null;
    this.survei = null
  }
  public cloneExamSalle(examSalle: ExamSalle){
    const examSalleClone = new ExamSalle();
    examSalleClone.salle.designation = examSalle.salle.designation;
    examSalleClone.surveillants = examSalle.surveillants;
    return examSalleClone;
  }
  public cloneSurve(surveillant){
    const SurveillantClone = new Surveillant();
    SurveillantClone.nom= surveillant.nom;
    SurveillantClone.prenom= surveillant.prenom;
    SurveillantClone.mail= surveillant.mail;
    SurveillantClone.examSalle.salle.designation = this.examSalle.salle.designation;
    return SurveillantClone;
  }
  public addSurve(surve: Personnel){
    const surveillant = new Surveillant();
    surveillant.nom = surve.nom;
    surveillant.prenom = surve.prenom;
    surveillant.mail = surve.mail;
    this.examSalle.surveillants.push(surveillant);
  }

  public findByExam(id: number){
    this.http.get<Array<Surveillant>>('http://localhost:8090/exam-api/surveillants/find-by-exam/' + id).subscribe(
      data => {
        this.examSal.surveillants = data;      
      }
    );

  }

 public validateExamSalle(){
    return this.examSalle.salle.designation != null && this.examSalle.surveillants.length > 0 
  }

  
public validateSave():boolean{
let dateDepart = new Date(this.exam.dateDepart);
let dateFin = new Date(this.exam.dateFin);
let time = dateFin.getTime() - dateDepart.getTime();
  return this.exam.filiere.libelle != null && this.exam.module.libelle != null && this.exam.dateDepart != null && this.exam.dateFin != null && this.exam.prof != null && this.exam.examSalles.length != 0 && time > 0}
}





