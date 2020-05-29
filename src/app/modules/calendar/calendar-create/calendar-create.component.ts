import {Component, OnInit, TemplateRef} from '@angular/core';
import {Calendar} from '../../../controller/model/calendar';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
declare var $: any;

@Component({
  selector: 'app-calendar-create',
  templateUrl: './calendar-create.component.html',
  styleUrls: ['./calendar-create.component.css']
})
export class CalendarCreateComponent implements OnInit {
  private displayEvent: any;

  constructor(private modalService: BsModalService) { }
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
          right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
          today:    'Aujourd\'hui',
          month:    'Mois',
          week:     'Semaine',
          day:      'Jour',
          list:     'Liste'
        },
        selectable: true,
        locale: 'fr',
        navLinks: true,
        editable: true,
         eventLimit: true,
        events: [
          {
            title: 'This is your',
            start: '2020-03-03T12:30:00',
            color: '#f9c66a' // override!
          },
          {
            title: 'Your meeting with john',
            start: '2020-05-07T12:30:00',
            end: '2020-03-09',
            color: '#019efb'
          },
          {
            title: 'This is Today',
            start: '2020-03-12T12:30:00',
            allDay: false, // will make the time show,
            color: '#57cd5f'
          }
        ],
    /*  eventClick(calEvent, jsEvent, view, resourceObj) {
        swal({
          title: calEvent.title,
          text: 'Start From : ' + moment(calEvent.start).format('MMMM Do YYYY, h:mm a'),
          icon: 'success',
        });
      }*/
        eventClick(event) {
        $ ('#successModal'). modal('show');
        $ ('#successModal .modal-body p'). text (event.title);
      }

    });
    }, 100);
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
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

}
