import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Module} from '../model/module.model';
import {Semestre} from '../model/semestre';
import { NiveauSemestre } from '../model/niveau-semestre';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private _module: Module;
  private _modules: Array<Module>;
  private _semestres: Array<Semestre>;
  private _urlModule= 'http://localhost:8090/exam-api/modules/';
  private _urlSemestre = 'http://localhost:8090/exam-api/niveau-semestre/';
  private _niveauSemestres: Array<NiveauSemestre>;

  constructor(private http: HttpClient) { }

  get module(): Module{
    if(this._module == null){
      this._module = new Module();
    }
    return this._module;
  }

  set module(module: Module){
    this._module = module;
  }

  get modules(): Array<Module>{
    if(this._modules == null){
      this._modules = new Array<Module>();
    }
    return this._modules;
  }

  set modules(modules: Array<Module>){
    this._modules = modules;
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

  get niveauSemestres(): Array<NiveauSemestre>{
    if (this._niveauSemestres == null){
      this._niveauSemestres = new Array<NiveauSemestre>();
    }
    return this._niveauSemestres;
  }

  set niveauSemestres(niveauSemestres: Array<NiveauSemestre>){
    this._niveauSemestres = niveauSemestres;
  }


  public save(){
    this.http.post<number>(this._urlModule+ 'add-module/', this.module).subscribe(
      data => {
        if (data > 0) {
          this.modules.push(this.module);
          this.module = null;
          console.log(this.module);
        }},
      error => {
        console.log(error);
      }
    );

  }

  public clone(module: Module){
    const myClone = new Module();
    myClone.id = module.id;
    myClone.filiere = module.filiere;
    myClone.libelle = module.libelle;
    myClone.semestre =module.semestre;
    return myClone;
  }

  public update(id: number,libelle: string, semestre: string){
    this.http.put(this._urlModule + id +'/'+ libelle +'/' + semestre, this.module).subscribe(
      data =>{
        if(data >0) {
          console.log(this.module)
        }
      })
  }

  public recuperer(module:Module){
    this.module.id = module.id;
    this.module.libelle = module.libelle;
    this.module.semestre.libelle = module.semestre.libelle;
    this.module.filiere.libelle =module.filiere.libelle;
    console.log(this.module)
  }

  public getSemestres() {
    this.http.get<Array<Semestre>>(this._urlSemestre).subscribe(
      data => {
        this.semestres = data;
      }
    );
  }

  public findAll(){
    this.http.get<Array<Module>>(this._urlModule+ 'find-all').subscribe(
      data => {
        this.modules = data;
      }
    );
  }

  public deleteById(module: Module){
    this.http.delete<number>(this._urlModule + '/delete-by-id/' + module.id).subscribe(
      data => {
        console.log("data suprime");
        this.deleteByReferenceFromView(module);
      }
    );
  }

  public deleteByReferenceFromView(module: Module){
    const index = this.modules.findIndex(m=> m.libelle === module.libelle);
    if (index !== -1) {
      this.modules.splice(index, 1);
    }
  }

  public vider() {
    this.module = null;
  }
  public findByFiliereLibelle(filiere){
    this.http.get<Array<NiveauSemestre>>(this._urlSemestre+ 'find-by-filiere/'+filiere).subscribe(
      data => {
        console.log(data);
       this.niveauSemestres = data;
        console.log('fbjd '+this.niveauSemestres)
        
      }
    )
  }
}
