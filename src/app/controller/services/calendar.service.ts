import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Exam} from '../model/exam.model';

import moment from 'moment';
import { EventInput } from '@fullcalendar/core';
import { Calendar } from '../model/calendar';
import { Surveillant } from '../model/surveillant.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient, private router: Router) {
  }
  private _exam: Exam;
  private _json : string;
  public events : Array<EventInput> = new Array();
  private _surveillants: Array<Surveillant>;
 
get exam(): Exam{
  if(this._exam == null){
    this._exam = new Exam()
  }
  return this._exam;
}
set exam(value: Exam){
  this._exam = value;
}

get surveillants(): Array<Surveillant>{
  if(this._surveillants == null){
    this._surveillants = new Array<Surveillant>()
  }
  return this._surveillants;
}
set surveillants(value: Array<Surveillant>){
  this._surveillants = value;
}


public findEvents(){
  this.http.get<Array<Calendar>>('http://localhost:8090/exam-api/calendar/find-all').subscribe(
    data => {
      this.events= data;
    }
  )
}

public findExam(title, start, end){
  this.http.get<Exam>('http://localhost:8090/exam-api/exams/events/date-depart/' + moment(start).format("YYYY-MM-DD[T]HH:mm") + '/date-fin/' + moment(end).format("YYYY-MM-DD[T]HH:mm") +'/module/' + title).subscribe(
    data => {
      this.exam = data;
      this.exam.dateDepart = moment(data.dateDepart).format("YYYY-MM-DD[T]HH:mm");
      console.log(this.exam);
      this.findByExam(this.exam.id)
    }
  )
}

public findByExam(id: number){
  this.http.get<Array<Surveillant>>('http://localhost:8090/exam-api/surveillants/find-by-exam/' + id).subscribe(
    data => {
      this.surveillants = data; 
      console.log(this.surveillants)    
    }
  );

}
}
