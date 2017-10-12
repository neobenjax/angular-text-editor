import { Component, OnInit } from '@angular/core';
import { DocVarsService } from './services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public previewMode: boolean = false;
  public subscription: Subscription;

  constructor(private docVarsService: DocVarsService) { }

  ngOnInit() {

    //Escuchar cambios en una variable del servicio
    this.subscription = this.docVarsService.getPreviewMode()
                          .subscribe( previewMode => {
                              this.previewMode = previewMode;
                          });

  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
