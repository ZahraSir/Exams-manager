import {Component, OnInit, TemplateRef, ViewChild, Input} from '@angular/core';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import {Subject} from 'rxjs';
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
};
@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent  implements OnInit{
  constructor(private calendarService: CalendarService, private modal: NgbModal, private modalService: BsModalService, private examService: ExamService) {}
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

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

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
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
    color: colors.red,
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
},
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow
     /* actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,*/
    },
  ];

  activeDayIsOpen = false;

 // @Input() dayStartHour = 8;
 // @Input() dayEndHour: number = 18;
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
  }
  public save() {
    this.examService.save();
    this.event.title = this.exam.module.libelle;
    this.event.start =   startOfDay(new Date());
    this.event.end =  endOfDay(new Date()),
    this.event.color = colors.red;
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

}