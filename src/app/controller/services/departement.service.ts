import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Departement} from '../model/departement.model';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) { }

  private _departement: Departement;
  private _departements: Array<Departement>;
  private _display: number;
  private _urldepart = 'http://localhost:8090/exam-api/departements/';
  private isPrinting = false;

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
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

  get departement(): Departement {
    if (this._departement == null) {
      this._departement = new Departement();
    }
    return this._departement;
  }

  set departement(value: Departement) {
    this._departement = value;
  }
  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }
  public findAll() {
    this.http.get<Array<Departement>>(this._urldepart + 'find-all').subscribe(
      data => {
        this.departements = data;
        console.log(data);
      }
    );
  }

  public save() {
    console.log('haa lien ' + this._urldepart);
    console.log('haa departement ' + this.departement);

    this.http.post<number>(this._urldepart + 'save', this.departement).subscribe(
      data => {
        if (data === 1) {
          this.departements.push(this.cloneDepartement(this.departement));
          this.toastr.success(this.departement.libelle + ' a été ajouté avec succés', 'Ajout réussi!');
          this.departement = null;
          console.log(this.departement);
        }else if (data === -1){
          this.toastr.error(this.departement.libelle + ' existe déja', 'Attention!');
        }
      }, error => {
        console.log(error);
      }
    );
  }

  private cloneDepartement(departement: Departement) {
    const myClone = new Departement();
    myClone.libelle = departement.libelle;
    return myClone;
  }

  public deleteByLibelle(departement: Departement) {
    this.http.delete<number>(this._urldepart + 'delete-by-libelle/' + departement.libelle).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByLibelleFromView(departement);
      }
    );
  }

  private deleteByLibelleFromView(departement: Departement) {
    const index = this.departements.findIndex(d => d.libelle === departement.libelle);
    if (index !== -1) {
      this.departements.splice(index, 1);
    }
  }

  public recuperer(departement: Departement, id: number) {
    console.log(departement);
    this.departement.id = departement.id;
    this.departement.libelle = departement.libelle;
    console.log(this.departement.libelle);

  }

  public printDocument(documentName: string, documentData: string[]){
    this.isPrinting = true;
    this.router.navigate(['/',
      {outlets: {
          print: ['print', documentName, documentData.join()]
        }}
    ]);
  }
  public update(id: number, libelle: string){
    this.http.put(this._urldepart + id + '/' + libelle , this.departement).subscribe(
      data => {
        if (data > 0) {
          console.log('le departement est modifie ');
        }
        this.toastr.success(libelle + ' a été modifié avec succés', 'Modification réussi!');
      });
  }
  public vider(){
    this.departement = null;
  }
}

