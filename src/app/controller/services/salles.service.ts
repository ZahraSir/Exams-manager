import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Salles } from '../model/salles';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SallesService {

  constructor(private _http: HttpClient, private router: Router) { }

  private _salle: Salles;
 private _salles: Array<Salles>;
  private _urlsalle = 'http://localhost:8090/exam-api/salles/';
  private isPrinting=false;
  private _display: number;
 //  private _refresh = new Subject<void>();

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get salle(): Salles {
    if (this._salle == null) {
      this._salle = new Salles();
    }
    return this._salle;
  }

  set salle(value: Salles) {
    this._salle = value;
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
  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }

 /* get refresh(): Subject<void> {
    return this._refresh;
  }

  set refresh(value: Subject<void>) {
    this._refresh = value;
  }*/

  public findAll() {
    this.http.get<Array<Salles>>(this._urlsalle + 'findAll').subscribe(
      data => {
        this.salles = data;
        console.log(data);
      }
    );
  }

  public save() {
    console.log('haa lien ' + this._urlsalle);
    console.log('haa salle ' + this.salle);

    this.http.post<number>(this._urlsalle + 'save', this.salle).subscribe(
      data => {
        if (data > 0) {
          this.salles.push(this.salle);
          this.salle = null;
          this.display = 1;
        }
        else if (data == -1)
          this.display = -1;

      }, error => {
        console.log(error);
      }
    );
  }

  private cloneSalle(salle: Salles) {
    const myClone = new Salles();
    myClone.capacite = salle.capacite;
    myClone.etat = salle.etat;
    myClone.designation = salle.designation;
    myClone.type = salle.type;
    return myClone;
  }

  public deleteByDesignation(salle: Salles) {
    this.http.delete<number>(this._urlsalle + 'delete-by-designation/' + salle.designation).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByDesignationFromView(salle);
      }
    );
  }

  private deleteByDesignationFromView(salle: Salles) {
    const index = this.salles.findIndex(s => s.designation === salle.designation);
    if (index !== -1) {
      this.salles.splice(index, 1);
    }
  }
  public recuperer(salle: Salles, id:number) {
   console.log(salle);
   this.salle.id = salle.id
   this.salle.designation = salle.designation;
   this.salle.capacite = salle.capacite;
   this.salle.etat = salle.etat;
   this.salle.type = salle.type;
  // this.salle.exam.reference = salle.exam.reference;
   console.log(this.salle.designation);

  }
  public selectedSalle(salle: Salles){
    this.salle = salle;
  }
  public printDocument(documentName: string, documentData: string[]){
     this.isPrinting = true;
     this.router.navigate(['/',
       {outlets: {
         'print': ['print', documentName, documentData.join()]
       }}
     ]);
  }
  public update(id: number, designation: string, etat: string, type: string, capacite: number){
    this.http.put(this._urlsalle + id + '/' + designation + '/' + etat + '/' + type + '/' + capacite, this.salle).subscribe(
      data => {
        if (data > 0) {
          console.log('la salle ');
        }
      });
  }
  public vider(){
    this.salle = null;
  }
}

