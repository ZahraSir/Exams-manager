import {Module} from './module.model';
import {Niveau} from './niveau';

export class Filiere {
  public id: number;
  public libelle: string;
  public niveau = new Niveau();
  public modules = new Array<Module>();
}
