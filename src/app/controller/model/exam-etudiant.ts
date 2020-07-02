import { Exam } from './exam.model';
import { Salles } from './salles';
import { Etudiant } from './etudiant';

export class ExamEtudiant {
public id : number;
public exam = new Exam();
public salle = new Salles();
public etudiant = new Etudiant();
}


