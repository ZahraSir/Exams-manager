import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Professeur} from '../model/professeur.model';
import {Responsabilite} from '../model/responsabilite.model';
import {Departement} from '../model/departement.model';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {


  constructor(private _http: HttpClient, private router: Router,private toastr: ToastrService) { }

  private _professeur: Professeur;
  private _professeurs: Array<Professeur>;
  private _urlprof = 'http://localhost:8090/exam-api/professeurs/';
  private _responsabilites: Array<Responsabilite>;
  private _departements: Array<Departement>;
  private _urlrespo = 'http://localhost:8090/exam-api/responsabilites/';
  private _urldepart = 'http://localhost:8090/exam-api/departements/';
  private isPrinting=false;
  private _display: number;

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }


  get responsabilites(): Array<Responsabilite> {
    if (this._responsabilites == null) {
      this._responsabilites = new Array<Responsabilite>();
    }
    return this._responsabilites;
  }

  set responsabilites(value: Array<Responsabilite>) {
    this._responsabilites = value;
  }

  get departements(): Array<Departement> {
    if (this._departements == null) {
      this._departements = new Array<Departement>();
    }
    return this._departements;
  }

  set departements(value: Array<Departement>) {
    this._departements = value;
  }

  get professeur(): Professeur {
    if (this._professeur == null) {
    this._professeur = new Professeur();
  }
    return this._professeur;
  }

  set professeur(value: Professeur) {

    this._professeur = value;
  }

  get professeurs(): Array<Professeur> {
    if (this._professeurs == null) {
      this._professeurs = new Array<Professeur>();
    }
    return this._professeurs;
  }

  set professeurs(value: Array<Professeur>) {
    this._professeurs = value;
  }

  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }

  public findAll() {
    this.http.get<Array<Professeur>>(this._urlprof + 'find-all').subscribe(
      data => {
        this.professeurs = data;
        console.log(data);
      }
    );
  }

  public save() {
    console.log('haa lien ' + this._urlprof);
    console.log('haa professeur ' + this.professeur);

    this.http.post<number>(this._urlprof + 'save', this.professeur).subscribe(
      data => {
        if (data === 1) {
          this.professeurs.push(this.cloneProfesseur(this.professeur));
          this.toastr.success(this.professeur.nom + this.professeur.nom + ' a été ajouté avec succés', 'Ajout réussi!');
          this.professeur = null;
          console.log(this.professeur);
        }else if (data === -1){
          this.toastr.warning(this.professeur.nom + this.professeur.nom + ' existe déja', 'Attention!');
        }
      }, error => {
        console.log(error);
      }
    );
  }

  private cloneProfesseur(professeur: Professeur) {
    const myClone = new Professeur();
    myClone.nom = professeur.nom;
    myClone.prenom = professeur.prenom;
    myClone.mail = professeur.mail;
    myClone.responsabilite = professeur.responsabilite;
    myClone.departement = professeur.departement;

    return myClone;
  }

  public deleteByNom(professeur: Professeur) {
    this.http.delete<number>(this._urlprof + 'delete-by-nom/' + professeur.nom).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByNomFromView(professeur);
      }
    );
  }

  private deleteByNomFromView(professeur: Professeur) {
    const index = this.professeurs.findIndex(p => p.nom === professeur.nom);
    if (index !== -1) {
      this.professeurs.splice(index, 1);
    }
  }

  public recuperer(professeur: Professeur, id: number) {
    console.log(professeur);
    this.professeur.id = professeur.id
    this.professeur.nom = professeur.nom;
    this.professeur.prenom = professeur.prenom;
    this.professeur.mail = professeur.mail;
    this.professeur.departement.libelle = professeur.departement.libelle;
    this.professeur.responsabilite.libelle = professeur.responsabilite.libelle;
    console.log(this.professeur.nom);
    console.log(this.professeur.departement);
    console.log(this.professeur.responsabilite);
  }


  public printDocument(documentName: string, documentData: string[]){
    this.isPrinting = true;
    this.router.navigate(['/',
      {outlets: {
          'print': ['print', documentName, documentData.join()]
        }}
    ])
  }
  public update(id: number, nom: string, prenom: string, mail: string, responsabilite: string, departement: string){
    this.http.put(this._urlprof + id + '/' + nom + '/' + prenom + '/' + mail + '/' + responsabilite + '/' + departement, this.professeur).subscribe(
      data => {
        if (data > 0) {
          console.log(data);
          console.log('la professeur ' + departement);
          console.log('la professeur ' + responsabilite );
          console.log('la professeur ' + mail);
        }
      });
  }
  public getDepartement() {
    this.http.get<Array<Departement>>(this._urldepart+ 'find-all').subscribe(
      data => {
        this._departements = data;
      }
    );
  }
  public getResponsabilite() {
    this.http.get<Array<Responsabilite>>(this._urlrespo + 'find-all').subscribe(
      data => {
        this._responsabilites = data;
      }
    );
  }
  public vider(){
    this.professeur = null;
  }
}

