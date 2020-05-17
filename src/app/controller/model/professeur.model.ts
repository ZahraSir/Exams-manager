import {Responsabilite} from './responsabilite.model';
import {Departement} from './departement.model';

export class Professeur {
 public  id: number;
  public nom: string;
  public  prenom: string;
  public  mail: string;
 public  responsabilite = new Responsabilite() ;
 public  departement = new Departement();
}
