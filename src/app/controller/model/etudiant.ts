import {Filiere} from './filiere';
import {Semestre} from './semestre';

export class Etudiant {
  public id: number;
  public nom: string;
  public prenom: string;
  public mail: string;
  public cne: string;
  public filiere= new Filiere();
  public semestre= new Semestre();
}
