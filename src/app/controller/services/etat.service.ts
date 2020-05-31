import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Etat} from '../model/etat.model';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EtatService {


  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) { }

  private _etat: Etat;
  private _etats: Array<Etat>;
  private _urletat = 'http://localhost:8090/exam-api/etat/';
  private isPrinting = false;

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }

  get etat(): Etat {
    if (this._etat == null) {
      this._etat = new Etat();
    }
    return this._etat;
  }

  set etat(value: Etat) {
    this._etat = value;
  }

  get etats(): Array<Etat> {
    if (this._etats == null) {
      this._etats = new Array<Etat>();
    }
    return this._etats;
  }

  set etats(value: Array<Etat>) {
    this._etats = value;
  }
  public findAll() {
    this.http.get<Array<Etat>>(this._urletat + 'findAll').subscribe(
      data => {
        this.etats = data;
        console.log(data);
      }
    );
  }
  public save() {
    console.log(' lien ' + this._urletat);
    console.log(' etat ' + this.etat);

    this.http.post<number>(this._urletat + 'save', this.etat).subscribe(
      data => {
        if (data === 1) {
          this.etats.push(this.etat);
          this.toastr.success(this.etat.libelle + 'a été ajouté avec succés', 'Ajout réussi!');
          this.etat = null;
        }else if (data === -1){
          this.toastr.warning(this.etat.libelle + 'existe déja', 'Attention!');
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
