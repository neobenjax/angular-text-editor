import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { HojaComponent } from './components/editor/hoja/hoja.component';
import { HeaderComponent } from './components/editor/header/header.component';
import { ToolbarComponent } from './components/editor/toolbar/toolbar.component';
import { EstructuraComponent } from './components/editor/estructura/estructura.component';

//Service
import { EditableBlocksService, DocVarsService } from './components/editor/services';
import { TimesPipe } from './pipes/times.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HojaComponent,
    HeaderComponent,
    ToolbarComponent,
    EstructuraComponent,
    TimesPipe,
    SafePipe
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot()
  ],
  providers: [
    EditableBlocksService,
    DocVarsService,
    NgSwitch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
