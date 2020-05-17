import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

  imprimer(){
    var id= document.getElementById('content-excel');
    var pdf = new jspdf('1', 'pt', 'carta', 2);
    pdf.text(220, 15, 'la liste des salles');
    pdf.fromHTML(id, 100, 15);
    pdf.save('Salles.pdf');
  }
}
