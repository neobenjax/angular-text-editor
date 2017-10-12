import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DocVarsService } from '../services/doc-vars.service';

@Injectable()
export class EditableBlocksService {

  private editableBlocks = [
    [
      {
        type:'simpleBlock',
        content:'<p>Comience a escribir aquí</p>'
      },
    ]
  ];

  private loremText = {
    type:'lorem',
    content:'Lorem ipsum <span style="font-size: 24px;">dolor sit amet</span>, <b>consectetur adipisicing elit</b>, sed do eiusmod tempor <i>incididunt</i> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est <em>laborum</em>.'
  };
  private space = {
    type:'space',
    content:'<p><br></p>'
  };

  public minHeightBlock: number;
  public sheetUsedHeight: number[] = [];
  public sheetSize = {
    width: 0,
    height:0
  }

  constructor(private sanitizer: DomSanitizer,
              private docVarsService: DocVarsService) {
    this.minHeightBlock = 50;
  }

  get blocks(){
    return this.editableBlocks;
  }

  addEditableBlock(sheet: number, placeholder?: string){
    let placeholderElement = {
      type:'simpleBlock',
      content: placeholder || '<p>Escriba aquí</p>'
    };

    switch(placeholder){
      case 'lorem':
        placeholderElement = this.loremText;
      break;
      case 'space':
        placeholderElement = this.space;
      break;
      case 'signers':
        placeholderElement.type = 'signers';
        placeholderElement.content = '';
        for(let signer of this.docVarsService.signersToDoc){
          placeholderElement.content += `<div class="signerSpace signer_${signer.id}" data-id="${signer.id}">
                                          <div class="espacioFirma"></div>
                                          <div class="nombreFirmante">${signer.alias}</div>
                                         </div>`;
        }
      break;
      case 'header':
        placeholderElement.type = 'header';
        placeholderElement.content =
          `En __________________, siendo los __ días del mes de __________ de _____, se celebra el presente
          Contrato de Compraventa entre __________________________, como Vendedor, y
          __________________________, como Comprador, respecto del inmueble que se describe a
          continuación, de conformidad con lo siguiente:
          `
    }
    // placeholderElement = this.sanitizer.bypassSecurityTrustHtml(placeholderElement).toString();
    this.editableBlocks[sheet].push(placeholderElement);
  }

  addSheet(firstElement?: boolean){
    let lastSheetIndex = this.editableBlocks.length;
    this.editableBlocks[lastSheetIndex] = [];
    // if(!firstElement){
    //this.addEditableBlock(lastSheetIndex);
    // }
  }

  saveEditableBlock(sheet: number, index: number, blockContent: any){
    this.editableBlocks[sheet][index].content = blockContent;
  }

  removeEditableBlock(sheet: number, index: number){
    this.editableBlocks[sheet].splice(index,1);
    if(this.editableBlocks[sheet].length < 1 && this.editableBlocks.length > 1)
      this.removeSheet(sheet);
  }

  removeSheet(sheet: number){
    this.editableBlocks.splice(sheet, 1);
  }

}
