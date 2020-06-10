import {Component, OnInit, TemplateRef, ViewChild, Input, ChangeDetectionStrategy} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DateFormatterParams, DAYS_OF_WEEK} from 'angular-calendar';
import {Observable, Subject} from 'rxjs';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ExamService} from '../../../controller/services/exam.service';
import {Exam} from '../../../controller/model/exam.model';
import {Surveillant} from '../../../controller/model/surveillant.model';
import {Professeur} from '../../../controller/model/professeur.model';
import {Module} from '../../../controller/model/module.model';
import {Salles} from '../../../controller/model/salles';
import {ExamSurveillant} from '../../../controller/model/exam-surveillant';
import {ExamSalle} from '../../../controller/model/exam-salle';
import {CalendarService} from '../../../controller/services/calendar.service';
import {Calendar} from '../../../controller/model/calendar';
import {DatePipe} from '@angular/common';
import {Color} from 'colors';
import {ColorPicker} from 'primeng';
import {HttpClient} from '@angular/common/http';
declare var $: any;



const colors: any = {
  red: {
    primary: '#ad2121',
  },
  blue: {
    primary: '#1e90ff',
  },
  yellow: {
    primary: '#e3bc08',
  },
  green: {
    primary: '#49A12F',
  },
  black: {
    primary: '#000000',
  },
  aqua: {
    primary: '#28C1EE',
  },
  fuchsia: {
    primary: '#EE28DC',
  },
  gray: {
    primary: '#808080',
  }

};
@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent  implements OnInit{
  constructor(private calendarService: CalendarService, private modal: NgbModal, private modalService: BsModalService, private examService: ExamService, private _http: HttpClient) {}
  get calendars(): Array<Calendar> {
    return this.calendarService.calendars;
  }
  get exams(): Array<Exam> {
    return this.examService.exams;
  }
  get surveillants(): Array<Surveillant> {
    return this.examService.surveillants;
  }
  get professeurs(): Array<Professeur> {
    return this.examService.professeurs;
  }
  get modules(): Array<Module> {
    return this.examService.modules;
  }
  get salles(): Array<Salles> {
    return this.examService.salles;
  }
  get exam(): Exam {
    return this.examService.exam;
  }
  get examSurves(): Array<ExamSurveillant> {
    return this.examService.examSurves;
  }
  get examSurve(): ExamSurveillant {
    return this.examService.examSurve;
  }
  get examSalles(): Array<ExamSalle> {
    return this.examService.examSalles;
  }
  get surveill(): Surveillant {
    return this.examService.surveill;
  }
  get sal(): Salles {
    return this.examService.sal;
  }

  modalRef: BsModalRef;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale = 'fr';
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh: Subject<any> = new Subject();
  event: CalendarEvent = {
    title: 'New event',
    start: startOfDay(new Date(this.exam.dateDepart)),
    end: endOfDay(new Date(this.exam.dateFin)),
    color: colors,
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
  }
  };
  events: CalendarEvent[] = [
     {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true
}
  ];

  activeDayIsOpen = false;


  public evented: void;

  ngOnInit(): void {
   this.evented = this.examService.findAll();
   this.examService.getProfesseur();
   this.examService.getSalles();
   this.examService.getModule();
   this.examService.getSurveillant();
   this.examService.getExamSurveillant();
   this.examService.getExamSalle();
   this.calendarService.findAll();
  /* this.events = this.http
      .get('URL')
      .map(res => {
          return this.getSessionFromResponse(res.json());
        }
      );*/
  }
 /* getSessionFromResponse(response) {
    let sessionEvents = [];
    for (let session of response[0].sessions) {
      sessionEvents.push({
        title: session.titre,
        start: new Date(session.dateEffet),
        end: new Date(session.dateEffet),
        color: colors.yellow,
      });
    }
    return sessionEvents;
  }*/
  public save() {
    this.examService.save();
    this.event.title = this.exam.reference;
    this.event.start =   startOfDay(new Date(this.exam.dateDepart));
    this.event.end =  endOfDay(new Date(this.exam.dateFin));
    this.event.color = colors.gray;
    this.event.draggable = true;
    this.event.resizable = {
      beforeStart: true,
      afterEnd: true,
    };
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      this.event
    ];
  }
  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log( event);
  }

  deleteEvent(eventToDelete: CalendarEvent){
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView){
    this.view = view;
  }

  closeOpenMonthViewDay(){
    this.activeDayIsOpen = false;
  }
  public addSurveillant(surveillant: Surveillant){
    this.examService.addSurveillant(surveillant);
  }
  public addSalle(salle: Salles){
    this.examService.addSalle(salle);
  }
  recupererSurv( surveillant) {
    console.log(surveillant);
    this.examService.findBySurveillantNom(surveillant);
  }
  recupererSalle( sal) {
    console.log(sal);
    this.examService.findBySallesDesignation(sal);
  }
  show() {
    this.handleEvent('Dropped or resized', this.event);
  }

  color(color: string){

  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }
  /*  refreshView(): void {
      this.refresh.next();

   /* byMonth(month: string): Observable<ResponseWrapper> {
      return this.http.get(`api/points-by-month/${month}`)
        .map((res: any) => this.convertResponse(res));
    }*/
}
