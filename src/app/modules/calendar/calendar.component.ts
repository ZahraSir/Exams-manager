import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../../controller/services/calendar.service';
//import {Calendar} from '../../controller/model/calendar';
import {Filiere} from '../../controller/model/filiere';
import {FiliereService} from '../../controller/services/filiere.service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
 
  constructor(/*private calendaService: CalendarService,*/ private filiereService: FiliereService) { }


  ngOnInit(): void {
  }

   header : {left: 'prev,next today myCustomButton',
   center: 'title',
   right: 'timeGridWeek,timeGridDay'}

   
  options = [this.header];
  locales = [esLocale, frLocale];
  calendarPlugins = [dayGridPlugin, timeGridPlugin];
 /* get calendar(): Calendar{
    return this.calendaService.calendar;
  }

  get calendars(): Array<Calendar>{
    return this.calendaService.calendars;
  }*/
 /* get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }*/

}


