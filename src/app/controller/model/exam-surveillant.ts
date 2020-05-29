import {Surveillant} from './surveillant.model';
import {Exam} from './exam.model';

export class ExamSurveillant {
  public id: number;
  public surveillant = new Surveillant();
  public exam = new Exam();
}
