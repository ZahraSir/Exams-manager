import {Filiere} from './filiere';
import {Semestre} from './semestre';
import {Professeur} from './professeur.model';

export class Module {
  public id: number;
  public libelle: string;
  public semestre = new Semestre();
  public filiere = new Filiere();
  public professeur = new Professeur();

}
