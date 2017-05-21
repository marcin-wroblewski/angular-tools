import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'primeng/primeng'

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { RowComponent } from './table/row.component'
import { Column, ColumnBodyTemplateRenderer, MWTemplate  } from './table/column.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    RowComponent,
    Column, ColumnBodyTemplateRenderer, MWTemplate
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
