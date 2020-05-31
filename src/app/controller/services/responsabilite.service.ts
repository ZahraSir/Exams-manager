import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Responsabilite} from '../model/responsabilite.model';
import {ToastrService} from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class ResponsabiliteService {

  constructor(private _http: HttpClient, private router: Router,private toastr: ToastrService) { }

  private _responsabilite: Responsabilite;
  private _responsabilites: Array<Responsabilite>;
  private _display: number;
  private _urlrespo = 'http://localhost:8090/exam-api/responsabilites/';
  private isPrinting = false;

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }


  get responsabilite(): Responsabilite {
    if (this._responsabilite == null) {
      this._responsabilite = new Responsabilite();
    }
    return this._responsabilite;
  }

  set responsabilite(value: Responsabilite) {
    this._responsabilite = value;
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
  public findAll() {
    this.http.get<Array<Responsabilite>>(this._urlrespo + 'find-all').subscribe(
      data => {
        this.responsabilites = data;
        console.log(data);
      }
    );
  }
  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }
  public save() {
    console.log('haa lien ' + this._urlrespo);
    console.log('haa responsabilite ' + this.responsabilite);

    this.http.post<number>(this._urlrespo + 'save', this.responsabilite).subscribe(
      data => {
        if (data === 1) {
          this.responsabilites.push(this.cloneResponsabilite(this.responsabilite));
          this.toastr.success(this.responsabilite.libelle + 'a été ajouté avec succés', 'Ajout réussi!');
          this.responsabilite = null;
          console.log(this.responsabilite);
        }else if (data === -1){
          this.toastr.warning(this.responsabilite.libelle + 'existe déja', 'Attention!');
        }
      }, error => {
        console.log(error);
      }
    );
  }

  private cloneResponsabilite(responsabilite: Responsabilite) {
    const myClone = new Responsabilite();
    myClone.libelle = responsabilite.libelle;
    return myClone;
  }
  public deleteByLibelle(responsabilite: Responsabilite) {
    this.http.delete<number>(this._urlrespo + 'delete-by-libelle/' + responsabilite.libelle).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByLibelleFromView(responsabilite);
      }
    );
  }

  private deleteByLibelleFromView(responsabilite: Responsabilite) {
    const index = this.responsabilites.findIndex(r => r.libelle === responsabilite.libelle);
    if (index !== -1) {
      this.responsabilites.splice(index, 1);
    }
  }


  public recuperer(responsabilite: Responsabilite, id: number) {
    console.log(responsabilite);
    this.responsabilite.id = responsabilite.id;
    this.responsabilite.libelle = responsabilite.libelle;
    console.log(this.responsabilite.libelle);

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
    this.http.put(this._urlrespo + id + '/' + libelle , this.responsabilite).subscribe(
      data => {
        if (data > 0) {
          console.log('le responsabilite est modifie ');
        }
      });
  }
  public vider(){
    this.responsabilite = null;
  }
}
