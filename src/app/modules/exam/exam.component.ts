import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {PrintService} from "../../controller/services/print.service";
import {Professeur} from "../../controller/model/professeur.model";
import {ExamService} from "../../controller/services/exam.service";
import {Exam} from "../../controller/model/exam.model";
import {Surveillant} from "../../controller/model/surveillant.model";
import {Module} from "../../controller/model/module.model";
import {Salles} from "../../controller/model/salles";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {


  modalRef: BsModalRef;
  message: string;
  item: string;
  p: number =1;
  constructor(private examService: ExamService,
              private modalService: BsModalService, private printService: PrintService) { }


  ngOnInit(): void {
    this.examService.findAll();
    this.examService.getProfesseur();
    this.examService.getSalles();
    this.examService.getModule();
    this.examService.getSurveillant();

  }
  public save() {
    this.examService.save();
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
  public deleteByReference(exam: Exam) {
    this.examService.deleteByReference(exam);
  }
  public recuperer(exam: Exam, id: number) {
    this.examService.recuperer(exam, id);
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
  get display(): number{
    return this.examService.display;
  }

  public update(id: number, reference: string, date: Date, heureDepart: string, heureFin: string, module: Module, prof: Professeur, surveillants: Surveillant, salles: Salles){
    this.examService.update(id, reference, date, heureDepart, heureFin, module, prof, surveillants, salles);
  }
}
