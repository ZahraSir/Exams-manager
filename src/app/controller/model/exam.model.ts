import {Professeur} from "./professeur.model";
import {Surveillant} from "./surveillant.model";
import {Salles} from "./salles";
import {Module} from "./module.model";

export class Exam {

  public id: number;
  public  reference: string;
  public date: Date;
  public heureDepart: string;
  public heureFin: string;
  public  prof = new Professeur();
  public  surveillants = new Surveillant();
  public  module = new Module();
  public  salles = new Salles();
}
