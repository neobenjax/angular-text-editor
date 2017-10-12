import { Component, OnInit } from '@angular/core';
import { EditableBlocksService, DocVarsService } from '../services';
import { Signer } from '../interfaces';
import { NgModel } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public signers: Signer[];
  public selectedSigners: Signer[];
  public checkSigners: boolean[] = [];

  constructor(private editableBlocksService: EditableBlocksService,
              private docVarsService: DocVarsService) { }

  ngOnInit() {
    this.signers = this.docVarsService.signersList;
    this.selectedSigners = this.docVarsService.signersToDoc;
    for(let signer of this.signers){
      this.checkSigners.push(false);
    }
  }

  addBlock(type?: string){
    let contentType = type || '';
    let dataLastBlock = this.editableBlocksService.addEditableBlock(0,contentType);
  }

  addSheet(){
    this.editableBlocksService.addSheet();
  }

  addRemoveSignerToDoc(index: number){
    let signer: Signer = this.signers[index];
    let signIndex = this.selectedSigners.indexOf(signer);

    this.checkSigners[index] = this.checkSigners[index] ? false : true;

    if(signIndex !== -1)
      this.selectedSigners.splice(signIndex, 1);
    else
      this.selectedSigners.push(signer);

  }

  addSelectedToDoc(){
    this.editableBlocksService.addEditableBlock(0,'signers');
  }

  addAllToDoc(){
    this.selectedSigners.length = 0;
    for(let i=0,n = this.checkSigners.length; i<n; i++){
      this.selectedSigners.push(this.signers[i]);
      this.checkSigners[i] = true;
    }
    this.editableBlocksService.addEditableBlock(0,'signers');
  }

}
