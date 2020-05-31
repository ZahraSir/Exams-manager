
import {Exam} from './exam.model';
import {Personnel} from './personnel.model';

export class ExamSurveillant {
  public id: number;
  public surveillant = new Personnel();
  public exam = new Exam();
}
