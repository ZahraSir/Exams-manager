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
  private _filieres: Array<Filiere>;
  public display : number;
  public surve : number;

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get perso(): Personnel {
    return this._perso;
  }

  set perso(value: Personnel) {
    this._perso = value;
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

  get examSalle(): ExamSalle {
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
    return this._examSalles;
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

  public findAll() {
    this.http.get<Array<Exam>>(this._urlexam + 'find-all').subscribe(
      data => {
        this.exams = data;
        console.log(data);
      }
    );
  }
  public save() {
    console.log('haa lien ' + this._urlsalle);
    console.log('haa salle ' + this.exam);
    this.http.post<number>(this._urlexam + 'save', this.exam).subscribe(
      data => {
        if (data === 1) {
          this.exams.push(this.cloneExam(this.exam));
          this.toastr.success(this.exam.reference + 'a été ajouté avec succés', 'Ajout réussi!');
          this.exam = null;
          console.log(this.exam);
        }else if (data === -1){
          this.toastr.warning(this.exam.reference + 'existe déja', 'Attention!');
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
    this.http.delete<number>(this._urlexam + 'delete-by-reference/' + exam.reference).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByReferenceFromView(exam);
      }
    );
  }

  private deleteByReferenceFromView(exam: Exam) {
    const index = this.exams.findIndex(e => e.reference === exam.reference);
    if (index !== -1) {
      this.exams.splice(index, 1);
    }
  }



  public recuperer(exam: Exam, id: number) {
    console.log(exam);
    this.exam.id = exam.id;
    this.exam.reference = exam.reference;
    this.exam.dateFin = exam.dateFin;
    this.exam.dateDepart = exam.dateDepart;
    this.exam.prof.nom = exam.prof.nom;
    this.exam.examSalles = exam.examSalles;
    this.exam.examSurveillants = exam.examSurveillants;
    this.exam.module.libelle = exam.module.libelle;
    this.exam.filiere.libelle = exam.module.libelle;
    console.log(this.exam.reference);

  }

  public update(id: number, reference: string, dateDepart: Date, dateFin: Date, module: Module, prof: Professeur, filiere: Filiere){
    this.http.put(this._urlexam + id + '/' + reference  + '/' + dateDepart + '/' + dateFin + '/' + module + '/' + prof + '/' + filiere , this.exam).subscribe(
      data => {
        if (data > 0) {
          console.log('exam ');
        }
      });
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
  public vider(){
    this.exam = null;
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
        console.log(data);
      }
    );
  }
  public findBySallesDesignation(sal) {
    this.http.get<Salles>(this._urlsalle + 'find-by-designation/' + sal).subscribe(
      data => {
        this.sal = data;
        console.log(data);
      }
    );
  }
  public findSalleByExamReference(exam: Exam){
    this.http.get<Array<ExamSalle>>(this._urlExSa + 'exam/find-by-reference/' + exam.reference).subscribe(
      data => {
        this.exam.examSalles = data;
        console.log(data + 'hani');
      }
    );
  }
  public findSurveillantByExamReference(exam: Exam){
    this.http.get<Array<ExamSurveillant>>(this._urlExSu + 'exam/find-by-reference/' + exam.reference).subscribe(
      data => {
        this.exam.examSurveillants = data;
        console.log(data + 'hani');
      }
    );
  }


  public deleteByDesignationFromView(salle: Salles) {
    const index = this.salles.findIndex(s => s.designation === salle.designation);
    if (index !== -1) {
      this.salles.splice(index, 1);
    }
  }
  public deleteExamBySalleDesignation(salle: Salles) {
    this.http.delete<number>(this._urlExSa + 'delete-by-designation/' + salle.designation).subscribe(
      data => {
        this.deleteByDesignationFromView(salle);
      }
    );
  }
  public  findExamSalle(designation: string, dateDepart: Date, dateFin: Date ){
    this.http.get<Array<ExamSalle>>(this._urlExSa + 'designation/' + designation + '/dateDepart/' + dateDepart + '/dateFin/' + dateFin ).subscribe(
      data => {
         if (data.length == 0){
          this.display = 1;
          console.log('display = '+this.display);
          console.log(data + 'hadi khawya');
         }
         else{
          this.display = -1
           this.toastr.warning('la salle' + designation + 'nest pas disponible a ce moment', 'Alert!');
           console.log(data + 'hadi 3amra matsvihach');
         }

      }
    );
  }
  public findExamSurveillant(nom: string, dateDepart: Date, dateFin: Date ){
    this.http.get<Array<ExamSurveillant>>(this._urlExSu + 'nom/' + nom + '/dateDepart/' + dateDepart + '/dateFin/' + dateFin ).subscribe(
      data => {
         if (data.length == 0){
          console.log(data + 'hadi khawya');  
          this.surve = 1 ;     
         }
         else{
          this.surve = -1 ; 
           this.toastr.warning('le surveillant' + nom + 'nest pas disponible a ce moment', 'Alert!');
           console.log(data + 'hadi 3amra matsvihach');
         }

      }
    );
  }
 public  deleteByNomFromView(surveillant: Personnel) {
    const index = this.personnels.findIndex(e => e.nom === surveillant.nom);
    if (index !== -1) {
      this.personnels.splice(index, 1);
    }
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

  public validate(): boolean{
   return this.display == 1;
  }

  public validateSurveillant(): boolean{
    return this.surve == 1;
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
}




