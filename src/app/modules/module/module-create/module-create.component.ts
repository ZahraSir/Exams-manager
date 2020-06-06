import {Component, OnInit, TemplateRef} from '@angular/core';
import {ModuleService} from '../../../controller/services/module.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Semestre} from '../../../controller/model/semestre';
import {SemestreService} from '../../../controller/services/semestre.service';
import {FiliereService} from '../../../controller/services/filiere.service';
import {Filiere} from '../../../controller/model/filiere';
import {Module} from '../../../controller/model/module.model';
import { NiveauSemestre } from 'src/app/controller/model/niveau-semestre';
import { Professeur } from 'src/app/controller/model/professeur.model';
import { ProfesseurService } from 'src/app/controller/services/professeur.service';

@Component({
  selector: 'app-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.css']
})
export class ModuleCreateComponent implements OnInit {

  constructor(private moduleService: ModuleService, private filiereService: FiliereService, private semestreService: SemestreService, private modalService: BsModalService,
    private professeurService: ProfesseurService) { }
  item: string;
  modalRef: BsModalRef;
  p = 1;
  ngOnInit(): void {
    this.moduleService.getSemestres();
    this.moduleService.findAll();
    this.filiereService.findAll();
    this.moduleService.getProfesseur();
  }

  get module(): Module{
    return this.moduleService.module;
  }

  get modules(): Array<Module>{
    return this.moduleService.modules;
  }

  public save(){
    this.moduleService.save();
  }

  get filiere(): Filiere{
    return this.filiereService.filiere;
  }


  get semestres(): Array<Semestre>{
    return this.moduleService.semestres;
  }

  public deleteById(module: Module){
    this.moduleService.deleteById(module);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  decline(): void {
    this.modalRef.hide();
  }

  get filieres(): Array<Filiere>{
    return this.filiereService.filieres;
  }

  public recuperer(module: Module){
    this.moduleService.recuperer(module);
  }

  public update(module: Module){
    this.moduleService.update(module.id, module.libelle, module.semestre.libelle, module.professeur);
  }

  public vider(){
    this.moduleService.vider();
  }

  get niveauSemestres(): Array<NiveauSemestre>{
    return this.moduleService.niveauSemestres;
  }
  public findByfiliereLibelle(filiere){
    console.log(filiere);
    this.moduleService.findByFiliereLibelle(filiere);

  }

  get professeurs(): Array<Professeur> {
    return this.moduleService.professeurs;
  }
}
