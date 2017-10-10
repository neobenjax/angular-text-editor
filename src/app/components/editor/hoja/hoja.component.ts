import { Component, OnInit } from '@angular/core';
import { EditableBlocksService } from '../services/editable-blocks.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'app-hoja',
  templateUrl: './hoja.component.html',
  styleUrls: ['./hoja.component.scss']
})
export class HojaComponent implements OnInit {

  private editorConfig: any;
  private editorIsOpen = false;
  private openEditorId = '';
  public editableBlocks = [];
  public activeBlock: number = -1;
  public activeSheet: number = -1;

  constructor(private editableBlocksService: EditableBlocksService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // var deleteButton = function (context) {
    //   var ui = $.summernote.ui;
    //   // create button
    //   var button = ui.button({
    //     contents: '<i class="fa fa-child"/> Borrar',
    //     tooltip: 'Borrar bloque',
    //     click: () => {
    //       // invoke insertText method with 'hello' on editor module.
    //       context.destroy();
    //       context.invoke('editor.insertText', 'hello');
    //     }
    //   });
    //
    //   return button.render();   // return button as jquery object
    // }
    this.editorConfig = {
      minHeight: 100,
      toolbar: [
        // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['custom', ['deleteBtn']]
      ]
    };

    this.editableBlocks = this.editableBlocksService.blocks;
  }

  ngAfterViewInit(){
    this.editableBlocksService.sheetSize = {
      width: document.getElementById('innerSheet_0').offsetWidth,
      height:document.getElementById('innerSheet_0').offsetHeight
    }
  }

  ngAfterViewChecked(){
    this.updatePagesContent();
  }

  ngDoCheck() {
  }

  public edit(sheet: number, index: number, event: any){
    if(this.editorIsOpen){
      this.save();
    }
    this.editorConfig.focus = true;
    let selector = event.target.id;
    $('#'+selector).summernote(this.editorConfig);
    this.openEditorId = selector;
    this.editorIsOpen = true;
    this.activeSheet = sheet;
    this.activeBlock = index;
  }

  public saveOpenEditable(event){
    if(
        !$(event.target).hasClass('editable-content') &&
        !$(event.target).hasClass('note-toolbar') &&
        !$(event.target).hasClass('note-editable') &&
        $(event.target).closest('.note-toolbar').length === 0 &&
        $(event.target).closest('.note-editable').length === 0
      ){
      if(this.editorIsOpen){
        this.save();
      }
    }
  }

  public save(){
    let markup = $('#'+this.openEditorId).summernote('code');
    let cleanMarkup = this.sanitizer.bypassSecurityTrustHtml(markup);
    if(this.activeBlock !== -1 || this.activeSheet !==-1)
      this.editableBlocksService.saveEditableBlock(this.activeSheet, this.activeBlock, cleanMarkup);
    $('#'+this.openEditorId).summernote('destroy');
    // console.log(this.openEditorId+' | ',$('#'+this.openEditorId).parent().height());
    this.activeBlock = -1;
    this.activeSheet = -1;
  }

  public deleteBlock(sheet: number, index: number){
    this.editableBlocksService.removeEditableBlock(sheet, index);
  }

  public updatePagesContent(){
    // console.log(this.editableBlocksService.sheetSize.height);
    if(this.editableBlocksService.sheetSize.height > 0){
      for(let i=0, n = this.editableBlocks.length; i < n; i++){
        // let pageHAdded = 0;
        this.editableBlocksService.sheetUsedHeight[i] = 0;
        for(let j = 0, m = this.editableBlocks[i].length; j < m; j++){
          this.editableBlocksService.sheetUsedHeight[i] += document.getElementById(`sheet_${i}_edit_${j}`).offsetHeight + 10 //margin bottom
        }
        // console.log(this.editableBlocksService.sheetUsedHeight);
        // console.log('Pagina '+ i + ' | Altura total:' + pageHAdded);
      }
    }
  }


}
