import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Surveillant} from '../model/surveillant.model';
import {ToastrService} from 'ngx-toastr';
import { ExamSalle } from '../model/exam-salle';


@Injectable({
  providedIn: 'root'
})
export class SurveillantService {


  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) { }

  private _surveillant: Surveillant;
  private _surveillants: Array<Surveillant>;
  private _display: number;
  private _urlsurve = 'http://localhost:8090/exam-api/surveillants/';
  private isPrinting = false;
  private _examSalle = new ExamSalle();

  get http(): HttpClient {
    return this._http;
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
  get examSalle(): ExamSalle {
    if (this._examSalle == null) {
      this._examSalle = new ExamSalle();
    }
    return this._examSalle;
  }

  set examSalle(value: ExamSalle) {
    this._examSalle = value;
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
  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }
  public findAll() {
    this.http.get<Array<Surveillant>>(this._urlsurve + 'find-all').subscribe(
      data => {
        this.surveillants = data;
        console.log(data);
      }
    );
  }

 public save() {
     console.log('haa lien ' + this._urlsurve);
     console.log('haa surveillant ' + this.surveillant);

     this.http.post<number>(this._urlsurve + 'save', this.surveillant).subscribe(
       data => {
         if (data === 1) {
           this.surveillants.push(this.cloneSurveillant(this.surveillant));
           this.toastr.success(this.surveillant.nom + ' a été ajouté avec succés', 'Ajout réussi!');
           this.surveillant = null;
           console.log(this.surveillant);
         }else if (data === -1){
           this.toastr.error(this.surveillant.nom + ' existe déja', 'Attention!');
         }
       }, error => {
         console.log(error);
       }
     );
   }

   private cloneSurveillant(surveillant: Surveillant) {
     const myClone = new Surveillant();
     myClone.nom = surveillant.nom;
     myClone.prenom = surveillant.prenom;
     myClone.mail = surveillant.mail;

     return myClone;
   }

  public deleteByNom(surveillant: Surveillant) {
    this.http.delete<number>(this._urlsurve + 'delete-by-nom/' + surveillant.nom).subscribe(
      data => {
        console.log('ha data ' + data);
        this.deleteByNomFromView(surveillant);
      }
    );
  }

  private deleteByNomFromView(surveillant: Surveillant) {
    const index = this.surveillants.findIndex(s => s.nom === surveillant.nom);
    if (index !== -1) {
      this.surveillants.splice(index, 1);
    }
  }

  public recuperer(surveillant: Surveillant, id: number) {
    console.log(surveillant);
    this.surveillant.id = surveillant.id;
    this.surveillant.nom = surveillant.nom;
    this.surveillant.prenom = surveillant.prenom;
    this.surveillant.mail = surveillant.mail;
    console.log(this.surveillant.nom);

  }


  public printDocument(documentName: string, documentData: string[]){
    this.isPrinting = true;
    this.router.navigate(['/',
      {outlets: {
          print: ['print', documentName, documentData.join()]
        }}
    ]);
  }
  public update(id: number, nom: string, prenom: string, mail: string){
    this.http.put(this._urlsurve + id + '/' + nom + '/' + prenom + '/' + mail, this.surveillant).subscribe(
      data => {
        if (data > 0) {
          console.log('la surveillant ');
        }
        this.toastr.success(nom + ' a été modifié avec succés', 'Modification réussi!');
      });
  }
  public vider(){
    this.surveillant = null;
  }
}

