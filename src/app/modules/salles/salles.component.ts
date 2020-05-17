import { Component, OnInit, TemplateRef } from '@angular/core';
import { SallesService } from 'src/app/controller/services/salles.service';
import { Salles } from 'src/app/controller/model/salles';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { PrintService } from 'src/app/controller/services/print.service';
import * as XLSX from 'xlsx';
import {Etat} from "../../controller/model/etat.model";
import {EtatService} from "../../controller/services/etat.service";




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
  fileName= 'ExcelSheet.xlsx';
  p: number =1;



  constructor(private salleService: SallesService,
              private modalService: BsModalService,
              private printService: PrintService,
              private etatService: EtatService) {
  }


  ngOnInit(): void {
    this.salleService.findAll();
    this.recordCount = this.salles.length;

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

  public imprimer() {
    this.printService.imprimer();
  }

  public update(id: number, designation: string, etat: string, type: string, capacite: number) {
    this.salleService.update(id, designation, etat, type, capacite);
  }

  paginate(event) {
 //   event.first = 1;
   // event.rows = 3;
 //   event.page = 2;
 //   event.pageCount = 5;
 }

 exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('content-excel');
   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  get display(): number{
    return this.salleService.display;
  }

}


