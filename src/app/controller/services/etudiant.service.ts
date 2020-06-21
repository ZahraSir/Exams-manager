import { Injectable } from '@angular/core';
import {Etudiant} from '../model/etudiant';
import {Semestre} from '../model/semestre';
import {HttpClient} from '@angular/common/http';
import {Filiere} from '../model/filiere';
import { NiveauSemestre } from '../model/niveau-semestre';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _etudiant: Etudiant;
  private _etudiants: Array<Etudiant>;
  private _semestres: Array<Semestre>;
  private _niveauSemestres: Array<NiveauSemestre>;
  private _urlEtudiants = 'http://localhost:8090/exam-api/etudiants/';
  private _urlSemestre = 'http://localhost:8090/exam-api/niveau-semestre/';
  private _display: number;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  get etudiant(): Etudiant{
    if (this._etudiant == null){
      this._etudiant = new  Etudiant();
    }
    return this._etudiant;
  }

  set etudiant(etudiant: Etudiant) {
    this._etudiant = etudiant;
  }

  get etudiants(): Array<Etudiant>{
    if (this._etudiants == null){
      this._etudiants = new  Array<Etudiant>();
    }
    return this._etudiants;
  }

  set etudiants(etudiants: Array<Etudiant>) {
    this._etudiants = etudiants;
  }

  get niveauSemestres(): Array<NiveauSemestre>{
    if (this._niveauSemestres == null){
      this._niveauSemestres = new Array<NiveauSemestre>();
    }
    return this._niveauSemestres;
  }

  set niveauSemestres(niveauSemestres: Array<NiveauSemestre>){
    this._niveauSemestres = niveauSemestres;
  }
  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }
  public save(){
    this.http.post<number>(this._urlEtudiants + 'save/', this.etudiant).subscribe(
      data => {
        if (data > 0) {
          this.toastr.success(this.etudiant.nom + ' a été ajouté dans la liste', 'Ajout réussi');
          this.etudiants.push(this.etudiant);
          this.etudiant = null;
          this.display = 1;
          console.log(this.etudiant);
        }else if (data === -1){
          this.display = -1;
          this.toastr.error(this.etudiant.cne + ' existe déja dans la liste', 'Alerte!');
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  public validate(): boolean{
    return this.etudiant.nom != null && this.etudiant.cne != null && this.etudiant.prenom != null && this.etudiant.mail != null && this.etudiant.filiere.libelle != null && this.etudiant.semestre.libelle != null;
  }

  public recuperer(etudiant: Etudiant){
    this.etudiant.id = etudiant.id;
    this.etudiant.nom = etudiant.nom;
    this.etudiant.prenom = etudiant.prenom;
    this.etudiant.cne = etudiant.cne;
    this.etudiant.mail = etudiant.mail;
    this.etudiant.filiere.libelle = etudiant.filiere.libelle;
    this.etudiant.semestre.libelle = etudiant.semestre.libelle;
  }

  public update(id: number, nom: string, prenom: string, cne: string, mail: string, Filiere: string, idSemestre: number){
    this.http.put(this._urlEtudiants + id + '/' + nom + '/' + prenom + '/' + cne + '/' + mail + '/' + Filiere + '/' + idSemestre, this.etudiant).subscribe(
      data => {
        if (data > 0) {
          console.log(this.etudiant);
        }
        this.toastr.success(nom + ' a été modifié avec succés', 'Modification réussi!');
      });
  }

  public findAll(){
    this.http.get<Array<Etudiant>>(this._urlEtudiants + 'find-all/').subscribe(
      data => {
        this.etudiants = data;
        console.log(data);
      }
    );
  }

  public deleteByCne(etudiant: Etudiant){
    this.http.delete<number>(this._urlEtudiants + '/delete-by-cne/' + etudiant.cne).subscribe(
      data => {
        console.log('data suprime');
        this.deleteByReferenceFromView(etudiant);
      }
    );
  }


  public deleteByReferenceFromView(etudiant: Etudiant){
    const index = this.etudiants.findIndex(m => m.cne === etudiant.cne);
    if (index !== -1) {
      this.etudiants.splice(index, 1);
    }
  }

  get semestres(): Array<Semestre>{
    if (this._semestres == null){
      this._semestres = new Array<Semestre>();
    }
    return this._semestres;
  }

  set semestres(semestres: Array<Semestre>){
    this._semestres = semestres;
  }

  public getSemestres() {
    this.http.get<Array<Semestre>>(this._urlSemestre).subscribe(
      data => {
        this.semestres = data;
      }
    );
  }

  public vider(){
    this.etudiant = null;
  }

  public findByFiliereLibelle(filiere){
    this.http.get<Array<NiveauSemestre>>(this._urlSemestre + 'find-by-filiere/' + filiere).subscribe(
      data => {
        console.log(data);
        this.niveauSemestres = data;
        console.log('fbjd ' + this.niveauSemestres);

      }
    );
  }
}

