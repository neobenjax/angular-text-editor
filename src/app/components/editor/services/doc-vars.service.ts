import { Injectable } from '@angular/core';
import { Signer, Coordinates } from '../interfaces';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DocVarsService {

  private signers: Signer[];
  public signersToDoc: Signer[];
  public mapSigners = [];
  public inPreviewMode = false;

  private subject = new Subject<any>();

  constructor() {
    this.signers = [
      {
        id:0,
        name:'La parte'
      },
      {
        id:1,
        name:'La contra-parte'
      },
      {
        id:2,
        name:'Testigo 1'
      },
      {
        id:3,
        name:'Testigo 2'
      }
    ]
    this.signersToDoc = [];
  }

  get signersList(){
    return this.signers;
  }

  addRemoveSignersToDocList(idSigner: number){
    let signer: Signer = this.signers[idSigner];
    let index = this.signersToDoc.indexOf(signer);
    if(index !== -1)
      this.signersToDoc.splice(index, 1);
    else
      this.signersToDoc.push(signer);

  }

  addAllSignersToDocList(){
    this.signersToDoc.length = 0;
    this.signersToDoc = this.signers.slice();
  }

  resetSignersToDoc(){
    this.signersToDoc = [];
  }

  generateMapsSigners(coordinates: Coordinates[]){
    for(let coordinate of coordinates){
      this.mapSigners.push({
        top:coordinate.top,
        left:coordinate.left,
        idSigner:coordinate.idSigner
      });
    }
  }
  resetMapSigners(){
    this.mapSigners.length = 0;
  }

  setPreviewMode(mode: boolean){
    this.subject.next( mode );
    this.inPreviewMode = mode;
  }

  getPreviewMode(): Observable<any> {
    return this.subject.asObservable();
  }


}
