import { ExamSalle } from './exam-salle';

export class Surveillant {

  public  id: number;
  public nom: string;
  public prenom: string;
 public  mail: string;
 public examSalle = new ExamSalle();
}
