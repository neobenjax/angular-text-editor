import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { HojaComponent } from './components/editor/hoja/hoja.component';
import { HeaderComponent } from './components/editor/header/header.component';
import { ToolbarComponent } from './components/editor/toolbar/toolbar.component';
import { EstructuraComponent } from './components/editor/estructura/estructura.component';

//Service
import { EditableBlocksService } from './components/editor/services/editable-blocks.service';
import { TimesPipe } from './pipes/times.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HojaComponent,
    HeaderComponent,
    ToolbarComponent,
    EstructuraComponent,
    TimesPipe
  ],
  imports: [
    BrowserModule,
    DndModule.forRoot()
  ],
  providers: [
    EditableBlocksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
