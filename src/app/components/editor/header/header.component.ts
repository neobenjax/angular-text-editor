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
    // $(element).position().top / $('.hoja').height() * 100
    if(!this.inPreviewMode){
      let coordinates = [];
      $('.signerSpace').each(function(){
        let parentPos = $(this).closest('.block').position();
        let signerPos = $(this).position();
        let signerId = $(this).data('id');
        // let topPercentage = (parentPos.top+signerPos.top) / $('.hoja').height() * 100+'%';
        // let leftPercentage = (parentPos.left+signerPos.left) / $('.hoja').width() * 100+'%';
        // topPercentage = parentPos.top+signerPos.top+'px';
        // leftPercentage = parentPos.left+signerPos.left+'px';
        let topPercentage = parentPos.top / $('.hoja').outerHeight() * 100;
        let leftPercentage = parentPos.left / $('.hoja').outerWidth() * 100;
        topPercentage += signerPos.top / $('.hoja').outerHeight() * 100;
        leftPercentage += signerPos.left / $('.hoja').outerWidth() * 100;
        coordinates.push({
          top:topPercentage+'%',
          left:leftPercentage+'%',
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
