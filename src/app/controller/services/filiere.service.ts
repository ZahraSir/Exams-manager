
import { Injectable } from '@angular/core';
import {Niveau} from '../model/niveau';
import {HttpClient} from '@angular/common/http';
import {Filiere} from '../model/filiere';
import {Module} from '../model/module.model';
import { NiveauSemestre } from '../model/niveau-semestre';
import { Departement } from '../model/departement.model';
import { Professeur } from '../model/professeur.model';

import { ToastrService } from 'ngx-toastr';
import {Etudiant} from "../model/etudiant";
@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  private _departement: Departement;
  private _filiere: Filiere;
  private _module: Module;
  private _niveau: Niveau;
  private _departements: Array<Departement>;
  private _filieres: Array<Filiere>;
  private _modules: Array<Module>;
  private _display: number;
  private _niveaux: Array<Niveau>;
  private _urlFiliere = 'http://localhost:8090/exam-api/filieres/';
  private _urlModule = 'http://localhost:8090/exam-api/modules';
  private _urlNiveau = 'http://localhost:8090/exam-api/niveaux/';
  private _urlSemestre = 'http://localhost:8090/exam-api/niveau-semestre/';
  private _niveauSemestres: Array<NiveauSemestre>;
  private _professeurs: Array<Professeur>;
  private _fils : Array<Filiere>;
  private _filiers : Array<Filiere>;
  private _urldepart = 'http://localhost:8090/exam-api/departements/';
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  get filiere(): Filiere{
    if (this._filiere == null){
      this._filiere = new Filiere();
    }
    return this._filiere;
  }

  set filiere(filiere: Filiere) {
    this._filiere = filiere;
  }

  get fils(): Array<Filiere> {
    return this._fils;
  }

  set fils(value: Array<Filiere>) {
    this._fils = value;
  }

  get niveau(): Niveau{
    if (this._niveau == null){
      this._niveau = new Niveau();
    }
    return this._niveau;
  }

  set niveau(niveau: Niveau) {
    this._niveau = niveau;
  }
  get niveaux(): Array<Niveau>{
    if (this._niveaux == null){
      this._niveaux = new Array<Niveau>();
    }
    return this._niveaux;
  }

  set niveaux(niveaux: Array<Niveau>){
    this._niveaux = niveaux;
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

  get module(): Module{
    if (this._module == null){
      this._module = new Module();
    }
    return this._module;
  }

  set module(module: Module) {
    this._module = module;
  }

  get filieres(): Array<Filiere>{
    if (this._filieres == null){
      this._filieres = new Array<Filiere>();
    }
    return this._filieres;
  }

  set filieres(filieres: Array<Filiere>){
    this._filieres = filieres;
  }
  get filiers(): Array<Filiere>{
    if (this._filiers == null){
      this._filiers = new Array<Filiere>();
    }
    return this._filiers;
  }

  set filiers(filiers: Array<Filiere>){
    this._filieres = filiers;
  }
  get departements(): Array<Departement>{
    if (this._departements == null){
      this._departements = new Array<Departement>();
    }
    return this._departements;
  }

  set departements(departements: Array<Departement>){
    this._departements = departements;
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
  get modules(): Array<Module>{
    if (this._modules == null){
      this._modules = new Array<Module>();
    }
    return this._modules;
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

  set modules(modules: Array<Module>){
    this._modules = modules;
  }

  get display(): number{
    return this._display;
  }

  set display(display: number){
    this._display = display;
  }

  public findAll(){
    this.http.get<Array<Filiere>>(this._urlFiliere + '/find-all').subscribe(
      data => {
        this.filieres = data;
        console.log(data);
      }
    );
  }

  public validateSave(): boolean{
    return this.filiere.libelle != null ;
  }
  public validate(): boolean{
    return this.filiere.libelle != null && this.filiere.modules != null && this.filiere.niveau.libelle != null && this.filiere.departement.libelle != null;
  }

  public deleteByDesignation(filiere: Filiere){
    this.http.delete<number>(this._urlFiliere + 'delete-by-libelle/' + filiere.libelle).subscribe(
      data => {
        console.log('data suprime');
        this.deleteByReferenceFromView(filiere);
      }
    );
  }

  public deleteByReferenceFromView(filiere: Filiere){
    const index = this.filieres.findIndex(f => f.libelle === filiere.libelle);
    if (index !== -1) {
      this.filieres.splice(index, 1);
    }
  }

  public save(selectedNiveau: string){
    this.filiere.niveau.libelle = selectedNiveau;
    this.http.post<number>(this._urlFiliere + selectedNiveau + '/save/' , this.filiere).subscribe(
      data => {
        if (data > 0) {
          this.toastr.success(this.filiere.libelle + ' a  été  ajouté dans la liste', 'Ajout réussi');
          this.filieres.push(this.filiere);

          this.filiere = null;
          this.display = 1;
          console.log(this.filiere);
        }
        else if (data == -1) {
          this.toastr.error(this.filiere.libelle + ' existe déja dans la liste', 'Alerte!');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public findByFiliereLibelle(filiere: Filiere){
    this.http.get<Array<Module
      >>(this._urlModule + '/find-by-filiere/' + filiere.libelle).subscribe(
      data => {
        this.filiere.modules = data;
        console.log(data + 'hani');
      }
    );
  }
  public recupererF(filiere: Filiere){
    this.filiere.id = filiere.id;
    this.filiere.libelle = filiere.libelle;
    this.filiere.niveau.libelle= filiere.niveau.libelle;
    this.filiere.modules = filiere.modules;
    this.filiere.departement.libelle = filiere.departement.libelle;
  }

  public addModules(){
    this.filiere.modules.push(this.module);
    this.module = null;
  }

  public saveFM(){
    console.log(this.filiere.couleur);
    this.http.post<number>(this._urlFiliere + 'saveFM', this.filiere).subscribe(
      data => {
        if (data > 0) {
          this.filieres.push(this.clone(this.filiere));
          this.filiere = null;
          console.log(this.filiere);
        }},
      error => {
        console.log(error);
      }
    );
  }


  public clone(filiere: Filiere){
    const cloneFiliere = new Filiere();
    cloneFiliere.id = filiere.id;
    cloneFiliere.libelle = filiere.libelle;
    cloneFiliere.modules = filiere.modules;
    cloneFiliere.niveau.libelle = filiere.niveau.libelle;
    console.log(filiere.niveau);
    cloneFiliere.departement = filiere.departement;
    return cloneFiliere;
  }

  public saveM(module: Module){
    this.http.post<number>(this._urlModule + '/add-module/', module).subscribe(
      data => {
        if (data > 0) {
          this.filiere.modules.push(this.module);
          this.module = null;
          console.log(this.module);
        }},
      error => {
        console.log(error);
      }
    );
  }

  public deleteById(module: Module){
    this.http.delete<number>(this._urlModule + '/delete-by-id/' + module.id).subscribe(
      data => {
        console.log('data suprime');
        this.deleteByReferenceFromView1(module);
      }
    );
  }

  public deleteByReferenceFromView1(module: Module){
    const index = this.filiere.modules.findIndex(m => m.libelle === module.libelle);
    if (index !== -1) {
      this.filiere.modules.splice(index, 1);
    }
  }

  public getNiveaux(){
    this.http.get<Array<Niveau>>(this._urlNiveau + 'find-all').subscribe(
      data => {
        this.niveaux = data;
        console.log(data);
      }
    );
  }

  public vider(){
    this.filiere = null;
  }

  public findByNiveauLibelle(niveau){
    this.http.get<Array<NiveauSemestre>>(this._urlSemestre + 'find-by-niveau/' + niveau).subscribe(
      data => {
        console.log(data);
        this.niveauSemestres = data;
        console.log('fbjd' + this.niveauSemestres);

      }
    );
  }

  public getDepartements(){
    this.http.get<Array<Departement>>('http://localhost:8090/exam-api/departements/find-all').subscribe(
      data => {
        this.departements = data;
        console.log(data);
      }
    );
  }
  public findByDepartementLibelle(libelle){
    this.http.get<Array<Professeur>>('http://localhost:8090/exam-api/professeurs/find-by-departement/'+ libelle).subscribe(
      data => {
        this._professeurs = data;
        console.log(data);
      }
    );
  }
  public findFiliereByDepartementLibelle(libelle) {
    this.http.get<Array<Filiere>>(this._urlFiliere + 'departement/' + libelle ).subscribe(
      data => {
        console.log(data);
        this._fils = data;
        console.log('fbjd ' + this.fils);
      }
    );
  }
  public findByLibelle(libelle){
    console.log('daapertementt' + libelle);
    this.http.get<Departement>(this._urldepart + 'find-by-libelle/' + libelle).subscribe(
      data => {
        this.departement = data;
        console.log('departement' + data);
      }
    );
  }

  public update(id: number, libelle: string, niveau: string, departement: string){
    console.log(this.filiere.id)
    this.http.put(this._urlFiliere + 'id/' + id+ '/libelle/' + libelle + '/niveau/'+ niveau + '/departement/' + departement, this.filiere).subscribe(
      data => {
        if (data > 0) {
          this.toastr.success(libelle + ' a été modifié avec succés', 'Modification réussi!');
          window.location.reload();
        }
       
      });
  }
}
