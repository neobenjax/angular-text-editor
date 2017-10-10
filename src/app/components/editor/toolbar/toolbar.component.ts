import { Component, OnInit } from '@angular/core';
import { EditableBlocksService } from '../services/editable-blocks.service';

declare var $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private editableBlocksService: EditableBlocksService) { }

  ngOnInit() {
  }

  addBlock(type?: string){
    let contentType = type || '';
    // let toSheet = this.editableBlocksService.blocks.length - 1;//Last page
    // let sH = this.editableBlocksService.sheetSize.height;
    // let uSH = this.editableBlocksService.sheetUsedHeight[toSheet];
    // let minHB = this.editableBlocksService.minHeightBlock;
    // if(contentType === 'lorem')
    //   minHB = 135;
    //
    // if( sH < ( uSH + minHB) ){
    //   toSheet += 1; // Next existing page
    //   if(!this.editableBlocksService.blocks[toSheet])
    //     this.addSheet();
    // }
    let dataLastBlock = this.editableBlocksService.addEditableBlock(0,contentType);
    // setTimeout(()=>{
    //   let toTop = $(`#sheet_${dataLastBlock.sheet}_edit_${dataLastBlock.id}`).offset().top - 20;
    //   console.log(toTop);
    //   $('#hojaApp').animate({ scrollTop: toTop }, 400);
    // },100);
  }

  addSheet(){
    this.editableBlocksService.addSheet();
  }

}
