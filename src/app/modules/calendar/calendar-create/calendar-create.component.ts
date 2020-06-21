import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CalendarService } from 'src/app/controller/services/calendar.service';
import { Exam } from 'src/app/controller/model/exam.model';
import moment from 'moment';



declare var $: any;

@Component({
  selector: 'app-calendar-create',
  templateUrl: './calendar-create.component.html',
  styleUrls: ['./calendar-create.component.css']
})
export class CalendarCreateComponent implements OnInit {

  resources: any[];
   
 private json : string;
  exams: Array<Exam>;
  events = [];
  constructor(private http: HttpClient, private calendarService: CalendarService) { }
  modalRef: BsModalRef;
  handleSelect(arg) {
    console.log(arg);
  }
 
  
  ngOnInit() {
  
 this.calendarService.findAllExam();
 //this.calendarService.getEvents();
 
 
      $('#calendar').fullCalendar({
       
        header: {
          left: 'prev today next ',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
   
        selectable: true,
        defaultView: 'agendaDay',
        navLinks: true,
        editable: true,
        eventLimit: true,
        selecteble: true,       
        events: [{"title":"UML SIR ","start":"2020-06-19T21:30:19","end":"2020-06-20T23:30:00","color":"#f9c66a"},{"title":"POO JAVA SIR ","start":"2020-06-28T21:32:00","end":"2020-06-28T23:32:00","color":"#f9c66a"}],      
     
    }, 100);
  
  }
  
  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }

 
  }




