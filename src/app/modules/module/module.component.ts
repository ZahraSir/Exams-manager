import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../../controller/services/module.service';
import {FiliereService} from '../../controller/services/filiere.service';
import {Filiere} from '../../controller/model/filiere';
import {Module} from '../../controller/model/module.model';
import {Semestre} from '../../controller/model/semestre';
import {SemestreService} from '../../controller/services/semestre.service';
import {EtudiantService} from '../../controller/services/etudiant.service';
import { NiveauSemestre } from 'src/app/controller/model/niveau-semestre';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  constructor(private moduleService: ModuleService, private filiereService: FiliereService, private semestreService: SemestreService, private etudiantService: EtudiantService) { }

  ngOnInit(): void {
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

  public update(id: number, libelle: string, semestre: string){
    console.log('ha lid '+id);
    this.moduleService.update(id, libelle, semestre);
  }

  public recupererM(module: Module){
    this.moduleService.recuperer(module);
  }

  get semestres(): Array<Semestre>{
    return this.etudiantService.semestres;
  }
  get semestre(): Semestre{
    return this.semestreService.semestre;
  }

  get niveauSemestres(): Array<NiveauSemestre>{
    return this.filiereService.niveauSemestres;
  }

}
