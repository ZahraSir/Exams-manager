import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Exam} from '../model/exam.model';

import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient, private router: Router) {
  }
  private _exams: Array<Exam>;
  private _json : string;
  public events = [];
 
get exams(): Array<Exam>{
  if(this._exams == null){
    this._exams = new  Array<Exam>()
  }
  return this._exams;
}
set exams(value: Array<Exam>){
  this._exams = value;
}
get json(): string{
  return this._json;
}
set json(value: string){
  this._json = value;
}
public findAllExam() {
  this.http.get<Array<Exam>>('http://localhost:8090/exam-api/exams/find-all').subscribe(
    data => {
      this.exams = data;     
      for(let exam of this.exams){
          this.events.push(
           { title : exam.module.libelle + ' ' + exam.filiere.libelle + ' ',
             start : moment(exam.dateDepart).format("YYYY-MM-DD[T]HH:mm:ss"),
             end : moment(exam.dateFin).format("YYYY-MM-DD[T]HH:mm:ss"),
             color: '#f9c66a'
          }
          );
          this.json = JSON.stringify(this.events);
          
    }
  console.log(this.json) 
  }
  );
  

}

getEvents(){
  let events;
  events = this.findAllExam();
  console.log(events);
}
/*
getEvents() {
  return this.http.get('http://localhost:8090/exam-api/exams/find-all')
              .toPromise()
              //.then(res => <any[]> res.json().data)
              .then(data=>{
                this._exams = data;
                for(let d of data){

                }
                let res = {'results': JSON.stringify(data),
                'json': ()=>{return data;}
              }
              console.log('hana'+ res);
              return res; 
            })
}*/
}
