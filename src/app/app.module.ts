import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'primeng/primeng'

import { AppComponent } from './app.component';
import { MwTableModule } from './table/mw-table.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    MwTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
