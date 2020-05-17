import {Component, OnInit, TemplateRef} from '@angular/core';
import {Etudiant} from "../../controller/model/etudiant";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Semestre} from "../../controller/model/semestre";
import {SemestreService} from "../../controller/services/semestre.service";
import {FiliereService} from "../../controller/services/filiere.service";
import {Filiere} from "../../controller/model/filiere";
import {EtudiantService} from "../../controller/services/etudiant.service";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  item: string;
  modalRef: BsModalRef;
  selected= '---Choisir une filière---';
  constructor(private etudiantService: EtudiantService, private modalService: BsModalService, private filiereService: FiliereService, private semestreService: SemestreService) { }

  ngOnInit(): void {
    this.etudiantService.findAll();
    this.filiereService.findAll();
    this.etudiantService.getSemestres();
  }

  get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }

  get semestres(): Array<Semestre>{
    return this.etudiantService.semestres;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
  get etudiant(): Etudiant{
    return this.etudiantService.etudiant;
  }

  get etudiants(): Array<Etudiant>{
    return this.etudiantService.etudiants;
  }

  public save(){
    this.etudiantService.save();
  }

  public vider(){
    this.etudiantService.vider();
  }

  public recuperer(etudiant: Etudiant){
    this.etudiantService.recuperer(etudiant);
  }

  public updateE(id: number, nom: string, prenom: string, cne: string, mail: string, idFiliere: number, idSemestre: number){
    this.etudiantService.update(id, nom, prenom, cne, mail, idFiliere, idSemestre);
  }


  public deleteByCne(etudiant: Etudiant){
    this.etudiantService.deleteByCne(etudiant);
  }

}
