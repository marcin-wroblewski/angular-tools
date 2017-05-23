import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { RowComponent } from './row.component'
import { Column, ColumnBodyTemplateRenderer, MWTemplate  } from './column.component';

@NgModule({
  imports: [
    CommonModule,
    TableComponent, RowComponent,
    Column, ColumnBodyTemplateRenderer, MWTemplate
  ],
  declarations: []
})
export class MwTableModule { }
