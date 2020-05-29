import {Surveillant} from './surveillant.model';
import {Salles} from './salles';
import {Exam} from './exam.model';

export class ExamSalle {
  public id: number;
  public salle = new Salles();
  public exam = new Exam();
}
