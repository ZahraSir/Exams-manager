import {Filiere} from "./filiere";
import {Semestre} from "./semestre";

export class Module {
  public id: number;
  public libelle: string;
  public semestre= new Semestre();
  public filiere= new Filiere();

}
