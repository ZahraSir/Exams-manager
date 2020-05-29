import { Component, OnInit } from '@angular/core';
import {CalendarService} from '../../controller/services/calendar.service';
import {Calendar} from '../../controller/model/calendar';
import {Filiere} from '../../controller/model/filiere';
import {FiliereService} from '../../controller/services/filiere.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendaService: CalendarService, private filiereService: FiliereService) { }

  ngOnInit(): void {
  }
  get calendar(): Calendar{
    return this.calendaService.calendar;
  }

  get calendars(): Array<Calendar>{
    return this.calendaService.calendars;
  }
  get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }

}
