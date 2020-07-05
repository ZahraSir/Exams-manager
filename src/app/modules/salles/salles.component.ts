import { Component, OnInit, TemplateRef } from '@angular/core';
import { SallesService } from 'src/app/controller/services/salles.service';
import { Salles } from 'src/app/controller/model/salles';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ExamService} from '../../controller/services/exam.service';
import {Exam} from '../../controller/model/exam.model';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  message: string;
  item: string;
  public salls: any;
  recordCount: number;

  p = 1;
  cols: any[];

  exportColumns: any[];


  constructor(private salleService: SallesService,
              private modalService: BsModalService,
              private examService: ExamService) {
  }


  ngOnInit(): void {
    this.salleService.findAll();
    this.recordCount = this.salles.length;
    this.cols = [
      { field: 'designation', header: 'Désignation' },
      { field: 'capacite', header: 'Capacité' },
      { field: 'type', header: 'Type' },
      { field: 'etat', header: 'Etat' }
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  get exam(): Exam{
    return this.examService.exam;
  }
  get exams(): Array<Exam>{
    return this.examService.exams;
  }

  public save() {
    this.salleService.save();
  }

  get salles(): Array<Salles> {
    return this.salleService.salles;
  }

  get salle(): Salles {
    return this.salleService.salle;
  }

  public deleteByDesignation(salle: Salles) {
    this.salleService.deleteByDesignation(salle);
  }
  public recuperer(salle: Salles, id: number) {
    this.salleService.recuperer(salle, id);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  showw(salle: Salles, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  public update(id: number, designation: string, etat: string, type: string, capacite: number) {
    this.salleService.update(id, designation, etat, type, capacite);
  }

  exportexcel(): void {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.salles);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'salles');
    });
  }
  public saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  exportPdf() {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.salles);
        doc.save('salles.pdf');
      });
    });
  }
  get display(): number{
    return this.salleService.display;
  }

  public vider(){
    this.salleService.vider();
  }

  public validate(){
    return this.salleService.validate();
  }

}


