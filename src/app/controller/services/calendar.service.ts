import { Injectable } from '@angular/core';
import {Calendar} from '../model/calendar';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Exam} from '../model/exam.model';

import {Filiere} from '../model/filiere';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private _http: HttpClient, private router: Router) { }
  private _calendar: Calendar;
  private _calendars: Array<Calendar>;
  private _display: number;
  private _urlcalendar = 'http://localhost:8090/exam-api/calendar/';
  private _exams: Array<Exam>;
  private _urlexam = 'http://localhost:8090/exam-api/exams/';
  private _filiere: Filiere;
  private _filieres: Array<Filiere>;
  private _urlFiliere = 'http://localhost:8090/exam-api/filieres/';
  private isPrinting = false;

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get calendars(): Array<Calendar> {
    if (this._calendars == null) {
      this._calendars = new Array<Calendar>();
    }
    return this._calendars;
  }

  set calendars(value: Array<Calendar>) {
    this._calendars = value;
  }

  get calendar(): Calendar {
    if (this._calendar == null) {
      this._calendar = new Calendar();
    }
    return this._calendar;
  }

  set calendar(value: Calendar) {
    this._calendar = value;
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
  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }

  get filiere(): Filiere{
    if (this._filiere == null){
      this._filiere = new Filiere();
    }
    return this._filiere;
  }

  set filiere(filiere: Filiere) {
    this._filiere = filiere;
  }
  public findAll() {
    this.http.get<Array<Calendar>>(this._urlcalendar + 'find-all').subscribe(
      data => {
        this.calendars = data;
        console.log(data);
      }
    );
  }
  public save() {
    console.log('haa lien ' + this._urlcalendar);
    console.log('haa departement ' + this.calendar);

    this.http.post<number>(this._urlcalendar + 'save', this.calendar).subscribe(
      data => {
        if (data > 0) {
          this.calendars.push(this.calendar);
          this.calendar = null;

          this.display = 1;
          console.log(this.calendar);
        }
        else if (data == -1) {
          this.display = -1;
 }
      }, error => {
        console.log(error);
      }
    );
  }

  public deleteByLibelle(calendar: Calendar) {
    this.http.delete<number>(this._urlcalendar + 'delete-by-libelle/' + calendar.libelle).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByLibelleFromView(calendar);
      }
    );
  }

  private deleteByLibelleFromView(calendar: Calendar) {
    const index = this.calendars.findIndex(c => c.libelle === calendar.libelle);
    if (index !== -1) {
      this.calendars.splice(index, 1);
    }
  }
  public update(id: number, libelle: string, anneUniversitaire: number){
    this.http.put(this._urlcalendar + id + '/' + libelle + '/' + anneUniversitaire, this.calendar).subscribe(
      data => {
        if (data > 0) {
          console.log('le calendrier est modifie ');
        }
      });
  }
  public vider(){
    this.calendar = null;
  }
  public recuperer(calendar: Calendar, id: number) {
    console.log(calendar);
    this.calendar.id = calendar.id;
    this.calendar.libelle = calendar.libelle;
    this.calendar.anneUniversitaire = calendar.anneUniversitaire;
    this.calendar.exams = calendar.exams;
    this.calendar.filieres = calendar.filieres;
    console.log(this.calendar.libelle);

  }
  public getExams() {
    this.http.get<Array<Exam>>(this._urlexam + 'find-all').subscribe(
      data => {
        this._exams = data;
      }
    );
  }
  public getFilieres() {
    this.http.get<Array<Filiere>>(this._urlFiliere + '/find-all').subscribe(
      data => {
        this._filieres = data;
      }
    );
  }
}
