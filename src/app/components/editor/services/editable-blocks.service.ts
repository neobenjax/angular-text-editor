import { Injectable } from '@angular/core';

@Injectable()
export class EditableBlocksService {

  private editableBlocks = [
    [
      '<p>Contenido 1 from service page 1</p>',
      '<p>Contenido 2 from service page 1</p>',
      '<p>Contenido 3 from service page 1</p>',
      '<p>Contenido 4 from service page 1</p>'
    ],
    // [
    //   '<p>Contenido 1 from service page 2</p>',
    //   '<p>Contenido 2 from service page 2</p>',
    //   '<p>Contenido 3 from service page 2</p>',
    //   '<p>Contenido 4 from service page 2</p>'
    // ]
  ];

  private loremText = 'Lorem ipsum dolor sit amet, <b>consectetur adipisicing elit</b>, sed do eiusmod tempor <i>incididunt</i> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est <em>laborum</em>.';

  public minHeightBlock: number;
  public sheetUsedHeight: number[] = [];
  public sheetSize = {
    width: 0,
    height:0
  }

  constructor() {
    this.minHeightBlock = 50;
  }

  get blocks(){
    return this.editableBlocks;
  }

  addEditableBlock(sheet: number, placeholder?: string){
    let placeholderText = placeholder || '<p>Nuevo elemento</p>';
    if(placeholder === 'lorem')
      placeholderText = this.loremText;
    this.editableBlocks[sheet].push(placeholderText);
    return {sheet:sheet,id:this.editableBlocks[sheet].length - 1}
  }

  addSheet(firstElement?: boolean){
    let lastSheetIndex = this.editableBlocks.length;
    this.editableBlocks[lastSheetIndex] = [];
    // if(!firstElement){
    //this.addEditableBlock(lastSheetIndex);
    // }
  }

  saveEditableBlock(sheet: number, index: number, blockContent: any){
    this.editableBlocks[sheet][index] = blockContent;
  }

  removeEditableBlock(sheet: number, index: number){
    this.editableBlocks[sheet].splice(index,1);
    if(this.editableBlocks[sheet].length < 1 )
      this.removeSheet(sheet);
  }

  removeSheet(sheet: number){
    this.editableBlocks.splice(sheet, 1);
  }

}
