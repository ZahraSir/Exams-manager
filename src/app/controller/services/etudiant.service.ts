import { Injectable } from '@angular/core';
import {Etudiant} from "../model/etudiant";
import {Semestre} from "../model/semestre";
import {HttpClient} from "@angular/common/http";
import {Filiere} from "../model/filiere";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _etudiant: Etudiant;
  private _etudiants: Array<Etudiant>;
  private _filieres: Array<Filiere>;
  private _semestres: Array<Semestre>;
  private _urlEtudiants= 'http://localhost:8090/exam-api/etudiants/';
  private _urlSemestre= 'http://localhost:8090/exam-api/semestre/find-all';
  constructor(private http: HttpClient) { }

  get etudiant(): Etudiant{
    if(this._etudiant == null){
      this._etudiant = new  Etudiant();
    }
    return this._etudiant;
  }

  set etudiant(etudiant: Etudiant) {
    this._etudiant = etudiant;
  }

  get etudiants(): Array<Etudiant>{
    if(this._etudiants == null){
      this._etudiants = new  Array<Etudiant>();
    }
    return this._etudiants;
  }

  set etudiants(etudiants: Array<Etudiant>) {
    this._etudiants = etudiants;
  }

  public save(){
    this.http.post<number>(this._urlEtudiants+ 'save/', this.etudiant).subscribe(
      data => {
        if (data > 0) {
          this.etudiants.push(this.etudiant);
          this.etudiant = null;
          console.log(this.etudiant);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public recuperer(etudiant: Etudiant){
    this.etudiant.id = etudiant.id;
    this.etudiant.nom = etudiant.nom;
    this.etudiant.prenom = etudiant.prenom;
    this.etudiant.cne = etudiant.cne;
    this.etudiant.mail =etudiant.mail;
    this.etudiant.filiere.libelle = etudiant.filiere.libelle;
    this.etudiant.semestre.libelle = etudiant.semestre.libelle;
  }

  public update(id: number, nom: string, prenom: string, cne: string, mail: string, idFiliere: number, idSemestre: number){
    this.http.put(this._urlEtudiants + id +'/'+ nom +'/' + prenom + '/' + cne + '/' + mail + '/' + idFiliere + '/' + idSemestre, this.etudiant).subscribe(
      data =>{
        if(data >0) {
          console.log(this.etudiant)
        }
      })
  }

  public findAll(){
    this.http.get<Array<Etudiant>>(this._urlEtudiants +'find-all/').subscribe(
      data => {
        this.etudiants = data;
        console.log(data);
      }
    )
  }

  public deleteByCne(etudiant: Etudiant){
    this.http.delete<number>(this._urlEtudiants + '/delete-by-cne/' + etudiant.cne).subscribe(
      data => {
        console.log("data suprime");
        this.deleteByReferenceFromView(etudiant);
      }
    );
  }


  public deleteByReferenceFromView(etudiant: Etudiant){
    const index = this.etudiants.findIndex(m=> m.cne === etudiant.cne);
    if (index !== -1) {
      this.etudiants.splice(index, 1);
    }
  }

  get semestres(): Array<Semestre>{
    if(this._semestres == null){
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
}
