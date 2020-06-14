import {Surveillant} from './surveillant.model';
import {Salles} from './salles';
import {Exam} from './exam.model';
import { Personnel } from './personnel.model';

export class ExamSalle {
  public id: number;
  public salle = new Salles();
  public surveillants = new Array<Surveillant>();
  public exam = new Exam();
}
