import { Injectable } from '@angular/core';
import { Signer } from '../interfaces';

@Injectable()
export class DocVarsService {

  private signers: Signer[];
  public signersToDoc: Signer[];

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


}
