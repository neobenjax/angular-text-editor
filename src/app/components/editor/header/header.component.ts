import { Component, OnInit } from '@angular/core';
import { EditableBlocksService } from '../services/editable-blocks.service';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public editableBlocks = [];

  constructor(private editableBlocksService: EditableBlocksService) {

  }

  ngOnInit() {
  }

  previewDocument(){
    alert('Previsualizar');
  }

  downloadDocument(){
    alert('Descargar');
    console.log('Get data');
    this.editableBlocks = this.editableBlocksService.blocks;
    console.log('Data:',this.editableBlocks);
    console.log('DataString:',JSON.stringify(this.editableBlocks));
    // console.log('Html direct output',$('#innerSheet_0').find('.block').html());
  }



}
