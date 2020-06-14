import { Injectable } from '@angular/core';
import {Professeur} from '../model/professeur.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Personnel} from '../model/personnel.model';
import {Surveillant} from '../model/surveillant.model';
import {Responsabilite} from '../model/responsabilite.model';
import {Departement} from '../model/departement.model';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) { }
  private _personnel: Personnel;
  private _personnels: Array<Personnel>;
  private _urlperso = 'http://localhost:8090/exam-api/personnels/';
  private _professeur: Professeur;
  private _professeurs: Array<Professeur>;
  private _urlprof = 'http://localhost:8090/exam-api/professeurs/';
  private _surveillant: Surveillant;
  private _surveillants: Array<Surveillant>;
  private _urlsurve = 'http://localhost:8090/exam-api/surveillants/';
  private _responsabilites: Array<Responsabilite>;
  private _departements: Array<Departement>;
  private _urlrespo = 'http://localhost:8090/exam-api/responsabilites/';
  private _urldepart = 'http://localhost:8090/exam-api/departements/';

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
  get http(): HttpClient {
    return this._http;
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
  set http(value: HttpClient) {
    this._http = value;
  }


  get surveillant(): Surveillant {
    if (this._surveillant == null) {
      this._surveillant = new Surveillant();
    }
    return this._surveillant;
  }

  set surveillant(value: Surveillant) {
    this._surveillant = value;
  }

  get surveillants(): Array<Surveillant> {
    if (this._surveillants == null) {
      this._surveillants = new Array<Surveillant>();
    }
    return this._surveillants;
  }

  set surveillants(value: Array<Surveillant>) {
    this._surveillants = value;
  }

  get personnels(): Array<Personnel> {
    if (this._personnels == null) {
      this._personnels = new Array<Personnel>();
    }
    return this._personnels;
  }

  set personnels(value: Array<Personnel>) {
    this._personnels = value;
  }

  get personnel(): Personnel {
    if (this._personnel == null) {
      this._personnel = new Personnel();
    }
    return this._personnel;
  }

  set personnel(value: Personnel) {
    this._personnel = value;
  }
  public findAll() {
    this.http.get<Array<Personnel>>(this._urlperso + 'find-all').subscribe(
      data => {
        this.personnels = data;
        console.log(data);
      }
    );
  }
  public save() {
    console.log(' lien ' + this._urlperso);
    console.log(' personnel ' + this.personnel);

    this.http.post<number>(this._urlperso + 'save', this.personnel).subscribe(
      data => {
        if (data === 1) {
          this.personnels.push(this.clonePersonnel(this.personnel));
          this.toastr.success(this.personnel.nom + ' a été ajouté avec succés', 'Ajout réussi!');
          this.personnel = null;
        }else if (data === -1){
          this.toastr.error(this.personnel.nom + ' existe déja', 'Attention!');
        }
      }, error => {
        console.log(error);
      }
    );
  }
  private clonePersonnel(personnel: Personnel) {
    const myClone = new Personnel();
    myClone.nom = personnel.nom;
    myClone.prenom = personnel.prenom;
    myClone.mail = personnel.mail;
    myClone.fonction = personnel.fonction;


    return myClone;
  }
  public deleteByNom(personnel: Personnel) {
    this.http.delete<number>(this._urlperso + 'delete-by-nom/' + personnel.nom).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByNomFromView(personnel);
      }
    );
  }

  private deleteByNomFromView(personnel: Personnel) {
    const index = this.personnels.findIndex(p => p.nom === personnel.nom);
    if (index !== -1) {
      this.personnels.splice(index, 1);
    }
  }
  public vider(){
    this.personnel = null;
  }
  public getDepartement() {
    this.http.get<Array<Departement>>(this._urldepart + 'find-all').subscribe(
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
  public update(id: number, nom: string, prenom: string, mail: string, fonction: string){
    this.http.put(this._urlperso + id + '/' + nom + '/' + prenom + '/' + mail + '/' + fonction, this.personnel).subscribe(
      data => {
        if (data > 0) {
          console.log('la personnel ');
        }
        this.toastr.success(nom + ' a été modifié avec succés', 'Modification réussi!');
      });
  }

  public recuperer(personnel: Personnel, id: number) {
    console.log(personnel);
    this.personnel.id = personnel.id
    this.personnel.nom = personnel.nom;
    this.personnel.prenom = personnel.prenom;
    this.personnel.mail = personnel.mail;
    this.personnel.fonction = personnel.fonction;

    console.log(this.personnel.nom);

  }

}
