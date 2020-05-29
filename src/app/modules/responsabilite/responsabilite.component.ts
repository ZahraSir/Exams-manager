import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {PrintService} from '../../controller/services/print.service';
import {ResponsabiliteService} from '../../controller/services/responsabilite.service';
import {Responsabilite} from '../../controller/model/responsabilite.model';

@Component({
  selector: 'app-responsabilite',
  templateUrl: './responsabilite.component.html',
  styleUrls: ['./responsabilite.component.css']
})
export class ResponsabiliteComponent implements OnInit {


  modalRef: BsModalRef;
  message: string;
  item: string;
  p = 1;
  constructor(private responsabiliteService: ResponsabiliteService,
              private modalService: BsModalService, private printService: PrintService) { }


  ngOnInit(): void {
    this.responsabiliteService.findAll();
  }
  public save() {
    this.responsabiliteService.save();
  }
  get responsabilites(): Array<Responsabilite> {
    return this.responsabiliteService.responsabilites;
  }
  get responsabilite(): Responsabilite {
    return this.responsabiliteService.responsabilite;
  }
  public deleteByLibelle(responsabilite: Responsabilite) {
    this.responsabiliteService.deleteByLibelle(responsabilite);
  }
  public recuperer(responsabilite: Responsabilite, id: number) {
    this.responsabiliteService.recuperer(responsabilite, id);
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
    return this.responsabiliteService.display;
  }


  public update(id: number, libelle: string){
    this.responsabiliteService.update(id, libelle);
  }
  public vider(){
    this.responsabiliteService.vider();
  }
  refresh(): void {
    window.location.reload();
  }
}
