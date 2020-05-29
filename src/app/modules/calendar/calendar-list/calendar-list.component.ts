import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import {Options} from 'ts-node';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {


  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() { }

  ngOnInit() {
   /* this.eventService.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: data
      };
    });*/
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
/*
  constructor(private calendaService: CalendarService, private filiereService: FiliereService, private examService: ExamService, private modalService: BsModalService) { }

  item: string;
  modalRef: BsModalRef;
  p = 1;
  ngOnInit(): void {
    this.calendaService.getExams();
    this.calendaService.getFilieres();
    this.calendaService.findAll();
    this.filiereService.findAll();
  }

  get calendar(): Calendar{
    return this.calendaService.calendar;
  }

  get calendars(): Array<Calendar>{
    return this.calendaService.calendars;
  }

  public save(){
    this.calendaService.save();
  }

  get filiere(): Filiere{
    return this.filiereService.filiere;
  }



  public deleteByLibelle(calendar: Calendar){
    this.calendaService.deleteByLibelle(calendar);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  decline(): void {
    this.modalRef.hide();
  }

  get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }

  public update(calendar: Calendar){
    this.calendaService.update(calendar.id, calendar.libelle, calendar.anneUniversitaire );
  }

  public vider(){
    this.calendaService.vider();
  }
  public recuperer(calendar: Calendar, id: number) {
    this.calendaService.recuperer(calendar, id);
  }*/
}
