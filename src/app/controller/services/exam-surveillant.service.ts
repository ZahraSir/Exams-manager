import { Injectable } from '@angular/core';
import {Exam} from '../model/exam.model';
import {Surveillant} from '../model/surveillant.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ExamSurveillant} from '../model/exam-surveillant';

@Injectable({
  providedIn: 'root'
})
export class ExamSurveillantService {

  constructor(private _http: HttpClient, private router: Router) { }
  private _examSurve: ExamSurveillant;
  private _examSurves: Array<ExamSurveillant>;
  private _url = 'http://localhost:8090/exam-api/exams-surve/';

  private _exam: Exam;
  private _exams: Array<Exam>;
  private _urlexam = 'http://localhost:8090/exam-api/exams/';
  private _surveillant: Surveillant;
  private _surveillants: Array<Surveillant>;
  private _urlsurve = 'http://localhost:8090/exam-api/surveillants/';

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
}
