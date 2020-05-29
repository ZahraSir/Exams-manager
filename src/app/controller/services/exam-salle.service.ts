import { Injectable } from '@angular/core';
import {Exam} from '../model/exam.model';
import {Salles} from '../model/salles';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ExamSalle} from '../model/exam-salle';

@Injectable({
  providedIn: 'root'
})
export class ExamSalleService {

  constructor(private _http: HttpClient, private router: Router) { }
  private _examSalle: ExamSalle;
  private _examSalles: Array<ExamSalle>;
  private _url = 'http://localhost:8090/exam-api/exams-salle/';
  private _exam: Exam;
  private _exams: Array<Exam>;
  private _urlexam = 'http://localhost:8090/exam-api/exams/';
  private _salle: Salles;
  private _salles: Array<Salles>;
  private _urlsalle = 'http://localhost:8090/exam-api/salles/';

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get urlexam(): string {
    return this._urlexam;
  }

  set urlexam(value: string) {
    this._urlexam = value;
  }

  get salles(): Array<Salles> {
    return this._salles;
  }

  set salles(value: Array<Salles>) {
    this._salles = value;
  }

  get examSalles(): Array<ExamSalle> {
    return this._examSalles;
  }

  set examSalles(value: Array<ExamSalle>) {
    this._examSalles = value;
  }

  get salle(): Salles {
    return this._salle;
  }

  set salle(value: Salles) {
    this._salle = value;
  }

  get urlsalle(): string {
    return this._urlsalle;
  }

  set urlsalle(value: string) {
    this._urlsalle = value;
  }

  get exams(): Array<Exam> {
    return this._exams;
  }

  set exams(value: Array<Exam>) {
    this._exams = value;
  }

  get exam(): Exam {
    return this._exam;
  }

  set exam(value: Exam) {
    this._exam = value;
  }

  get examSalle(): ExamSalle {
    return this._examSalle;
  }

  set examSalle(value: ExamSalle) {
    this._examSalle = value;
  }
}
