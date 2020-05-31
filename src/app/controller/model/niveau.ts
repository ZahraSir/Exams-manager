import { Semestre } from './semestre';
import { NiveauSemestre } from './niveau-semestre';

export class Niveau {
  public id: number;
  public libelle: string;
  public niveauSemestres: Array<NiveauSemestre>;
}
