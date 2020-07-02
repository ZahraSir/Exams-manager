import { Component, OnInit } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarService } from 'src/app/controller/services/calendar.service';
import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/fr';
import { Exam } from 'src/app/controller/model/exam.model';
import { Surveillant } from 'src/app/controller/model/surveillant.model';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  locales = [esLocale, frLocale];
  item: string;

  ngOnInit(): void {
    this.calendarService.findEvents();
  }
  constructor( private calendarService: CalendarService) { }
calendarPlugins = [timeGridPlugin];

get exam(): Exam{
  return this.calendarService.exam;
}

get events(){
  return this.calendarService.events;
}

get surveillants() : Array<Surveillant>{
  return this.calendarService.surveillants;
}
public click(event){
  this.calendarService.findExam(event.event.title, event.event.start, event.event.end);
  console.log(event.event.start);
  console.log(event.event.end);
  console.log(event.event.title);
}

}



