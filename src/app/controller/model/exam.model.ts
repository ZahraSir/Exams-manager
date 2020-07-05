import {Professeur} from './professeur.model';
import {Module} from './module.model';
import {ExamSalle} from './exam-salle';

import {Filiere} from './filiere';
import { ExamEtudiant } from './exam-etudiant';


export class Exam {
  public id: number;
  public  reference: string;
  public dateDepart: string;
  public dateFin: string;
  public  prof = new Professeur();
  public  module = new Module();
  public  examSalles = new Array<ExamSalle>();
  public filiere = new Filiere();
  public examEtudiants = new Array<ExamEtudiant>();
}
