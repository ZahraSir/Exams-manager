import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Salles} from "../model/salles";
import {Exam} from "../model/exam.model";
import {Surveillant} from "../model/surveillant.model";
import {Professeur} from "../model/professeur.model";
import {Module} from "../model/module.model";

ImageBitmapRenderingContext
@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private _http: HttpClient, private router: Router) { }

  private _exam: Exam;
  private _exams: Array<Exam>;
  private _urlexam = 'http://localhost:8090/exam-api/exams/';
  private _surveillants: Array<Surveillant>;
  private _urlsurve = 'http://localhost:8090/exam-api/surveillants/';
  private _professeurs: Array<Professeur>;
  private _urlprof = 'http://localhost:8090/exam-api/professeurs/';
  private _salles: Array<Salles>;
  private _urlsalle = 'http://localhost:8090/exam-api/salles/';
  private _modules: Array<Module>;
  private _urlmodule = 'http://localhost:8090/exam-api/modules/';
  private isPrinting=false;
  private _display: number;

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
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

  get modules(): Array<Module> {
    if (this._modules == null) {
      this._modules = new Array<Module>();
    }
    return this._modules;
  }

  set modules(value: Array<Module>) {
    this._modules = value;
  }
  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }
  public findAll() {
    this.http.get<Array<Exam>>(this._urlexam+ 'find-all').subscribe(
      data => {
        this.exams = data;
        console.log(data);
      }
    );
  }

  public save() {
    console.log('haa lien ' + this._urlsalle);
    console.log('haa salle ' + this.exam);

    this.http.post<number>(this._urlexam+ 'save', this.exam).subscribe(
      data => {
        if (data > 0) {
          this.exams.push(this.exam);
          this.exam = null;

          this.display = 1;
          console.log(this.exam);
        }
        else if(data == -1)
          this.display = -1;
      }, error => {
        console.log(error);
      }
    );
  }

  private cloneExam(exam: Exam) {
    const myClone = new Exam();
    myClone.reference = exam.reference;
    myClone.heureDepart= exam.heureDepart;
    myClone.date = exam.date;
    myClone.heureFin = exam.heureFin;
    myClone.module = exam.module;
    myClone.prof = exam.prof;
    myClone.salles = exam.salles;
    myClone.surveillants = exam.surveillants;
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



  public recuperer(exam: Exam, id:number) {
    console.log(exam);
    this.exam.id = exam.id
    this.exam.reference = exam.reference;
    this.exam.date = exam.date;
    this.exam.heureFin = exam.heureFin;
    this.exam.heureDepart = exam.heureDepart;
    this.exam.prof = exam.prof;
    this.exam.salles = exam.salles;
    this.exam.surveillants = exam.surveillants;
    this.exam.module = exam.module;
    console.log(this.exam.reference);

  }

  public printDocument(documentName: string, documentData: string[]){
    this.isPrinting = true;
    this.router.navigate(['/',
      {outlets: {
          'print': ['print', documentName, documentData.join()]
        }}
    ])
  }
  public update(id: number, reference: string, date: Date, heureDepart: string, heureFin: string, module: Module, prof: Professeur, surveillants: Surveillant, salles: Salles){
    this.http.put(this._urlexam + id +'/'+ reference +'/' + date + '/' + heureDepart + '/'+ heureFin + '/' + module + '/'+ prof + '/' + surveillants + '/'+ salles , this.exam).subscribe(
      data =>{
        if(data >0) {
          console.log('exam ');
        }
      })
  }
  public getSurveillant() {
    this.http.get<Array<Surveillant>>(this._urlsurve+ 'find-all').subscribe(
      data => {
        this._surveillants= data;
      }
    );
  }
  public getModule() {
    this.http.get<Array<Module>>(this._urlmodule+ 'find-all').subscribe(
      data => {
        this._modules = data;
      }
    );
  }  public getSalles() {
    this.http.get<Array<Salles>>(this._urlsalle+ 'findAll').subscribe(
      data => {
        this._salles = data;
      }
    );
  }
  public getProfesseur() {
    this.http.get<Array<Professeur>>(this._urlprof+ 'find-all').subscribe(
      data => {
        this._professeurs = data;
      }
    );
  }
}




