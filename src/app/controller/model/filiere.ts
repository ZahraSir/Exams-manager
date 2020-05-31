import {Module} from './module.model';
import {Niveau} from './niveau';
import { Departement } from './departement.model';

export class Filiere {
  public id: number;
  public libelle: string;
  public niveau = new Niveau();
  public departement = new Departement();
  public modules = new Array<Module>();
}
