import {Component, OnInit, TemplateRef} from '@angular/core';
import {Calendar} from '../../../controller/model/calendar';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DayPilot} from 'daypilot-pro-angular';

declare var $: any;

@Component({
  selector: 'app-calendar-create',
  templateUrl: './calendar-create.component.html',
  styleUrls: ['./calendar-create.component.css']
})
export class CalendarCreateComponent implements OnInit {
  private displayEvent: any;

  resources: any[];
  events: any[];

  constructor(private http: HttpClient) { }
  modalRef: BsModalRef;
  handleSelect(arg) {
    console.log(arg);
  }
  ngOnInit() {
    setTimeout(() => {
      $('#calendar').fullCalendar({
        monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'ouat', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        header: {
          left: 'prev today next ',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,Ajouter Event'
        },
        buttonText: {
          today:    'Aujourd\'hui',
          month:    'Mois',
          week:     'Semaine',
          day:      'Jour',
          list:     'Liste',
        },
        selectable: true,
        locale: 'fr',
        defaultView: 'agendaDay',
        navLinks: true,
        editable: true,
        eventLimit: true,
        selecteble: true,
        eventRender(event, element, view) {
          element.find('span.fc-title').attr('data-toggle', 'tooltip');
          element.find('span.fc-title').attr('title', event.title);
        },
        events: [
          {
            title: 'This is your',
            start: '2020-03-03T12:30:00',
            color: '#f9c66a' // override!
          }
        ]
      }).on('click', '.fc-agendaWeek-button, .fc-month-button, .fc-agendaDay-button, .fc-prev-button, .fc-next-button', function() {
        $('[data-toggle="tooltip"]').tooltip();
      });
      $('[data-toggle="tooltip"]').tooltip();
    }, 100);
  /*  $('.fc-prev').css('background-color', '#f9c66a');  */
  }
  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {


    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
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




