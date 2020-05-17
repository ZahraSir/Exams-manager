import { Injectable } from '@angular/core';
import {Semestre} from '../model/semestre';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {

  private _semestre: Semestre;
  private _semestres: Array<Semestre>;
  private _urlSemestre: 'http://localhost:8090/exam-api/semestre/';

  constructor(private http: HttpClient) { }

  get semestre(): Semestre{
    if (this._semestre == null){
      this._semestre = new Semestre();
    }
    return this._semestre;
  }

  set semestre(semestre: Semestre){
    this._semestre = semestre;
  }

  get semestres(): Array<Semestre>{
    if (this._semestres == null){
      this._semestres = new Array<Semestre>();
    }
    return this._semestres;
  }

  set semestres(semestres: Array<Semestre>){
    this._semestres = semestres;
  }


  public findAll(){
    this.http.get<Array<Semestre>>(this._urlSemestre + '/find-all').subscribe(
      data => {
        this.semestres = data;
        console.log(data);
      }
    );
  }
}
