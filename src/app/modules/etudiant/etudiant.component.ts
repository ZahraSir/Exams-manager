import {Component, OnInit, TemplateRef} from '@angular/core';

import {Etudiant} from '../../controller/model/etudiant';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Semestre} from '../../controller/model/semestre';
import {SemestreService} from '../../controller/services/semestre.service';
import {FiliereService} from '../../controller/services/filiere.service';
import {Filiere} from '../../controller/model/filiere';
import {EtudiantService} from '../../controller/services/etudiant.service';
import { ModuleService } from 'src/app/controller/services/module.service';
import { NiveauSemestre } from 'src/app/controller/model/niveau-semestre';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  item: string;
  modalRef: BsModalRef;
  selected = '---Choisir une filière---';
  p = 1;
  constructor(private etudiantService: EtudiantService, private modalService: BsModalService, private filiereService: FiliereService, private moduleService: ModuleService) { }

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

  public updateE(id: number, nom: string, prenom: string, cne: string, mail: string, Filiere: string, idSemestre: number){
    this.etudiantService.update(id, nom, prenom, cne, mail, Filiere, idSemestre);
  }


  public deleteByCne(etudiant: Etudiant){
    this.etudiantService.deleteByCne(etudiant);
  }

  public findByFiliereLibelle(filiere){
    console.log(filiere);
    this.etudiantService.findByFiliereLibelle(filiere);

  }

  get niveauSemestres(): Array<NiveauSemestre>{
    return this.etudiantService.niveauSemestres;
  }
  public validate(): boolean{
    return this.etudiantService.validate();
  }
}
