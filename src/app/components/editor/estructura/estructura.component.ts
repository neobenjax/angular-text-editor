import { Component, OnInit } from '@angular/core';
import { EditableBlocksService } from '../services/editable-blocks.service';

declare var $: any;
@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.scss']
})
export class EstructuraComponent implements OnInit {

  public editableBlocks = [];
  public sheets: number;

  constructor(private editableBlocksService: EditableBlocksService) { }

  ngOnInit() {
    this.editableBlocks = this.editableBlocksService.blocks;
    this.sheets = 2;
  }

  reOrderSuccess($event: any){

    for(let i=0,n = this.editableBlocks.length;i < n; i++){
      if(this.editableBlocks[i].length < 1){
        this.editableBlocksService.removeSheet(i);
      }
    }

  }

}
