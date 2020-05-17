import {Filiere} from "./filiere";
import {Exam} from "./exam.model";

export class Calendar {
  public  id: number;
  public  libelle: string;
  public  anneUniversitaire: number;
  public  filieres = new Filiere();
  public  exams = new Exam();
}




