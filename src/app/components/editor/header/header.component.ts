import { Component, OnInit } from '@angular/core';
import { EditableBlocksService, DocVarsService, GeneratePdfService } from '../services';

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
              private docVarsService: DocVarsService,
              private generatePdfService: GeneratePdfService) {

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
        let signerWidth = $(this).width() + 'px';
        let signerHeight = $(this).height() + 'px';
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
          width:signerWidth,
          height:signerHeight,
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
    this.previewDocument();

    let newTab;
    let isiOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    if(isiOS){
      newTab = window.open("","","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");
    }
    //Construir el HTML de salida
    let htmlString = `<style>
                        .block{
                          color: #333;
                          font-family: Arial,Lucida Grande,sans-serif;
                          font-size:12pt;
                          margin-bottom: 10px;
                          padding: 10px;
                          line-height: 24pt;
                        }
                        p{
                          margin:0 0 0 0;
                        }
                        hr{
                          margin:0 0 0 0;
                        }
                        .signers{
                          text-align:center;
                        }
                        .signerSpace{
                          width: 220px;
                        }
                        .espacioFirma {
                          height: 35px;
                          position: relative;
                          border:1px solid black;
                        }
                        table{
                          width:100%;
                        }
                        table tr{
                          text-align: center;
                        }
                      </style>`;
    $('.inner-hoja .block').each(function(){
      let content = $(this).children('.editable-content').html();
      let innerClass = '';
      if($(this).children('.editable-content').hasClass('signers'))
        innerClass = 'signers'

      content = content.replace(/<hr>/g,'<hr />');
      htmlString += `<div class="block ${innerClass}">${content}</div>`
    })

    htmlString = htmlString.replace(/(\r\n|\n|\r)/gm,"");

    console.log(htmlString);

    this.generatePdfService.getPDFFromHTML(htmlString).subscribe(pdfFile => {

      let blob = new Blob([pdfFile._body], {
          type:'application/pdf'
      });

      if(navigator.msSaveBlob){
        //Explorer
        console.log('Explorer save blob');
        navigator.msSaveBlob(blob,'contrato_xxx.pdf');
      } else {
        //Firefox / Chrome
        var pdfLink = document.getElementById('downloadPDF');
        pdfLink.setAttribute('href',URL.createObjectURL(blob));
        console.log(pdfLink.getAttribute("href"));
        if(isiOS){
          newTab.location.href = pdfLink.getAttribute("href");
        } else {
          pdfLink.click();
        }
      }
    },
    error => {
      console.error(error);
    });

  }



}
