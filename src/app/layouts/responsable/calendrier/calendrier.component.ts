import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../../../controller/services/calendar.service';
import timeGridPlugin from '@fullcalendar/timegrid';
import {Exam} from '../../../controller/model/exam.model';
import {Surveillant} from '../../../controller/model/surveillant.model';
import {esLocale, frLocale} from 'ngx-bootstrap/chronos';
import {User} from '../../../controller/model';
import {AuthenticationService} from '../../../controller/services';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  currentUser: User ;
  constructor( private calendarService: CalendarService,  private authenticationService: AuthenticationService) {this.currentUser = authenticationService.currentUserValue; }

  get exam(): Exam{
    return this.calendarService.exam;
  }

  get events(){
    return this.calendarService.events;
  }

  get surveillants(): Array<Surveillant>{
    return this.calendarService.surveillants;
  }
  locales = [esLocale, frLocale];
  item: string;
  calendarPlugins = [timeGridPlugin];

  ngOnInit(): void {
    this.calendarService.findEventsByFiliere(this.currentUser.departement);
  }
  public click(event){
    this.calendarService.findExam(event.event.title, event.event.start, event.event.end);
    console.log(event.event.start);
    console.log(event.event.end);
    console.log(event.event.title);
  }

}
