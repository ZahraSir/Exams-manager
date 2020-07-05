import { ExamSalle } from './exam-salle';
import { Exam } from './exam.model';

export class Surveillant {

  public  id: number;
  public nom: string;
  public prenom: string;
 public  mail: string;
 public examSalle = new ExamSalle();
 public exam = new Exam();
}
