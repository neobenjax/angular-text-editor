import { Component, OnInit } from '@angular/core';
import { EditableBlocksService, DocVarsService } from '../services';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public editableBlocks = [];
  public mapSigners = [];
  public inPreviewMode: boolean = false;

  constructor(private editableBlocksService: EditableBlocksService,
              private docVarsService: DocVarsService) {

  }

  ngOnInit() {
    this.mapSigners = this.docVarsService.mapSigners;
  }

  previewDocument(){
    this.inPreviewMode = this.docVarsService.inPreviewMode
    if(!this.inPreviewMode){
      let coordinates = [];
      $('.signerSpace').each(function(){
        let parentPos = $(this).closest('.block').position();
        let signerPos = $(this).position();
        let signerId = $(this).data('id');
        coordinates.push({
          top:parentPos.top+signerPos.top+'px',
          left:parentPos.left+signerPos.left+'px',
          idSigner:signerId
        });
      });
      this.docVarsService.generateMapsSigners(coordinates);
    } else {
      this.docVarsService.resetMapSigners();
    }
    this.inPreviewMode = this.inPreviewMode ? false : true;
    this.docVarsService.setPreviewMode(this.inPreviewMode);
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
