import { Component, OnInit } from '@angular/core';

import { PrintService } from 'src/app/controller/services/print.service';
import { SallesService } from 'src/app/controller/services/salles.service';
import { Salles } from 'src/app/controller/model/salles';
import {Responsabilite} from "../../controller/model/responsabilite.model";
import {Surveillant} from "../../controller/model/surveillant.model";
import {DepartementService} from "../../controller/services/departement.service";
import {SurveillantService} from "../../controller/services/surveillant.service";
import {ProfesseurService} from "../../controller/services/professeur.service";
import {ResponsabiliteService} from "../../controller/services/responsabilite.service";
import {Departement} from "../../controller/model/departement.model";
import {Professeur} from "../../controller/model/professeur.model";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(private printService: PrintService,
              private salleService: SallesService,
              private departementService: DepartementService,
              private surveillantService: SurveillantService,
              private professeurService: ProfesseurService,
              private responsabiliteService: ResponsabiliteService) { }

  ngOnInit(): void {
    this.salleService.save();
  }
imprimer(){
  this.printService.imprimer();
}


get salles(): Array<Salles> {
  return this.salleService.salles;
}
  get responsabilites(): Array<Responsabilite> {
    return this.responsabiliteService.responsabilites;
  }
  get departements(): Array<Departement> {
    return this.departementService.departements;
  }
  get professeurs(): Array<Professeur> {
    return this.professeurService.professeurs;
  }
  get surveillants(): Array<Surveillant> {
    return this.surveillantService.surveillants;
  }
}
