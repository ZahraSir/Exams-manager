import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PrintService} from '../../controller/services/print.service';
import {DepartementService} from '../../controller/services/departement.service';
import {Departement} from '../../controller/model/departement.model';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  item: string;
  p = 1;
  constructor(private departementService: DepartementService,
              private modalService: BsModalService, private printService: PrintService) { }


  ngOnInit(): void {
    this.departementService.findAll();
  }
  public save() {
    this.departementService.save();
  }
  get departements(): Array<Departement> {
    return this.departementService.departements;
  }
  get departement(): Departement {
    return this.departementService.departement;
  }
  public deleteByLibelle(departement: Departement) {
    this.departementService.deleteByLibelle(departement);
  }
  public recuperer(departement: Departement, id: number) {
    this.departementService.recuperer(departement, id);
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
    return this.departementService.display;
  }
  refresh(): void {
    window.location.reload();
  }

   public update(id: number, libelle: string){
    this.departementService.update(id, libelle);
  }
  public vider(){
    this.departementService.vider();
  }
}
